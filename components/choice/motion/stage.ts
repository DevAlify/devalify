import { gsap } from 'gsap';
import type { Choice } from '../../../lib/preferences';
import { restPercent, seamXAt, sideAt, slantFor } from '../../../lib/seam';
import type { GridScene } from '../../motion/grid-scene';
import { decode } from '../../motion/scramble';
import type { ChoiceEls } from './elements';

export type Stage = {
  /** Seam position in percent of the width; GSAP tweens it. */
  seam: { x: number };
  state: { active: Choice | null; rest: Choice | null; leaving: boolean };
  apply(): void;
  setActive(kind: Choice | null): void;
  setWave(wave: gsap.core.Timeline | null): void;
  /** Decodes the Immersive title again (hover, language change). */
  decodeTitle(): void;
  destroy(): void;
};

type Env = { anim: boolean; reduced: boolean; grid: GridScene | null };

/** Seam geometry, the half that is highlighted, the light that follows the pointer. */
export function createStage(els: ChoiceEls, { anim, reduced, grid }: Env): Stage {
  const { stage, cards, copy, titles } = els;
  const mobile = window.matchMedia('(max-width: 760px)');
  const seam = { x: 50 };
  const state: Stage['state'] = { active: null, rest: null, leaving: false };
  const abort = new AbortController();
  const { signal } = abort;
  let slant = 0, wave: gsap.core.Timeline | null = null, keyboard = false;

  function apply() {
    stage.style.setProperty('--x', seam.x.toFixed(3));
    if (mobile.matches) return;
    const width = window.innerWidth, height = window.innerHeight, center = (width * seam.x) / 100;
    els.seamLine.setAttribute('x1', String(center + slant)); els.seamLine.setAttribute('y1', '0');
    els.seamLine.setAttribute('x2', String(center - slant)); els.seamLine.setAttribute('y2', String(height));
  }
  function measure() {
    slant = slantFor(window.innerWidth);
    els.gradient.setAttribute('y2', String(window.innerHeight));
    apply();
  }
  window.addEventListener('resize', measure, { signal });
  measure();

  const decodeTitle = () => {
    if (anim) decode(titles.imersivo, { duration: 0.9, reveal: 0.12, speed: 0.8 });
  };

  function setActive(kind: Choice | null) {
    if (kind === state.active || state.leaving) return;
    state.active = kind;
    stage.dataset.active = kind ?? '';
    cards.imersivo.classList.toggle('is-on', kind === 'imersivo');
    cards.editorial.classList.toggle('is-on', kind === 'editorial');
    if (mobile.matches) return;
    if (grid) grid.state.boost = kind === 'imersivo' ? 2.6 : kind === 'editorial' ? 0.25 : 0.8;
    if (!anim) return;
    gsap.to(seam, { x: restPercent(kind), duration: 1.2, ease: 'expo.out', overwrite: 'auto', onUpdate: apply });
    gsap.to(copy.imersivo, { scale: kind === 'editorial' ? 0.68 : 1, opacity: kind === 'editorial' ? 0.55 : 1, duration: 0.95, ease: 'expo.out', overwrite: 'auto' });
    gsap.to(copy.editorial, { scale: kind === 'imersivo' ? 0.68 : 1, opacity: kind === 'imersivo' ? 0.55 : 1, duration: 0.95, ease: 'expo.out', overwrite: 'auto' });
    if (kind === 'imersivo') decodeTitle();
    if (kind === 'editorial' && wave && !wave.isActive()) wave.restart();
  }

  window.addEventListener('pointermove', event => {
    if (mobile.matches || state.leaving) return;
    keyboard = false;
    const seamX = seamXAt(window.innerWidth, window.innerHeight, seam.x, slant, event.clientY);
    setActive(sideAt(event.clientX, seamX, state.active));
  }, { passive: true, signal });
  document.documentElement.addEventListener('mouseleave', () => { if (!keyboard) setActive(state.rest); }, { signal });
  (Object.keys(cards) as Choice[]).forEach(kind => {
    cards[kind].addEventListener('focus', () => { if (cards[kind].matches(':focus-visible')) { keyboard = true; setActive(kind); } }, { signal });
    cards[kind].addEventListener('blur', () => { if (keyboard) setActive(state.rest); }, { signal });
  });

  // Light that follows the pointer, smoothed on the GSAP ticker.
  const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, sx: window.innerWidth * 0.5, sy: window.innerHeight * 0.5 };
  const paintSpot = () => {
    mouse.sx += (mouse.x - mouse.sx) * 0.14; mouse.sy += (mouse.y - mouse.sy) * 0.14;
    stage.style.setProperty('--mx', mouse.sx.toFixed(1)); stage.style.setProperty('--my', mouse.sy.toFixed(1));
  };
  window.addEventListener('pointermove', event => { mouse.x = event.clientX; mouse.y = event.clientY; }, { passive: true, signal });
  if (reduced) {
    stage.style.setProperty('--mx', String(mouse.x)); stage.style.setProperty('--my', String(mouse.y));
    window.addEventListener('pointermove', paintSpot, { signal });
  } else gsap.ticker.add(paintSpot);

  return {
    seam, state, apply, setActive, decodeTitle,
    setWave(next) { wave = next; },
    destroy() { abort.abort(); gsap.ticker.remove(paintSpot); },
  };
}
