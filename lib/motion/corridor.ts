import { corridorPlane } from './corridor-math';
import { elements, ScrollTrigger } from './shared';

export function setupCorridor() {
  const corridor = document.querySelector<HTMLElement>('#cor');
  if (!corridor) return () => {};
  const planes = elements('.pl');
  const dots = elements('#dots i');
  const floor = document.querySelector<HTMLElement>('#floor');
  corridor.classList.remove('flat');
  function place(progress: number) {
    planes.forEach((plane, index) => {
      const state = corridorPlane(index, progress, innerWidth);
      plane.style.transform = `translate3d(calc(-50% + ${state.x}px),-50%,${state.z}px)`;
      plane.style.opacity = String(state.opacity);
      plane.style.pointerEvents = state.interactive ? 'auto' : 'none';
      plane.inert = !state.interactive;
      plane.classList.toggle('front', state.front);
    });
    dots.forEach((dot, index) => dot.classList.toggle('on', index === Math.round(progress)));
  }
  place(0);
  ScrollTrigger.create({
    trigger: corridor, start: 'top top', end: () => `+=${innerHeight * (planes.length - 1) * .9}`,
    pin: true, scrub: .8, invalidateOnRefresh: true,
    onUpdate: self => {
      place(self.progress * (planes.length - 1));
      floor?.style.setProperty('--fy', `${self.progress * planes.length * 190}px`);
    },
  });
  return () => {
    corridor.classList.add('flat');
    planes.forEach(plane => {
      plane.inert = false;
      plane.style.removeProperty('transform');
      plane.style.removeProperty('opacity');
      plane.style.removeProperty('pointer-events');
      plane.classList.remove('front');
    });
  };
}
