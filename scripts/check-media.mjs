// Checks that every media path the site uses points at a real file in public/.
//
// Paths are gathered from two places:
//   - the content in data/, loaded and evaluated, so paths that helpers build
//     at runtime (showcaseVideoSrc, plate(n), the -loop/-poster names the
//     project pages derive) are checked exactly as the pages see them;
//   - string literals in app/, components/, hooks/, lib/ and styles/: the
//     hard-coded logos, the side GIFs, CSS url()s. Comments are skipped, so
//     commented-out markup does not count as a use.
//
// Matching is case-sensitive on purpose. Windows and macOS forgive a wrong
// letter case, Linux hosting answers it with a 404.
//
// Exits 1 if any path is missing. Run with: npm run check:media

import { readdirSync, readFileSync } from 'node:fs';
import { register } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

register('./lib/ts-hooks.mjs', import.meta.url);

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = path.join(ROOT, 'public');
const SOURCE_DIRS = ['app', 'components', 'hooks', 'lib', 'styles'];
const MEDIA =
  /\.(mp4|webm|mov|m4v|jpe?g|png|webp|gif|avif|svg|ico|glb|gltf|bin|woff2?|otf|ttf|mp3|wav|vtt|pdf)$/i;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const toPosix = (file) => file.split(path.sep).join('/');

// What is on disk, as URL paths. The lowercase map only explains near misses.
const onDisk = new Set();
const byLowerCase = new Map();
for (const file of walk(PUBLIC)) {
  const url = `/${toPosix(path.relative(PUBLIC, file))}`;
  onDisk.add(url);
  byLowerCase.set(url.toLowerCase(), url);
}

/** Decoded URL path -> the places that use it. */
const references = new Map();

function addReference(raw, where) {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//')) return;
  const clean = raw.split(/[?#]/)[0];
  if (!MEDIA.test(clean)) return;

  let decoded = clean;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    // Not valid percent-encoding: check it as written.
  }

  if (!references.has(decoded)) references.set(decoded, new Set());
  references.get(decoded).add(where);
}

/** Records every string inside a data value, labelled with where it sits. */
function collect(value, where, seen = new WeakSet()) {
  if (typeof value === 'string') {
    addReference(value, where);
    return;
  }
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const key = item && typeof item === 'object' ? (item.slug ?? item.id ?? index) : index;
      collect(item, `${where}[${key}]`, seen);
    });
    return;
  }

  for (const [key, child] of Object.entries(value)) collect(child, `${where}.${key}`, seen);
}

// ── Content, evaluated ────────────────────────────────────────────────────
const { default: projects } = await import('../data/projects.ts');
const { default: stories } = await import('../data/stories.ts');
const { default: documentaries } = await import('../data/documentaries.ts');
const { showcaseScrollItems, getShowcaseThumbSrc } = await import('../data/showcaseScroll.ts');
const { getProjectShowcaseVideos, getProjectMediaTiles } = await import('../lib/projectVideos.ts');

collect(projects, 'data/projects');
collect(stories, 'data/stories');
collect(documentaries, 'data/documentaries');
collect(showcaseScrollItems, 'data/showcaseScroll');

for (const item of showcaseScrollItems) {
  addReference(getShowcaseThumbSrc(item.id), `data/showcaseScroll thumbnail ${item.id}`);
}
for (const project of projects) {
  collect(getProjectShowcaseVideos(project), `projects[${project.slug}] banner videos`);
  collect(getProjectMediaTiles(project), `projects[${project.slug}] mosaic tiles`);
}

// ── Literals in code and CSS ──────────────────────────────────────────────
// A quoted or url()-wrapped absolute path ending in a media extension.
const LITERAL = /['"`(]\s*(\/[^'"`()\s]+?)(?=[?#'"`)\s])/g;

/** Blanks comments while keeping line numbers (and `https://` strings) intact. */
function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
}

for (const dir of SOURCE_DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    if (!/\.(tsx?|css|m?js)$/.test(file)) continue;
    const text = stripComments(readFileSync(file, 'utf8'));
    for (const match of text.matchAll(LITERAL)) {
      const line = text.slice(0, match.index).split('\n').length;
      addReference(match[1], `${toPosix(path.relative(ROOT, file))}:${line}`);
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────
const missing = [];
const wrongCase = [];
for (const [url, where] of references) {
  if (onDisk.has(url)) continue;
  const actual = byLowerCase.get(url.toLowerCase());
  (actual ? wrongCase : missing).push({ url, actual, where: [...where].sort() });
}

const print = (problems, heading, detail) => {
  if (!problems.length) return;
  console.log(`\n${heading} (${problems.length})`);
  for (const problem of problems.sort((a, b) => a.url.localeCompare(b.url))) {
    console.log(`  ${problem.url}${detail ? detail(problem) : ''}`);
    for (const where of problem.where) console.log(`      used by ${where}`);
  }
};

print(missing, 'Missing from public/');
print(wrongCase, 'Wrong letter case: works on Windows/macOS, 404 on Linux hosting', (p) =>
  `  (on disk: ${p.actual})`,
);

const problems = missing.length + wrongCase.length;
if (problems) {
  console.log(`\ncheck:media failed: ${problems} of ${references.size} media paths do not resolve.`);
  process.exit(1);
}

console.log(`check:media passed: all ${references.size} media paths resolve to files in public/.`);
