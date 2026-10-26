import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runCommand } from './terminal.ts';

test('terminal resolves supported commands and normalizes whitespace and case', () => {
  assert.match(runCommand(' CASES ', 'pt').text, /198 testes/);
  assert.match(runCommand('contact', 'en').text, /5511973397668/);
});
test('terminal treats user input as plain text and returns explicit actions', () => {
  assert.deepEqual(runCommand('clear', 'pt'), { action: 'clear', text: '' });
  assert.deepEqual(runCommand('exit', 'en'), { action: 'exit', text: '' });
  assert.match(runCommand('<script>', 'pt').text, /comando não encontrado/);
});
