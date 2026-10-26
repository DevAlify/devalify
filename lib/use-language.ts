'use client';

import { useEffect, useState } from 'react';
import { formatCount, readLanguage, resolveLanguage, storeLanguage, type Language } from './locale';

const metadata = {
  pt: { title: 'Alify Lopes | Engenheiro de IA e software', description: 'Alify Lopes, engenheiro de IA e software em São Paulo. Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.', og: 'Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.' },
  en: { title: 'Alify Lopes | AI and Software Engineer', description: 'Alify Lopes, AI and software engineer in São Paulo, Brazil. Agents with LLMs, RAG and MCP, backend and tested interfaces, with a production background.', og: 'Agents with LLMs, RAG and MCP, backend and tested interfaces, with a production background.' },
};

export function useLanguage(): Language {
  const [language, setLanguage] = useState<Language>('pt');
  useEffect(() => {
    const originals = new Map<Element, string>();
    const attributes = new Map<Element, Map<string, string>>();
    document.querySelectorAll<HTMLElement>('[data-en]').forEach(el => originals.set(el, el.innerHTML));
    for (const attribute of ['aria-label', 'alt']) {
      const key = attribute === 'alt' ? 'data-en-alt' : 'data-en-label';
      document.querySelectorAll<HTMLElement>(`[${key}]`).forEach(el => {
        const values = attributes.get(el) ?? new Map<string, string>();
        values.set(attribute, el.getAttribute(attribute) ?? ''); attributes.set(el, values);
      });
    }
    const apply = (next: Language) => {
      document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en';
      originals.forEach((pt, el) => { el.innerHTML = next === 'en' ? el.getAttribute('data-en') ?? pt : pt; });
      attributes.forEach((values, el) => values.forEach((pt, attr) => el.setAttribute(attr, next === 'en' ? el.getAttribute(attr === 'alt' ? 'data-en-alt' : 'data-en-label') ?? pt : pt)));
      document.querySelectorAll<HTMLElement>('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === next)));
      document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
        el.textContent = formatCount(Number(el.dataset.count), next, { prefix: el.dataset.prefix, suffix: el.dataset.suffix, grouped: !!el.dataset.fmt });
      });
      document.querySelectorAll<HTMLElement>('.chip').forEach(el => {
        const tip = el.getAttribute(next === 'pt' ? 'data-tip' : 'data-en-tip');
        el.title = tip ? `${el.textContent}: ${tip}` : el.textContent ?? '';
      });
      const meta = metadata[next]; document.title = meta.title;
      for (const [selector, content] of [
        ['meta[name="description"]', meta.description], ['meta[property="og:title"]', meta.title],
        ['meta[property="og:description"]', meta.og], ['meta[property="og:locale"]', next === 'pt' ? 'pt_BR' : 'en_US'],
        ['meta[property="og:image:alt"]', next === 'pt' ? 'AL Alify Lopes, engenheiro de IA e software' : 'AL Alify Lopes, AI and Software Engineer'],
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
    return () => document.removeEventListener('click', toggle);
  }, []);
  return language;
}
