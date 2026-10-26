import assert from 'node:assert/strict';
import test from 'node:test';
import { corridorPlane } from './corridor-math.ts';

test('corridor keeps only the current visible plane interactive', () => {
  assert.equal(corridorPlane(0, 0, 1440).interactive, true);
  assert.equal(corridorPlane(1, 0, 1440).interactive, false);
  assert.equal(corridorPlane(0, 1, 1440).opacity, 0);
  assert.equal(corridorPlane(1, 1, 1440).front, true);
  assert.equal(corridorPlane(0, 0, 375).x, -75);
});
