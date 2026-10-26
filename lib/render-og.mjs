import fs from 'node:fs/promises';

// Uses the same isolated Chrome and static preview as browser-check-b.mjs.
const url = 'http://127.0.0.1:4173/devalify/og-source.html';
const target = await fetch(`http://127.0.0.1:9333/json/new?${url}`, { method: 'PUT' }).then(response => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(String(event.data));
  if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  const timeout = setTimeout(() => reject(new Error(`CDP timeout: ${method}`)), 15000);
  pending.set(id, message => { clearTimeout(timeout); message.error ? reject(message.error) : resolve(message.result); });
  socket.send(JSON.stringify({ id, method, params }));
});
try {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  const ready = await send('Runtime.evaluate', { expression: "new Promise(resolve => { const done = async () => { await document.fonts.ready; resolve(document.fonts.check('800 100px Bricolage')); }; if(document.readyState === 'complete')done();else window.addEventListener('load',done,{once:true}); })", awaitPromise: true, returnByValue: true });
  if (!ready.result.value) throw new Error('Local Bricolage font did not load');
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  const png = Buffer.from(screenshot.data, 'base64');
  if (png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) throw new Error('Invalid OG dimensions');
  await fs.writeFile('public/og.png', png);
  console.log('OG rendered: public/og.png, 1200x630, local Bricolage.');
  await send('Page.close');
} finally {
  socket.close();
}
