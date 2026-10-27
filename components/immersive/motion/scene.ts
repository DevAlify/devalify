import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { paintDither } from '../../motion/dither';
import { must } from '../../motion/dom';
import { IMMERSIVE_SCENE, createGridScene, type GridScene } from '../../motion/grid-scene';

/** How visible the grid is behind each section (it recedes behind long reading). */
const SECTION_ALPHA: Record<string, number> = { top: 1, numeros: 0.85, cases: 0.3, stack: 0.24, trajetoria: 0.3, perfil: 0.26, contato: 0.7 };

type Env = { anim: boolean; reduced: boolean; paused: boolean };

/** The fixed grid canvas, tied to scroll (opacity per section, speed from scroll velocity) and to the arrival iris. */
export function setupScene({ anim, reduced, paused }: Env): { scene: GridScene | null; teardown: () => void } {
  const root = document.documentElement;
  paintDither(must<HTMLElement>('#dither'));
  const scene = createGridScene(must<HTMLCanvasElement>('#scene'), IMMERSIVE_SCENE, { reduced, paused });
  if (!anim || !scene) { root.classList.remove('arrive'); return { scene, teardown: () => scene?.destroy() }; }
  const state = scene.state;
  const context = gsap.context(() => {
    Object.entries(SECTION_ALPHA).forEach(([id, alpha]) => {
      const trigger = document.getElementById(id);
      if (trigger) ScrollTrigger.create({ trigger, start: 'top 55%', end: 'bottom 55%', onToggle: self => { if (self.isActive) state.alphaTarget = alpha; } });
    });
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => { state.vel = self.getVelocity(); } });
    if (root.classList.contains('arrive')) {
      // The iris opens over the scene while the grid decelerates from the exit speed.
      const cover = document.createElement('div');
      cover.id = 'arrive'; cover.setAttribute('aria-hidden', 'true'); cover.style.clipPath = 'circle(150% at 50% 50%)';
      document.body.appendChild(cover); root.classList.remove('arrive');
      gsap.to(cover, { clipPath: 'circle(0% at 50% 50%)', duration: 1, delay: 0.15, ease: 'power3.inOut', onComplete: () => cover.remove() });
      gsap.fromTo(state, { boost: 12 }, { boost: 0, duration: 2.2, ease: 'power3.out', delay: 0.1 });
    }
  });
  return { scene, teardown: () => { context.revert(); scene.destroy(); } };
}
