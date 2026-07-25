"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { StoryNarrativeBlock } from '@/types/story';

type Props = {
  blocks: StoryNarrativeBlock[];
};

function NarrativeBlock({
  block,
  reverse,
  index,
}: {
  block: StoryNarrativeBlock;
  reverse: boolean;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();

  const sectionVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 44 },
        visible: { opacity: 1, y: 0 },
      };

  const textVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, x: reverse ? 26 : -26 },
        visible: { opacity: 1, x: 0 },
      };

  const imageVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
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
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <motion.div
        className="story-narrative-copy"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={textVariants}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <p className="story-narrative-index">{String(index + 1).padStart(2, '0')}</p>
        <p className="story-narrative-text">{block.text}</p>
      </motion.div>
      <motion.figure
        className="story-narrative-image-wrap"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={imageVariants}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      >
        <img src={block.image} alt="" className="story-narrative-image" loading="lazy" />
      </motion.figure>
    </motion.article>
  );
}

export default function StoryVisualNarrative({ blocks }: Props) {
  if (!blocks.length) return null;

  return (
    <section className="story-section story-section--wide" aria-labelledby="visual-narrative-heading">
      <p className="story-section-eyebrow">Visual narrative</p>
      <h2 id="visual-narrative-heading" className="story-section-title">
        The Journey
      </h2>
      {blocks.map((block, index) => (
        <NarrativeBlock key={`${block.image}-${index}`} block={block} index={index} reverse={index % 2 === 1} />
      ))}
    </section>
  );
}
