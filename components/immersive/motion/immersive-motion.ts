import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { motionFlags } from '../../motion/dom';
import { setupCases } from './cases';
import { drawStaticCareer, setupCareer } from './career';
import { setupGates } from './gates';
import { setupHero } from './hero';
import { checkRgbSplit, isMotionPaused, setupMotionToggle } from './motion-toggle';
import { setupReveals, setupStaticReveals } from './reveals';
import { setupScene } from './scene';
import { setupTooltips } from './tooltip';

/**
 * Wires the immersive page. Without animation (reduced motion) the content simply fades in on view and
 * the canvas shows one still frame; the accordion, tooltips, terminal and the rest keep working.
 */
export function setupImmersive(): () => void {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin);
  const { root, reduced, anim } = motionFlags();
  checkRgbSplit();
  const { scene, teardown: stopScene } = setupScene({ anim, reduced, paused: isMotionPaused() });
  const stops = [stopScene, setupTooltips(), setupCases({ anim, reduced }), setupMotionToggle(scene)];
  if (anim) stops.push(setupHero({ paused: isMotionPaused }), setupGates(scene?.state), setupReveals(), setupCareer());
  else stops.push(setupStaticReveals(), drawStaticCareer());
  root.classList.add('motion-ready');
  return () => { stops.forEach(stop => stop()); root.classList.remove('motion-ready'); };
}
