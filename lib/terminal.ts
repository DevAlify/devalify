import { terminalContent } from './terminal-content.ts';
import type { Language } from './locale.ts';

const commands = ['help', 'whoami', 'stack', 'cases', 'timeline', 'edu', 'contact'] as const;
type CommandResult = { action: 'print' | 'clear' | 'exit' | 'empty'; text: string };

export function runCommand(input: string, language: Language): CommandResult {
  const command = input.trim().toLowerCase();
  if (!command) return { action: 'empty', text: '' };
  if (command === 'clear' || command === 'exit') return { action: command, text: '' };
  const known = commands.find(item => item === command);
  return { action: 'print', text: known ? terminalContent[language][known] : terminalContent[language].nf(command) };
}
