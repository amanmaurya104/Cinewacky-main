"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { StoryCrewMember } from '@/types/story';

type Props = {
  crew: StoryCrewMember[];
};

export default function StoryCrew({ crew }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  if (!crew.length) return null;

  return (
    <section ref={sectionRef} className="story-section" aria-labelledby="visionaries-heading">
      <p className="story-section-eyebrow">Behind the lens</p>
      <h2 id="visionaries-heading" className="story-section-title">
        The Visionaries
      </h2>
      <div className="story-crew-grid">
        {crew.map((member, index) => (
          <motion.div
            key={`${member.role}-${member.name}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
          >
            <p className="story-crew-role">{member.role}</p>
            <p className="story-crew-name">{member.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
