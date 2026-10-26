import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const target = await fetch('http://127.0.0.1:9333/json/new?http://127.0.0.1:4173/devalify/', { method: 'PUT' }).then(response => response.json());
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
await send('Runtime.enable'); await send('Network.enable'); await send('Page.enable');
console.log('CDP ready');
await fs.mkdir('lib/.qa', { recursive: true });
for (const width of [375, 1440]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 960, deviceScaleFactor: 1, mobile: width === 375 });
  await send('Page.navigate', { url: 'http://127.0.0.1:4173/devalify/' });
  await wait(3400);
  const geometry = await evaluate(`({viewport:innerWidth,scroll:document.documentElement.scrollWidth,webgl:document.querySelector('.portrait-effect').dataset.webgl,photo:document.querySelector('.portrait-effect img').complete,language:document.documentElement.lang,preloader:!!document.querySelector('#pre'),sections:document.querySelectorAll('main section').length,ph:document.querySelectorAll('#ph').length})`);
  console.log(width, geometry); assert(geometry.scroll <= width, `overflow ${width}`); assert.equal(geometry.ph, 1);
  if (process.env.CAPTURE !== '0') {
    const screenshot = await send('Page.captureScreenshot', { format: 'png' }); await fs.writeFile(`lib/.qa/hero-${width}.png`, Buffer.from(screenshot.data, 'base64'));
  }
  await evaluate(`document.querySelector('[data-language="en"]').click()`);
  assert.equal(await evaluate('document.documentElement.lang'), 'en');
  assert.match(await evaluate('document.title'), /AI and Software/);
  await evaluate(`document.querySelector('[data-language="pt"]').click()`);
  assert.equal(await evaluate('document.documentElement.lang'), 'pt-BR');
  await evaluate(`document.querySelector('[data-cd] button.fb').click()`);
  assert.equal(await evaluate(`document.querySelector('[data-cd] .fr').inert`), true);
  assert.equal(await evaluate(`document.querySelector('[data-cd] .bk').inert`), false);
  await evaluate(`document.querySelector('[data-cd] .bk button.fb').click()`);
  const opener = width === 375 ? 'tbtn2' : 'tbtn';
  await evaluate(`document.getElementById('${opener}').focus();document.getElementById('${opener}').click()`);
  assert.equal(await evaluate(`document.querySelector('#term').hidden`), false);
  await evaluate(`document.querySelector('#tin').value='cases';document.querySelector('#tin').form.requestSubmit()`);
  assert.match(await evaluate(`document.querySelector('#tout').textContent`), /198/);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  assert.equal(await evaluate(`document.querySelector('#term').hidden`), true);
  assert.equal(await evaluate(`document.activeElement.id`), opener);
  await evaluate(`document.querySelector('#cases').scrollIntoView()`); await wait(1300);
  if (process.env.CAPTURE !== '0') {
    const cases = await send('Page.captureScreenshot', { format: 'png' }); await fs.writeFile(`lib/.qa/cases-${width}.png`, Buffer.from(cases.data, 'base64'));
  }
  await evaluate('window.scrollTo(0,0)'); await wait(1000);
  const before = await evaluate(`document.querySelector('#tunnel').toDataURL()`); await wait(150);
  const after = await evaluate(`document.querySelector('#tunnel').toDataURL()`);
  assert.notEqual(before, after, `tunnel must animate at ${width}`);
}
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await wait(300);
assert.equal(await evaluate(`document.documentElement.classList.contains('anim')`), false);
assert.equal(await evaluate(`getComputedStyle(document.querySelector('.portrait-canvas')).display`), 'none');
assert.equal(await evaluate(`document.querySelector('#cor').classList.contains('flat')`), true);
console.log('Runtime/network errors:', errors); assert.deepEqual(errors, []);
socket.close();
console.log('Browser checks passed: mobile/desktop, locale, cards, terminal, animated tunnel, reduced motion.');
