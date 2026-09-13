// Builds the web-ready dragon for the Test of China page.
//
// The download from Sketchfab is 26.7MB, which is not something you put behind
// a page of prose. Almost none of that is the mesh: at 50k triangles the
// geometry is small, and 15.9MB of it is animation, 928,541 keyframes across
// 559 samplers baked at 30fps over a 57.5s swim cycle. The rest is three 2048px
// PNGs.
//
// So this does four things, in order of what they save:
//
//   meshopt      compresses geometry AND animation tracks   ~12.1MB -> 3.2MB
//   drop maps    the clearcoat map costs a slower material for detail
//                that is invisible at the size this renders, and the
//                emissive map is near-flat white, so a uniform emissive
//                factor stands in for it and the page grades it in code
//   resize/webp  the surviving normal map, 2048 PNG -> 1024 WebP
//   resample     redundant keyframes
//
// Output: public/documentaries/test-of-china/dragon.glb
//
// The runtime needs MeshoptDecoder to read the result; GLTFLoader is wired to
// it in components/documentary/dragon/DragonLoong.tsx.
//
// Requires network access for npx. Run with: node scripts/build-dragon-model.mjs

import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE_DIR = 'public/documentaries/test-of-china/chinese_dragon';
const SOURCE = path.join(SOURCE_DIR, 'scene.gltf');
const OUT = 'public/documentaries/test-of-china/dragon.glb';

// Pinned: the CLI's defaults move between minor versions, and this is an asset
// build whose output is committed.
const CLI = ['--yes', '@gltf-transform/cli@4.5.0'];

const NORMAL_MAP_SIZE = 1024;
const WEBP_QUALITY = 82;

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

async function gltf(...args) {
  await run('npx', [...CLI, ...args], { shell: true, maxBuffer: 32 * 1024 * 1024 });
}

const sourceBytes = (await stat(SOURCE)).size + (await stat(path.join(SOURCE_DIR, 'scene.bin'))).size;

// The trimmed copy has to sit beside scene.bin and textures/ so its relative
// URIs still resolve, so it is written into the source folder and removed after.
const trimmed = path.join(SOURCE_DIR, 'scene.trimmed.gltf');
const work = await mkdtemp(path.join(tmpdir(), 'dragon-'));

try {
  const doc = JSON.parse(await readFile(SOURCE, 'utf8'));
  const hair = doc.materials.find((m) => m.name === 'MI_b09_00_drg_hair');
  if (!hair) throw new Error('the hair material is not where it was; check the source glTF');

  // Clearcoat forces a MeshPhysicalMaterial and a second normal map for a wet
  // sheen nobody can see at this size.
  delete hair.extensions;
  doc.extensionsUsed = (doc.extensionsUsed ?? []).filter(
    (e) => e !== 'KHR_materials_clearcoat',
  );
  if (!doc.extensionsUsed.length) delete doc.extensionsUsed;

  // The emissive map is a 2MB near-white mask. A flat factor of 1 is close
  // enough to it, and the page then tints and dims that in code so the dragon
  // can cool from ember to steam as the reader scrolls.
  delete hair.emissiveTexture;
  hair.emissiveFactor = [1, 1, 1];

  await writeFile(trimmed, JSON.stringify(doc));

  const step = (n) => path.join(work, `step-${n}.glb`);

  await gltf('resample', trimmed, step(1));
  await gltf('prune', step(1), step(2));
  await gltf('dedup', step(2), step(3));
  await gltf('resize', step(3), step(4), '--width', String(NORMAL_MAP_SIZE), '--height', String(NORMAL_MAP_SIZE));
  await gltf('webp', step(4), step(5), '--quality', String(WEBP_QUALITY));
  await gltf('meshopt', step(5), OUT, '--level', 'high');

  const outBytes = (await stat(OUT)).size;
  console.log(`${SOURCE_DIR} ${mb(sourceBytes)} -> ${OUT} ${mb(outBytes)}`);
} finally {
  await rm(trimmed, { force: true });
  await rm(work, { recursive: true, force: true });
}
