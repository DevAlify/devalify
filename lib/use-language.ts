'use client';

import { useEffect, useState } from 'react';
import { formatCount, readLanguage, resolveLanguage, storeLanguage, type Language } from './locale';
import { EDITORIAL_TEXTS, type PageTexts } from './page-texts';

/** Attributes translated through a data-en-* companion, next to the data-en element content. */
const ATTRIBUTES = { 'aria-label': 'data-en-label', alt: 'data-en-alt', placeholder: 'data-en-placeholder' } as const;
const OG_IMAGE_ALT = { pt: 'AL Alify Lopes, engenheiro de IA e software', en: 'AL Alify Lopes, AI and Software Engineer' };

/** Swaps the page language. Without argument it serves the Editorial route, whose title and descriptions are the defaults. */
export function useLanguage(texts: PageTexts = EDITORIAL_TEXTS): Language {
  const [language, setLanguage] = useState<Language>('pt');
  useEffect(() => {
    const originals = new Map<Element, string>();
    const attributes = new Map<Element, Map<string, string>>();
    document.querySelectorAll<HTMLElement>('[data-en]').forEach(el => {
      originals.set(el, el.innerHTML);
      el.dataset.pt ??= el.innerHTML; // the Portuguese text stays readable for scripts that animate text
    });
    for (const [attribute, companion] of Object.entries(ATTRIBUTES)) {
      document.querySelectorAll<HTMLElement>(`[${companion}]`).forEach(el => {
        const values = attributes.get(el) ?? new Map<string, string>();
        values.set(attribute, el.getAttribute(attribute) ?? ''); attributes.set(el, values);
      });
    }
    // Untouched content keeps its DOM, so splits and tweens survive a re-apply of the same language.
    const swapContent = (el: Element, html: string) => { if (el.innerHTML !== html) el.innerHTML = html; };
    const apply = (next: Language) => {
      // Lets split text put itself back before its content is swapped.
      window.dispatchEvent(new Event('portfolio:language-will-change'));
      document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en';
      originals.forEach((pt, el) => swapContent(el, next === 'en' ? el.getAttribute('data-en') ?? pt : pt));
      attributes.forEach((values, el) => values.forEach((pt, attr) => {
        const companion = ATTRIBUTES[attr as keyof typeof ATTRIBUTES];
        el.setAttribute(attr, next === 'en' ? el.getAttribute(companion) ?? pt : pt);
      }));
      document.querySelectorAll<HTMLElement>('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === next)));
      document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
        el.textContent = formatCount(Number(el.dataset.count), next, { prefix: el.dataset.prefix, suffix: el.dataset.suffix, grouped: !!el.dataset.fmt });
      });
      document.querySelectorAll<HTMLElement>('.chip').forEach(el => {
        const tip = el.getAttribute(next === 'pt' ? 'data-tip' : 'data-en-tip');
        el.title = tip ? `${el.textContent}: ${tip}` : el.textContent ?? '';
      });
      const meta = texts[next]; document.title = meta.title;
      for (const [selector, content] of [
        ['meta[name="description"]', meta.description], ['meta[property="og:title"]', meta.title],
        ['meta[property="og:description"]', meta.og], ['meta[property="og:locale"]', next === 'pt' ? 'pt_BR' : 'en_US'],
        ['meta[property="og:image:alt"]', OG_IMAGE_ALT[next]],
      ]) document.querySelector(selector)?.setAttribute('content', content);
      setLanguage(next); window.dispatchEvent(new Event('portfolio:language-change'));
    };
    let initial: Language;
    try { initial = readLanguage(localStorage, navigator.language); }
    catch { initial = resolveLanguage(null, navigator.language); }
    apply(initial);
    const toggle = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-language]') : null;
      if (!target) return;
      const next = target.dataset.language === 'en' ? 'en' : 'pt'; apply(next);
      try { storeLanguage(localStorage, next); } catch { /* Storage may be unavailable. */ }
    };
    document.addEventListener('click', toggle);
    return () => {
      document.removeEventListener('click', toggle);
      originals.forEach((pt, el) => swapContent(el, pt));
    };
  }, [texts]);
  return language;
}
