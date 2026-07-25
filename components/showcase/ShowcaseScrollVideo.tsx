"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import { getShowcaseThumbSrc, isShowcaseVideoSlot } from '@/data/showcaseScroll';

const DESKTOP_ACTIVE_SCALE = 1.18;
const COMPACT_ACTIVE_SCALE = 1.1;
const INACTIVE_SCALE = 0.75;

function getActiveScale() {
  if (typeof window === 'undefined') return DESKTOP_ACTIVE_SCALE;
  const w = window.innerWidth;
  if (w >= 1440) return DESKTOP_ACTIVE_SCALE;
  if (w >= 1025) return COMPACT_ACTIVE_SCALE;
  return w < 768 ? 1.08 : 1.12;
}
const ACTIVE_OPACITY = 1;
const INACTIVE_OPACITY = 0.58;
const ACTIVE_BRIGHTNESS = 1;
const INACTIVE_BRIGHTNESS = 0.55;

type Props = {
  item: ShowcaseScrollItem;
  active: boolean;
  slotIndex: number;
  activeIndex: number;
};

export default function ShowcaseScrollVideo({ item, active, slotIndex, activeIndex }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const useVideo = isShowcaseVideoSlot(slotIndex, activeIndex);
  const thumbSrc = getShowcaseThumbSrc(item.id);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    if (active) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active, useVideo]);

  const isCentered = item.left === '50%';

  return (
    <div
      aria-hidden
      data-slot-index={slotIndex}
      className={`showcase-video-tile pointer-events-none absolute ${
        active ? 'showcase-video-tile--active' : 'showcase-video-tile--inactive'
      }`}
      style={{
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
        transform: isCentered ? 'translateX(-50%)' : undefined,
        transformOrigin: 'center center',
        zIndex: active ? 12 : 2,
      }}
    >
      <motion.div
        className="showcase-video-tile-inner h-full w-full overflow-hidden rounded-sm bg-black"
        style={{ transformOrigin: 'center center' }}
        animate={{
          scale: active ? getActiveScale() : INACTIVE_SCALE,
          opacity: active ? ACTIVE_OPACITY : INACTIVE_OPACITY,
          filter: `brightness(${active ? ACTIVE_BRIGHTNESS : INACTIVE_BRIGHTNESS})`,
        }}
        transition={{ type: 'spring', stiffness: 160, damping: 24 }}
      >
        {useVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover pointer-events-none"
            muted
            loop
            playsInline
            preload="metadata"
            poster={thumbSrc}
          >
            <source src={item.video} type="video/mp4" />
            {item.fallbackVideo ? (
              <source src={item.fallbackVideo} type="video/mp4" />
            ) : null}
          </video>
        ) : (
          <img
            src={thumbSrc}
            alt=""
            className="h-full w-full object-cover pointer-events-none"
            draggable={false}
          />
        )}
      </motion.div>
    </div>
  );
}
