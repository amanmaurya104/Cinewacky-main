// Builds lightweight hero assets from the full-length films.
//
// Story pages currently autoplay the complete film as a muted background loop —
// between 29MB and 69MB per page, for decoration behind the title card. This
// produces, for each source:
//
//   <name>-loop.mp4    ~12s, 1280px wide, silent, faststart  (~1-2MB)
//   <name>-poster.jpg  a single frame, for <video poster>
//
// The poster matters as much as the loop: the current poster files are text
// placeholders, so the hero renders black until video data arrives.
//
// Requires ffmpeg on PATH. Run with: node scripts/build-hero-loops.mjs

import { execFile } from 'node:child_process';
import { access, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SHOWCASE = 'public/showcase/reel-vibe-uncut';
const LIFE_BEYOND_LENS = 'public/showcase/life-beyond-lens';

// Mirrors the heroVideo entries in data/stories.ts.
// `start` skips any fade-from-black so the loop and poster open on real image.
const SOURCES = [
  { file: `${SHOWCASE}/MOONLIGHT DREAM.mp4`, start: 3 },
  { file: `${SHOWCASE}/DARK RISING.mp4`, start: 3 },
  { file: `${SHOWCASE}/MISTIMUKH.mp4`, start: 3 },
  { file: `${SHOWCASE}/trailer for fiction.mp4`, start: 3 },
  { file: `${SHOWCASE}/THE CAT.mp4`, start: 3 },
  // Also a banner on the project page, which plays loops rather than films.
  { file: `${SHOWCASE}/KALI .mp4`, start: 3 },
  { file: 'public/projects/reel-vibe-uncut/kali_trailer/kali_official_trailer.mp4', start: 3 },
  // Tiles on the life-beyond-lens mosaic, which plays loops rather than films.
  { file: `${LIFE_BEYOND_LENS}/DOCU TRAILER .mp4`, start: 3 },
  { file: `${LIFE_BEYOND_LENS}/DOCU.mp4`, start: 3 },
  { file: `${LIFE_BEYOND_LENS}/OPENING 1.mp4`, start: 1 },
];

const DURATION = 12;
const WIDTH = 1280;
const CRF = 30;

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
      'Install it (winget install Gyan.FFmpeg) and re-run, or run the\n' +
      'equivalent commands by hand — see the header of this file.',
  );
  process.exit(1);
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;

for (const { file, start } of SOURCES) {
  try {
    await access(file);
  } catch {
    console.log(`skip (missing): ${file}`);
    continue;
  }

  const dir = path.dirname(file);
  const base = path.basename(file, '.mp4');
  const loop = path.join(dir, `${base}-loop.mp4`);
  const poster = path.join(dir, `${base}-poster.jpg`);

  // Re-encoding is slow; skip work already done unless asked to redo it.
  if (!process.argv.includes('--force')) {
    const built = await Promise.all(
      [loop, poster].map((f) => access(f).then(() => true, () => false)),
    );
    if (built.every(Boolean)) {
      console.log(`${base}\n  already built (pass --force to redo)`);
      continue;
    }
  }

  // -ss before -i seeks by keyframe, which is fast and accurate enough here.
  await run('ffmpeg', [
    '-y', '-ss', String(start), '-i', file,
    '-t', String(DURATION),
    '-an',
    '-vf', `scale=${WIDTH}:-2`,
    '-c:v', 'libx264', '-profile:v', 'main', '-preset', 'slow',
    '-crf', String(CRF), '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    loop,
  ]);

  await run('ffmpeg', [
    '-y', '-ss', String(start), '-i', file,
    '-frames:v', '1',
    '-vf', `scale=${WIDTH}:-2`,
    '-q:v', '4',
    poster,
  ]);

  const [srcSize, loopSize, posterSize] = await Promise.all(
    [file, loop, poster].map(async (f) => (await stat(f)).size),
  );

  console.log(
    `${base}\n  ${mb(srcSize)} -> loop ${mb(loopSize)} + poster ${mb(posterSize)}`,
  );
}

console.log(
  '\nDone. Point `heroVideo` and `poster` in data/stories.ts at the -loop.mp4\n' +
    'and -poster.jpg files; keep `trailer` on the full-length source.',
);
