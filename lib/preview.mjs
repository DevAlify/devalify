import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.woff2': 'font/woff2' };
createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  if (!pathname.startsWith('/devalify/')) { response.writeHead(404); response.end(); return; }
  const file = resolve(root, `.${pathname.slice('/devalify'.length)}${pathname.endsWith('/') ? 'index.html' : ''}`);
  if (!file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
  try { response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' }); response.end(await readFile(file)); }
  catch { response.writeHead(404); response.end(); }
}).listen(4173, '127.0.0.1', () => console.log('Preview http://127.0.0.1:4173/devalify/'));
