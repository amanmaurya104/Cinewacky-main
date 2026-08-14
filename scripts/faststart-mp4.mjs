// Moves an MP4's `moov` atom in front of `mdat` (what `ffmpeg -movflags
// +faststart` does) so a browser can begin playback after the first few KB
// instead of downloading the whole file first.
//
// When `moov` trails `mdat`, the player has no sample index until the final
// byte arrives — a 29MB hero video then blocks for its full download before
// showing a single frame.
//
// Chunk offsets in `stco`/`co64` are absolute file positions, so every entry is
// shifted by the size of the relocated `moov`.
//
// Usage: node scripts/faststart-mp4.mjs <input.mp4> [output.mp4]

import { readFile, writeFile } from 'node:fs/promises';

// Atoms that hold other atoms — we descend these looking for chunk tables.
const CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts']);

/** Splits a buffer into its top-level atoms. */
function parseAtoms(buf, start = 0, end = buf.length) {
  const atoms = [];
  let offset = start;

  while (offset + 8 <= end) {
    let size = buf.readUInt32BE(offset);
    const type = buf.toString('latin1', offset + 4, offset + 8);
    let headerSize = 8;

    if (size === 1) {
      size = Number(buf.readBigUInt64BE(offset + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = end - offset;
    }

    if (size < headerSize || offset + size > end) {
      throw new Error(`Malformed atom "${type}" at byte ${offset}`);
    }

    atoms.push({ type, start: offset, size, headerSize });
    offset += size;
  }

  return atoms;
}

/** Adds `delta` to every chunk offset in the stco/co64 tables inside `moov`. */
function shiftChunkOffsets(moov, delta) {
  let patched = 0;

  const walk = (start, end) => {
    for (const atom of parseAtoms(moov, start, end)) {
      const body = atom.start + atom.headerSize;

      if (atom.type === 'stco') {
        const count = moov.readUInt32BE(body + 4); // after version/flags
        for (let i = 0; i < count; i++) {
          const at = body + 8 + i * 4;
          const next = moov.readUInt32BE(at) + delta;
          if (next > 0xffffffff) {
            throw new Error('Chunk offset overflows 32 bits; co64 rewrite needed');
          }
          moov.writeUInt32BE(next, at);
        }
        patched += count;
      } else if (atom.type === 'co64') {
        const count = moov.readUInt32BE(body + 4);
        for (let i = 0; i < count; i++) {
          const at = body + 8 + i * 8;
          moov.writeBigUInt64BE(moov.readBigUInt64BE(at) + BigInt(delta), at);
        }
        patched += count;
      } else if (CONTAINERS.has(atom.type)) {
        walk(body, atom.start + atom.size);
      }
    }
  };

  walk(0, moov.length);
  return patched;
}

const [input, output = input.replace(/\.mp4$/i, '.faststart.mp4')] =
  process.argv.slice(2);

if (!input) {
  console.error('Usage: node scripts/faststart-mp4.mjs <input.mp4> [output.mp4]');
  process.exit(1);
}

const buf = await readFile(input);
const atoms = parseAtoms(buf);
const order = atoms.map((a) => a.type);

const moovIndex = atoms.findIndex((a) => a.type === 'moov');
const mdatIndex = atoms.findIndex((a) => a.type === 'mdat');

if (moovIndex === -1 || mdatIndex === -1) {
  throw new Error(`Expected moov and mdat, found: ${order.join(' ')}`);
}

if (moovIndex < mdatIndex) {
  console.log(`${input}\n  already faststart (${order.join(' ')}) — nothing to do`);
  process.exit(0);
}

const moovAtom = atoms[moovIndex];
const moov = Buffer.from(buf.subarray(moovAtom.start, moovAtom.start + moovAtom.size));

// moov was last, so every other atom shifts forward by exactly its size.
const patched = shiftChunkOffsets(moov, moovAtom.size);

const ftyp = atoms.find((a) => a.type === 'ftyp');
const rest = atoms.filter((a) => a !== moovAtom && a !== ftyp);

const out = Buffer.concat([
  ftyp ? buf.subarray(ftyp.start, ftyp.start + ftyp.size) : Buffer.alloc(0),
  moov,
  ...rest.map((a) => buf.subarray(a.start, a.start + a.size)),
]);

if (out.length !== buf.length) {
  throw new Error(`Size changed: ${buf.length} -> ${out.length}`);
}

await writeFile(output, out);

console.log(`${input}`);
console.log(`  ${order.join(' ')}  ->  ${parseAtoms(out).map((a) => a.type).join(' ')}`);
console.log(`  ${patched} chunk offsets shifted by ${moovAtom.size} bytes`);
console.log(`  wrote ${output}`);
