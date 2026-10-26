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
await send('Network.setBlockedURLs', { urls: ['*.js'] });
await send('Page.navigate', { url }); await wait(1000);
assert.equal(await evaluate(`document.documentElement.classList.contains('anim')`), true, 'inline head script sets animation before hydration');
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hero .rv')).opacity`), '0', 'hero waits for hydration without flashing');
assert(await evaluate(`new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.name i')).transform).m42 > 0`), 'name starts below its mask');
assert(await evaluate(`parseFloat(getComputedStyle(document.querySelector('.mono-art .m1')).strokeDashoffset) > 0`), 'monogram stroke starts hidden');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url }); await wait(800);
assert.equal(await evaluate(`document.documentElement.classList.contains('anim')`), false, 'reduced motion never hides the hero before hydration');
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hero .rv')).opacity`), '1');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await send('Network.setBlockedURLs', { urls: [] });
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
  assert.equal(await evaluate(`new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.name i')).transform).m42`), 0, 'hero animation finishes outside the mask');
  await evaluate(`document.querySelector('[data-language="pt"]').click()`);
  assert.equal(await evaluate('document.documentElement.lang'), 'pt-BR');
  await evaluate(`document.querySelector('.profile').scrollIntoView({behavior:'instant'})`); await wait(1200); await capture(`b-photo-${width}`);
  await evaluate(`document.querySelector('#pilares').scrollIntoView({behavior:'instant'})`); await wait(1300); await capture(`b-pillars-${width}`);
  await evaluate(`document.querySelector('.cs').scrollIntoView({behavior:'instant'})`); await wait(1500); await capture(`b-cases-${width}`);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.cs h3')).opacity`), '1', 'first case heading visible');
  if (width > 900) assert.equal(await evaluate(`getComputedStyle(document.querySelectorAll('.cs h3')[1]).opacity`), '1', 'partially visible second case heading visible');
  await evaluate(`document.querySelector('#pilares .row:last-child').focus()`);
  const visited = [];
  for (let step = 0; step < 20 && visited.length < 5; step++) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await wait(200);
    const link = await evaluate(`(()=>{const el=document.activeElement;if(!el?.matches('.case-link'))return null;const r=el.getBoundingClientRect();return {href:el.getAttribute('href'),left:r.left,right:r.right,width:innerWidth}})()`);
    if (!link) continue;
    assert(link.left >= 0 && link.right <= link.width, `Tab keeps case ${visited.length + 1} visible: ${JSON.stringify(link)}`);
    visited.push(link.href);
  }
  assert.equal(new Set(visited).size, 5, 'real Tab visits all five case links');
  console.log(`Real Tab: 5/5 case links inside viewport at ${width}`);
  await wait(1200);
  if (width > 900) assert.equal(await evaluate(`getComputedStyle(document.querySelector('.cs:last-of-type h3')).opacity`), '1', 'focused case heading visible');
  await evaluate(`document.querySelector('#trajetoria').scrollIntoView({behavior:'instant'})`); await wait(1200);
  assert(await evaluate(`!!document.querySelector('.yr.on')`), 'timeline year activates');
  console.log(`PT/EN, keyboard cases and timeline passed at ${width}`);
}
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await wait(500);
assert.equal(await evaluate(`!!document.querySelector('.motion-horizontal')`), false);
assert.equal(await evaluate(`document.documentElement.classList.contains('anim')`), false);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.track')).flexDirection`), 'column');
await evaluate('window.scrollTo({top:0,behavior:"instant"})'); await wait(400);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.name i')).opacity`), '1');
assert.equal(await evaluate(`document.querySelector('[data-count="198"]').textContent`), '198');
console.log('Reduced motion: visible content, final counters, stacked cases.');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await send('Emulation.setScriptExecutionDisabled', { value: true });
await send('Page.navigate', { url }); await wait(1000);
assert.equal(await evaluate(`document.documentElement.classList.contains('anim')`), false);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.track')).flexDirection`), 'column');
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.name i')).opacity`), '1');
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.portrait-mask')).clipPath`), 'none');
console.log('No JavaScript: name, photo and all cases visible.');
console.log('Runtime/network errors:', errors); assert.deepEqual(errors, []);
socket.close();
console.log('Direction B browser checks passed.');
