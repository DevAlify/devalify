/** A text in both languages. The server renders Portuguese; English rides on data-en and is swapped in by useLanguage. */
export type Bi = { pt: string; en: string };

export const bi = (pt: string, en: string): Bi => ({ pt, en });

/** Same text in both languages (names, numbers). */
export const same = (text: string): Bi => ({ pt: text, en: text });

/** Spread on an element whose children are the Portuguese text. Texts equal in both languages need no attribute. */
export const tx = (text: Bi) => (text.pt === text.en ? {} : { 'data-en': text.en });
