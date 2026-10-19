"use client";

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { respectReducedMotion } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  /** Staggers a run of panels without needing a shared parent variant. */
  delay?: number;
};

/**
 * Panels settle onto the page rather than sliding in — a short lift and fade,
 * once, on first sight. Anything more would fight the printed register.
 */
export default function ArchiveReveal({ children, className, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={respectReducedMotion(
        { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        reduceMotion,
      )}
    >
      {children}
    </motion.div>
  );
}
