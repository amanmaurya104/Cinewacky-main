"use client";

import { useEffect, useState } from 'react';

// Animated WebP, built from the source GIFs by scripts/optimize-side-gifs.mjs
// (30MB of GIF -> 2.4MB). These are pure decoration, so they load at low
// priority and only start cycling once the page itself has settled.
const leftImages = [
  '/projects/side-loops/left-01.webp',
  '/projects/side-loops/left-04.webp',
  '/projects/side-loops/left-05.webp',
  '/projects/side-loops/left-08.webp',
  '/projects/side-loops/left-11.webp',
];

const rightImages = [
  '/projects/side-loops/right-02.webp',
  '/projects/side-loops/right-03.webp',
  '/projects/side-loops/right-06.webp',
  '/projects/side-loops/right-07.webp',
  '/projects/side-loops/right-10.webp',
  '/projects/side-loops/right-12.webp',
];

export default function AlternatingSideGifs() {
  const [phase, setPhase] = useState(0);
  const [started, setStarted] = useState(false);

  // Hold the decoration back until the hero and its video have had the network
  // to themselves, so the loops never delay the content the page is actually about.
  useEffect(() => {
    const start = () => setStarted(true);

    if (document.readyState === 'complete') {
      const timer = window.setTimeout(start, 600);
      return () => window.clearTimeout(timer);
    }

    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  useEffect(() => {
    if (!started) return;

    const interval = window.setInterval(() => {
      setPhase((current) => (current + 1) % 20);
    }, 1500);

    return () => {
      window.clearInterval(interval);
    };
  }, [started]);

  const leftIndex = Math.floor(phase / 2) % leftImages.length;
  const rightIndex = Math.floor(phase / 2) % rightImages.length;
  const leftVisible = started && phase % 2 === 0;
  const rightVisible = started && phase % 2 === 1;

  // Plain <img>: these are animated WebP, which next/image serves unoptimized
  // anyway, and they deliberately load at low priority.
  /* eslint-disable @next/next/no-img-element */
  return (
    <div className="story-side-gifs" aria-hidden="true">
      <div className={`story-side-gif story-left-gif ${leftVisible ? 'is-visible' : ''}`}>
        {started ? (
          <img src={leftImages[leftIndex]} alt="" decoding="async" fetchPriority="low" />
        ) : null}
      </div>

      <div className={`story-side-gif story-right-gif ${rightVisible ? 'is-visible' : ''}`}>
        {started ? (
          <img src={rightImages[rightIndex]} alt="" decoding="async" fetchPriority="low" />
        ) : null}
      </div>
    </div>
  );
  /* eslint-enable @next/next/no-img-element */
}
