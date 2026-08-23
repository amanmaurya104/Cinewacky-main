"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import type { StoryAchievement } from '@/types/story';

type Props = {
  achievements: StoryAchievement[];
};

type Point = { x: number; y: number };

type Layout = {
  width: number;
  height: number;
  amplitude: number;
  points: Point[];
};

const EMPTY_LAYOUT: Layout = { width: 0, height: 0, amplitude: 64, points: [] };

/** Smooth serpentine through the node points, with vertical tangents at each. */
function buildPath(points: Point[], height: number): string {
  if (!points.length) return '';

  const first = points[0];
  const last = points[points.length - 1];
  let d = `M ${first.x} 0 L ${first.x} ${first.y}`;

  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const bend = (to.y - from.y) / 2;
    d += ` C ${from.x} ${from.y + bend}, ${to.x} ${to.y - bend}, ${to.x} ${to.y}`;
  }

  return `${d} L ${last.x} ${height}`;
}

function TimelineItem({
  item,
  index,
  onReach,
  itemRef,
}: {
  item: StoryAchievement;
  index: number;
  onReach: (index: number) => void;
  itemRef: (el: HTMLLIElement | null) => void;
}) {
  const localRef = useRef<HTMLLIElement>(null);
  const inView = useInView(localRef, { once: true, margin: '-15% 0px -10% 0px' });
  const reduceMotion = useReducedMotion();
  const side = index % 2 === 0 ? 'left' : 'right';
  const offset = side === 'left' ? -48 : 48;

  useLayoutEffect(() => {
    if (inView) onReach(index);
  }, [inView, index, onReach]);

  return (
    <li
      ref={(el) => {
        localRef.current = el;
        itemRef(el);
      }}
      className={`story-timeline-item story-timeline-item--${side}`}
    >
      <motion.article
        className="story-timeline-card"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: offset }}
        animate={
          inView
            ? { opacity: 1, x: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: offset }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.year ? <p className="story-achievement-year">{item.year}</p> : null}
        <h3 className="story-achievement-title">{item.title}</h3>
        {item.description ? (
          <p className="story-achievement-desc">{item.description}</p>
        ) : null}
      </motion.article>
    </li>
  );
}

/**
 * Split from the export below so every hook here — `useScroll` in particular —
 * runs only when there is a timeline to measure. Bailing out after the hooks
 * left `useScroll` pointed at a ref that never filled, which throws on the
 * three stories that carry no achievements.
 */
function AchievementsTimeline({ achievements }: Props) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemEls = useRef<(HTMLLIElement | null)[]>([]);
  const [layout, setLayout] = useState<Layout>(EMPTY_LAYOUT);
  const [reached, setReached] = useState<boolean[]>(() =>
    achievements.map(() => false),
  );
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 60%'],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const onReach = useCallback((index: number) => {
    setReached((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLLIElement | null) => {
      itemEls.current[index] = el;
    },
    [],
  );

  // The path is drawn in real pixels so the nodes land exactly on the curve.
  useLayoutEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const measure = () => {
      const bounds = container.getBoundingClientRect();
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      // Narrow screens keep the same weave, just proportionally wider so the
      // zig-zag still reads next to the (necessarily narrower) cards.
      const isNarrow = width < 768;
      const centerX = width / 2;
      const amplitude = isNarrow
        ? Math.min(96, width * 0.18)
        : Math.min(72, width * 0.07);

      const points = itemEls.current
        .slice(0, achievements.length)
        .map((el, index) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            x: centerX + (index % 2 === 0 ? -amplitude : amplitude),
            y: rect.top - bounds.top + rect.height / 2,
          };
        })
        .filter((point): point is Point => point !== null);

      setLayout({ width, height, amplitude, points });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    itemEls.current.forEach((el) => el && observer.observe(el));
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [achievements.length]);

  const path = buildPath(layout.points, layout.height);

  return (
    <section className="story-section story-timeline-section" aria-labelledby="achievements-heading">
      <p className="story-section-eyebrow">Recognition</p>
      <h2 id="achievements-heading" className="story-section-title">
        Achievements
      </h2>

      <div
        className="story-timeline"
        ref={timelineRef}
        style={{ '--curve-amp': `${layout.amplitude}px` } as CSSProperties}
      >
        {path ? (
          <svg
            className="story-timeline-path"
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            fill="none"
            aria-hidden="true"
          >
            <path className="story-timeline-path-base" d={path} />
            <motion.path
              className="story-timeline-path-progress"
              d={path}
              style={{ pathLength: reduceMotion ? 1 : lineProgress }}
            />
          </svg>
        ) : null}

        <div className="story-timeline-nodes" aria-hidden="true">
          {layout.points.map((point, index) => (
            <span
              key={`node-${index}`}
              className="story-timeline-node"
              data-active={reached[index] ? 'true' : undefined}
              style={{ left: point.x, top: point.y }}
            />
          ))}
        </div>

        <ol className="story-timeline-items">
          {achievements.map((item, index) => (
            <TimelineItem
              key={`${item.year ?? 'achievement'}-${item.title}-${index}`}
              item={item}
              index={index}
              onReach={onReach}
              itemRef={setItemRef(index)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function StoryAchievements({ achievements }: Props) {
  if (!achievements.length) return null;
  return <AchievementsTimeline achievements={achievements} />;
}
