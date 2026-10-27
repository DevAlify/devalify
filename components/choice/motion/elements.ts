import type { Choice } from '../../../lib/preferences';
import { must } from '../../motion/dom';

export type ChoiceEls = {
  stage: HTMLElement;
  cards: Record<Choice, HTMLAnchorElement>;
  copy: Record<Choice, HTMLElement>;
  titles: Record<Choice, HTMLElement>;
  resume: Record<Choice, HTMLAnchorElement>;
  canvas: HTMLCanvasElement;
  dither: HTMLElement;
  hint: HTMLElement;
  mono: SVGSVGElement;
  seamLine: SVGLineElement;
  gradient: SVGLinearGradientElement;
  veil: { root: HTMLElement; bg: HTMLElement; line: HTMLElement; curtain: HTMLElement; curtain2: HTMLElement; title: HTMLElement };
};

export function queryChoice(): ChoiceEls {
  return {
    stage: must('#choices'),
    cards: { imersivo: must('#cIm'), editorial: must('#cEd') },
    copy: { imersivo: must('#copyIm'), editorial: must('#copyEd') },
    titles: { imersivo: must('#tIm'), editorial: must('#tEd') },
    resume: { imersivo: must('#resumeIm'), editorial: must('#resumeEd') },
    canvas: must('#grid'),
    dither: must('#dither'),
    hint: must('#hint'),
    mono: must('#mono'),
    seamLine: must('#seamL'),
    gradient: must('#sg'),
    veil: { root: must('#veil'), bg: must('#vBg'), line: must('#vLine'), curtain: must('#vCur'), curtain2: must('#vCur2'), title: must('#vTitle') },
  };
}
