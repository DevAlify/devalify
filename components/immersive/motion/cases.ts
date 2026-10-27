import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { all, must } from '../../motion/dom';
import { decode, releaseText, rememberFinal } from '../../motion/scramble';

/** Fade up the content of a row that just opened, with a scan line sweeping down the panel. */
function openEffects(item: HTMLElement) {
  const panel = must<HTMLElement>('.case-panel', item);
  gsap.fromTo(all('.fx', panel), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.09, delay: 0.1, overwrite: true });
  gsap.fromTo(all('.fig,.bl li', panel), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out', stagger: { each: 0.035, from: 'start' }, delay: 0.18, overwrite: true });
  gsap.fromTo(must('.sweep', panel), { y: 0, opacity: 1 }, { y: panel.offsetHeight, opacity: 0, duration: 1.1, ease: 'power2.inOut', overwrite: true });
}

/** Cases as an accordion: one row open at a time. `anim` adds the entrance effects and the hover decode. */
export function setupCases({ anim, reduced }: { anim: boolean; reduced: boolean }): () => void {
  const abort = new AbortController();
  const { signal } = abort;
  const items = all<HTMLElement>('[data-case]');
  const setOpen = (item: HTMLElement, open: boolean) => {
    item.classList.toggle('is-open', open);
    must('.case-btn', item).setAttribute('aria-expanded', String(open));
  };
  items.forEach(item => {
    const button = must('.case-btn', item);
    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      items.forEach(other => { if (other !== item && other.classList.contains('is-open')) setOpen(other, false); });
      setOpen(item, willOpen);
      if (willOpen && anim) openEffects(item);
      window.setTimeout(() => ScrollTrigger.refresh(), reduced ? 60 : 820);
    }, { signal });
    if (anim) {
      const title = must<HTMLElement>('.c-title', item);
      rememberFinal(title);
      button.addEventListener('pointerenter', () => { if (!item.classList.contains('is-open')) decode(title, { duration: 0.55, reveal: 0.08, speed: 0.9 }); }, { signal });
    }
  });
  // The hover decode reveals the translated title after a language change.
  if (anim) {
    const titles = items.map(item => must<HTMLElement>('.c-title', item));
    window.addEventListener('portfolio:language-will-change', () => releaseText(titles), { signal });
    window.addEventListener('portfolio:language-change', () => titles.forEach(rememberFinal), { signal });
  }
  return () => abort.abort();
}
