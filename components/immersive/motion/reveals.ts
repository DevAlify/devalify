import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { all } from '../../motion/dom';
import { decode, releaseText, rememberFinal } from '../../motion/scramble';

const EASE = 'expo.out';

/** The same text is the heading's accessible name while the letters are scrambled. */
function nameHeading(heading: HTMLElement) {
  rememberFinal(heading);
  heading.setAttribute('aria-label', heading.dataset.final ?? '');
}

/** No-motion version: blocks fade in once they scroll into view (instantly where observers are missing). */
export function setupStaticReveals(): () => void {
  const items = all('.rv');
  if (typeof IntersectionObserver === 'undefined') { items.forEach(item => item.classList.add('in')); return () => {}; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach(item => observer.observe(item));
  return () => observer.disconnect();
}

/**
 * Scroll reveals: headings decode and fly in from the back, blocks fade up in batches,
 * the stack lines in, the nav marks the section being read.
 */
export function setupReveals(): () => void {
  const abort = new AbortController();
  const headings = all<HTMLElement>('.dec-h');
  const context = gsap.context(() => {
    headings.forEach(heading => {
      nameHeading(heading);
      ScrollTrigger.create({ trigger: heading, start: 'top 86%', once: true, onEnter: () => decode(heading, { duration: 1.1 }) });
    });

    // Section titles come from the back and cross the camera when leaving (one scrubbed timeline each).
    all('.sec h2').forEach(heading => {
      const depth = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      depth.fromTo(heading, { scale: 0.9, opacity: 0.15, filter: 'blur(8px)', transformOrigin: '0% 60%' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.32 })
        .to(heading, { duration: 0.46 })
        .to(heading, { scale: 1.06, opacity: 0.25, duration: 0.22 });
      ScrollTrigger.create({ trigger: heading, start: 'top 98%', end: 'top -10%', scrub: true, animation: depth });
    });

    ScrollTrigger.batch('.rv', { start: 'top 90%', once: true, onEnter: batch => { gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.09, overwrite: true }); } });

    all('.sk-row').forEach(row => {
      const items = all('.sk-item', row);
      gsap.set(items, { opacity: 0 });
      ScrollTrigger.create({ trigger: row, start: 'top 88%', once: true, onEnter: () => {
        gsap.fromTo(items, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: { each: 0.018, amount: 0.5 }, overwrite: true });
      } });
    });

    ['numeros', 'cases', 'stack', 'trajetoria'].forEach(id => {
      const link = document.querySelector(`nav .l[href="#${id}"]`);
      ScrollTrigger.create({ trigger: `#${id}`, start: 'top 55%', end: 'bottom 55%', onToggle: self => link?.classList.toggle('on', self.isActive) });
    });
  });
  const { signal } = abort;
  window.addEventListener('portfolio:language-will-change', () => releaseText(headings), { signal });
  window.addEventListener('portfolio:language-change', () => headings.forEach(nameHeading), { signal });
  return () => { abort.abort(); context.revert(); };
}
