'use client';

import { useEffect } from 'react';
import { setupAmbient } from '../lib/motion/ambient';
import { setupCorridor } from '../lib/motion/corridor';
import { setupPointer } from '../lib/motion/pointer';
import { setupReveals } from '../lib/motion/reveals';
import { counterText, elements, gsap, makeOnce, ScrollTrigger, type Cleanup } from '../lib/motion/shared';

export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const media = gsap.matchMedia();
    media.add({ reduced: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 900px)', mobile: '(max-width: 899px)', pointer: '(hover: hover) and (pointer: fine)' }, context => {
      const conditions = context.conditions;
      if (!conditions) return;
      const cleanups: Cleanup[] = [];
      const root = document.documentElement;
      const finishCounters = () => elements('[data-count]').forEach(element => { element.textContent = counterText(element, Number(element.dataset.count)); });
      if (conditions.reduced) {
        root.classList.remove('anim');
        finishCounters();
        elements('.pl').forEach(plane => { plane.inert = false; });
        return;
      }
      root.classList.add('anim');
      const mobile = Boolean(conditions.mobile);
      setupReveals(makeOnce(mobile, context, cleanups), mobile, cleanups);
      setupAmbient(mobile, cleanups);
      if (conditions.desktop) cleanups.push(setupCorridor());
      if (conditions.pointer) cleanups.push(setupPointer());
      let heroStarted = false;
      const hero = () => {
        if (heroStarted) return;
        heroStarted = true;
        context.add(() => {
          gsap.fromTo('#h1', { opacity: 0, yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 1.2, ease: 'expo.out' });
          gsap.to('.hero .rv', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .14, delay: .2 });
        });
        document.querySelector('#h1')?.classList.add('jit');
      };
      window.addEventListener('portfolio:boot-complete', hero);
      const timer = setTimeout(hero, 2300);
      const language = new MutationObserver(finishCounters);
      language.observe(root, { attributes: true, attributeFilter: ['lang'] });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      return () => {
        clearTimeout(timer);
        language.disconnect();
        window.removeEventListener('load', refresh);
        window.removeEventListener('portfolio:boot-complete', hero);
        cleanups.reverse().forEach(cleanup => cleanup());
        root.classList.remove('anim');
        document.querySelector('#h1')?.classList.remove('jit');
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
