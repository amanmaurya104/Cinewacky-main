// Converts the decorative side GIFs to animated WebP.
//
// The source GIFs are 2552x1357, but `.story-side-gif` renders them in a column
// that is at most 260px wide with `object-fit: cover` and `object-position`
// pinned to the left/right edge — so only a narrow vertical slice is ever on
// screen. We crop to that slice (with a wide safety margin), drop to a height
// that still covers a full viewport, and re-encode as animated WebP.
//
// Run with: node scripts/optimize-side-gifs.mjs

import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/projects/left_right';
// Widest slice the column can ever reveal is ~600 source px; 900 leaves margin.
const CROP_WIDTH = 900;
const TARGET_HEIGHT = 540;
const QUALITY = 50;

const files = (await readdir(DIR)).filter((f) => f.endsWith('.gif'));
let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const out = src.replace(/\.gif$/, '.webp');
  const meta = await sharp(src, { animated: true }).metadata();

  // `_left` frames are anchored left in CSS, `_right` frames are anchored right.
  const left = file.includes('_right') ? meta.width - CROP_WIDTH : 0;

  const buffer = await sharp(src, { animated: true })
    .extract({ left, top: 0, width: CROP_WIDTH, height: meta.pageHeight })
    .resize({ height: TARGET_HEIGHT })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();

  await writeFile(out, buffer);

  const srcBytes = (await stat(src)).size;
  before += srcBytes;
  after += buffer.length;
  console.log(
    `${file.padEnd(16)} ${(srcBytes / 1024 / 1024).toFixed(2)}MB -> ${(
      buffer.length / 1024
    ).toFixed(0)}KB`,
  );
}

console.log(
  `\nTotal ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(
    1,
  )}MB (${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
);
