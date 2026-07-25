"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { StoryCastMember } from '@/types/story';

type Props = {
  cast: StoryCastMember[];
};

export default function StoryCast({ cast }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  if (!cast.length) return null;

  return (
    <section ref={sectionRef} className="story-section story-section--wide" aria-labelledby="cast-heading">
      <p className="story-section-eyebrow">On screen</p>
      <h2 id="cast-heading" className="story-section-title">
        Principal Cast
      </h2>
      <div className="story-cast-grid">
        {cast.map((member, index) => (
          <motion.article
            key={`${member.actor}-${member.character}`}
            className="story-cast-card"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
          >
            <div className="story-cast-portrait-wrap">
              {member.portrait ? (
                <img
                  src={member.portrait}
                  alt={member.actor}
                  className="story-cast-portrait"
                  loading="lazy"
                />
              ) : (
                <div className="story-cast-portrait story-cast-portrait--placeholder" />
              )}
            </div>
            <p className="story-cast-actor">{member.actor}</p>
            <p className="story-cast-character">{member.character}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
