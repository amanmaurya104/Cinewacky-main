// Builds the Brand Box page's stills from the advertisement screenshots.
//
// The masters in public/projects/photos_of_advertisement/ are 1300px frame
// grabs saved as 0.3-1.8MB PNGs, named by the minute they were taken. The page
// serves JPEG copies under public/projects/brand-box/<reel>/NN.jpg instead,
// grouped by the campaign they come from, so data/brandBox.ts can refer to
// them by reel and number. next/image still resizes them on request; this only
// gives it a clean, much smaller source to start from.
//
// Masters keep their names. Frames are picked by their position in the sorted
// folder listing, so adding a new screenshot in the middle would shift them:
// add new ones to a new reel instead.
//
// Run with: npm run media:brand-box

import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = 'public/projects/photos_of_advertisement';
const TARGET = 'public/projects/brand-box';
const QUALITY = 86;

// Reel -> frame indexes in the sorted listing, in the order the page shows
// them. Left out on purpose: 7-11 (portrait cuts of the hill hotels, which the
// landscape storyboard cannot mix in), 23 and 30 (near-repeats of 20 and 28).
const REELS = {
  garments: [64, 60, 61],
  product: [59, 62, 58, 63],
  itc: [20, 21, 22, 24, 25, 26, 27, 28, 29, 31],
  hills: [0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 17, 18, 19],
  city: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  bengal: [50, 51, 52, 53, 54, 55, 56, 57],
};

const masters = (await readdir(SOURCE)).filter((file) => file.endsWith('.png')).sort();
let before = 0;
let after = 0;

for (const [reel, indexes] of Object.entries(REELS)) {
  await mkdir(path.join(TARGET, reel), { recursive: true });

  for (const [position, index] of indexes.entries()) {
    const master = masters[index];
    if (!master) throw new Error(`No master at index ${index} for reel "${reel}"`);

    const src = path.join(SOURCE, master);
    const out = path.join(TARGET, reel, `${String(position + 1).padStart(2, '0')}.jpg`);

    await sharp(src).jpeg({ quality: QUALITY, mozjpeg: true }).toFile(out);

    before += (await stat(src)).size;
    after += (await stat(out)).size;
    console.log(`${out}  <-  ${master}`);
  }
}

console.log(`\n${(before / 1048576).toFixed(1)}MB of masters -> ${(after / 1048576).toFixed(1)}MB`);
