'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatCount } from '../../lib/locale';
import { motionPolicy } from '../../lib/motion-policy';
import { EDITORIAL_TEXTS } from '../../lib/page-texts';
import { useLanguage } from '../../lib/use-language';

type Policy = ReturnType<typeof motionPolicy>;

function setupMotion(policy: Policy) {
  const { reduced, parallax } = policy;
  document.documentElement.classList.toggle('anim', !reduced);
  gsap.set('.name i, .hero .rv, .mono-art .m1, .mono-art .m2', { animation: 'none' });
  const ease = 'expo.out';
  const reveal = (element: Element, scrollTrigger?: ScrollTrigger.Vars) => gsap.fromTo(element,
    { opacity: reduced ? 0.65 : 0, y: reduced ? 0 : 40 },
    { opacity: 1, y: 0, duration: reduced ? 0.2 : 1.1, ease, scrollTrigger });
  if (reduced) gsap.fromTo('.name i', { opacity: 0.65 }, { opacity: 1, duration: 0.2 });
  else gsap.to('.name i', { y: 0, yPercent: 0, duration: 1.3, ease, stagger: 0.14, delay: 0.1 });
  document.querySelectorAll('.hero .rv').forEach(element => reveal(element));
  document.querySelectorAll<SVGPathElement>('.mono-art .m1').forEach((path, index) => {
    gsap.fromTo(path, { strokeDashoffset: reduced ? 0 : 100, opacity: reduced ? 0.65 : 1 },
      { strokeDashoffset: 0, autoRound: false, opacity: 1, duration: reduced ? 0.2 : 1.6,
      ease: 'power2.inOut', delay: reduced ? 0 : 0.3 + index * 0.45 });
  });
  gsap.fromTo('.mono-art .m2', { opacity: 0, x: reduced ? 0 : -14, y: reduced ? 0 : -14 },
    { opacity: 0.5, x: 0, y: 0, duration: reduced ? 0.2 : 1.4, ease, delay: reduced ? 0 : 1.6 });
  if (!reduced) gsap.to('.mono-art', { y: -parallax, rotate: -4, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('#reading-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: reduced ? true : 0.3 } });
  document.querySelectorAll('.portrait-mask').forEach(element => {
    if (reduced) reveal(element, { trigger: element, start: 'top 92%', once: true });
    else gsap.fromTo(element, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', ease: 'none',
      scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 45%', scrub: 0.6 } });
  });
  if (!reduced) document.querySelectorAll('.portrait-photo').forEach(element => gsap.fromTo(element,
    { y: parallax / 2, filter: 'grayscale(1)' }, { y: -parallax / 2, filter: 'grayscale(0)', ease: 'none',
      scrollTrigger: { trigger: element.parentElement, start: 'top 95%', end: 'bottom 30%', scrub: 0.6 } }));
  const track = document.querySelector<HTMLElement>('.pan .track');
  const pan = track?.parentElement;
  if (policy.pinCases) pan?.classList.add('motion-horizontal');
  const distance = () => Math.max(0, (track?.scrollWidth ?? 0) - (pan?.clientWidth ?? 0));
  const horizontal = policy.pinCases && track && pan ? gsap.to(track, { x: () => -distance(), ease: 'none',
    scrollTrigger: { trigger: pan, start: 'top top+=40', end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true } }) : undefined;
  let focusFrame = 0;
  const focusCase = (event: FocusEvent) => {
    const card = event.target instanceof Element ? event.target.closest<HTMLElement>('.cs') : null;
    const trigger = horizontal?.scrollTrigger;
    if (!card || !trigger || !distance()) return;
    cancelAnimationFrame(focusFrame);
    focusFrame = requestAnimationFrame(() => {
      if (pan) pan.scrollLeft = 0;
      const progress = Math.min(1, Math.max(0, (card.offsetLeft - (track?.offsetLeft ?? 0)) / distance()));
      const destination = trigger.start + (trigger.end - trigger.start) * progress;
      window.scrollTo({ top: destination, left: 0, behavior: 'instant' });
      ScrollTrigger.update();
      trigger.getTween()?.progress(1);
      horizontal.progress(progress);
    });
  };
  if (horizontal) track?.addEventListener('focusin', focusCase);
  const cleanPan = () => {
    cancelAnimationFrame(focusFrame);
    track?.removeEventListener('focusin', focusCase);
    pan?.classList.remove('motion-horizontal');
  };
  document.querySelectorAll('section:not(.hero) .rv').forEach(element => {
    if (!element.closest('.cs')) reveal(element, { trigger: element, start: 'top 90%', once: true });
  });
  document.querySelectorAll('.cs').forEach((card, cardIndex) => {
    card.querySelectorAll('h3, p, li, .k, .case-link').forEach((element, index) => {
      const containerAnimation = horizontal && card.getBoundingClientRect().left >= innerWidth * 0.9 ? horizontal : undefined;
      const tween = reveal(element, { trigger: containerAnimation ? card : cardIndex === 0 ? card : element, start: containerAnimation ? 'left 90%' : 'top 92%',
        once: true, containerAnimation });
      if (horizontal) tween.delay(Math.min(index * 0.08, 0.4));
    });
  });
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(element => {
    const state = { value: policy.count ? 0 : Number(element.dataset.count) };
    const update = () => { element.textContent = formatCount(Math.round(state.value), document.documentElement.lang.startsWith('pt') ? 'pt' : 'en',
      { prefix: element.dataset.prefix, suffix: element.dataset.suffix, grouped: !!element.dataset.fmt }); };
    if (!policy.count) { update(); return; }
    const card = element.closest('.cs');
    const containerAnimation = horizontal && card && card.getBoundingClientRect().left >= innerWidth * 0.9 ? horizontal : undefined;
    gsap.to(state, { value: Number(element.dataset.count), duration: 1.6, ease: 'power2.out', onUpdate: update,
      scrollTrigger: { trigger: containerAnimation && card ? card : element, start: containerAnimation ? 'left 90%' : 'top 92%', once: true,
        containerAnimation } });
  });
  document.querySelectorAll('.yr').forEach(element => ScrollTrigger.create({ trigger: element,
    start: 'top 62%', end: 'bottom 38%', toggleClass: { targets: element, className: 'on' } }));
  const ring = document.querySelector<HTMLElement>('.ring');
  if (!policy.magnetic || !ring) return cleanPan;
  const x = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3' });
  const y = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'power3' });
  const move = (event: PointerEvent) => {
    const bounds = ring.getBoundingClientRect();
    x((event.clientX - bounds.left - bounds.width / 2) * 0.35);
    y((event.clientY - bounds.top - bounds.height / 2) * 0.35);
  };
  const leave = () => { x(0); y(0); };
  ring.addEventListener('pointermove', move);
  ring.addEventListener('pointerleave', leave);
  return () => { cleanPan(); ring.removeEventListener('pointermove', move); ring.removeEventListener('pointerleave', leave); };
}

export default function Motion() {
  useLanguage(EDITORIAL_TEXTS);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 901px)', reduced: '(prefers-reduced-motion: reduce)', fine: '(hover: hover) and (pointer: fine)', all: 'all' }, context => {
      const conditions = context.conditions ?? {};
      return setupMotion(motionPolicy(conditions.desktop ? 901 : 900, Boolean(conditions.reduced), Boolean(conditions.fine)));
    });
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    void document.fonts.ready.then(refresh);
    const images = Array.from(document.images);
    images.forEach(image => image.addEventListener('load', refresh));
    window.addEventListener('portfolio:language-change', refresh);
    return () => {
      active = false;
      media.revert();
      document.documentElement.classList.remove('anim');
      images.forEach(image => image.removeEventListener('load', refresh));
      window.removeEventListener('portfolio:language-change', refresh);
    };
  }, []);
  return null;
}
