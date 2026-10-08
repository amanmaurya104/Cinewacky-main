"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { DocumentaryPlate } from '@/types/documentary';
import ArchivePlate from './ArchivePlate';

type Props = {
  plates: DocumentaryPlate[];
};

const SIZES = '(max-width: 640px) 45vw, (max-width: 1100px) 30vw, 22vw';

/**
 * The sheet arrives loose and files itself.
 *
 * Frames enter scattered — offset, tilted, a little small, the way prints come
 * out of a box — and settle into the grid as they come into view. Nothing moves
 * in layout: the grid holds its final positions the whole time and only
 * transforms change, so the page height never shifts.
 */
export default function ArchiveContactSheet({ plates }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="archive-sheet-grid">
      {plates.map((plate, index) => (
        <SheetFrame
          key={plate.src}
          plate={plate}
          index={index}
          still={Boolean(reduceMotion)}
        />
      ))}
    </div>
  );
}

function SheetFrame({
  plate,
  index,
  still,
}: {
  plate: DocumentaryPlate;
  index: number;
  still: boolean;
}) {
  // Each frame tracks its own passage through the viewport, so one deep in the
  // sheet is still loose while the ones above it have already filed themselves.
  // A single progress shared across the sheet would settle all 29 within one
  // screen of scrolling, most of them long before anyone saw them.
  const ref = useRef<HTMLDivElement>(null);

  // The ref sits on the untransformed grid cell rather than the moving frame:
  // useScroll measures with getBoundingClientRect, which counts transforms, so
  // measuring the frame it is moving would feed its own output back in.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 0.68'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const { x, y, rotate, settleAt } = scatterFor(index);

  // Offsets are percentages of the frame's own size, so the scatter reads the
  // same on a phone as on a wide screen without measuring the viewport.
  const tx = useTransform(progress, [0, settleAt], [`${x}%`, '0%']);
  const ty = useTransform(progress, [0, settleAt], [`${y}%`, '0%']);
  const rz = useTransform(progress, [0, settleAt], [rotate, 0]);
  const scale = useTransform(progress, [0, settleAt], [0.86, 1]);

  if (still) {
    return <ArchivePlate plate={plate} sizes={SIZES} className="archive-plate--sheet" />;
  }

  return (
    <div ref={ref}>
      <motion.div style={{ x: tx, y: ty, rotate: rz, scale }}>
        <ArchivePlate plate={plate} sizes={SIZES} className="archive-plate--sheet" />
      </motion.div>
    </div>
  );
}

/**
 * A deterministic scatter, so the server and the client render the same first
 * frame. Math.random would differ between the two and blow up hydration.
 */
function scatterFor(index: number) {
  const hash = (seed: number) => {
    const value = Math.sin((index + 1) * seed) * 43758.5453;
    return value - Math.floor(value);
  };

  return {
    x: Math.round((hash(12.9898) - 0.5) * 90),
    y: Math.round((hash(78.233) - 0.5) * 150),
    rotate: Number(((hash(39.425) - 0.5) * 7).toFixed(2)),
    settleAt: 0.55 + hash(53.117) * 0.3,
  };
}
