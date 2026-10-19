// Re-encodes the home page showcase clips for the web.
//
// The masters in public/showcase/<n>.mp4 were exported at 5-13 Mbps with an
// audio track, though most are only a few hundred pixels across and every one
// plays muted inside a tile. Scrolling the home page streamed ~86MB.
//
// For each master this writes public/showcase/clips/<n>.mp4:
//   silent, H.264 CRF 24, longest side capped at 960px, faststart  (~0.5-1.5MB)
//
// The output lives under a new path rather than replacing the masters because
// /showcase is served `immutable` (see next.config.ts): a file edited in place
// would stay stale in returning visitors' caches for a year.
//
// Requires ffmpeg on PATH. Run with: node scripts/optimize-showcase-clips.mjs

import { execFile } from 'node:child_process';
import { access, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE_DIR = 'public/showcase';
const OUT_DIR = 'public/showcase/clips';
// Mirrors SHOWCASE_SLUG_ORDER in data/showcaseScroll.ts.
const COUNT = 12;
// Tiles top out around 380x500 CSS px at the active scale, so 960px covers a
// 2x screen with room to spare.
const MAX_SIDE = 960;
const CRF = 24;

async function ffmpegAvailable() {
  try {
    await run('ffmpeg', ['-version']);
    return true;
  } catch {
    return false;
  }
}

if (!(await ffmpegAvailable())) {
  console.error(
    'ffmpeg not found on PATH.\n' +
      'Install it (winget install Gyan.FFmpeg) and re-run.',
  );
  process.exit(1);
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

await mkdir(OUT_DIR, { recursive: true });

let before = 0;
let after = 0;

for (let n = 1; n <= COUNT; n += 1) {
  const src = path.join(SOURCE_DIR, `${n}.mp4`);
  const out = path.join(OUT_DIR, `${n}.mp4`);

  try {
    await access(src);
  } catch {
    console.log(`skip (missing): ${src}`);
    continue;
  }

  // Re-encoding is slow; skip work already done unless asked to redo it.
  if (!process.argv.includes('--force')) {
    try {
      await access(out);
      console.log(`skip (exists): ${out}`);
      continue;
    } catch {
      // not built yet
    }
  }

  await run('ffmpeg', [
    '-v', 'error', '-y',
    '-i', src,
    '-an',
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', String(CRF),
    '-pix_fmt', 'yuv420p',
    '-vf',
    `scale='min(${MAX_SIDE},iw)':'min(${MAX_SIDE},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2`,
    '-movflags', '+faststart',
    out,
  ]);

  const { size: inSize } = await stat(src);
  const { size: outSize } = await stat(out);
  before += inSize;
  after += outSize;
  console.log(`${src}  ${mb(inSize)} -> ${mb(outSize)}`);
}

if (before) console.log(`\ntotal  ${mb(before)} -> ${mb(after)}`);
