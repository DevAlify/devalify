export type Language = 'pt' | 'en';
type StorageReader = Pick<Storage, 'getItem'>;
type StorageWriter = Pick<Storage, 'setItem'>;

export function resolveLanguage(saved: string | null, browser: string): Language {
  if (saved === 'pt' || saved === 'en') return saved;
  return browser.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function readLanguage(storage: StorageReader, browser: string): Language {
  try { return resolveLanguage(storage.getItem('portfolio-language'), browser); }
  catch { return resolveLanguage(null, browser); }
}

export function storeLanguage(storage: StorageWriter, language: Language): void {
  try { storage.setItem('portfolio-language', language); } catch { /* Browser storage can be disabled. */ }
}

export function formatCount(value: number, language: Language, options: { prefix?: string; suffix?: string; grouped?: boolean } = {}): string {
  const number = new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 0, useGrouping: options.grouped ?? false }).format(value);
  return `${options.prefix ?? ''}${number}${options.suffix ?? ''}`;
}
