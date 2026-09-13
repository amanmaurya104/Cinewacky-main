'use client';

import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  poster?: string;
};

/**
 * The silent loop behind the title. CSS can hide it but it cannot stop it
 * playing, and a reader who has asked for reduced motion should get the frame
 * rather than the clip — so this holds it on its poster instead.
 */
export default function DragonHeroLoop({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    function sync() {
      const media = videoRef.current;
      if (!media) return;

      if (query.matches) {
        media.pause();
        media.currentTime = 0;
      } else {
        void media.play().catch(() => {
          // Autoplay refused. The poster frame stands in for the loop.
        });
      }
    }

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <video
      ref={videoRef}
      className="dragon-hero-loop"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
