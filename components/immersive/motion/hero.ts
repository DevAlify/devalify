import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { all, must } from '../../motion/dom';
import { decodeTween, releaseText, rememberFinal } from '../../motion/scramble';

const NEAR = 260;

/**
 * Hero: each line decodes, the portrait and its corner brackets draw in, the camera flies through the
 * title on scroll, the portrait follows the pointer and glitches now and then. Variable weight near the cursor.
 */
export function setupHero({ paused }: { paused: () => boolean }): () => void {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const abort = new AbortController();
  const { signal } = abort;
  const decs = all<HTMLElement>('.dec', must('#h1'));
  const lines = all('.ln', must('#h1'));
  let splits: SplitText[] = [], chars: HTMLElement[] = [], spots: { x: number; y: number }[] = [], frame = 0, mx = -999, my = -999, weighted = false;
  const timers: number[] = [];

  const cache = () => { spots = chars.map(char => { const box = char.getBoundingClientRect(); return { x: box.left + box.width / 2 + window.scrollX, y: box.top + box.height / 2 + window.scrollY }; }); };
  const paint = () => {
    frame = 0;
    chars.forEach((char, index) => {
      const spot = spots[index];
      if (!spot) return;
      const distance = Math.hypot(spot.x - mx, spot.y - my);
      char.style.fontVariationSettings = `"wght" ${distance > NEAR ? 300 : Math.round(300 + (1 - distance / NEAR) * 260)}`;
    });
  };
  const onMove = (event: PointerEvent) => { mx = event.pageX; my = event.pageY; if (!frame) frame = requestAnimationFrame(paint); };
  const split = () => {
    splits = decs.map(dec => SplitText.create(dec, { type: 'chars', aria: 'none', charsClass: 'ch' }));
    chars = splits.flatMap(item => item.chars as HTMLElement[]);
    cache();
  };
  const unsplit = () => { splits.forEach(item => item.revert()); splits = []; chars = []; spots = []; };

  const context = gsap.context(() => {
    decs.forEach(rememberFinal);
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    decs.forEach(dec => {
      const at = 0.15 + lines.indexOf(dec.closest('.ln') as HTMLElement) * 0.22;
      tl.set(dec, { opacity: 1 }, at).add(decodeTween(dec, { duration: 1.15, reveal: 0.18, speed: 0.75 }), at);
    });
    tl.fromTo('#sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 1.0)
      .fromTo('#heroCta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 1.12)
      .fromTo('.portrait .stack', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.4 }, 0.2)
      .fromTo('.portrait .glow', { opacity: 0 }, { opacity: 1, duration: 1.8 }, 0.2)
      .fromTo(all('.brk path'), { drawSVG: '0%', opacity: 1 }, { drawSVG: '100%', opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 0.5);
    // Once the decode is done the letters can react to the cursor.
    tl.add(() => { if (coarse) return; weighted = true; split(); window.addEventListener('pointermove', onMove, { passive: true, signal }); }, 2.0);

    // The camera flies through the title when scrolling out of the hero.
    gsap.to('#heroCopy', { scale: 1.12, opacity: 0, y: -60, filter: 'blur(8px)', ease: 'none', transformOrigin: '0% 55%', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: true } });
    gsap.to('#portrait', { yPercent: -12, scale: 1.06, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 15%', scrub: true } });
    if (!coarse) {
      const portraitX = gsap.quickTo('#portrait', 'x', { duration: 0.9, ease: 'power3' });
      const portraitY = gsap.quickTo('#portrait', 'y', { duration: 0.9, ease: 'power3' });
      const copyX = gsap.quickTo('#heroCopy', 'x', { duration: 1.1, ease: 'power3' });
      window.addEventListener('pointermove', event => {
        const nx = event.clientX / window.innerWidth - 0.5, ny = event.clientY / window.innerHeight - 0.5;
        portraitX(nx * -16); portraitY(ny * -10); copyX(nx * 8);
      }, { passive: true, signal });
    }
  });

  // A rare glitch on the portrait, only while the hero is on screen and motion is not paused.
  const portrait = must('#portrait');
  const glitch = () => {
    if (document.hidden || paused() || window.scrollY > window.innerHeight * 0.6) { timers.push(window.setTimeout(glitch, 6000)); return; }
    portrait.classList.add('glitch');
    timers.push(window.setTimeout(() => portrait.classList.remove('glitch'), 140));
    timers.push(window.setTimeout(glitch, 11000 + Math.random() * 9000));
  };
  timers.push(window.setTimeout(glitch, 9000));

  // Language change: running decodes stop, letters go back to plain text before the swap and are split again after it.
  window.addEventListener('portfolio:language-will-change', () => { if (weighted) unsplit(); releaseText(decs, true); }, { signal });
  window.addEventListener('portfolio:language-change', () => { decs.forEach(rememberFinal); if (weighted) split(); }, { signal });
  window.addEventListener('resize', cache, { signal });

  return () => {
    abort.abort(); timers.forEach(window.clearTimeout); cancelAnimationFrame(frame);
    unsplit(); context.revert();
  };
}
