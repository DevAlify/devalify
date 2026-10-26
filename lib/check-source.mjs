import { readdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Dependency-free source policy checks; type safety is checked by typecheck.
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) { await check(path); continue; }
    if (!/\.(tsx?|css)$/.test(path)) continue;
    const source = await readFile(path, 'utf8');
    assert(!/next\/font\/google|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(source), `Remote runtime dependency: ${path}`);
    assert(!/\b(?:as|:)\s+any\b/.test(source), `Unbounded any: ${path}`);
    assert(!source.includes('\u2014'), `Long dash: ${path}`);
    assert(!/\balert\s*\(/.test(source), `Blocking alert: ${path}`);
  }
}
for (const directory of ['app', 'components', 'lib', 'styles']) await check(directory);
console.log('Source policy checks passed.');
