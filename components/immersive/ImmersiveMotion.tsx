'use client';

import { useEffect } from 'react';
import { IMMERSIVE_TEXTS } from '../../lib/page-texts';
import { useLanguage } from '../../lib/use-language';
import { setupImmersive } from './motion/immersive-motion';

/** Attaches the immersive page behavior to the server-rendered markup. Renders nothing. */
export default function ImmersiveMotion() {
  useLanguage(IMMERSIVE_TEXTS);
  useEffect(() => setupImmersive(), []);
  return null;
}
