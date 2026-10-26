"use client";

import { useRef } from "react";
import { useSurfaceAnimation, type SurfaceSetup } from "./useSurfaceAnimation";

const setupTunnel: SurfaceSetup = (surface, mobile) => {
  if (!(surface instanceof HTMLCanvasElement)) return;
  const context = surface.getContext("2d");
  if (!context) return;
  const css = getComputedStyle(surface);
  const colors = ["--cy", "--mag", "--amb"].map((token) => css.getPropertyValue(token).trim());
  let width = 0;
  let height = 0;
  let offsetX = 0;
  let offsetY = 0;
  let targetX = 0;
  let targetY = 0;
  const stars = Array.from({ length: mobile ? 100 : 190 }, () => ({
    x: Math.random() * 2 - 1, y: Math.random() * 2 - 1,
    z: Math.random() * .95 + .05,
    color: Math.random() < .22 ? colors[1] : Math.random() < .1 ? colors[2] : colors[0],
  }));
  const resize = () => {
    width = surface.clientWidth;
    height = surface.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.5);
    surface.width = width * ratio;
    surface.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(surface);
  resize();
  const pointer = (event: PointerEvent) => {
    targetX = (event.clientX / innerWidth - .5) * -60;
    targetY = (event.clientY / innerHeight - .5) * -40;
  };
  if (!mobile) window.addEventListener("pointermove", pointer, { passive: true });
  return {
    draw(_time, delta) {
      offsetX += (targetX - offsetX) * .05;
      offsetY += (targetY - offsetY) * .05;
      context.clearRect(0, 0, width, height);
      const focal = Math.max(width, height) * .55;
      for (const star of stars) {
        star.z -= .22 * delta;
        if (star.z < .04) {
          star.z = 1;
          star.x = Math.random() * 2 - 1;
          star.y = Math.random() * 2 - 1;
        }
        const alpha = Math.pow(1 - star.z, 1.6);
        const project = (value: number, depth: number) => value / depth * focal * .5;
        context.strokeStyle = star.color || colors[0];
        context.globalAlpha = alpha * .9;
        context.lineWidth = .6 + alpha * 1.5;
        context.beginPath();
        context.moveTo(width / 2 + offsetX + project(star.x, star.z + .22 * .07),
          height / 2 + offsetY + project(star.y, star.z + .22 * .07));
        context.lineTo(width / 2 + offsetX + project(star.x, star.z),
          height / 2 + offsetY + project(star.y, star.z));
        context.stroke();
      }
      context.globalAlpha = 1;
    },
    dispose() {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", pointer);
      context.clearRect(0, 0, width, height);
    },
  };
};

export default function Tunnel() {
  const ref = useRef<HTMLCanvasElement>(null);
  useSurfaceAnimation(ref, setupTunnel);
  return <canvas id="tunnel" ref={ref} aria-hidden="true" />;
}
