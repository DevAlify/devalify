import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { safeStorage, storeChoice, type Choice } from '../../../lib/preferences';
import { all } from '../../motion/dom';
import type { GridScene } from '../../motion/grid-scene';
import type { ChoiceEls } from './elements';
import type { Stage } from './stage';

type Env = { anim: boolean; grid: GridScene | null };

/**
 * Cinematic exit, about 1.4 s. The chosen title flies to the center (Flip), then an iris (Immersive)
 * or a double curtain (Editorial) covers the page and the browser navigates. Reduced motion: a 0.25 s fade.
 */
export function createExit(els: ChoiceEls, stage: Stage, { anim, grid }: Env) {
  const { veil, copy, titles } = els;
  return function leave(kind: Choice, destination: string) {
    if (stage.state.leaving) return;
    stage.state.leaving = true;
    storeChoice(safeStorage(), kind);
    let gone = false;
    const go = () => { if (!gone) { gone = true; window.location.href = destination; } };
    veil.root.dataset.kind = kind;
    veil.root.classList.add('on');
    gsap.set([veil.curtain, veil.curtain2], { yPercent: 101 });
    if (!anim) {
      gsap.fromTo(veil.bg, { opacity: 0 }, { opacity: 1, duration: 0.25, onComplete: go });
      window.setTimeout(go, 1500);
      return;
    }
    window.setTimeout(go, 4000); // a throttled tab must still navigate
    const title = titles[kind];
    const other: Choice = kind === 'imersivo' ? 'editorial' : 'imersivo';
    const tl = gsap.timeline({ onComplete: go, defaults: { ease: 'expo.inOut' } });
    if (!window.matchMedia('(max-width: 760px)').matches) tl.to(stage.seam, { x: kind === 'imersivo' ? 107 : -7, duration: 0.9, onUpdate: stage.apply }, 0);
    tl.to(copy[other], { opacity: 0, duration: 0.35, ease: 'power2.out' }, 0)
      .to(all('.d,.perks,.go,.rule', copy[kind]), { opacity: 0, y: -12, duration: 0.35, stagger: 0.04, ease: 'power2.out' }, 0);
    if (kind === 'imersivo' && grid) grid.state.fast = 7;
    // The title crosses over to the exit layer and flies to the center.
    const flipState = Flip.getState(title);
    veil.title.appendChild(title);
    tl.add(Flip.from(flipState, { duration: 0.9, ease: 'expo.inOut', scale: true, simple: true }), 0.05);
    tl.fromTo(title, { scale: 1 }, { scale: 1.5, duration: 0.8, ease: 'power3.in' }, 0.55);
    if (kind === 'imersivo') {
      tl.fromTo(veil.line, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.45, ease: 'expo.out' }, 0.5)
        .set(veil.bg, { opacity: 1, clipPath: 'circle(0% at 50% 50%)' }, 0.62)
        .to(veil.bg, { clipPath: 'circle(150% at 50% 50%)', duration: 0.65, ease: 'power3.inOut' }, 0.66)
        .to(veil.line, { opacity: 0, duration: 0.3 }, 0.95)
        .to(title, { opacity: 0, filter: 'blur(14px)', duration: 0.4, ease: 'power2.in' }, 1.0);
    } else {
      tl.fromTo(veil.curtain, { yPercent: 101 }, { yPercent: 0, duration: 0.75 }, 0.45)
        .fromTo(veil.curtain2, { yPercent: 101 }, { yPercent: 0, duration: 0.75 }, 0.58)
        .to(title, { opacity: 0, filter: 'blur(10px)', duration: 0.4, ease: 'power2.in' }, 1.1);
    }
  };
}
