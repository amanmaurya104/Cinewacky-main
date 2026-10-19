"use client";

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

/**
 * Whether the visitor asked for reduced motion, safe to render from.
 *
 * framer-motion's useReducedMotion reads the media query during the first
 * client render, while the server has no way to know it — so markup built
 * from it differs between the two and React throws the page away on
 * hydration. Here the server and the hydrating render both see `false`, and
 * React re-renders with the real value straight after.
 *
 * Use this when the answer changes what is rendered (text, attributes, which
 * elements exist). framer-motion's useReducedMotion is still right for
 * `transition` and `animate` values and for effects: none of those reach the
 * server HTML, and they need the real answer from the very first frame.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
