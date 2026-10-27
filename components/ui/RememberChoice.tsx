'use client';

import { useEffect } from 'react';
import { safeStorage, storeChoice, type Choice } from '../../lib/preferences';

/** Remembers the experience being visited, so the selection page can pre-highlight it next time. */
export default function RememberChoice({ kind }: { kind: Choice }) {
  useEffect(() => { storeChoice(safeStorage(), kind); }, [kind]);
  return null;
}
