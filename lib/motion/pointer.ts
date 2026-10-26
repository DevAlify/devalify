import { elements, gsap } from './shared';

export function setupPointer() {
  const cleanups: (() => void)[] = [];
  const cursor = document.querySelector<HTMLElement>('#cur');
  const portrait = document.querySelector<HTMLElement>('#c3');
  const stage = document.querySelector<HTMLElement>('#stage');
  const cx = cursor ? gsap.quickTo(cursor, 'x', { duration: .35, ease: 'power3' }) : undefined;
  const cy = cursor ? gsap.quickTo(cursor, 'y', { duration: .35, ease: 'power3' }) : undefined;
  const rx = portrait ? gsap.quickTo(portrait, 'rotationX', { duration: .8, ease: 'power3' }) : undefined;
  const ry = portrait ? gsap.quickTo(portrait, 'rotationY', { duration: .8, ease: 'power3' }) : undefined;
  if (portrait) gsap.set(portrait, { transformPerspective: 1200 });
  const move = (event: PointerEvent) => {
    cursor?.classList.add('on');
    cursor?.classList.toggle('h', event.target instanceof Element && !!event.target.closest('a,button,[tabindex],.pane'));
    cx?.(event.clientX); cy?.(event.clientY);
    document.documentElement.style.setProperty('--gx', `${event.clientX}px`);
    document.documentElement.style.setProperty('--gy', `${event.clientY}px`);
    if (stage && portrait) {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / innerWidth;
      const y = (event.clientY - rect.top - rect.height / 2) / innerHeight;
      rx?.(-y * 22); ry?.(x * 28);
      portrait.style.setProperty('--gx2', `${50 + x * 140}%`);
      portrait.style.setProperty('--gy2', `${40 + y * 140}%`);
    }
  };
  const leave = () => cursor?.classList.remove('on');
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerleave', leave);
  cleanups.push(() => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); leave(); });
  elements('[data-cd]').forEach(card => {
    const tilt = card.querySelector<HTMLElement>('.tilt');
    if (!tilt) return;
    const xTo = gsap.quickTo(tilt, 'rotationX', { duration: .7, ease: 'power3' });
    const yTo = gsap.quickTo(tilt, 'rotationY', { duration: .7, ease: 'power3' });
    const tiltMove = (event: PointerEvent) => {
      if (card.classList.contains('back')) return;
      const rect = card.getBoundingClientRect();
      xTo(-((event.clientY - rect.top) / rect.height - .5) * 4);
      yTo(((event.clientX - rect.left) / rect.width - .5) * 5);
    };
    const reset = () => { xTo(0); yTo(0); };
    card.addEventListener('pointermove', tiltMove); card.addEventListener('pointerleave', reset);
    cleanups.push(() => { card.removeEventListener('pointermove', tiltMove); card.removeEventListener('pointerleave', reset); });
  });
  return () => cleanups.forEach(cleanup => cleanup());
}
