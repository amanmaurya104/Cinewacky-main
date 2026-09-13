// Builds the web assets for the Test of China documentary page.
//
// The delivered folder is 48MB: 15 screen-grabs as ~1900px PNGs (2.5-3.3MB
// each) and a 6s 1080p clip with audio. The PNGs are not servable as-is and
// handing 3MB PNGs to the next/image optimizer is slow for no gain. This
// produces, into public/documentaries/test-of-china/:
//
//   plates/plate-NN.jpg   1600px wide, ~150-300KB, in filename order
//   hero-loop.mp4         the clip, silent and faststart, for the hero
//   hero-poster.jpg       a frame from it, for <video poster>
//
// The source filenames carry a narrow no-break space (U+202F) from the macOS
// screenshot naming, which is why nothing here reads a filename back out of a
// URL: the plate number is assigned by position and lives in the new name.
//
// Requires ffmpeg on PATH. Run with: node scripts/build-test-of-china.mjs

import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE = 'public/projects/life-beyond-lens/test-of-china';
const OUT = 'public/documentaries/test-of-china';
const PLATES = path.join(OUT, 'plates');
const CLIP = path.join(SOURCE, 'TEST OF CHINA PIC.mp4');

const PLATE_WIDTH = 1600;
const PLATE_QUALITY = 4; // ffmpeg -q:v, 2 = best, 5 = visibly soft
const POSTER_AT = 1.5;
const POSTER_WIDTH = 1280;

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;

try {
  await run('ffmpeg', ['-version']);
} catch {
  console.error('ffmpeg not found on PATH. Install it (winget install Gyan.FFmpeg).');
  process.exit(1);
}

await mkdir(PLATES, { recursive: true });

const stills = (await readdir(SOURCE))
  .filter((file) => /\.(png|jpe?g)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, 'en'));

let index = 0;
let sourceBytes = 0;
let outputBytes = 0;

for (const file of stills) {
  index += 1;
  const out = path.join(PLATES, `plate-${String(index).padStart(2, '0')}.jpg`);

  await run('ffmpeg', [
    '-y', '-i', path.join(SOURCE, file),
    '-vf', `scale='min(${PLATE_WIDTH},iw)':-2`,
    '-q:v', String(PLATE_QUALITY),
    out,
  ]);

  sourceBytes += (await stat(path.join(SOURCE, file))).size;
  outputBytes += (await stat(out)).size;
  console.log(`plate-${String(index).padStart(2, '0')}.jpg  <-  ${file}`);
}

console.log(`\n${index} plates: ${mb(sourceBytes)} -> ${mb(outputBytes)}`);

// The hero loop plays muted and on repeat behind the title, so the audio track
// is dropped rather than carried and silenced.
const loop = path.join(OUT, 'hero-loop.mp4');

await run('ffmpeg', [
  '-y', '-i', CLIP,
  '-an',
  '-vf', "scale='min(1920,iw)':-2",
  '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-crf', '24', '-preset', 'slow',
  '-movflags', '+faststart',
  loop,
]);

console.log(`hero-loop.mp4  ${mb((await stat(CLIP)).size)} -> ${mb((await stat(loop)).size)}`);

const poster = path.join(OUT, 'hero-poster.jpg');

await run('ffmpeg', [
  '-y', '-ss', String(POSTER_AT), '-i', CLIP,
  '-frames:v', '1',
  '-vf', `scale=${POSTER_WIDTH}:-2`,
  '-q:v', '3',
  poster,
]);

console.log(`hero-poster.jpg  ${mb((await stat(poster)).size)}`);
