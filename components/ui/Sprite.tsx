import type { ReactNode } from 'react';
import { ICON_PATHS } from './icon-paths';

export type IconId = keyof typeof ICON_PATHS | 'pause' | 'play';

/** Inline sprite: each page ships only the symbols it uses, plus its own <defs> (filters, gradients). */
export function Sprite({ icons, children }: { icons: IconId[]; children?: ReactNode }) {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    {children && <defs>{children}</defs>}
    {icons.map(id => <symbol key={id} id={`i-${id}`} viewBox="0 0 256 256">{glyph(id)}</symbol>)}
  </svg>;
}

function glyph(id: IconId) {
  if (id === 'pause') return <g fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="round"><rect x="52" y="44" width="56" height="168" rx="6" /><rect x="148" y="44" width="56" height="168" rx="6" /></g>;
  if (id === 'play') return <path d="M76 48 L212 128 L76 208 Z" fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" />;
  return <path d={ICON_PATHS[id]} />;
}

export function Icon({ id, className }: { id: IconId; className?: string }) {
  return <svg className={className ? `ico ${className}` : 'ico'} aria-hidden="true"><use href={`#i-${id}`} /></svg>;
}
