/**
 * Each episode is drawn as its own signal: a handful of sine partials picked
 * from a seeded generator and summed under a taper, so the trace fades in and
 * out at the edges of the frame like a station coming through the static.
 *
 * Pure and seeded, so the server render and the client render draw the same
 * path and hydration has nothing to reconcile.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const SIGNAL_WIDTH = 1000;
export const SIGNAL_HEIGHT = 160;

export function signalPath(seed: number, samples = 260): string {
  const rand = mulberry32(seed * 9973 + 17);
  const partials = Array.from({ length: 4 }, (_, k) => ({
    frequency: 2 + rand() * 7 * (k + 1),
    phase: rand() * Math.PI * 2,
    amplitude: (0.55 + rand() * 0.45) / (k + 1),
  }));
  const total = partials.reduce((sum, partial) => sum + partial.amplitude, 0);

  let d = '';
  for (let i = 0; i <= samples; i += 1) {
    const x = i / samples;
    const taper = Math.sin(Math.PI * x) ** 0.7;
    const value =
      partials.reduce(
        (sum, { frequency, phase, amplitude }) =>
          sum + amplitude * Math.sin(2 * Math.PI * frequency * x + phase),
        0,
      ) / total;
    const y = SIGNAL_HEIGHT / 2 - value * taper * SIGNAL_HEIGHT * 0.44;
    d += `${i ? 'L' : 'M'}${(x * SIGNAL_WIDTH).toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}
