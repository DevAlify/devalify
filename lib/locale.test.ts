import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguage, formatCount, readLanguage, storeLanguage } from './locale.ts';

test('saved language wins, invalid saved language falls back to browser', () => {
  assert.equal(resolveLanguage('en', 'pt-BR'), 'en');
  assert.equal(resolveLanguage('invalid', 'pt-PT'), 'pt');
  assert.equal(resolveLanguage(null, 'fr-FR'), 'en');
});
test('blocked storage still selects browser language and does not break toggle', () => {
  const storage = { getItem(): string | null { throw new Error('blocked'); }, setItem(): void { throw new Error('blocked'); } };
  assert.equal(readLanguage(storage, 'pt-BR'), 'pt');
  assert.doesNotThrow(() => storeLanguage(storage, 'en'));
});
test('counts preserve prefixes and suffixes with locale-specific separators', () => {
  assert.equal(formatCount(2240, 'pt', { prefix: '~', grouped: true }), '~2.240');
  assert.equal(formatCount(2240, 'en', { prefix: '~', grouped: true }), '~2,240');
  assert.equal(formatCount(430, 'pt', { suffix: '+' }), '430+');
});
