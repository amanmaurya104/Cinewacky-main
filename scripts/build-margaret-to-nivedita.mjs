// Builds the web assets for the Margaret to Nivedita documentary page.
//
// The delivered folder is 36MB: twelve ~1900px macOS screen-grabs as PNGs
// (0.9-3.2MB each) and the 20s trailer. None of it is servable as-is. This
// produces, into public/documentaries/margaret-to-nivedita/:
//
//   plates/plate-01..12.jpg  the delivered stills, 1600px wide, in name order
//   plates/plate-13..17.jpg  five frames lifted out of the trailer
//   portrait.jpg             the archival oval portrait, cropped off its white
//   hero-loop.mp4            castle -> fields -> thistles, silent, for the hero
//   hero-poster.jpg          a frame from it, for <video poster>
//   motion/dusk.mp4          the yew and the graveyard at nightfall, silent
//   motion/dusk-poster.jpg
//   trailer.mp4              the trailer, audio kept, faststart
//   trailer-poster.jpg
//
// It also writes public/showcase/life-beyond-lens/NIVEDITA.jpg, the tile the
// project mosaic opens the page from.
//
// The source still filenames carry a narrow no-break space (U+202F) from the
// macOS screenshot naming, which is why the trailer is resolved by prefix match
// rather than by a literal path and the plate number is assigned by position.
//
// Every grab seeks with -ss AFTER -i. Input seeking lands on the previous
// keyframe, and this trailer is a 20s chain of dissolves — at the timecodes
// below that is the difference between the portrait and the shot before it.
//
// Requires ffmpeg on PATH. Run with: node scripts/build-margaret-to-nivedita.mjs

import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE = 'public/projects/life-beyond-lens/margarate-to-nivedita';
const OUT = 'public/documentaries/margaret-to-nivedita';
const PLATES = path.join(OUT, 'plates');
const MOTION = path.join(OUT, 'motion');
const SHOWCASE = 'public/showcase/life-beyond-lens';

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
await mkdir(SHOWCASE, { recursive: true });

const files = await readdir(SOURCE);

function source(prefix) {
  const match = files.find((file) => file.startsWith(prefix));
  if (!match) throw new Error(`No source file starting with "${prefix}"`);
  return path.join(SOURCE, match);
}

const TRAILER = source('NIVEDITA TRAILER');

/* ---- the delivered stills ------------------------------------------------ */

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

console.log(`\n${index} delivered plates: ${mb(sourceBytes)} -> ${mb(outputBytes)}`);

/* ---- plates lifted out of the trailer ------------------------------------ */

// The delivered stills are all daylight Dungannon: the town, the memorial, the
// chapel, the two interviews. The trailer is the other half of the film — the
// country around the town, and the walk out to a grave at dusk — and none of it
// exists as a still. These five are the moments in it that carry no burned-in
// title card and no dissolve across the cut.
const lifted = [
  { at: 3.4, name: 'plate-13.jpg', note: 'the castle towers under a clear sky' },
  { at: 5.2, name: 'plate-14.jpg', note: 'cattle and ragwort, the country around the town' },
  { at: 9.4, name: 'plate-15.jpg', note: 'thistles gone over, against weather' },
  { at: 11.4, name: 'plate-16.jpg', note: 'the cemetery path' },
  { at: 13.2, name: 'plate-17.jpg', note: 'the crucifix against a blue dusk' },
];

for (const frame of lifted) {
  const out = path.join(PLATES, frame.name);

  await run('ffmpeg', [
    '-y', '-i', TRAILER, '-ss', String(frame.at),
    '-frames:v', '1',
    '-vf', `scale='min(${PLATE_WIDTH},iw)':-2`,
    '-q:v', String(PLATE_QUALITY),
    out,
  ]);

  console.log(`${frame.name}  <-  trailer @${frame.at}s  (${frame.note})`);
}

/* ---- the portrait -------------------------------------------------------- */

// The one archival image in the whole delivery, and the only picture of her on
// the page. The trailer assembles it in pieces over a white card and holds it
// whole for about a second; this takes it at the hold and crops the card away,
// leaving the mount and the oval. Portrait aspect, so it is cut to 3:4 rather
// than scaled into the 16:9 every other plate keeps.
const portrait = path.join(OUT, 'portrait.jpg');

await run('ffmpeg', [
  '-y', '-i', TRAILER, '-ss', '1.8',
  '-frames:v', '1',
  '-vf', 'crop=720:960:600:60,scale=900:-2',
  '-q:v', '3',
  portrait,
]);

console.log(`portrait.jpg  ${mb(await size(portrait))}  <-  trailer @1.8s`);

/* ---- silent loops -------------------------------------------------------- */

// Both clips play muted, on repeat, behind or beside prose, so the audio track
// is dropped rather than carried and silenced.
async function loop(from, to, out, posterAt) {
  await run('ffmpeg', [
    '-y', '-i', TRAILER,
    '-ss', String(from), '-to', String(to),
    '-an',
    '-vf', "scale='min(1920,iw)':-2",
    '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-crf', '23', '-preset', 'slow',
    '-movflags', '+faststart',
    out,
  ]);

  const poster = out.replace(/\.mp4$/, '-poster.jpg');

  await run('ffmpeg', [
    '-y', '-i', TRAILER, '-ss', String(posterAt),
    '-frames:v', '1',
    '-vf', 'scale=1280:-2',
    '-q:v', '3',
    poster,
  ]);

  console.log(
    `${path.basename(out)}  ${from}-${to}s  ${mb(await size(out))}` +
      `   + ${path.basename(poster)} ${mb(await size(poster))}`,
  );
}

// The hero runs the three landscape shots as one passage: the castle, the
// fields, the thistles. It dissolves rather than cuts, so it loops without a
// seam at either end.
await loop(3.0, 10.6, path.join(OUT, 'hero-loop.mp4'), 5.2);

// Nightfall in the churchyard — nearly static, which is what lets it sit under
// the closing station without pulling the eye off the prose.
await loop(15.0, 19.6, path.join(MOTION, 'dusk.mp4'), 16.4);

const heroPoster = path.join(OUT, 'hero-poster.jpg');
await run('ffmpeg', [
  '-y', '-i', TRAILER, '-ss', '5.2',
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
  '-crf', '22', '-preset', 'slow',
  '-c:a', 'aac', '-b:a', '128k',
  '-movflags', '+faststart',
  trailer,
]);

// Not the opening card. The film opens on the portrait over white, and at
// player size that reads as an empty box rather than as an invitation.
const trailerPoster = path.join(OUT, 'trailer-poster.jpg');

await run('ffmpeg', [
  '-y', '-i', TRAILER, '-ss', '9.4',
  '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', trailerPoster,
]);

console.log(
  `trailer.mp4  ${mb(await size(TRAILER))} -> ${mb(await size(trailer))}` +
    `   + trailer-poster.jpg ${mb(await size(trailerPoster))}`,
);

/* ---- the mosaic tile ----------------------------------------------------- */

// The project page opens this film from a still rather than a loop, so the
// mosaic does not stream a fourth clip. The aerial is the establishing shot of
// the town she was born in, which is the one frame that says where the film is.
const tile = path.join(SHOWCASE, 'NIVEDITA.jpg');

await run('ffmpeg', [
  '-y', '-i', path.join(SOURCE, stills[0]),
  '-vf', "scale='min(1600,iw)':-2",
  '-q:v', '4',
  tile,
]);

console.log(`NIVEDITA.jpg  ${mb(await size(tile))}  <-  ${stills[0]}`);
