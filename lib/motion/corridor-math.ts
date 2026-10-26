export function corridorPlane(index: number, progress: number, width: number) {
  const distance = index - progress;
  const opacity = distance >= 0 ? Math.max(0, 1 - distance * .62) : Math.max(0, 1 + distance * 1.7);
  return {
    x: (index % 2 ? 1 : -1) * Math.min(width * .2, 300) * (1 + Math.max(0, distance) * .1),
    z: -distance * 820,
    opacity,
    interactive: opacity > .6,
    front: Math.abs(distance) < .45,
  };
}
