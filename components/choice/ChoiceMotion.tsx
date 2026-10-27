'use client';

import { useEffect } from 'react';
import { CHOICE_TEXTS } from '../../lib/page-texts';
import { useLanguage } from '../../lib/use-language';
import { setupChoice } from './motion/choice-motion';

/** Attaches the selection page behavior to the server-rendered markup. Renders nothing. */
export default function ChoiceMotion() {
  useLanguage(CHOICE_TEXTS);
  useEffect(() => setupChoice(), []);
  return null;
}
