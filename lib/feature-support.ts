type Supports = (property: string, value: string) => boolean;

/**
 * The portrait RGB split uses SVG filters on HTML images plus screen blending.
 * Checked by feature, never by user agent; any doubt means the simple fallback.
 */
export function rgbSplitSupported(supports: Supports | undefined): boolean {
  if (!supports) return false;
  try {
    return supports('filter', 'url(#probe)') && supports('mix-blend-mode', 'screen');
  } catch {
    return false;
  }
}
