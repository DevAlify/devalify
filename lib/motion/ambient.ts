import { elements, gsap, ScrollTrigger, type Cleanup } from './shared';

export function setupAmbient(mobile: boolean, cleanups: Cleanup[]) {
  const marquee = document.querySelector<HTMLElement>('#mqt');
  if (marquee) {
    const tween = gsap.to(marquee, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 });
    const skew = gsap.quickTo(marquee, 'skewX', { duration: .5, ease: 'power3' });
    let speed = 1;
    if (!mobile) ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => {
      const velocity = self.getVelocity();
      speed = Math.max(speed, 1 + Math.min(Math.abs(velocity) / 260, 8) * .9);
      skew(Math.max(-14, Math.min(14, velocity / -120)));
    } });
    const tick = () => { speed += (1 - speed) * .06; tween.timeScale(speed); };
    gsap.ticker.add(tick);
    const observer = new IntersectionObserver(entries => tween.paused(!entries.some(entry => entry.isIntersecting)));
    observer.observe(marquee);
    cleanups.push(() => { observer.disconnect(); gsap.ticker.remove(tick); });
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.toggleAttribute('data-off', !entry.isIntersecting)), { rootMargin: '100px' });
  elements('.hero,.pan').forEach(element => observer.observe(element));
  cleanups.push(() => { observer.disconnect(); elements('[data-off]').forEach(element => element.removeAttribute('data-off')); });
  const navigation = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      elements(`.rail a[href="#${entry.target.id}"],.navc a[href="#${entry.target.id}"]`).forEach(link => link.classList.toggle('on', entry.isIntersecting));
    });
  }, { rootMargin: '-35% 0px -45% 0px' });
  elements('section[id],.hero[id]').forEach(element => navigation.observe(element));
  cleanups.push(() => navigation.disconnect());
}
