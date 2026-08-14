// Re-encodes the showcase tile thumbnails from PNG to WebP.
//
// These double as the `poster` for the showcase videos, and a `poster` URL
// cannot go through the next/image optimizer — so the file on disk has to be
// the small one. Two of the twelve were also full-resolution masters (1920px)
// for a tile that never renders wider than ~40vw.
//
// Run with: node scripts/optimize-showcase-thumbs.mjs

import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/showcase-thumbs';
const MAX_EDGE = 960;
const QUALITY = 72;

const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'));
let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const out = src.replace(/\.png$/, '.webp');

  const buffer = await sharp(src)
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();

  await writeFile(out, buffer);

  const srcBytes = (await stat(src)).size;
  before += srcBytes;
  after += buffer.length;
  console.log(
    `${file.padEnd(8)} ${(srcBytes / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB`,
  );
}

console.log(
  `\nTotal ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(
    2,
  )}MB (${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
);
