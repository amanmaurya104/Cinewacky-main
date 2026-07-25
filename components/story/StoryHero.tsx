"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

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
      <motion.div
        className="story-hero-ornament"
        aria-hidden
        initial={reduceMotion ? { opacity: 0.2 } : { opacity: 0, scale: 0.9 }}
        animate={reduceMotion ? { opacity: 0.2 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
      <motion.div
        className="story-hero-copy"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <h1 className="story-hero-title">{title}</h1>
        {tagline ? <p className="story-hero-tagline">{tagline}</p> : null}
      </motion.div>
    </header>
  );
}
