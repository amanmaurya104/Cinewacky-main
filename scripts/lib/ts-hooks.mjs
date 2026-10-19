// Node module hooks that let a plain script import the app's TypeScript files.
//
// Registered by scripts that need the real content (see check-media.mjs):
//   - `@/x` resolves from the project root, as tsconfig's `paths` does;
//   - extensionless specifiers find their .ts / .tsx / index file;
//   - .ts and .tsx are compiled with the project's own TypeScript, which drops
//     type-only imports the way Next does. Node's built-in type stripping
//     cannot: data/projects.ts imports the `Project` interface without
//     `import type`, which strip-only mode leaves in as a real import.

import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = new URL('../../', import.meta.url);
const SUFFIXES = ['.ts', '.tsx', '/index.ts', '/index.tsx'];

const isFile = (url) => {
  const file = fileURLToPath(url);
  return existsSync(file) && statSync(file).isFile();
};

/** The source file a specifier means, or null to let Node decide. */
function findSource(base) {
  if (isFile(base)) return base.href;
  for (const suffix of SUFFIXES) {
    const candidate = new URL(base.href + suffix);
    if (isFile(candidate)) return candidate.href;
  }
  return null;
}

const isTypeScript = (url) => /\.tsx?$/.test(new URL(url).pathname);

export async function resolve(specifier, context, nextResolve) {
  let base = null;
  if (specifier.startsWith('@/')) {
    base = new URL(specifier.slice(2), ROOT);
  } else if (/^\.{1,2}\//.test(specifier) && context.parentURL && isTypeScript(context.parentURL)) {
    base = new URL(specifier, context.parentURL);
  }

  const url = base && findSource(base);
  if (url) return { url, shortCircuit: true };
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (!url.startsWith('file:') || !isTypeScript(url)) return nextLoad(url, context);

  const fileName = fileURLToPath(url);
  const { outputText } = ts.transpileModule(await readFile(fileName, 'utf8'), {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });

  return { format: 'module', source: outputText, shortCircuit: true };
}
