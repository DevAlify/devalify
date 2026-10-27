import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rgbSplitSupported } from './feature-support.ts';

test('the RGB split needs SVG filters on HTML and blend modes, tested by feature, not by user agent', () => {
  const all = () => true;
  const noBlend = (property: string) => property !== 'mix-blend-mode';
  const noFilterUrl = (property: string, value: string) => !(property === 'filter' && value.startsWith('url('));
  assert.equal(rgbSplitSupported(all), true);
  assert.equal(rgbSplitSupported(noBlend), false);
  assert.equal(rgbSplitSupported(noFilterUrl), false);
  assert.equal(rgbSplitSupported(undefined), false);
});

test('a throwing support check counts as unsupported', () => {
  assert.equal(rgbSplitSupported(() => { throw new Error('boom'); }), false);
});
