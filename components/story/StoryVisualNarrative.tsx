"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import TypedText from '@/components/story/TypedText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { respectReducedMotion } from '@/lib/motion';
import type { StoryNarrativeBlock } from '@/types/story';

type Props = {
  blocks: StoryNarrativeBlock[];
  eyebrow?: string;
  title?: string;
  /**
   * `tide` swaps the numbered card stack for an unboxed run of passages hung
   * off a gauge in the gutter, marked with the time each passage belongs to.
   */
  variant?: 'cards' | 'tide';
};

const WHEN_LABEL: Record<NonNullable<StoryNarrativeBlock['time']>, string> = {
  now: 'This morning',
  then: 'That year',
};

function NarrativeBlock({
  block,
  reverse,
  index,
  tide,
}: {
  block: StoryNarrativeBlock;
  reverse: boolean;
  index: number;
  tide: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();

  // The same variants for everyone: `hidden` is rendered on the server.
  // Reduced motion is applied through each transition instead.
  const sectionVariants = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 26 : -26 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 26 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.article
      ref={ref}
      className={`story-narrative-block${reverse ? ' story-narrative-block--reverse' : ''}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={sectionVariants}
      transition={respectReducedMotion(
        { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
        reduceMotion,
      )}
    >
      {tide && block.time ? (
        <span className="story-tide-mark" data-time={block.time}>
          <span className="story-tide-dot" aria-hidden="true" />
          <span className="story-tide-when">{WHEN_LABEL[block.time]}</span>
        </span>
      ) : null}

      <motion.div
        className="story-narrative-copy"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={textVariants}
        transition={respectReducedMotion(
          { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
          reduceMotion,
        )}
      >
        <p className="story-narrative-index">{String(index + 1).padStart(2, '0')}</p>
        <TypedText
          text={block.text}
          className="story-narrative-text"
          active={inView}
        />
      </motion.div>
      <motion.figure
        className="story-narrative-image-wrap"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={imageVariants}
        transition={respectReducedMotion(
          { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.18 },
          reduceMotion,
        )}
      >
        <Image
          src={block.image}
          alt=""
          fill
          sizes="(max-width: 899px) 92vw, 46vw"
          quality={60}
          loading="lazy"
          className="story-narrative-image"
        />
      </motion.figure>
    </motion.article>
  );
}

export default function StoryVisualNarrative({
  blocks,
  eyebrow = 'Visual narrative',
  title = 'The Journey',
  variant = 'cards',
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  // The gauge's scale is rendered on the server, so it waits for hydration.
  const reduceMotion = usePrefersReducedMotion();

  // The gauge fills as the passages go by — the year closing in on the morning.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 70%'],
  });
  const level = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  if (!blocks.length) return null;

  const tide = variant === 'tide';

  return (
    <section
      className={`story-section story-section--wide${tide ? ' story-narrative-section--tide' : ''}`}
      aria-labelledby="visual-narrative-heading"
    >
      <p className="story-section-eyebrow">{eyebrow}</p>
      <h2 id="visual-narrative-heading" className="story-section-title">
        {title}
      </h2>

      <div className="story-narrative-track" ref={trackRef}>
        {tide ? (
          <div className="story-tide-gauge" aria-hidden="true">
            <motion.span
              className="story-tide-level"
              style={{ scaleY: reduceMotion ? 1 : level }}
            />
          </div>
        ) : null}

        {blocks.map((block, index) => (
          <NarrativeBlock
            key={`${block.image}-${index}`}
            block={block}
            index={index}
            reverse={index % 2 === 1}
            tide={tide}
          />
        ))}
      </div>
    </section>
  );
}
