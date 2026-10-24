import { mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const out = new URL('dist/', root);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const path of ['index.html', 'src', 'assets']) {
  await cp(new URL(path, root), new URL(path, out), { recursive: true });
}
process.stdout.write('Static site built at ' + fileURLToPath(out) + '\n');
