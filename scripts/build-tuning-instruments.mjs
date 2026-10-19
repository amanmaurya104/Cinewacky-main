// Cuts the instrument drawings out of the client's theme artwork for the
// Tuning 2 You page, so they can be animated one by one in the hero.
//
// The artwork is a single 1365x768 JPEG: teal line drawings of eight
// instruments on an ivory ground, with staff lines curling behind them. This
// produces, into public/documentaries/tuning-2-you/instruments/:
//
//   <name>.png   the drawing alone, on transparency, at 3x the source size,
//                with the ink recoloured to the brief's deep teal (#087E8B)
//
// How each cut is made:
//   1. Crop the instrument's box out of the artwork.
//   2. Turn ivory-to-ink into alpha (colour-to-alpha against the paper), so
//      the drawing sits on any ground without a pale rectangle behind it.
//   3. Keep only the ink that belongs to the instrument: the largest connected
//      stroke, plus any smaller stroke the instrument's outline encloses on all
//      four sides (a drum skin, an f-hole). The staff lines run off the edge of
//      every crop and are enclosed by nothing, so they fall away. The sitar's neck crosses a staff line, so
//      it also gets a hand-drawn keep mask (`keep`) applied first.
//
// The page draws its own staff lines and notes as SVG; only the instruments
// come from the artwork.
//
// Run with: npm run media:tuning-instruments [-- --preview out.png]

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = 'public/projects/web-stream-tales/theme/instruments-reference.jpg';
const OUT = 'public/documentaries/tuning-2-you/instruments';
const SCALE = 3;
const TEAL = [0x08, 0x7e, 0x8b];

// Paper and ink luminance, sampled off the artwork. Anything at or above PAPER
// is fully transparent; anything at or below INK is fully opaque.
const PAPER = 230;
const INK = 95;
const THRESHOLD = 0.22;

/**
 * Boxes are [left, top, width, height] in source pixels. `keep` shapes are in
 * crop coordinates: an ellipse is { cx, cy, rx, ry, angle }, a capsule is a
 * thick line { x1, y1, x2, y2, r }, a rect is { x, y, w, h }.
 */
const INSTRUMENTS = {
  sitar: {
    box: [50, 14, 205, 202],
    keep: [
      { cx: 46, cy: 166, rx: 42, ry: 42, angle: 0 },
      { x1: 70, y1: 134, x2: 180, y2: 22, r: 11 },
      { x: 140, y: 0, w: 65, h: 62 },
    ],
  },
  tabla: { box: [20, 228, 100, 90] },
  harmonica: { box: [14, 398, 128, 84] },
  flute: { box: [28, 512, 190, 188] },
  lute: { box: [1198, 30, 134, 152] },
  cymbals: { box: [1206, 243, 132, 104] },
  violin: { box: [1222, 358, 140, 202] },
  djembe: { box: [1246, 606, 96, 112] },
};

function inside(shape, x, y) {
  if ('rx' in shape) {
    const a = (shape.angle * Math.PI) / 180;
    const dx = x - shape.cx;
    const dy = y - shape.cy;
    const u = dx * Math.cos(a) + dy * Math.sin(a);
    const v = -dx * Math.sin(a) + dy * Math.cos(a);
    return (u / shape.rx) ** 2 + (v / shape.ry) ** 2 <= 1;
  }
  if ('x1' in shape) {
    const vx = shape.x2 - shape.x1;
    const vy = shape.y2 - shape.y1;
    const t = Math.max(0, Math.min(1, ((x - shape.x1) * vx + (y - shape.y1) * vy) / (vx * vx + vy * vy)));
    return Math.hypot(x - (shape.x1 + t * vx), y - (shape.y1 + t * vy)) <= shape.r;
  }
  return x >= shape.x && x < shape.x + shape.w && y >= shape.y && y < shape.y + shape.h;
}

/** Connected strokes (8-neighbour) over pixels with ink at or above THRESHOLD. */
function label(ink, w, h) {
  const labels = new Int32Array(w * h).fill(-1);
  const parts = [];
  for (let p = 0; p < w * h; p++) {
    if (ink[p] < THRESHOLD || labels[p] !== -1) continue;
    const id = parts.length;
    const part = { size: 0, x0: w, y0: h, x1: 0, y1: 0, edge: false };
    const stack = [p];
    labels[p] = id;
    while (stack.length) {
      const q = stack.pop();
      const qx = q % w;
      const qy = (q / w) | 0;
      part.size += 1;
      part.x0 = Math.min(part.x0, qx);
      part.y0 = Math.min(part.y0, qy);
      part.x1 = Math.max(part.x1, qx);
      part.y1 = Math.max(part.y1, qy);
      if (qx === 0 || qy === 0 || qx === w - 1 || qy === h - 1) part.edge = true;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = qx + dx;
          const ny = qy + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const r = ny * w + nx;
          if (labels[r] === -1 && ink[r] >= THRESHOLD) {
            labels[r] = id;
            stack.push(r);
          }
        }
      }
    }
    parts.push(part);
  }
  return { labels, parts };
}

const { data, info } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });
await mkdir(OUT, { recursive: true });

const previewAt = process.argv.indexOf('--preview');
const preview = [];
let previewX = 0;

for (const [name, { box, keep }] of Object.entries(INSTRUMENTS)) {
  const [left, top, w, h] = box;

  const ink = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (keep && !keep.some((shape) => inside(shape, x, y))) continue;
      const i = ((top + y) * info.width + (left + x)) * info.channels;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      ink[y * w + x] = Math.max(0, Math.min(1, (PAPER - lum) / (PAPER - INK)));
    }
  }

  // The instrument is the largest stroke. A smaller stroke stays only if the
  // instrument's outline lies left, right, above and below its centre — it is
  // drawn inside the instrument, which no staff line or stray dash is.
  const { labels, parts } = label(ink, w, h);
  const main = parts.reduce((best, part, id) => (part.size > parts[best].size ? id : best), 0);
  const isMain = (x, y) => labels[y * w + x] === main;
  function enclosed(part) {
    const cx = Math.round((part.x0 + part.x1) / 2);
    const cy = Math.round((part.y0 + part.y1) / 2);
    let left = false, right = false, up = false, down = false;
    for (let x = 0; x < part.x0; x++) left ||= isMain(x, cy);
    for (let x = part.x1 + 1; x < w; x++) right ||= isMain(x, cy);
    for (let y = 0; y < part.y0; y++) up ||= isMain(cx, y);
    for (let y = part.y1 + 1; y < h; y++) down ||= isMain(cx, y);
    return left && right && up && down;
  }
  const kept = new Set(
    parts
      .map((part, id) => ({ part, id }))
      .filter(({ part, id }) => id === main || (!part.edge && part.size >= 4 && enclosed(part)))
      .map(({ id }) => id),
  );

  // Anti-aliased edges sit just under THRESHOLD and carry no label, so a pixel
  // keeps its ink if it or any neighbour belongs to a kept stroke.
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      let near = false;
      for (let dy = -1; dy <= 1 && !near; dy++) {
        for (let dx = -1; dx <= 1 && !near; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (kept.has(labels[ny * w + nx])) near = true;
        }
      }
      rgba[p * 4] = TEAL[0];
      rgba[p * 4 + 1] = TEAL[1];
      rgba[p * 4 + 2] = TEAL[2];
      rgba[p * 4 + 3] = near ? Math.round(ink[p] * 255) : 0;
    }
  }

  const file = path.join(OUT, `${name}.png`);
  const out = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const scaled = await sharp(out.data)
    .resize({ width: out.info.width * SCALE, kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(`${name.padEnd(10)} ${scaled.width}x${scaled.height}  ${(scaled.size / 1024).toFixed(0)}KB`);

  if (previewAt !== -1) {
    preview.push({ input: file, left: previewX, top: 0 });
    previewX += scaled.width + 20;
  }
}

if (previewAt !== -1) {
  await sharp({ create: { width: previewX, height: 700, channels: 3, background: '#f3efe6' } })
    .composite(preview)
    .png()
    .toFile(process.argv[previewAt + 1]);
}
