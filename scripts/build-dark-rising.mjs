// Builds the web assets for the Dark Rising dossier page.
//
// The delivered folder holds two different kinds of picture, and the page uses
// them for two different jobs, so they are written to two different folders:
//
//   frames/frame-01..10.jpg  the ten 2560x1080 grabs off the proof-of-concept
//                            cut (Sequence 03), 1920px wide, kept at 2.37:1 and
//                            numbered in timecode order — frame-10 is the
//                            title card
//   set/set-01..14.jpg       the fourteen phone and stills-camera photographs
//                            from the Kibera shoot, re-encoded without their
//                            metadata, numbered in filename order
//
// The hero loop and the trailer are not built here: both already exist under
// public/showcase/reel-vibe-uncut/ (scripts/build-hero-loops.mjs).
//
// Requires ffmpeg on PATH. Run with: node scripts/build-dark-rising.mjs

import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE = 'public/projects/reel-vibe-uncut/dark-rising';
const OUT = 'public/documentaries/dark-rising';
const FRAMES = path.join(OUT, 'frames');
const SET = path.join(OUT, 'set');

const FRAME_WIDTH = 1920;
const SET_WIDTH = 1400;
const QUALITY = 4; // ffmpeg -q:v, 2 = best, 5 = visibly soft

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;
const size = async (file) => (await stat(file)).size;

try {
  await run('ffmpeg', ['-version']);
} catch {
  console.error('ffmpeg not found on PATH. Install it (winget install Gyan.FFmpeg).');
  process.exit(1);
}

await mkdir(FRAMES, { recursive: true });
await mkdir(SET, { recursive: true });

const files = (await readdir(SOURCE))
  .filter((file) => /\.jpe?g$/i.test(file))
  .sort((a, b) => a.localeCompare(b, 'en'));

// The film grabs are named by timecode, so name order is cut order. The folder
// also holds still-01..08.jpg, frames scripts/extract-stills.mjs pulled for the
// old placeholder story; they are neither, so both lists skip them.
const frames = files.filter((file) => file.startsWith('Sequence'));
const set = files.filter((file) => !file.startsWith('Sequence') && !file.startsWith('still-'));

async function encode(list, dir, prefix, width) {
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const [index, file] of list.entries()) {
    const name = `${prefix}-${String(index + 1).padStart(2, '0')}.jpg`;
    const out = path.join(dir, name);

    await run('ffmpeg', [
      '-y', '-i', path.join(SOURCE, file),
      '-vf', `scale='min(${width},iw)':-2`,
      '-map_metadata', '-1',
      '-q:v', String(QUALITY),
      out,
    ]);

    sourceBytes += await size(path.join(SOURCE, file));
    outputBytes += await size(out);
    console.log(`${name}  <-  ${file}`);
  }

  console.log(`\n${list.length} ${prefix}s: ${mb(sourceBytes)} -> ${mb(outputBytes)}\n`);
}

await encode(frames, FRAMES, 'frame', FRAME_WIDTH);
await encode(set, SET, 'set', SET_WIDTH);
