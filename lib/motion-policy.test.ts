import { test } from 'node:test';
import assert from 'node:assert/strict';
import { motionPolicy } from './motion-policy.ts';

test('mobile keeps reveals and counters, with smaller parallax and no horizontal pin', () => {
  assert.deepEqual(motionPolicy(375, false, false), {
    reduced: false, pinCases: false, count: true, parallax: 24, magnetic: false,
  });
  assert.equal(motionPolicy(900, false, true).pinCases, false);
});

test('desktop pins cases and only fine pointers get magnetic movement', () => {
  assert.equal(motionPolicy(901, false, true).pinCases, true);
  assert.equal(motionPolicy(1440, false, true).magnetic, true);
  assert.equal(motionPolicy(1440, false, false).magnetic, false);
  assert.equal(motionPolicy(1440, false, false).parallax, 70);
});

test('reduced motion keeps short fades but removes pin, count motion and parallax', () => {
  assert.deepEqual(motionPolicy(1440, true, true), {
    reduced: true, pinCases: false, count: false, parallax: 0, magnetic: false,
  });
});
