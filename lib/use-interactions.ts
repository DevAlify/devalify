'use client';

import { useEffect } from 'react';
import type { Language } from './locale';

export function useInteractions(language: Language): void {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, listener: (event: HTMLElementEventMap[K]) => void) => {
      el.addEventListener(type, listener); cleanups.push(() => el.removeEventListener(type, listener));
    };
    document.querySelectorAll<HTMLElement>('[data-cd]').forEach(card => {
      const front = card.querySelector<HTMLElement>('.fr'), back = card.querySelector<HTMLElement>('.bk');
      if (!front || !back) return;
      card.querySelectorAll<HTMLButtonElement>('button.fb').forEach(button => on(button, 'click', () => {
        const flipped = !card.classList.contains('back'); card.classList.toggle('back', flipped);
        front.inert = flipped; back.inert = !flipped;
        (flipped ? back : front).querySelector<HTMLButtonElement>('button.fb')?.focus({ preventScroll: true });
      }));
    });
    const panes = Array.from(document.querySelectorAll<HTMLElement>('.pane'));
    let active = panes.find(pane => pane.classList.contains('open')) ?? panes[0];
    const mobile = matchMedia('(max-width: 899px)');
    const synchronize = () => panes.forEach(el => {
      const expanded = mobile.matches || active === el;
      el.classList.toggle('open', active === el);
      el.querySelector('h3 button')?.setAttribute('aria-expanded', String(expanded));
      const panel = el.querySelector<HTMLElement>('.det');
      if (panel) panel.inert = !expanded;
    });
    const open = (pane: HTMLElement) => { active = pane; synchronize(); };
    synchronize(); mobile.addEventListener('change', synchronize);
    cleanups.push(() => mobile.removeEventListener('change', synchronize));
    panes.forEach(pane => {
      const button = pane.querySelector<HTMLButtonElement>('h3 button');
      if (button) on(button, 'click', () => open(pane));
      on(pane, 'pointerenter', () => { if (matchMedia('(hover: hover) and (min-width: 901px)').matches) open(pane); });
    });
    const tip = document.getElementById('tip');
    const hide = () => { tip?.classList.remove('on'); };
    if (tip) document.querySelectorAll<HTMLElement>('.chip[data-tip]').forEach(chip => {
      const show = () => {
        tip.textContent = chip.getAttribute(language === 'pt' ? 'data-tip' : 'data-en-tip');
        const rect = chip.getBoundingClientRect(); tip.classList.add('on');
        tip.style.left = `${Math.max(8, Math.min(innerWidth - tip.offsetWidth - 8, rect.left + rect.width / 2 - tip.offsetWidth / 2))}px`;
        tip.style.top = `${rect.top - tip.offsetHeight - 10 < 8 ? rect.bottom + 10 : rect.top - tip.offsetHeight - 10}px`;
        chip.setAttribute('aria-describedby', 'tip');
      };
      on(chip, 'pointerenter', show); on(chip, 'focus', show);
      on(chip, 'pointerleave', hide); on(chip, 'blur', hide);
    });
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') hide(); };
    window.addEventListener('keydown', escape); window.addEventListener('scroll', hide, { passive: true });
    return () => { cleanups.forEach(cleanup => cleanup()); hide(); window.removeEventListener('keydown', escape); window.removeEventListener('scroll', hide); };
  }, [language]);
}
