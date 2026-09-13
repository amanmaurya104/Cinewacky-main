// Builds the web assets for the Craft Council of India documentary page.
//
// The delivered folder is 51MB: ten ~1900px screen-grabs as PNGs (1.5-3.5MB
// each), three silent-usable 1080p craft clips, and the 16s trailer. None of
// it is servable as-is. This produces, into
// public/documentaries/craft-council-of-india/:
//
//   plates/plate-NN.jpg   1600px wide, ~150-300KB, in filename order
//   plates/plate-11.jpg   a Chhau frame lifted out of the trailer
//   plates/plate-12.jpg   the establishing aerial, also out of the trailer
//   hero-loop.mp4         CRAFT PIC 1 (the warp threads), silent, for the hero
//   hero-poster.jpg       a frame from it, for <video poster>
//   motion/metal.mp4      CRAFT PIC 2 (the Dokra panel), silent, in-chapter
//   motion/clay.mp4       CRAFT PIC 3 (the terracotta panel), silent
//   motion/*-poster.jpg   posters for both
//   trailer.mp4           the trailer, audio kept, faststart
//   trailer-poster.jpg
//
// The source filenames carry a narrow no-break space (U+202F) from the macOS
// screenshot naming and a trailing space before `.mp4` in two of the clips,
// which is why every clip here is resolved by prefix match rather than by a
// literal path, and why the plate number is assigned by position.
//
// Requires ffmpeg on PATH. Run with: node scripts/build-craft-council.mjs

import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE = 'public/projects/life-beyond-lens/craft-council-of-india';
const OUT = 'public/documentaries/craft-council-of-india';
const PLATES = path.join(OUT, 'plates');
const MOTION = path.join(OUT, 'motion');

const PLATE_WIDTH = 1600;
const PLATE_QUALITY = 4; // ffmpeg -q:v, 2 = best, 5 = visibly soft

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;
const size = async (file) => (await stat(file)).size;

try {
  await run('ffmpeg', ['-version']);
} catch {
  console.error('ffmpeg not found on PATH. Install it (winget install Gyan.FFmpeg).');
  process.exit(1);
}

await mkdir(PLATES, { recursive: true });
await mkdir(MOTION, { recursive: true });

const files = await readdir(SOURCE);

/** The delivered names are inconsistent about trailing spaces, so match on the
 *  stable prefix instead of spelling the whole filename out. */
function source(prefix) {
  const match = files.find((file) => file.startsWith(prefix));
  if (!match) throw new Error(`No source file starting with "${prefix}"`);
  return path.join(SOURCE, match);
}

/* ---- stills -------------------------------------------------------------- */

const stills = files
  .filter((file) => /\.(png|jpe?g)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, 'en'));

let index = 0;
let sourceBytes = 0;
let outputBytes = 0;

for (const file of stills) {
  index += 1;
  const name = `plate-${String(index).padStart(2, '0')}.jpg`;
  const out = path.join(PLATES, name);

  await run('ffmpeg', [
    '-y', '-i', path.join(SOURCE, file),
    '-vf', `scale='min(${PLATE_WIDTH},iw)':-2`,
    '-q:v', String(PLATE_QUALITY),
    out,
  ]);

  sourceBytes += await size(path.join(SOURCE, file));
  outputBytes += await size(out);
  console.log(`${name}  <-  ${file}`);
}

console.log(`\n${index} plates: ${mb(sourceBytes)} -> ${mb(outputBytes)}`);

/* ---- plates lifted out of the trailer ------------------------------------ */

// The delivered stills cover the workshops but not the Chhau procession that
// closes the film, and there is no wide shot of the country the crafts come
// from. Both exist in the trailer; these are the two moments in it that carry
// no burned-in title card.
const TRAILER = source('CRAFT COUNCIL TRAILER');

const lifted = [
  { at: 11, name: 'plate-11.jpg', note: 'Chhau, masks carried across the field' },
  { at: 1.4, name: 'plate-12.jpg', note: 'the establishing aerial, before the first card' },
];

for (const frame of lifted) {
  const out = path.join(PLATES, frame.name);

  await run('ffmpeg', [
    '-y', '-ss', String(frame.at), '-i', TRAILER,
    '-frames:v', '1',
    '-vf', `scale='min(${PLATE_WIDTH},iw)':-2`,
    '-q:v', String(PLATE_QUALITY),
    out,
  ]);

  console.log(`${frame.name}  <-  trailer @${frame.at}s  (${frame.note})`);
}

/* ---- silent loops -------------------------------------------------------- */

// Every clip on the page plays muted, on repeat, behind or beside prose, so the
// audio track is dropped rather than carried and silenced.
async function loop(prefix, out, posterAt) {
  const src = source(prefix);

  await run('ffmpeg', [
    '-y', '-i', src,
    '-an',
    '-vf', "scale='min(1920,iw)':-2",
    '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-crf', '24', '-preset', 'slow',
    '-movflags', '+faststart',
    out,
  ]);

  const poster = out.replace(/\.mp4$/, '-poster.jpg');

  await run('ffmpeg', [
    '-y', '-ss', String(posterAt), '-i', src,
    '-frames:v', '1',
    '-vf', 'scale=1280:-2',
    '-q:v', '3',
    poster,
  ]);

  console.log(
    `${path.basename(out)}  ${mb(await size(src))} -> ${mb(await size(out))}` +
      `   + ${path.basename(poster)} ${mb(await size(poster))}`,
  );
}

await loop('CRAFT PIC 1', path.join(OUT, 'hero-loop.mp4'), 2);
await loop('CRAFT PIC 2', path.join(MOTION, 'metal.mp4'), 2);
await loop('CRAFT PIC 3', path.join(MOTION, 'clay.mp4'), 2);

// The hero poster is named for the hero rather than for its clip, so the data
// file does not have to know which clip the hero happens to use.
const heroPoster = path.join(OUT, 'hero-poster.jpg');
await run('ffmpeg', [
  '-y', '-ss', '2', '-i', source('CRAFT PIC 1'),
  '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', heroPoster,
]);
console.log(`hero-poster.jpg  ${mb(await size(heroPoster))}`);

/* ---- trailer ------------------------------------------------------------- */

// The one asset that keeps its audio: it is the thing a visitor presses play
// on. Re-encoded only to move the moov atom to the front so it starts without
// downloading the whole file first.
const trailer = path.join(OUT, 'trailer.mp4');

await run('ffmpeg', [
  '-y', '-i', TRAILER,
  '-vf', "scale='min(1920,iw)':-2",
  '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-crf', '23', '-preset', 'slow',
  '-c:a', 'aac', '-b:a', '128k',
  '-movflags', '+faststart',
  trailer,
]);

const trailerPoster = path.join(OUT, 'trailer-poster.jpg');

await run('ffmpeg', [
  '-y', '-ss', '11', '-i', TRAILER,
  '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', trailerPoster,
]);

console.log(
  `trailer.mp4  ${mb(await size(TRAILER))} -> ${mb(await size(trailer))}` +
    `   + trailer-poster.jpg ${mb(await size(trailerPoster))}`,
);
