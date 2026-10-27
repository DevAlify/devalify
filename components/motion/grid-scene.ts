/**
 * Perspective grid on a 2D canvas, shared by the selection page and the immersive direction.
 * The math is the approved mockups' own (see grid-paint.ts); the two scenes differ only by their preset.
 * Rendering stops when the canvas leaves the viewport, the tab is hidden, motion is paused or reduced.
 */
import { FOCAL, createScratch, floorAt, paintFrame, seedDust, type Dust } from './grid-paint';
import type { ScenePreset } from './grid-presets';

export { CHOICE_SCENE, IMMERSIVE_SCENE } from './grid-presets';
export type { ScenePreset } from './grid-presets';

/** Live knobs other modules turn: hover boost, scroll velocity, opacity per section. */
export type SceneState = {
  boost: number;
  fast: number;
  vel: number;
  alpha: number;
  alphaTarget: number;
  look: number;
  pointer: { on: boolean; x: number; y: number };
};

export type GridScene = { state: SceneState; setPaused(paused: boolean): void; destroy(): void };
type Options = { reduced: boolean; paused: boolean };

export function createGridScene(canvas: HTMLCanvasElement, preset: ScenePreset, options: Options): GridScene | null {
  const context = canvas.getContext('2d');
  if (!context) return null;
  const ctx: CanvasRenderingContext2D = context;
  const state: SceneState = { boost: 0, fast: 0, vel: 0, alpha: 1, alphaTarget: 1, look: 0, pointer: { on: false, x: -9999, y: -9999 } };
  const scratch = createScratch();
  const abort = new AbortController();
  let width = 0, height = 0, horizon = 0.6, cam = 0, time = 0, lastTime = 0, raf = 0, heat = 0, smoothX = 0, smoothY = 0, pulse = preset.pulse;
  let paused = options.paused, visible = true, dust: Dust[] = [];

  function draw(now: number) {
    const dt = Math.min(0.05, (now - lastTime) / 1000 || 0);
    lastTime = now; time += dt;
    state.vel *= 0.92; state.alpha += (state.alphaTarget - state.alpha) * Math.min(1, dt * 3);
    const speed = options.reduced ? 0 : preset.baseSpeed + state.boost + state.fast + Math.min(Math.abs(state.vel) / 1400, 4);
    state.fast *= 0.95; cam += dt * speed;
    const horizonY = height * horizon, centerX = width / 2 + state.look, focal = FOCAL(height, horizonY);
    if (state.pointer.on) { smoothX += (state.pointer.x - smoothX) * 0.16; smoothY += (state.pointer.y - smoothY) * 0.16; }
    heat += ((state.pointer.on && smoothY > horizonY + 6 ? 1 : 0) - heat) * Math.min(1, dt * 7);
    const on = heat > 0.02;
    const view = { width, height, horizon: horizonY, centerX, focal };
    const floor = { on, heat, amp: heat * (0.05 + pulse), ...(on ? floorAt(view, smoothX, smoothY) : { gx: 0, gz: -1 }) };
    pulse += (0 - pulse) * 0.035;
    paintFrame(ctx, preset, {
      ...view, alpha: state.alpha, speed, dt, time, look: state.look, reduced: options.reduced, floor, dust,
      camera: cam * preset.camScale + (window.scrollY || 0) * preset.scrollGain,
    }, scratch);
  }

  const canRun = () => !options.reduced && !paused && visible && !document.hidden;
  function loop(now: number) { draw(now); raf = canRun() ? requestAnimationFrame(loop) : 0; }
  function start() { if (!raf && canRun()) { lastTime = performance.now(); raf = requestAnimationFrame(loop); } }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth || window.innerWidth; height = canvas.clientHeight || window.innerHeight; horizon = preset.horizon(width);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); dust = seedDust(preset.dustCount(width));
    if (!raf) draw(performance.now());
  }

  let lastMove = 0, lastX = 0, lastY = 0;
  const onMove = (event: PointerEvent) => {
    if (!state.pointer.on) { smoothX = event.clientX; smoothY = event.clientY; }
    state.pointer = { on: true, x: event.clientX, y: event.clientY };
    state.look += ((0.5 - event.clientX / width) * preset.look - state.look) * 0.08;
    const now = performance.now(), speed = Math.hypot(event.clientX - lastX, event.clientY - lastY) / Math.max(8, now - lastMove);
    pulse = Math.min(0.34, Math.max(pulse, speed * 0.09)); lastMove = now; lastX = event.clientX; lastY = event.clientY;
  };
  const { signal } = abort;
  window.addEventListener('resize', resize, { signal });
  window.addEventListener('pointermove', onMove, { passive: true, signal });
  document.documentElement.addEventListener('mouseleave', () => { state.pointer.on = false; }, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); }, { signal });
  const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
    visible = entries[entries.length - 1]?.isIntersecting ?? true;
    if (visible) start(); else stop();
  });
  observer?.observe(canvas);
  resize(); start();

  return {
    state,
    setPaused(next) { paused = next; if (next) stop(); else start(); },
    destroy() { abort.abort(); observer?.disconnect(); stop(); },
  };
}
