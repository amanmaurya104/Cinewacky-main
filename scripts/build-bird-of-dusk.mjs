// Builds the web assets for the Bird of Dusk documentary page.
//
// The delivered folder is 180MB: 29 screen-grabs as 2.5K PNGs (2-6MB each) and
// a 65MB trailer. Neither is servable as-is, and handing 6MB PNGs to the
// next/image optimizer is slow even though the output would be small. This
// produces, into public/documentaries/bird-of-dusk/:
//
//   plates/plate-NN.jpg   1920px wide, ~200-400KB, in filename order
//   trailer-poster.jpg    a single frame, for <video poster>
//
// The full trailer keeps its original path; it is only fetched on play. The
// poster is pulled from 20s in: the trailer opens on the production-house logo
// card, and the first 15s are title cards rather than film.
//
// Requires ffmpeg on PATH. Run with: node scripts/build-bird-of-dusk.mjs

import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE = 'public/projects/life-beyond-lens/bird-of-duck';
const OUT = 'public/documentaries/bird-of-dusk';
const PLATES = path.join(OUT, 'plates');
const TRAILER = path.join(SOURCE, '2k BOD TRAILER.mp4');

const PLATE_WIDTH = 1920;
const PLATE_QUALITY = 4; // ffmpeg -q:v, 2 = best, 5 = visibly soft
const POSTER_AT = 20;
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

  const [before, after] = await Promise.all(
    [path.join(SOURCE, file), out].map(async (f) => (await stat(f)).size),
  );
  sourceBytes += before;
  outputBytes += after;

  console.log(`plate-${String(index).padStart(2, '0')}.jpg  <- ${file}`);
}

console.log(`\n${index} plates: ${mb(sourceBytes)} -> ${mb(outputBytes)}`);

const poster = path.join(OUT, 'trailer-poster.jpg');

await run('ffmpeg', [
  '-y', '-ss', String(POSTER_AT), '-i', TRAILER,
  '-frames:v', '1',
  '-vf', `scale=${POSTER_WIDTH}:-2`,
  '-q:v', '4',
  poster,
]);

const [trailerSize, posterSize] = await Promise.all(
  [TRAILER, poster].map(async (f) => (await stat(f)).size),
);

console.log(`trailer  ${mb(trailerSize)} -> poster ${mb(posterSize)}`);
