import { MOTION_KEY } from './preferences.ts';

type Options = { arrive?: boolean; motionPref?: boolean };

/**
 * Inline script for <head>. It runs before first paint and decides the motion mode, so the CSS can hide
 * entrance states without a flash and nothing stays hidden when motion is reduced or scripts fail.
 */
export function headScript({ arrive = false, motionPref = false }: Options = {}): string {
  return [
    "(function(){var d=document.documentElement;d.classList.add('js');",
    "try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');else d.classList.add('anim');}catch(e){d.classList.add('anim');}",
    motionPref ? `try{if(localStorage.getItem('${MOTION_KEY}')==='paused')d.classList.add('motion-paused');}catch(e){}` : '',
    arrive ? "if(/[?&]from=selecao/.test(location.search)&&!d.classList.contains('reduced'))d.classList.add('arrive');" : '',
    '})();',
  ].join('');
}
