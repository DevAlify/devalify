import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMMANDS, TERMINAL_INTRO, runCommand } from './terminal-commands.ts';

test('help, clear and exit behave like the approved terminal', () => {
  assert.deepEqual(runCommand('help', 'pt'), { type: 'output', text: 'comandos: help, whoami, stack, cases, timeline, edu, contact, clear, exit. atalho: Alt+~' });
  assert.equal(runCommand('  HELP ', 'pt').type, 'output');
  assert.deepEqual(runCommand('clear', 'pt'), { type: 'clear' });
  assert.deepEqual(runCommand('exit', 'en'), { type: 'exit' });
  assert.deepEqual(runCommand('   ', 'pt'), { type: 'noop' });
});

test('unknown commands echo what was typed and point to help, in both languages', () => {
  assert.deepEqual(runCommand('Foo', 'pt'), { type: 'error', text: 'comando não encontrado: Foo. tente help.' });
  assert.deepEqual(runCommand('Foo', 'en'), { type: 'error', text: 'command not found: Foo. try help.' });
});

test('every documented command answers in Portuguese and English', () => {
  for (const name of COMMANDS) {
    for (const language of ['pt', 'en'] as const) {
      const result = runCommand(name, language);
      assert.notEqual(result.type, 'error', `${name} ${language}`);
    }
  }
  assert.match(TERMINAL_INTRO.pt, /help/);
  assert.match(TERMINAL_INTRO.en, /help/);
});

test('stack and contact carry the resume facts and the WhatsApp link', () => {
  for (const language of ['pt', 'en'] as const) {
    const stack = runCommand('stack', language);
    assert.match(stack.text ?? '', /LangGraph/);
    assert.match(stack.text ?? '', /A2A/);
    assert.match(runCommand('contact', language).text ?? '', /https:\/\/wa\.me\/5511973397668/);
  }
});

test('the cases command lists five cases and leaves the L3 support case out', () => {
  for (const language of ['pt', 'en'] as const) {
    const text = runCommand('cases', language).text ?? '';
    assert.equal(text.split('\n').filter(line => /^\d\)/.test(line)).length, 5);
    assert.doesNotMatch(text, /N3|L3|466|escape/);
    assert.match(text, /github\.com\/DevAlify\/engineering-cases/);
  }
});

test('no terminal answer carries forbidden content', () => {
  for (const name of COMMANDS) {
    for (const language of ['pt', 'en'] as const) {
      assert.doesNotMatch(runCommand(name, language).text ?? '', /krono|3,76|tribut/i, `${name} ${language}`);
    }
  }
});
