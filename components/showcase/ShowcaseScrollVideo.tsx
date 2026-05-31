"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';

type Props = {
  item: ShowcaseScrollItem;
  active: boolean;
  featured: boolean;
};

export default function ShowcaseScrollVideo({ item, active, featured }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active]);

  const scale = featured ? 1.12 : active ? 1.05 : 0.88;
  const opacity = active ? 1 : featured ? 0.35 : 0.2;

  return (
    <motion.div
      aria-hidden
      className="showcase-video-tile pointer-events-none absolute overflow-hidden rounded-sm bg-black"
      style={{
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
        transform: item.id === 9 ? 'translateX(-50%)' : undefined,
        zIndex: featured ? 5 : active ? 4 : 1,
      }}
      animate={{ scale, opacity }}
      transition={{ type: 'spring', stiffness: 140, damping: 22 }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover pointer-events-none"
        muted
        loop
        playsInline
        preload="metadata"
        poster={item.slug ? `/projects/${item.slug}/thumb.jpg` : undefined}
      >
        <source src={item.video} type="video/mp4" />
        {item.fallbackVideo ? <source src={item.fallbackVideo} type="video/mp4" /> : null}
      </video>
    </motion.div>
  );
}
