'use client';

import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * A silent clip that plays on loop — hero backdrops and in-chapter motion
 * plates both use this. Shared by the themed documentary pages.
 *
 * Two things it does that a plain autoplaying `<video>` does not. It holds on
 * the poster frame for anyone who has asked for reduced motion, because CSS can
 * hide a video but cannot stop it playing. And it only runs while it is on
 * screen: a page can carry several of these, and leaving all of them decoding
 * behind the fold costs battery for frames nobody is looking at.
 */
export default function SilentLoop({ src, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;

    function sync() {
      const media = videoRef.current;
      if (!media) return;

      if (motion.matches) {
        media.pause();
        media.currentTime = 0;
        return;
      }

      if (onScreen) {
        void media.play().catch(() => {
          // Autoplay refused. The poster frame stands in for the clip.
        });
      } else {
        media.pause();
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: '200px' },
    );

    observer.observe(video);
    motion.addEventListener('change', sync);
    sync();

    return () => {
      observer.disconnect();
      motion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
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
