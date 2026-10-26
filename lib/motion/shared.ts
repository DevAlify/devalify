import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export { gsap, ScrollTrigger };
export const elements = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector));
export type Cleanup = () => void;
export type Once = (element: Element, action: () => void) => void;

export function counterText(element: HTMLElement, value: number) {
  const locale = document.documentElement.lang.startsWith('en') ? 'en-US' : 'pt-BR';
  const formatted = element.dataset.fmt ? new Intl.NumberFormat(locale).format(Math.round(value)) : String(Math.round(value));
  return `${element.dataset.prefix ?? ''}${formatted}${element.dataset.suffix ?? ''}`;
}

export function makeOnce(mobile: boolean, context: gsap.Context, cleanups: Cleanup[]): Once {
  return (element, action) => {
    const run = () => context.add(action);
    if (!mobile) {
      ScrollTrigger.create({ trigger: element, start: 'top 92%', once: true, onEnter: run });
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); run(); }
    }, { rootMargin: '0px 0px -8% 0px' });
    observer.observe(element);
    cleanups.push(() => observer.disconnect());
  };
}
