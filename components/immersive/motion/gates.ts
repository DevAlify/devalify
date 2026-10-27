import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatCount } from '../../../lib/locale';
import { all, currentLanguage, must } from '../../motion/dom';
import type { SceneState } from '../../motion/grid-scene';

/** The pin lasts two screens at most, however many numbers there are. */
const PIN_SCREENS = 2;

function show(element: HTMLElement, value: number) {
  const text = formatCount(Math.round(value), currentLanguage(), { prefix: element.dataset.prefix, suffix: element.dataset.suffix, grouped: !!element.dataset.fmt });
  if (element.textContent !== text) element.textContent = text;
}

/**
 * Numbers: on wide screens the scroll flies through each number like a gate (pinned, scrubbed, counting up);
 * on narrow screens they stack and count when they enter.
 */
export function setupGates(state?: SceneState): () => void {
  const gates = all<HTMLElement>('.gate');
  const numbers = all<HTMLElement>('.gnum');
  const media = gsap.matchMedia();

  media.add('(min-width: 901px)', () => {
    const section = must('#numeros');
    section.classList.add('is-pinned'); // the pinned layout lives in CSS under this class, so a page without scripts keeps the numbers stacked
    // The text always comes from these values. A refresh rewinds the timeline with callbacks on and puts it back with
    // callbacks off, so a tween callback alone leaves the DOM at 0; the text is rewritten after every refresh instead.
    const counters = numbers.map(() => ({ value: 0 }));
    const sync = () => numbers.forEach((number, index) => show(number, counters[index].value));
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, onUpdate: sync });
    gates.forEach((gate, index) => {
      const at = index * 1.25;
      gsap.set(gate, { opacity: 0 });
      timeline
        .fromTo(gate, { scale: 0.22, opacity: 0, filter: 'blur(18px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power2.out' }, at)
        .fromTo(counters[index], { value: 0 }, { value: Number(numbers[index].dataset.count), duration: 0.7, ease: 'power2.out' }, at)
        .to(gate, { scale: 2.9, opacity: 0, filter: 'blur(22px)', duration: 0.75, ease: 'power2.in' }, at + 1.0);
    });
    ScrollTrigger.create({
      trigger: must('#gatesStage'), start: 'top top', end: () => `+=${Math.round(window.innerHeight * PIN_SCREENS)}`, pin: true, scrub: 0.7,
      animation: timeline, invalidateOnRefresh: true, refreshPriority: 10,
      onUpdate: self => { if (state) state.boost = self.isActive ? 1.4 + Math.min(Math.abs(self.getVelocity()) / 1800, 2) : 0; },
      onToggle: self => { if (state && !self.isActive) state.boost = 0; },
    });
    ScrollTrigger.addEventListener('refresh', sync);
    window.addEventListener('portfolio:language-change', sync); // the language hook writes the final value into every counter
    sync();
    return () => {
      ScrollTrigger.removeEventListener('refresh', sync);
      window.removeEventListener('portfolio:language-change', sync);
      section.classList.remove('is-pinned'); gsap.set(gates, { clearProps: 'all' });
      numbers.forEach(number => show(number, Number(number.dataset.count)));
    };
  });

  media.add('(max-width: 900px)', () => {
    numbers.forEach(number => {
      const counter = { value: 0 };
      ScrollTrigger.create({ trigger: number, start: 'top 90%', once: true, onEnter: () => {
        gsap.to(counter, { value: Number(number.dataset.count), duration: 1.6, ease: 'power2.out', onUpdate: () => show(number, counter.value) });
      } });
    });
    gates.forEach(gate => gsap.fromTo(gate, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: gate, start: 'top 88%', once: true } }));
  });
  return () => media.revert();
}
