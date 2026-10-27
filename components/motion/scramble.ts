import { gsap } from 'gsap';
import { currentLanguage } from './dom';

export const DECODE_CHARS = '01/_+*#=%';

type DecodeOptions = { duration?: number; delay?: number; reveal?: number; speed?: number };
const running = new WeakMap<Element, gsap.core.Tween>();

/**
 * The text a decode reveals, in the current language. It comes from the data attributes (data-pt is set by
 * useLanguage), never from the DOM, which holds scrambled characters while a decode runs.
 */
export function finalText(element: HTMLElement): string {
  if (element.dataset.en === undefined) return element.dataset.final ?? element.textContent ?? '';
  return (currentLanguage() === 'en' ? element.dataset.en : element.dataset.pt) ?? element.textContent ?? '';
}

export function rememberFinal(element: HTMLElement) {
  element.dataset.final = finalText(element);
}

/** A scramble tween that reveals the element's final text left to right. Only one runs per element. */
export function decodeTween(element: HTMLElement, { duration = 1, delay = 0, reveal = 0.15, speed = 0.7 }: DecodeOptions = {}) {
  if (!element.dataset.final) rememberFinal(element);
  running.get(element)?.kill();
  const tween = gsap.to(element, { duration, delay, ease: 'none', scrambleText: { text: element.dataset.final ?? '', chars: DECODE_CHARS, revealDelay: reveal, speed } });
  running.set(element, tween);
  return tween;
}

/** Starts a decode now. */
export const decode = (element: HTMLElement, options?: DecodeOptions) => { decodeTween(element, options); };

/**
 * Stops the decode of these elements so it cannot write old text over a language swap, and puts their clean text back
 * (a killed scramble leaves random characters behind). `show` also reveals them.
 */
export function releaseText(elements: HTMLElement[], show = false) {
  elements.forEach(element => {
    running.get(element)?.kill();
    running.delete(element);
    element.textContent = finalText(element);
    if (show) gsap.set(element, { opacity: 1 });
  });
}
