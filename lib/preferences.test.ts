import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readChoice, storeChoice, readMotionPaused, storeMotionPaused, isChoice, MOTION_KEY } from './preferences.ts';

const memory = () => {
  const data = new Map<string, string>();
  return { data, getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } };
};
const blocked = { getItem(): string | null { throw new Error('blocked'); }, setItem(): void { throw new Error('blocked'); } };

test('the last choice is stored and read back, anything else is ignored', () => {
  const storage = memory();
  assert.equal(readChoice(storage), null);
  storeChoice(storage, 'imersivo');
  assert.equal(readChoice(storage), 'imersivo');
  storage.data.set('portfolio-choice', 'unknown');
  assert.equal(readChoice(storage), null);
  assert.equal(isChoice('editorial'), true);
  assert.equal(isChoice('other'), false);
});

test('blocked or missing storage never throws and yields the neutral value', () => {
  assert.equal(readChoice(blocked), null);
  assert.doesNotThrow(() => storeChoice(blocked, 'editorial'));
  assert.equal(readChoice(null), null);
  assert.doesNotThrow(() => storeChoice(null, 'editorial'));
  assert.equal(readMotionPaused(blocked), false);
  assert.equal(readMotionPaused(null), false);
  assert.doesNotThrow(() => storeMotionPaused(blocked, true));
});

test('the motion preference is remembered under a key the head script can reuse', () => {
  const storage = memory();
  assert.equal(readMotionPaused(storage), false);
  storeMotionPaused(storage, true);
  assert.equal(storage.data.get(MOTION_KEY), 'paused');
  assert.equal(readMotionPaused(storage), true);
  storeMotionPaused(storage, false);
  assert.equal(readMotionPaused(storage), false);
});
