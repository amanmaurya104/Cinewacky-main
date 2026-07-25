"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { StoryAchievement } from '@/types/story';

type Props = {
  achievements: StoryAchievement[];
};

export default function StoryAchievements({ achievements }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  if (!achievements.length) return null;

  return (
    <section ref={sectionRef} className="story-section" aria-labelledby="achievements-heading">
      <p className="story-section-eyebrow">Recognition</p>
      <h2 id="achievements-heading" className="story-section-title">
        Achievements
      </h2>
      <div className="story-achievements-list">
        {achievements.map((item, index) => (
          <motion.article
            key={`${item.year ?? 'achievement'}-${item.title}-${index}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
          >
            {item.year ? <p className="story-achievement-year">{item.year}</p> : null}
            <h3 className="story-achievement-title">{item.title}</h3>
            {item.description ? (
              <p className="story-achievement-desc">{item.description}</p>
            ) : null}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
