import type { Transition } from 'framer-motion';

const INSTANT = { duration: 0, delay: 0 };

/**
 * `transition`, or under reduced motion a version where movement (x, y, scale)
 * jumps straight to its end while fades keep their timing.
 *
 * Applying reduced motion here, instead of through a smaller `initial`, keeps
 * `initial` the same for every visitor. `initial` is what framer-motion writes
 * into the server HTML, so it has to match on the client too.
 */
export function respectReducedMotion(
  transition: Transition,
  reduceMotion: boolean | null,
): Transition {
  return reduceMotion ? { ...transition, x: INSTANT, y: INSTANT, scale: INSTANT } : transition;
}
