"use client";

import { useEffect, type RefObject } from "react";
import { frameDue, motionAllowed } from "./frame";

export type SurfaceDraw = (time: number, delta: number) => void | false;
export type SurfaceSetup = (surface: HTMLElement, mobile: boolean) => {
  draw: SurfaceDraw;
  dispose: () => void;
} | undefined;

/** One clock per surface, suspended entirely when its work cannot be seen. */
export function useSurfaceAnimation(ref: RefObject<HTMLElement | null>, setup: SurfaceSetup) {
  useEffect(() => {
    const surface = ref.current;
    if (!surface) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 700px)").matches;
    let current: ReturnType<SurfaceSetup>;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let inView = false;
    const tick = (time: number) => {
      if (!current || !motionAllowed(reduced.matches, !document.hidden, inView)) return;
      if (frameDue(time, previous, mobile)) {
        const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
        previous = time;
        elapsed += delta;
        if (current.draw(elapsed, delta) === false) return;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (reduced.matches) {
        current?.dispose();
        current = undefined;
        return;
      }
      current ??= setup(surface, mobile);
      if (current && motionAllowed(reduced.matches, !document.hidden, inView)) {
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(surface);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      current?.dispose();
    };
  }, [ref, setup]);
}
