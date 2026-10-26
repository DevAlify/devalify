'use client';

import Motion from './Motion';
import Preloader from './Preloader';
import Terminal from './Terminal';
import { useLanguage } from '@/lib/use-language';
import { useInteractions } from '@/lib/use-interactions';

export default function Experience() {
  const language = useLanguage();
  useInteractions(language);
  return <><div className="glow" aria-hidden="true" /><div className="cur" id="cur" aria-hidden="true" /><div className="band" aria-hidden="true" /><div id="tip" role="tooltip" /><Preloader language={language} /><Terminal language={language} /><Motion /></>;
}
