'use client';

import Image from 'next/image';
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** A single card in the carousel. Only `photo.url` is required. */
export interface GalleryItem {
  common?: string;
  binomial?: string;
  photo: {
    url: string;
    text?: string;
    pos?: string;
    by?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Cards further than this many slots from center are not rendered. */
  visibleRange?: number;
  /** Slots advanced per second by the carousel's own animation. */
  autoAdvanceSpeed?: number;
  /** Fired when a card is clicked; receives the item's index. */
  onItemSelect?: (index: number) => void;
}

/** Shortest signed distance from `index` to `position` around the loop. */
const wrapOffset = (index: number, position: number, count: number) => {
  const raw = (((index - position) % count) + count) % count;
  return raw > count / 2 ? raw - count : raw;
};

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      visibleRange = 4,
      autoAdvanceSpeed = 0.25,
      onItemSelect,
      ...props
    },
    ref,
  ) => {
    const [position, setPosition] = useState(0);
    const [card, setCard] = useState({ width: 720, height: 405 });
    const [reducedMotion, setReducedMotion] = useState(false);
    const animationFrameRef = useRef<number | null>(null);

    // Cards are 16:9 to match the stills, sized to leave room for the neighbours.
    useEffect(() => {
      const measure = () => {
        const width = Math.min(
          720,
          window.innerWidth * (window.innerWidth < 768 ? 0.78 : 0.46),
          (window.innerHeight - 280) * (16 / 9),
        );
        setCard({ width, height: (width * 9) / 16 });
      };

      measure();
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }, []);

    useEffect(() => {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      const sync = () => setReducedMotion(query.matches);
      sync();
      query.addEventListener('change', sync);
      return () => query.removeEventListener('change', sync);
    }, []);

    const count = items.length;

    // The carousel plays on its own — page scroll does not drive it.
    useEffect(() => {
      if (reducedMotion || !count) return;

      let last = performance.now();

      const advance = (now: number) => {
        // Tab switches can hand back a huge delta; cap it so the ring never jumps.
        const delta = Math.min((now - last) / 1000, 0.1);
        last = now;
        setPosition((prev) => (prev + delta * autoAdvanceSpeed) % count);
        animationFrameRef.current = requestAnimationFrame(advance);
      };

      animationFrameRef.current = requestAnimationFrame(advance);
      return () => {
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
      };
    }, [autoAdvanceSpeed, reducedMotion, count]);

    if (!count) return null;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Still frame carousel"
        className={cn(
          'relative w-full h-full flex items-center justify-center overflow-hidden',
          className,
        )}
        style={{ perspective: '1600px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, i) => {
            const offset = wrapOffset(i, position, count);
            const distance = Math.abs(offset);
            if (distance > visibleRange) return null;

            const capped = Math.min(distance, visibleRange);
            // The centre card sits flat and forward; neighbours fan out,
            // angle away and drop back so only one still reads at a time.
            const translateX = offset * card.width * 0.42;
            const translateZ = -capped * 190;
            const rotateY = -clamp(offset, -1.35, 1.35) * 38;
            const opacity =
              distance > visibleRange - 1
                ? Math.max(0, visibleRange - distance)
                : 1 - capped * 0.16;
            const isActive = distance < 0.5;
            const hasCaption = Boolean(item.common || item.binomial || item.photo.by);

            return (
              <div
                key={`${item.photo.url}-${i}`}
                role="group"
                aria-label={item.common ?? item.photo.text ?? `Image ${i + 1}`}
                aria-hidden={!isActive}
                className="absolute"
                style={{
                  width: card.width,
                  height: card.height,
                  left: '50%',
                  top: '50%',
                  marginLeft: -card.width / 2,
                  marginTop: -card.height / 2,
                  transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  zIndex: Math.round((visibleRange - capped) * 10),
                  opacity,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 0.25s linear',
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-md border border-white/10 bg-black"
                  style={{
                    boxShadow: isActive
                      ? '0 40px 90px rgba(0,0,0,0.75)'
                      : '0 20px 50px rgba(0,0,0,0.6)',
                  }}
                >
                  {onItemSelect ? (
                    <button
                      type="button"
                      onClick={() => onItemSelect(i)}
                      className="absolute inset-0 z-10 cursor-pointer"
                      aria-label={
                        item.photo.text ?? item.common ?? `View image ${i + 1}`
                      }
                    />
                  ) : null}
                  {/* The stills are 1440p masters; `sizes` mirrors the card
                      measurement above so the optimizer serves card-sized WebP
                      rather than the multi-megabyte original. */}
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text ?? ''}
                    fill
                    sizes="(max-width: 767px) 78vw, min(720px, 46vw)"
                    quality={60}
                    loading="lazy"
                    draggable={false}
                    className="object-cover"
                    style={{
                      objectPosition: item.photo.pos || 'center',
                      filter: isActive ? 'none' : 'brightness(0.55)',
                      transition: 'filter 0.25s linear',
                    }}
                  />
                  {hasCaption ? (
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      {item.common ? (
                        <h2 className="text-xl font-bold">{item.common}</h2>
                      ) : null}
                      {item.binomial ? (
                        <em className="text-sm italic opacity-80">{item.binomial}</em>
                      ) : null}
                      {item.photo.by ? (
                        <p className="text-xs mt-2 opacity-70">
                          Photo by: {item.photo.by}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  },
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
