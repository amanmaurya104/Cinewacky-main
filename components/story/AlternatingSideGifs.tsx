"use client";

import { useEffect, useState } from 'react';

// Animated WebP, built from the source GIFs by scripts/optimize-side-gifs.mjs
// (30MB of GIF -> 2.4MB). These are pure decoration, so they load at low
// priority and only start cycling once the page itself has settled.
const leftImages = [
  '/projects/left_right/1_left.webp',
  '/projects/left_right/4_left.webp',
  '/projects/left_right/5_left.webp',
  '/projects/left_right/8_left.webp',
  '/projects/left_right/11_left.webp',
];

const rightImages = [
  '/projects/left_right/2_right.webp',
  '/projects/left_right/3_right.webp',
  '/projects/left_right/6_right.webp',
  '/projects/left_right/7_right.webp',
  '/projects/left_right/10_right.webp',
  '/projects/left_right/12_right.webp',
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
}
