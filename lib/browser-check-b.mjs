import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const url = 'http://127.0.0.1:4173/devalify/';
const target = await fetch(`http://127.0.0.1:9333/json/new?${url}`, { method: 'PUT' }).then(response => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(String(event.data));
  if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text);
  if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.push(`${message.params.response.status} ${message.params.response.url}`);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  const timeout = setTimeout(() => reject(new Error(`CDP timeout: ${method}`)), 15000);
  pending.set(id, message => { clearTimeout(timeout); message.error ? reject(message.error) : resolve(message.result); });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const wait = delay => new Promise(resolve => setTimeout(resolve, delay));
const capture = async name => {
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(`lib/.qa/${name}.png`, Buffer.from(screenshot.data, 'base64'));
};
await send('Runtime.enable'); await send('Network.enable'); await send('Page.enable');
await fs.mkdir('lib/.qa', { recursive: true });
for (const width of [375, 1440]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 900 });
  await send('Page.navigate', { url }); await wait(3000);
  const geometry = await evaluate(`({viewport:innerWidth,scroll:document.documentElement.scrollWidth,cases:document.querySelectorAll('.cs').length,photo:document.querySelector('.portrait-photo').complete,svg:document.querySelector('.mono-art .m1').style.strokeDashoffset,pin:!!document.querySelector('.motion-horizontal')})`);
  console.log(width, geometry);
  assert(geometry.scroll <= width, `overflow at ${width}`); assert.equal(geometry.cases, 5); assert(geometry.photo); assert.equal(geometry.pin, width > 900);
  await evaluate(`document.querySelector('[data-language="pt"]').click()`);
  await capture(`b-hero-${width}`);
  await evaluate(`document.querySelector('[data-language="en"]').click()`);
  assert.equal(await evaluate('document.documentElement.lang'), 'en');
  assert.match(await evaluate('document.title'), /AI and Software/);
  assert.equal(await evaluate(`document.querySelector('.name').textContent`), 'AlifyLopes');
  await evaluate(`document.querySelector('[data-language="pt"]').click()`);
  assert.equal(await evaluate('document.documentElement.lang'), 'pt-BR');
  await evaluate(`document.querySelector('.profile').scrollIntoView({behavior:'instant'})`); await wait(1200); await capture(`b-photo-${width}`);
  await evaluate(`document.querySelector('#pilares').scrollIntoView({behavior:'instant'})`); await wait(1300); await capture(`b-pillars-${width}`);
  await evaluate(`document.querySelector('.cs').scrollIntoView({behavior:'instant'})`); await wait(1500); await capture(`b-cases-${width}`);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.cs h3')).opacity`), '1', 'first case heading visible');
  if (width > 900) assert.equal(await evaluate(`getComputedStyle(document.querySelectorAll('.cs h3')[1]).opacity`), '1', 'partially visible second case heading visible');
  await evaluate(`document.querySelector('.cs:last-of-type .case-link').focus()`); await wait(1400);
  const link = await evaluate(`(()=>{const r=document.querySelector('.cs:last-of-type .case-link').getBoundingClientRect();return {left:r.left,right:r.right}})()`);
  assert(link.left >= 0 && link.right <= width, 'keyboard focus reveals final case');
  if (width > 900) assert.equal(await evaluate(`getComputedStyle(document.querySelector('.cs:last-of-type h3')).opacity`), '1', 'focused case heading visible');
  await evaluate(`document.querySelector('#trajetoria').scrollIntoView({behavior:'instant'})`); await wait(1200);
  assert(await evaluate(`!!document.querySelector('.yr.on')`), 'timeline year activates');
  console.log(`PT/EN, keyboard cases and timeline passed at ${width}`);
}
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await wait(500);
assert.equal(await evaluate(`!!document.querySelector('.motion-horizontal')`), false);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.track')).flexDirection`), 'column');
await evaluate('window.scrollTo({top:0,behavior:"instant"})'); await wait(400);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.name i')).opacity`), '1');
assert.equal(await evaluate(`document.querySelector('[data-count="198"]').textContent`), '198');
console.log('Reduced motion: visible content, final counters, stacked cases.');
await send('Emulation.setScriptExecutionDisabled', { value: true });
await send('Page.navigate', { url }); await wait(1000);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.track')).flexDirection`), 'column');
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.name i')).opacity`), '1');
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.portrait-mask')).clipPath`), 'none');
console.log('No JavaScript: name, photo and all cases visible.');
console.log('Runtime/network errors:', errors); assert.deepEqual(errors, []);
socket.close();
console.log('Direction B browser checks passed.');
