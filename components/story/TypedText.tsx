"use client";

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/** Total time a passage takes to type, whatever its length. */
const TYPING_DURATION = 3200;
const TYPING_START_DELAY = 260;

/** Reveals `text` one character at a time once `active`; returns chars shown. */
function useTypewriter(text: string, active: boolean, disabled: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (disabled || !active) return;

    // Long passages type faster per character so the whole block still lands
    // in about the same time as a short one.
    const perChar = Math.min(30, Math.max(9, TYPING_DURATION / Math.max(text.length, 1)));
    let frame = 0;
    let startedAt: number | null = null;

    const step = (now: number) => {
      if (startedAt === null) startedAt = now + TYPING_START_DELAY;
      const shown = Math.max(0, Math.floor((now - startedAt) / perChar));
      setCount(Math.min(text.length, shown));
      if (shown < text.length) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, active, disabled]);

  // Reduced motion skips the animation entirely and shows the finished text.
  return disabled ? text.length : count;
}

type Props = {
  text: string;
  className?: string;
  /** Drive typing from a parent's visibility; defaults to this element's own. */
  active?: boolean;
};

export default function TypedText({ text, className, active }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const selfInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();
  const typed = useTypewriter(text, active ?? selfInView, Boolean(reduceMotion));

  return (
    <p ref={ref} className={className}>
      {/* Full text for assistive tech; the visual copy types itself in. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, typed)}
        {typed < text.length ? <span className="story-typed-caret" /> : null}
        {/* Transparent remainder holds the final layout, so nothing shifts. */}
        <span className="story-typed-rest">{text.slice(typed)}</span>
      </span>
    </p>
  );
}
