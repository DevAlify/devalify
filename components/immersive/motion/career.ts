import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { all, must } from '../../motion/dom';
import { decode, releaseText, rememberFinal } from '../../motion/scramble';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Career: the line draws itself with the scroll, a diamond rides its tip, ticks light up at each role. */
export function setupCareer(): () => void {
  const abort = new AbortController();
  const timeline = must<HTMLElement>('#tl'), svg = must<SVGSVGElement>('#tlSvg'), rail = must('#tlRail'), draw = must('#tlDraw'), head = must<HTMLElement>('#tlHead');
  const jobs = all<HTMLElement>('.job', timeline);
  let trigger: ScrollTrigger | null = null, resizeTimer = 0;

  function build() {
    const height = timeline.offsetHeight;
    svg.setAttribute('viewBox', `0 0 36 ${height}`); svg.setAttribute('height', String(height));
    const path = `M18 6V${height - 6}`;
    rail.setAttribute('d', path); draw.setAttribute('d', path);
    all('.tick', svg).forEach(tick => tick.remove());
    const ticks = jobs.map(job => {
      const y = job.offsetTop + 14, element = document.createElementNS(SVG_NS, 'path');
      element.setAttribute('class', 'tick'); element.setAttribute('d', `M18 ${y}H32`); svg.appendChild(element);
      return { y, element };
    });
    trigger?.kill();
    gsap.set(draw, { drawSVG: '0%' });
    trigger = ScrollTrigger.create({ trigger: timeline, start: 'top 62%', end: 'bottom 62%', onUpdate: self => {
      gsap.set(draw, { drawSVG: `${self.progress * 100}%` });
      const y = 6 + self.progress * (height - 12);
      head.style.transform = `translateY(${y}px) rotate(45deg)`;
      ticks.forEach(tick => tick.element.classList.toggle('on', y >= tick.y - 2));
    } });
    if (trigger.progress === 0) head.style.transform = 'translateY(6px) rotate(45deg)';
  }
  const rebuild = () => { build(); ScrollTrigger.refresh(); };
  const onResize = () => { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(rebuild, 220); };

  build();
  void document.fonts.ready.then(rebuild);
  window.addEventListener('resize', onResize, { signal: abort.signal });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { signal: abort.signal });
  const roles = jobs.map(job => must<HTMLElement>('h3 span', job));
  window.addEventListener('portfolio:language-will-change', () => releaseText(roles), { signal: abort.signal });
  window.addEventListener('portfolio:language-change', () => { roles.forEach(rememberFinal); rebuild(); }, { signal: abort.signal });
  // Each role decodes when it arrives.
  const context = gsap.context(() => jobs.forEach((job, index) => {
    rememberFinal(roles[index]);
    ScrollTrigger.create({ trigger: job, start: 'top 82%', once: true, onEnter: () => decode(roles[index], { duration: 0.9 }) });
  }));
  return () => { abort.abort(); window.clearTimeout(resizeTimer); trigger?.kill(); context.revert(); };
}

/** No-motion version: the whole line is drawn, every tick is lit, no moving diamond. */
export function drawStaticCareer(): () => void {
  const abort = new AbortController();
  const timeline = must<HTMLElement>('#tl');
  const paint = () => {
    const path = `M18 0V${timeline.offsetHeight}`;
    all('#tlRail,#tlDraw').forEach(line => line.setAttribute('d', path));
    all('.tl-svg .tick').forEach(tick => tick.classList.add('on'));
    must<HTMLElement>('#tlHead').style.display = 'none';
  };
  paint();
  window.addEventListener('resize', paint, { signal: abort.signal });
  return () => abort.abort();
}
