"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { respectReducedMotion } from '@/lib/motion';

type Props = {
  title: string;
  tagline: string;
  heroVideo: string;
  poster: string;
};

export default function StoryHero({ title, tagline, heroVideo, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <header className="story-hero">
      <video
        ref={videoRef}
        className="story-hero-video"
        src={heroVideo}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
      <div className="story-hero-overlay" aria-hidden />
      {/* `initial` is the same for everyone because it is rendered on the
          server; reduced motion only changes where and how fast it goes. */}
      <motion.div
        className="story-hero-ornament"
        aria-hidden
        // Only opacity starts in `initial`: the glow is invisible until it
        // animates, and leaving scale out keeps framer-motion's inline transform
        // off the reduced-motion glow, so each theme's CSS still positions it.
        initial={{ opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.2 } : { opacity: 1, scale: [0.9, 1] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }
        }
      />
      <motion.div
        className="story-hero-copy"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={respectReducedMotion(
          { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          reduceMotion,
        )}
      >
        <h1 className="story-hero-title">{title}</h1>
        {tagline ? <p className="story-hero-tagline">{tagline}</p> : null}
      </motion.div>
    </header>
  );
}
