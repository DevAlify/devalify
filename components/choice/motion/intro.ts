import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { all } from '../../motion/dom';
import { decodeTween, rememberFinal } from '../../motion/scramble';
import type { ChoiceEls } from './elements';
import type { Stage } from './stage';

/**
 * Entrance. The Immersive title decodes, the Editorial title rises letter by letter with a variable weight,
 * the monogram draws itself and the seam grows from the center. Everything starts hidden by CSS, so nothing flashes.
 */
export function playIntro(els: ChoiceEls, stage: Stage): () => void {
  const { copy, titles, mono, seamLine, hint, stage: root } = els;
  rememberFinal(titles.imersivo);
  const abort = new AbortController();
  const context = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    gsap.set([copy.imersivo, copy.editorial], { opacity: 0 });
    tl.set(titles.imersivo, { opacity: 1 }, 0.15)
      .to(copy.imersivo, { opacity: 1, duration: 0.9 }, 0.1)
      .add(decodeTween(titles.imersivo, { duration: 1.2, reveal: 0.2, speed: 0.75 }), 0.15);

    const split = SplitText.create(titles.editorial, { type: 'chars', charsClass: 'ch' });
    gsap.set(titles.editorial, { opacity: 1 });
    tl.to(copy.editorial, { opacity: 1, duration: 0.9 }, 0.25)
      .fromTo(split.chars, { yPercent: 110, opacity: 0, fontVariationSettings: '"wght" 300' }, { yPercent: 0, opacity: 1, fontVariationSettings: '"wght" 800', duration: 1.1, stagger: 0.05 }, 0.25);
    // Weight wave, every few seconds and whenever the Editorial half is chosen.
    const wave = gsap.timeline({ paused: true }).to(split.chars, { fontVariationSettings: '"wght" 430', duration: 0.42, stagger: 0.07, ease: 'sine.inOut', yoyo: true, repeat: 1 });
    stage.setWave(wave);
    tl.add(() => { wave.play(0); }, 2.4);
    const idleWave = () => {
      if (!stage.state.leaving && !stage.state.active) wave.restart();
      gsap.delayedCall(7 + Math.random() * 3, idleWave);
    };
    gsap.delayedCall(6, idleWave);

    tl.fromTo(all('.d,.rule,.go', root), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.05 }, 0.6)
      .fromTo(all('.rule', root), { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.7)
      .fromTo(all('.m1', mono), { drawSVG: '0%', opacity: 1 }, { drawSVG: '100%', opacity: 1, duration: 1.5, ease: 'power2.inOut', stagger: 0.35 }, 0.3)
      .fromTo(all('.m2', mono), { opacity: 0, x: -14, y: -14 }, { opacity: 0.45, x: 0, y: 0, duration: 1.4 }, 1.6)
      .fromTo(seamLine, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1.3, ease: 'power2.out' }, 0);
    gsap.fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.4 });

    // Monogram parallax with the pointer (not on touch screens).
    if (!window.matchMedia('(pointer: coarse)').matches) {
      const moveX = gsap.quickTo(mono, 'x', { duration: 1, ease: 'power3' });
      const moveY = gsap.quickTo(mono, 'y', { duration: 1, ease: 'power3' });
      window.addEventListener('pointermove', event => {
        moveX((event.clientX / window.innerWidth - 0.5) * -26);
        moveY((event.clientY / window.innerHeight - 0.5) * -18);
      }, { passive: true, signal: abort.signal });
    }
  });
  return () => { abort.abort(); context.revert(); };
}
