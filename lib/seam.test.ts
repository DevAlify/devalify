import { test } from 'node:test';
import assert from 'node:assert/strict';
import { restPercent, seamXAt, sideAt, slantFor } from './seam.ts';

const close = (actual: number, expected: number) => assert(Math.abs(actual - expected) < 1e-9, `${actual} is not ${expected}`);

test('the hovered half grows to 63 percent and the other recedes to 37, rest is centered', () => {
  assert.equal(restPercent('imersivo'), 63);
  assert.equal(restPercent('editorial'), 37);
  assert.equal(restPercent(null), 50);
});

test('the seam is slanted: right of center at the top, left of center at the bottom', () => {
  const width = 1440, height = 900, k = slantFor(width);
  close(k, 48.96);
  close(seamXAt(width, height, 50, k, 0), 720 + k);
  close(seamXAt(width, height, 50, k, height), 720 - k);
  close(seamXAt(width, height, 50, k, height / 2), 720);
  close(seamXAt(width, height, 63, k, height / 2), 907.2);
});

test('the pointer side follows the seam, with hysteresis next to it', () => {
  assert.equal(sideAt(100, 720, null), 'imersivo');
  assert.equal(sideAt(900, 720, null), 'editorial');
  assert.equal(sideAt(730, 720, 'imersivo'), 'imersivo');
  assert.equal(sideAt(730, 720, 'editorial'), 'editorial');
  assert.equal(sideAt(760, 720, 'imersivo'), 'editorial');
  assert.equal(sideAt(700, 720, null), 'imersivo');
});
