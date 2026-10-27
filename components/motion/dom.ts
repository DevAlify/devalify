/** First match or a loud error: a missing element means the markup and the motion code drifted apart. */
export function must<T extends Element>(selector: string, parent: ParentNode = document): T {
  const element = parent.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

export const all = <T extends Element>(selector: string, parent: ParentNode = document): T[] =>
  Array.from(parent.querySelectorAll<T>(selector));

/** Flags the head script put on <html> before hydration. */
export function motionFlags() {
  const root = document.documentElement;
  const reduced = root.classList.contains('reduced');
  return { root, reduced, anim: root.classList.contains('anim') && !reduced };
}

export const currentLanguage = () => (document.documentElement.lang.startsWith('en') ? 'en' : 'pt');
