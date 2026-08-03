"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';

type Props = {
  note: string;
};

/** Pulls a leading quoted line out to use as the pull-quote. */
function splitLead(note: string): { lead: string | null; body: string } {
  const match = note.trim().match(/^["“]([^"”]+)["”][\s—-]*/);
  if (!match) return { lead: null, body: note.trim() };
  return { lead: match[1].trim(), body: note.slice(match[0].length).trim() };
}

/** Groups sentences into readable paragraphs instead of one long block. */
function toParagraphs(text: string, target = 330): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["”']*\s*/g) ?? [text];
  const paragraphs: string[] = [];
  let buffer = '';

  for (const sentence of sentences) {
    buffer += sentence;
    if (buffer.length >= target) {
      paragraphs.push(buffer.trim());
      buffer = '';
    }
  }

  const rest = buffer.trim();
  if (rest) {
    // Fold a short tail into the previous paragraph rather than orphaning it.
    if (paragraphs.length && rest.length < 140) {
      paragraphs[paragraphs.length - 1] += ` ${rest}`;
    } else {
      paragraphs.push(rest);
    }
  }

  return paragraphs;
}

export default function StoryProducerNote({ note }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  const { lead, paragraphs } = useMemo(() => {
    const { lead: quoted, body } = splitLead(note);
    // A one-liner reads better set as the pull-quote than as body copy.
    if (!quoted && body.length <= 220) return { lead: body, paragraphs: [] };
    return { lead: quoted, paragraphs: toParagraphs(body) };
  }, [note]);

  if (!note.trim()) return null;

  const rise = (index: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: inView
      ? { opacity: 1, y: 0 }
      : reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 20 },
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: index * 0.08,
    },
  });

  return (
    <section
      ref={sectionRef}
      className="story-section story-section--wide story-note-section"
      aria-labelledby="producer-note-heading"
    >
      <motion.div
        className="story-note-panel"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24 }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="story-note-mark" aria-hidden="true">
          &ldquo;
        </span>

        <header className="story-note-head">
          <p className="story-section-eyebrow">From the producer</p>
          <h2 id="producer-note-heading" className="story-section-title">
            Producer&apos;s Note
          </h2>
        </header>

        {lead ? (
          <motion.blockquote className="story-note-quote" {...rise(0)}>
            {lead}
          </motion.blockquote>
        ) : null}

        <div className="story-note-body" data-columns={paragraphs.length > 1}>
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={`${index}-${paragraph.slice(0, 24)}`}
              {...rise(index + (lead ? 1 : 0))}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <span className="story-note-flourish" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
