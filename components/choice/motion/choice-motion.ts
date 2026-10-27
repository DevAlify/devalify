import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { isChoice, readChoice, safeStorage } from '../../../lib/preferences';
import { motionFlags } from '../../motion/dom';
import { CHOICE_SCENE, createGridScene } from '../../motion/grid-scene';
import { paintDither } from '../../motion/dither';
import { releaseText, rememberFinal } from '../../motion/scramble';
import { queryChoice } from './elements';
import { createExit } from './exit';
import { playIntro } from './intro';
import { createStage } from './stage';

/** Wires the selection page: grid, seam, entrance, exit, remembered choice. Returns the teardown. */
export function setupChoice(): () => void {
  gsap.registerPlugin(SplitText, ScrambleTextPlugin, DrawSVGPlugin, Flip);
  const { root, reduced, anim } = motionFlags();
  const els = queryChoice();
  const abort = new AbortController();
  const { signal } = abort;
  paintDither(els.dither);

  const grid = createGridScene(els.canvas, CHOICE_SCENE, { reduced, paused: false });
  if (grid) grid.state.boost = 0.8;
  const stage = createStage(els, { anim, reduced, grid });
  const leave = createExit(els, stage, { anim, grid });
  const stopIntro = anim ? playIntro(els, stage) : () => {};

  // The remembered experience is pre-highlighted once the entrance has played. Nothing redirects.
  const last = readChoice(safeStorage());
  stage.state.rest = last;
  if (last) {
    const shortcut = els.resume[last];
    shortcut.hidden = false;
    if (anim) {
      gsap.fromTo(shortcut, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, delay: 1.5, ease: 'expo.out' });
      gsap.delayedCall(1.7, () => { if (!stage.state.active) stage.setActive(last); });
    } else stage.setActive(last);
  }

  // Navigation goes through the exit animation. Modified clicks keep the browser default.
  [...Object.values(els.cards), ...Object.values(els.resume)].forEach(link => {
    link.addEventListener('click', event => {
      const kind = link.dataset.kind;
      if (!isChoice(kind) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      leave(kind, link.href);
    }, { signal });
    link.addEventListener('keydown', event => { if (event.key === ' ') { event.preventDefault(); link.click(); } }, { signal });
  });

  // New language: a running decode stops before the swap, then the Immersive title decodes into its translation.
  window.addEventListener('portfolio:language-will-change', () => releaseText([els.titles.imersivo], anim), { signal });
  window.addEventListener('portfolio:language-change', () => {
    rememberFinal(els.titles.imersivo);
    if (!stage.state.leaving) stage.decodeTitle();
  }, { signal });
  // Back/forward cache would restore the covered page: reload it instead.
  window.addEventListener('pageshow', event => { if (event.persisted) window.location.reload(); }, { signal });

  root.classList.add('motion-ready');
  return () => {
    abort.abort(); stopIntro(); stage.destroy(); grid?.destroy();
    root.classList.remove('motion-ready');
  };
}
