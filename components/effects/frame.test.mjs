import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frameDue, motionAllowed } from './frame.ts';

test('animation pauses for reduced motion, hidden documents and offscreen surfaces', () => {
  assert.equal(motionAllowed(false, true, true), true);
  assert.equal(motionAllowed(true, true, true), false);
  assert.equal(motionAllowed(false, false, true), false);
  assert.equal(motionAllowed(false, true, false), false);
});
test('mobile drawing is limited to thirty frames per second', () => {
  assert.equal(frameDue(20, 0, true), false);
  assert.equal(frameDue(34, 0, true), true);
  assert.equal(frameDue(20, 0, false), true);
});
