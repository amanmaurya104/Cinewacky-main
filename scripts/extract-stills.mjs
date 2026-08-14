// Extracts a set of gallery stills from each film that has no still folder.
//
// Four stories (dark-rising, mistimukh, trailer-for-fiction, the-cat) were
// pointing their gallery, narrative and cast images at placeholder text files
// that are not images at all — the optimizer returns HTTP 400 and the browser
// shows a broken image. This gives each one real frames from its own film.
//
// Frames are sampled evenly across the middle of the runtime (the first and
// last 10% are usually titles, black, or credits). They are a mechanical
// starting point, not a curated selection — swap in better frames when you have them.
//
// Requires ffmpeg on PATH. Run with: node scripts/extract-stills.mjs [--force]

import { execFile } from 'node:child_process';
import { access, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SHOWCASE = 'public/showcase/reel-vibe-uncut';
const OUT_ROOT = 'public/projects/reel-vibe-uncut';

const FILMS = [
  { file: `${SHOWCASE}/DARK RISING.mp4`, slug: 'dark-rising' },
  { file: `${SHOWCASE}/MISTIMUKH.mp4`, slug: 'mistimukh' },
  { file: `${SHOWCASE}/trailer for fiction.mp4`, slug: 'trailer-for-fiction' },
  { file: `${SHOWCASE}/THE CAT.mp4`, slug: 'the-cat' },
];

const COUNT = 8;
const WIDTH = 1920;

async function duration(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    file,
  ]);
  return Number.parseFloat(stdout.trim());
}

try {
  await run('ffmpeg', ['-version']);
} catch {
  console.error('ffmpeg not found on PATH. Install it and re-run.');
  process.exit(1);
}

const force = process.argv.includes('--force');

for (const { file, slug } of FILMS) {
  try {
    await access(file);
  } catch {
    console.log(`skip (missing): ${file}`);
    continue;
  }

  const outDir = path.join(OUT_ROOT, slug);
  await mkdir(outDir, { recursive: true });

  if (!force) {
    const existing = await readdir(outDir).catch(() => []);
    if (existing.filter((f) => f.endsWith('.jpg')).length >= COUNT) {
      console.log(`${slug}: already extracted (pass --force to redo)`);
      continue;
    }
  }

  const total = await duration(file);
  // Sample across the middle 80% so titles and credits are skipped.
  const start = total * 0.1;
  const step = (total * 0.8) / (COUNT - 1);

  let bytes = 0;
  for (let i = 0; i < COUNT; i++) {
    const at = start + step * i;
    const out = path.join(outDir, `still-${String(i + 1).padStart(2, '0')}.jpg`);

    await run('ffmpeg', [
      '-y', '-ss', at.toFixed(2), '-i', file,
      '-frames:v', '1',
      '-vf', `scale=${WIDTH}:-2`,
      '-q:v', '3',
      out,
    ]);

    bytes += (await stat(out)).size;
  }

  console.log(
    `${slug}: ${COUNT} stills from ${(total / 60).toFixed(1)} min -> ${(
      bytes / 1048576
    ).toFixed(1)}MB`,
  );
}
