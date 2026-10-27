import { readMotionPaused, safeStorage, storeMotionPaused } from '../../../lib/preferences';
import { rgbSplitSupported } from '../../../lib/feature-support';
import { must } from '../../motion/dom';
import type { GridScene } from '../../motion/grid-scene';

/** Marks the page when the browser cannot do the portrait RGB split; CSS then uses a simple fallback. */
export function checkRgbSplit() {
  const supports = typeof CSS !== 'undefined' && typeof CSS.supports === 'function' ? (property: string, value: string) => CSS.supports(property, value) : undefined;
  document.documentElement.classList.toggle('no-rgb-split', !rgbSplitSupported(supports));
}

export const isMotionPaused = () => document.documentElement.classList.contains('motion-paused');

/**
 * The visible "pause motion" button (WCAG 2.2.2). Pausing freezes the canvas and the continuous
 * animations, and the choice is remembered. The head script restores the class before first paint.
 */
export function setupMotionToggle(scene: GridScene | null): () => void {
  const root = document.documentElement;
  const button = must<HTMLButtonElement>('#mbtn');
  const apply = (paused: boolean) => {
    root.classList.toggle('motion-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    scene?.setPaused(paused);
  };
  apply(readMotionPaused(safeStorage()));
  const onClick = () => { const next = !isMotionPaused(); apply(next); storeMotionPaused(safeStorage(), next); };
  button.addEventListener('click', onClick);
  return () => button.removeEventListener('click', onClick);
}
