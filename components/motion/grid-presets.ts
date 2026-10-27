/** What differs between the two perspective-grid scenes of the approved mockups. The math is shared. */
export type ScenePreset = {
  horizon: (width: number) => number;
  dustCount: (width: number) => number;
  dust: { drift: number; speedGain: number; trailGain: number; trailCap: number; alpha: number };
  baseSpeed: number;
  camScale: number;
  scrollGain: number;
  look: number;
  pulse: number;
  glow: { up: number; down: number; alpha: [number, number, number] };
  hairline: { inner: number; core: number };
  verticalEnd: number;
  samples: { vertical: number; near: number };
  scanlines: boolean;
};

export const CHOICE_SCENE: ScenePreset = {
  horizon: () => 0.6, dustCount: width => (width < 700 ? 30 : 60),
  dust: { drift: 0.2, speedGain: 0.8, trailGain: 0.06, trailCap: 8, alpha: 0.55 },
  baseSpeed: 0, camScale: 0.9, scrollGain: 0, look: 28, pulse: 0.04,
  glow: { up: 60, down: 80, alpha: [0.09, 0.3, 0.05] }, hairline: { inner: 0.2, core: 0.9 },
  verticalEnd: 0.32, samples: { vertical: 24, near: 36 }, scanlines: true,
};

export const IMMERSIVE_SCENE: ScenePreset = {
  horizon: width => (width < 900 ? 0.9 : 0.76), dustCount: width => (width < 700 ? 40 : 80),
  dust: { drift: 0.25, speedGain: 0.9, trailGain: 0.07, trailCap: 6, alpha: 0.6 },
  baseSpeed: 0.55, camScale: 1, scrollGain: 0.0032, look: 34, pulse: 0.05,
  glow: { up: 70, down: 90, alpha: [0.1, 0.32, 0.05] }, hairline: { inner: 0.18, core: 0.95 },
  verticalEnd: 0.34, samples: { vertical: 26, near: 40 }, scanlines: false,
};
