export type Choice = 'imersivo' | 'editorial';
type Reader = Pick<Storage, 'getItem'> | null;
type Writer = Pick<Storage, 'setItem'> | null;

const CHOICE_KEY = 'portfolio-choice';
export const MOTION_KEY = 'portfolio-motion';

export function safeStorage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

export function isChoice(value: unknown): value is Choice {
  return value === 'imersivo' || value === 'editorial';
}

function read(storage: Reader, key: string): string | null {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}

function write(storage: Writer, key: string, value: string): void {
  try { storage?.setItem(key, value); } catch { /* Browser storage can be disabled. */ }
}

export function readChoice(storage: Reader): Choice | null {
  const value = read(storage, CHOICE_KEY);
  return isChoice(value) ? value : null;
}

export function storeChoice(storage: Writer, choice: Choice): void {
  write(storage, CHOICE_KEY, choice);
}

export function readMotionPaused(storage: Reader): boolean {
  return read(storage, MOTION_KEY) === 'paused';
}

export function storeMotionPaused(storage: Writer, paused: boolean): void {
  write(storage, MOTION_KEY, paused ? 'paused' : 'on');
}
