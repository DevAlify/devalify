import { mkdir, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const out = new URL('dist/', root);
await rm(out, { recursive: true, force: true });
await mkdir(new URL('src/', out), { recursive: true });
for (const file of ['index.html', 'src/portfolio.css', 'src/portfolio.js', 'src/portfolio-icon.svg']) {
  await copyFile(new URL(file, root), new URL(file, out));
}
process.stdout.write('Static site built at ' + fileURLToPath(out) + '\n');
