"use client";

import { useEffect, useState } from 'react';

const leftImages = [
  '/projects/left_right/1_left.gif',
  '/projects/left_right/4_left.gif',
  '/projects/left_right/5_left.gif',
  '/projects/left_right/8_left.gif',
  '/projects/left_right/11_left.gif',
];

const rightImages = [
  '/projects/left_right/2_right.gif',
  '/projects/left_right/3_right.gif',
  '/projects/left_right/6_right.gif',
  '/projects/left_right/7_right.gif',
  '/projects/left_right/10_right.gif',
  '/projects/left_right/12_right.gif',
];

export default function AlternatingSideGifs() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhase((current) => (current + 1) % 20);
    }, 1500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const leftIndex = Math.floor(phase / 2) % leftImages.length;
  const rightIndex = Math.floor(phase / 2) % rightImages.length;
  const leftVisible = phase % 2 === 0;
  const rightVisible = phase % 2 === 1;

  return (
    <div className="story-side-gifs" aria-hidden="true">
      <div className={`story-side-gif story-left-gif ${leftVisible ? 'is-visible' : ''}`}>
        <img src={leftImages[leftIndex]} alt="" />
      </div>

      <div className={`story-side-gif story-right-gif ${rightVisible ? 'is-visible' : ''}`}>
        <img src={rightImages[rightIndex]} alt="" />
      </div>
    </div>
  );
}
