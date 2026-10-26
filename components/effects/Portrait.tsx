"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useSurfaceAnimation, type SurfaceSetup } from "./useSurfaceAnimation";
import { portraitFragment, portraitVertex } from "./portraitShader";
import "./effects.css";

const setupPortrait: SurfaceSetup = (surface, mobile) => {
  const canvas = surface.querySelector("canvas");
  if (!canvas) return;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1 : 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  const css = getComputedStyle(surface);
  const color = (token: string) => new THREE.Color(css.getPropertyValue(token).trim());
  const uniforms = {
    uPhoto: { value: new THREE.Texture() },
    uTime: { value: 0 }, uHover: { value: 0 }, uGlitch: { value: 0 },
    uAspect: { value: 1 }, uImageAspect: { value: 1 },
    uPointer: { value: new THREE.Vector2() }, uTexel: { value: new THREE.Vector2() },
    uCyan: { value: color("--cy") }, uMagenta: { value: color("--mag") },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: portraitVertex, fragmentShader: portraitFragment,
    transparent: true, premultipliedAlpha: true, depthTest: false,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));
  let disposed = false;
  let loaded = false;
  let failed = false;
  let hover = 0;
  let nextGlitch = 6 + Math.random() * 6;
  let glitchEnd = 0;
  const pointer = new THREE.Vector2();
  const resize = () => {
    const { width, height } = surface.getBoundingClientRect();
    renderer.setSize(width, height, false);
    uniforms.uAspect.value = width / Math.max(height, 1);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(surface);
  resize();
  const texture = new THREE.TextureLoader().load("/devalify/alify.webp", (photo) => {
    if (disposed) { photo.dispose(); return; }
    uniforms.uPhoto.value.dispose();
    uniforms.uPhoto.value = photo;
    const image = photo.image as HTMLImageElement;
    uniforms.uImageAspect.value = image.width / image.height;
    uniforms.uTexel.value.set(1 / image.width, 1 / image.height);
    loaded = true;
  }, undefined, () => { failed = true; });
  const enter = () => { hover = 1; };
  const leave = () => { hover = 0; pointer.set(0, 0); };
  const move = (event: PointerEvent) => {
    const bounds = surface.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width - .5,
      (event.clientY - bounds.top) / bounds.height - .5);
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    failed = true;
    delete surface.dataset.webgl;
  };
  surface.addEventListener("pointerenter", enter);
  surface.addEventListener("pointerleave", leave);
  surface.addEventListener("pointermove", move);
  canvas.addEventListener("webglcontextlost", contextLost);
  return {
    draw(time, delta) {
      if (failed) return false;
      if (!loaded) return;
      uniforms.uTime.value = time;
      uniforms.uHover.value += (hover - uniforms.uHover.value) * Math.min(delta * 8, 1);
      uniforms.uPointer.value.lerp(pointer, Math.min(delta * 6, 1));
      if (time >= nextGlitch) {
        glitchEnd = time + .24;
        nextGlitch = time + 6 + Math.random() * 6;
      }
      uniforms.uGlitch.value = time < glitchEnd ? 1 : 0;
      try {
        renderer.render(scene, camera);
        surface.dataset.webgl = "ready";
      } catch {
        failed = true;
        delete surface.dataset.webgl;
      }
    },
    dispose() {
      disposed = true;
      delete surface.dataset.webgl;
      resizeObserver.disconnect();
      surface.removeEventListener("pointerenter", enter);
      surface.removeEventListener("pointerleave", leave);
      surface.removeEventListener("pointermove", move);
      canvas.removeEventListener("webglcontextlost", contextLost);
      texture.dispose();
      uniforms.uPhoto.value.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
};

export default function Portrait({ alt, englishAlt }: { alt: string; englishAlt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useSurfaceAnimation(ref, setupPortrait);
  return <div className="ph portrait-effect" id="ph" ref={ref}>
    {/* The semantic image remains available to assistive technology and without WebGL. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/devalify/alify.webp" alt={alt} data-en-alt={englishAlt} width="520" height="640" />
    <canvas className="portrait-canvas" aria-hidden="true" />
  </div>;
}
