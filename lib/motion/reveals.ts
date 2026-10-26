import { counterText, elements, gsap, type Cleanup, type Once } from './shared';

export function setupReveals(once: Once, mobile: boolean, cleanups: Cleanup[]) {
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const later = (action: () => void, delay: number) => {
    const timer = setTimeout(() => { timers.delete(timer); action(); }, delay);
    timers.add(timer);
  };
  const glitch = (element: HTMLElement) => {
    element.classList.remove('on');
    void element.offsetWidth;
    element.classList.add('on');
    later(() => element.classList.remove('on'), 650);
  };
  elements('.gl').forEach(element => {
    const run = () => glitch(element);
    element.addEventListener('pointerenter', run);
    element.addEventListener('focus', run);
    cleanups.push(() => { element.removeEventListener('pointerenter', run); element.removeEventListener('focus', run); element.classList.remove('on'); });
  });
  elements('section:not(.hero) .rv').forEach((element, index) => {
    once(element, () => {
      if (mobile) { element.style.transitionDelay = `${index % 4 * .07}s`; element.classList.add('in'); }
      else gsap.to(element, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: index % 4 * .08 });
    });
  });
  elements('.pan').forEach(panel => {
    const wipe = panel.querySelector('.wipe');
    if (!mobile && wipe) gsap.set(wipe, { scaleX: 0 });
    once(panel, () => {
      panel.classList.add('in');
      const headings = panel.querySelectorAll<HTMLElement>('.gl');
      headings.forEach(glitch);
      if (!mobile) {
        if (wipe) gsap.to(wipe, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' });
        gsap.fromTo(headings, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power3.out', clearProps: 'clipPath' });
      }
    });
    const previous = panel.previousElementSibling;
    if (!mobile && previous && !previous.classList.contains('mq') && previous.id !== 'trajetoria' && panel.id !== 'trajetoria') {
      gsap.to(previous, { scale: .97, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 30%', scrub: true } });
    }
  });
  elements('[data-count]').forEach(element => {
    const target = Number(element.dataset.count);
    once(element, () => {
      const counter = { value: 0 };
      gsap.to(counter, { value: target, duration: 1.8, ease: 'power2.out', onUpdate: () => { element.textContent = counterText(element, counter.value); } });
    });
  });
  elements('.ticks').forEach(element => once(element, () => {
    element.querySelectorAll('i').forEach((tick, index) => later(() => tick.classList.add('on'), index * 45));
  }));
  elements('.prog').forEach(element => once(element, () => {
    element.classList.add('in');
    if (!mobile) gsap.from(element.querySelector('i'), { width: 0, duration: 1.4, ease: 'power3.out' });
  }));
  const accordion = document.querySelector<HTMLElement>('#acc');
  if (accordion) once(accordion, () => {
    accordion.classList.add('in');
    if (!mobile) gsap.from('.pane', { opacity: 0, y: 60, duration: 1.1, ease: 'expo.out', stagger: .12 });
  });
  if (mobile) elements('.flat .pl').forEach((plane, index) => once(plane, () => {
    plane.classList.add('timeline-in');
    gsap.from(plane.querySelector('.in'), { opacity: 0, x: index % 2 ? 24 : -24, duration: .8, ease: 'power3.out' });
  }));
  cleanups.push(() => {
    timers.forEach(clearTimeout);
    elements('.rv,.pan,.prog,.acc').forEach(element => { element.classList.remove('in'); element.style.removeProperty('transition-delay'); });
    elements('.ticks i').forEach(tick => tick.classList.remove('on'));
  });
}
