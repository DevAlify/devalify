import type { ScenePreset } from './grid-presets';

// World units of the grid: cell size, camera height, near and far planes, number of lanes, ripple spread.
const G = 0.3, CH = 1, ZN = 0.9, ZF = 15, NL = 30, SIGMA = 0.8, REACH = SIGMA * 3.4;
const CY = '25,240,255', GLOW = '190,252,255', HOT = '120,248,255', DUST = '180,250,255', MAG = '255,43,214';
const rgba = (rgb: string, alpha: number) => `rgba(${rgb},${alpha})`;

export type Dust = { x: number; y: number; z: number; mag: boolean };
export const respawnDust = (z: number): Dust => ({ x: (Math.random() * 2 - 1) * 7, y: 0.15 + Math.random() * 2.2, z, mag: Math.random() < 0.07 });
export const seedDust = (count: number): Dust[] => Array.from({ length: count }, () => respawnDust(ZN + Math.random() * (ZF - ZN)));

/** Everything one frame needs; the scene loop computes it. */
export type View = {
  width: number; height: number; horizon: number; centerX: number; focal: number;
  alpha: number; speed: number; dt: number; time: number; camera: number; look: number; reduced: boolean;
  /** The pointer on the floor: ripple center (gx, gz), amplitude and how strongly it is felt (0 to 1). */
  floor: { on: boolean; gx: number; gz: number; amp: number; heat: number };
  dust: Dust[];
};
export type Scratch = { hot: number[]; probe: Float64Array };
export const createScratch = (): Scratch => ({ hot: [], probe: new Float64Array(2) });

/** Ripple under the pointer: height in probe[0], influence in probe[1]. */
function ripple({ probe }: Scratch, view: View, X: number, Z: number) {
  const { gx, gz, amp } = view.floor;
  const dx = X - gx, dz = Z - gz, r2 = dx * dx + dz * dz;
  if (r2 > REACH * REACH) { probe[0] = 0; probe[1] = 0; return; }
  const bump = Math.exp(-r2 / (2 * SIGMA * SIGMA));
  const ring = Math.exp(-r2 / (2 * (SIGMA * 1.9) ** 2)) * Math.cos(Math.sqrt(r2) * 7 - view.time * 5.5);
  probe[0] = amp * (0.55 * bump + 0.45 * ring);
  probe[1] = Math.exp(-r2 / (2 * (SIGMA * 1.45) ** 2));
}

function paintHorizon(ctx: CanvasRenderingContext2D, preset: ScenePreset, { width, horizon, alpha }: View) {
  const { up, down, alpha: glow } = preset.glow;
  const halo = ctx.createLinearGradient(0, horizon - up, 0, horizon + down);
  halo.addColorStop(0, rgba(CY, 0)); halo.addColorStop(0.46, rgba(CY, glow[0] * alpha)); halo.addColorStop(0.5, rgba(CY, glow[1] * alpha));
  halo.addColorStop(0.58, rgba(CY, glow[2] * alpha)); halo.addColorStop(1, rgba(CY, 0));
  ctx.fillStyle = halo; ctx.fillRect(0, horizon - up, width, up + down);
  const { inner, core } = preset.hairline;
  const line = ctx.createLinearGradient(0, 0, width, 0);
  line.addColorStop(0, rgba(CY, 0)); line.addColorStop(inner, rgba(CY, 0.45 * alpha)); line.addColorStop(0.5, rgba(GLOW, core * alpha));
  line.addColorStop(1 - inner, rgba(CY, 0.45 * alpha)); line.addColorStop(1, rgba(CY, 0));
  ctx.fillStyle = line; ctx.fillRect(0, horizon - 0.5, width, 1);
}

/** Dust in world coordinates; it stretches into radial streaks when the camera speeds up. */
function paintDust(ctx: CanvasRenderingContext2D, preset: ScenePreset, view: View) {
  const { width, height, horizon, centerX, focal, alpha, speed, dt } = view;
  const { drift, speedGain, trailGain, trailCap, alpha: dustAlpha } = preset.dust;
  ctx.lineCap = 'round';
  for (const p of view.dust) {
    p.z -= dt * (drift + speed * speedGain);
    if (p.z < ZN * 0.7) Object.assign(p, respawnDust(ZF));
    const sp = focal / p.z, sx = centerX + p.x * sp, sy = horizon + (CH - p.y) * sp;
    if (sy < -20 || sy > height + 20 || sx < -20 || sx > width + 20) continue;
    const sp2 = focal / (p.z + 0.04 + Math.min(speed, trailCap) * trailGain);
    const a = (1 - p.z / ZF) ** 1.3 * dustAlpha * alpha;
    ctx.strokeStyle = p.mag ? rgba(MAG, a * 0.8) : rgba(DUST, a);
    ctx.lineWidth = 0.6 + Math.min(1.2, sp / 260);
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(centerX + p.x * sp2, horizon + (CH - p.y) * sp2 + 0.01); ctx.stroke();
  }
}

/** Lanes converge to the horizon and cross lines scroll toward the camera; near the pointer they are sampled and displaced. */
function paintLines(ctx: CanvasRenderingContext2D, preset: ScenePreset, view: View, scratch: Scratch) {
  const { width, horizon, centerX, focal, alpha, camera, look } = view;
  const { on } = view.floor, { hot, probe } = scratch;
  const lanes = ctx.createLinearGradient(0, horizon, 0, view.height);
  lanes.addColorStop(0, rgba(CY, 0)); lanes.addColorStop(0.3, rgba(CY, 0.1 * alpha)); lanes.addColorStop(1, rgba(CY, preset.verticalEnd * alpha));
  ctx.lineWidth = 1; ctx.strokeStyle = lanes; ctx.beginPath();
  hot.length = 0;
  for (let i = -NL; i <= NL; i++) {
    const X = i * G;
    if (!on || Math.abs(X - view.floor.gx) > REACH) { ctx.moveTo(centerX + (X * focal) / ZF, horizon + (CH * focal) / ZF); ctx.lineTo(centerX + (X * focal) / ZN, horizon + (CH * focal) / ZN); continue; }
    const M = preset.samples.vertical;
    let px = 0, py = 0;
    for (let m = 0; m <= M; m++) {
      const Z = 1 / (1 / ZF + (1 / ZN - 1 / ZF) * (m / M));
      ripple(scratch, view, X, Z);
      const sx = centerX + (X * focal) / Z, sy = horizon + ((CH - probe[0]) * focal) / Z;
      if (m === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      if (probe[1] > 0.06 && m > 0) hot.push(px, py, sx, sy, probe[1]);
      px = sx; py = sy;
    }
  }
  ctx.stroke();
  const frac = ((camera % G) + G) % G;
  for (let j = 0; j < Math.ceil((ZF - ZN) / G) + 1; j++) {
    const Z = ZN + j * G - frac;
    if (Z < ZN * 0.75 || Z > ZF) continue;
    const fog = (1 - Z / ZF) ** 1.5, sp = focal / Z, reach = (width / 2 + 260 + Math.abs(look)) / sp;
    const near = on && Math.abs(Z - view.floor.gz) < REACH, M = near ? preset.samples.near : 1;
    ctx.strokeStyle = rgba(CY, (0.05 + 0.3 * fog) * alpha); ctx.beginPath();
    let px = 0, py = 0;
    for (let n = 0; n <= M; n++) {
      const X = -reach + (2 * reach * n) / M;
      if (near) ripple(scratch, view, X, Z); else { probe[0] = 0; probe[1] = 0; }
      const sx = centerX + X * sp, sy = horizon + (CH - probe[0]) * sp;
      if (n === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      if (probe[1] > 0.06 && n > 0) hot.push(px, py, sx, sy, probe[1]);
      px = sx; py = sy;
    }
    ctx.stroke();
  }
}

/** The segments near the pointer glow, in four brightness bands blended additively. */
function paintHeat(ctx: CanvasRenderingContext2D, { hot }: Scratch, { alpha, floor }: View) {
  if (!hot.length) return;
  ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1.3;
  for (let band = 0; band < 4; band++) {
    const lo = 0.06 + band * 0.24, hi = lo + 0.24;
    ctx.strokeStyle = rgba(HOT, Math.min(0.9, (lo + 0.12) * 1.05) * alpha * floor.heat); ctx.beginPath();
    for (let h = 0; h < hot.length; h += 5) {
      const v = hot[h + 4];
      if (v >= lo && (v < hi || band === 3)) { ctx.moveTo(hot[h], hot[h + 1]); ctx.lineTo(hot[h + 2], hot[h + 3]); }
    }
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over';
}

/** Thin scanlines and a slow light band, only on the selection page. */
function paintScanlines(ctx: CanvasRenderingContext2D, { width, height, time, reduced }: View) {
  ctx.fillStyle = 'rgba(0,0,0,.14)';
  for (let y = 0; y < height; y += 3) ctx.fillRect(0, y, width, 1);
  if (reduced) return;
  const by = ((time * 60) % (height + 240)) - 120, band = ctx.createLinearGradient(0, by - 80, 0, by + 80);
  band.addColorStop(0, rgba(CY, 0)); band.addColorStop(0.5, rgba(CY, 0.045)); band.addColorStop(1, rgba(CY, 0));
  ctx.fillStyle = band; ctx.fillRect(0, by - 80, width, 160);
}

/** One frame of the scene: horizon glow, dust, grid, heat near the pointer, optional scanlines. */
export function paintFrame(ctx: CanvasRenderingContext2D, preset: ScenePreset, view: View, scratch: Scratch) {
  ctx.clearRect(0, 0, view.width, view.height);
  paintHorizon(ctx, preset, view);
  paintDust(ctx, preset, view);
  paintLines(ctx, preset, view, scratch);
  paintHeat(ctx, scratch, view);
  if (preset.scanlines) paintScanlines(ctx, view);
}

/** Camera depth at the pointer: where on the floor (in world units) the pointer is, for the ripple. */
export function floorAt(view: Pick<View, 'horizon' | 'centerX' | 'focal'>, x: number, y: number) {
  const gz = (CH * view.focal) / Math.max(8, y - view.horizon);
  return { gz, gx: ((x - view.centerX) * gz) / view.focal };
}
export const FOCAL = (height: number, horizon: number) => ((height - horizon) * ZN) / CH;
