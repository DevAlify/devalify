import type { Choice } from './preferences.ts';

/** Seam position (percent of the width) for the highlighted half. The other half recedes. */
export function restPercent(active: Choice | null): number {
  if (active === 'imersivo') return 63;
  if (active === 'editorial') return 37;
  return 50;
}

/** Horizontal slant of the seam in pixels, mirrored around its center. */
export function slantFor(width: number): number {
  return width * 0.034;
}

/** x of the slanted seam at a given y: leans right at the top and left at the bottom. */
export function seamXAt(width: number, height: number, percent: number, slant: number, y: number): number {
  return (width * percent) / 100 + slant - (y / height) * 2 * slant;
}

/** Half under the pointer. Near the seam the current half wins, so the seam does not flicker. */
export function sideAt(clientX: number, seamX: number, active: Choice | null, hysteresis = 18): Choice {
  const side: Choice = clientX < seamX ? 'imersivo' : 'editorial';
  if (active && side !== active && Math.abs(clientX - seamX) < hysteresis) return active;
  return side;
}
