import { all, currentLanguage, must } from '../../motion/dom';

const tipOf = (item: HTMLElement) => (currentLanguage() === 'en' ? item.dataset.enTip : item.dataset.tip) ?? '';

/** Tooltips for the stack items that carry a fact about where they were used (hover and keyboard focus). */
export function setupTooltips(): () => void {
  const abort = new AbortController();
  const { signal } = abort;
  const tip = must<HTMLElement>('#tip');
  const items = all<HTMLElement>('.has-tip');
  const name = (item: HTMLElement) => item.setAttribute('aria-label', `${item.textContent}: ${tipOf(item)}`);
  const hide = () => tip.classList.remove('on');
  const show = (item: HTMLElement) => {
    tip.textContent = tipOf(item);
    tip.classList.add('on');
    const box = item.getBoundingClientRect(), width = tip.offsetWidth, height = tip.offsetHeight;
    const x = Math.max(8, Math.min(window.innerWidth - width - 8, box.left + box.width / 2 - width / 2));
    const above = box.top - height - 10;
    tip.style.left = `${x}px`; tip.style.top = `${above < 8 ? box.bottom + 10 : above}px`;
  };
  items.forEach(item => {
    name(item);
    item.addEventListener('pointerenter', () => show(item), { signal });
    item.addEventListener('focus', () => show(item), { signal });
    item.addEventListener('pointerleave', hide, { signal });
    item.addEventListener('blur', hide, { signal });
  });
  window.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); }, { signal });
  window.addEventListener('portfolio:language-change', () => items.forEach(name), { signal });
  return () => abort.abort();
}
