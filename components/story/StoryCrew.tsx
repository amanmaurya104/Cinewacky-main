"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { StoryCrewMember } from '@/types/story';

type Props = {
  crew: StoryCrewMember[];
  /**
   * `credits` is the default end-credit roll. `cards` stands each name in its
   * own panel — used by Moonlight Dreams, whose crew doubles as its billing.
   */
  layout?: 'credits' | 'cards';
};

export default function StoryCrew({ crew, layout = 'credits' }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  if (!crew.length) return null;

  const heading = (
    <>
      <p className="story-section-eyebrow">Behind the lens</p>
      <h2 id="visionaries-heading" className="story-section-title">
        The Visionaries
      </h2>
    </>
  );

  if (layout === 'cards') {
    return (
      <section
        ref={sectionRef}
        className="story-section story-section--wide"
        aria-labelledby="visionaries-heading"
      >
        {heading}

        <ol className="story-crew-cards">
          {crew.map((member, index) => (
            <motion.li
              key={`${member.role}-${member.name}`}
              className="story-crew-card"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.06,
              }}
            >
              <span className="story-crew-card-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="story-crew-card-role">{member.role}</span>
              <span className="story-crew-card-name">{member.name}</span>
            </motion.li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="story-section" aria-labelledby="visionaries-heading">
      {heading}

      <ol className="story-crew-credits">
        {crew.map((member, index) => {
          const delay = index * 0.06;

          return (
            <motion.li
              key={`${member.role}-${member.name}`}
              className="story-crew-credit"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 18 }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
            >
              <span className="story-crew-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="story-crew-lines">
                <span className="story-crew-role">{member.role}</span>
                <span className="story-crew-name">{member.name}</span>
              </span>
              {/* Hairline wipes in just behind the text, like a credit landing. */}
              <motion.span
                className="story-crew-rule"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: delay + 0.12,
                }}
              />
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
