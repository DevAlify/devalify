import { test } from 'node:test';
import assert from 'node:assert/strict';
import { headScript } from './head-script.ts';
import { MOTION_KEY } from './preferences.ts';

type Scenario = { reduced?: boolean; search?: string; stored?: string | null; mediaThrows?: boolean; storageThrows?: boolean };

function run(script: string, { reduced = false, search = '', stored = null, mediaThrows = false, storageThrows = false }: Scenario = {}) {
  const classes = new Set<string>();
  const documentElement = { classList: { add: (name: string) => classes.add(name), contains: (name: string) => classes.has(name) } };
  const matchMedia = () => { if (mediaThrows) throw new Error('no matchMedia'); return { matches: reduced }; };
  const localStorage = { getItem: (key: string) => { if (storageThrows) throw new Error('blocked'); return key === MOTION_KEY ? stored : null; } };
  new Function('document', 'matchMedia', 'location', 'localStorage', script)({ documentElement }, matchMedia, { search }, localStorage);
  return classes;
}

test('animation is on by default and off with reduced motion, so CSS can hide entrance states before hydration', () => {
  const script = headScript();
  assert.deepEqual([...run(script)], ['js', 'anim']);
  assert.deepEqual([...run(script, { reduced: true })], ['js', 'reduced']);
  assert.deepEqual([...run(script, { mediaThrows: true })], ['js', 'anim']);
});

test('the paused-motion preference is applied before first paint, and a blocked storage is harmless', () => {
  const script = headScript({ motionPref: true });
  assert(run(script, { stored: 'paused' }).has('motion-paused'));
  assert(!run(script, { stored: 'on' }).has('motion-paused'));
  assert(!run(script, { storageThrows: true }).has('motion-paused'));
  assert(!run(headScript(), { stored: 'paused' }).has('motion-paused'));
});

test('the arrival iris only exists when coming from the selection page and motion is allowed', () => {
  const script = headScript({ arrive: true });
  assert(run(script, { search: '?from=selecao' }).has('arrive'));
  assert(run(script, { search: '?x=1&from=selecao' }).has('arrive'));
  assert(!run(script, { search: '' }).has('arrive'));
  assert(!run(script, { search: '?from=selecao', reduced: true }).has('arrive'));
  assert(!run(headScript(), { search: '?from=selecao' }).has('arrive'));
});
