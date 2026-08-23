"use client";

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

type Props = {
  images: string[];
  title: string;
  /** Fired when the centred card is clicked; receives the image's index. */
  onItemSelect?: (index: number) => void;
  className?: string;
};

/** Portrait card, width / height — the fan only reads as a fan with tall cards. */
const CARD_RATIO = 0.7;
/** Slots advanced per second while the fan is left alone. */
const AUTO_ADVANCE_SPEED = 0.14;
/** Cards further than this many slots from the centre are not rendered. */
const VISIBLE_RANGE = 4;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Inline style numbers are rounded before they are written. Chrome re-serialises
 * a style attribute to three decimals, so a raw `308.5714285714286px` comes back
 * as `308.571px` and React reports it as a hydration mismatch.
 */
const round = (value: number) => Math.round(value * 100) / 100;

/** Shortest signed distance from `index` to `position` around the loop. */
const wrapOffset = (index: number, position: number, count: number) => {
  const raw = (((index - position) % count) + count) % count;
  return raw > count / 2 ? raw - count : raw;
};

const wrapPosition = (position: number, count: number) =>
  ((position % count) + count) % count;

/**
 * The stills fanned out along an arc: the centre card stands upright at the top
 * and its neighbours tilt away and drop off to either side. It spins slowly on
 * its own, follows a drag, and centres whichever card is clicked — clicking the
 * card that is already centred opens the lightbox.
 */
export default function StoryArcGallery({
  images,
  title,
  onItemSelect,
  className,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ width: 1280, height: 720 });
  const [position, setPosition] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Live refs so the animation loop never has to be torn down and rebuilt.
  const targetRef = useRef<number | null>(null);
  const dragRef = useRef<{ startX: number; from: number } | null>(null);
  /** How far the last gesture travelled — a click after a real drag is ignored. */
  const movedRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const count = images.length;

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setStage({ width, height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // The arc geometry. Cards ride on a circle whose centre sits far below the
  // stage, so the further a card is from the middle the lower and more steeply
  // tilted it sits.
  const geometry = useMemo(() => {
    const { width, height } = stage;
    const isNarrow = width < 768;

    // On a phone the fan has to earn its height: fewer, larger cards on a
    // tighter radius so the curve is still obvious across 390px.
    const cardWidth = clamp(
      Math.min(width * (isNarrow ? 0.44 : 0.17), height * 0.3),
      108,
      240,
    );
    const cardHeight = cardWidth / CARD_RATIO;

    const radius = clamp(
      width * (isNarrow ? 1.15 : 0.62),
      isNarrow ? 380 : 460,
      1000,
    );
    // Cards overlap slightly, the way a fanned hand of cards does.
    const chord = cardWidth * 0.8;
    const stepRadians = 2 * Math.asin(clamp(chord / (2 * radius), 0, 1));

    return {
      cardWidth,
      cardHeight,
      radius,
      stepRadians,
      /** Vertical centre of the top card, measured from the top of the stage. */
      apexTop: height * (isNarrow ? 0.46 : 0.44),
      /** One slot is worth this many pixels of horizontal drag. */
      pixelsPerSlot: chord,
    };
  }, [stage]);

  // One loop drives everything: it eases toward a clicked card when there is
  // one to reach, and otherwise lets the fan drift.
  useEffect(() => {
    if (!count) return;

    let last = performance.now();

    const tick = (now: number) => {
      // A backgrounded tab hands back a huge delta; cap it so nothing jumps.
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;

      setPosition((prev) => {
        const target = targetRef.current;

        if (target !== null) {
          const diff = wrapOffset(target, prev, count);
          if (Math.abs(diff) < 0.002) {
            targetRef.current = null;
            return wrapPosition(target, count);
          }
          return wrapPosition(prev + diff * Math.min(1, delta * 6), count);
        }

        if (dragRef.current || reducedMotion) return prev;
        return wrapPosition(prev + delta * AUTO_ADVANCE_SPEED, count);
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [count, reducedMotion]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      targetRef.current = null;
      dragRef.current = { startX: event.clientX, from: position };
      movedRef.current = 0;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [position],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = event.clientX - drag.startX;
      movedRef.current = Math.max(movedRef.current, Math.abs(dx));
      setPosition(wrapPosition(drag.from - dx / geometry.pixelsPerSlot, count));
    },
    [count, geometry.pixelsPerSlot],
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
  }, []);

  const step = useCallback(
    (direction: number) => {
      const from = targetRef.current ?? position;
      targetRef.current = wrapPosition(Math.round(from) + direction, count);
    },
    [count, position],
  );

  if (!count) return null;

  const { cardWidth, cardHeight, radius, stepRadians, apexTop } = geometry;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} still frames`}
      tabIndex={0}
      className={`story-arc${dragging ? ' story-arc--dragging' : ''}${
        className ? ` ${className}` : ''
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          step(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          step(1);
        }
      }}
    >
      <div className="story-arc-fan" style={{ top: round(apexTop) }}>
        {images.map((src, index) => {
          const offset = wrapOffset(index, position, count);
          const distance = Math.abs(offset);
          if (distance > VISIBLE_RANGE) return null;

          const angle = offset * stepRadians;
          const isActive = distance < 0.5;
          const fade =
            distance > VISIBLE_RANGE - 1 ? VISIBLE_RANGE - distance : 1;

          return (
            <button
              key={`${src}-${index}`}
              type="button"
              className="story-arc-card"
              aria-label={
                isActive
                  ? `Open ${title} still frame ${index + 1}`
                  : `Show ${title} still frame ${index + 1}`
              }
              aria-current={isActive || undefined}
              onClick={() => {
                // A drag ends with a click on whichever card was under the
                // pointer; only treat a near-still pointer as a real click.
                if (movedRef.current > 6) return;
                if (isActive) onItemSelect?.(index);
                else targetRef.current = index;
              }}
              style={{
                width: round(cardWidth),
                height: round(cardHeight),
                transform: `translate(-50%, -50%) translate(${round(
                  radius * Math.sin(angle),
                )}px, ${round(radius * (1 - Math.cos(angle)))}px) rotate(${round(
                  (angle * 180) / Math.PI,
                )}deg) scale(${round(1 - distance * 0.02)})`,
                zIndex: 20 - Math.round(distance * 4),
                opacity: round(clamp(fade, 0, 1)),
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 767px) 34vw, 240px"
                quality={60}
                loading="lazy"
                draggable={false}
                className="story-arc-image"
                style={{
                  filter: `brightness(${round(1 - Math.min(distance, 3) * 0.13)})`,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
