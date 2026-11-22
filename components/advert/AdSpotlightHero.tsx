'use client';

import Image from 'next/image';
import { useEffect, useRef, type ReactNode } from 'react';
import type { AdStill } from '@/types/advert';

type Props = {
  wall: AdStill[];
  /** The hero's type, rendered on the server and passed through. */
  children: ReactNode;
};

const FPS = 25;

/** Broadcast timecode, HH:MM:SS:FF at 25 frames a second. */
function timecode(ms: number): string {
  const frames = Math.floor((ms / 1000) * FPS);
  const seconds = Math.floor(frames / FPS);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60, frames % FPS]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
}

/**
 * "Your brand deserves the spotlight", staged literally: a wall of campaign
 * frames in the dark, and one spotlight on it. The light follows the pointer;
 * left alone (or on touch screens) it sweeps the wall by itself.
 *
 * The light is a mask on a dark layer over the wall, positioned by two custom
 * properties this component writes every frame, so React never re-renders for
 * it. It only runs while the hero is on screen, and not at all for visitors
 * who prefer reduced motion — they get the light parked where the CSS puts it.
 */
export default function AdSpotlightHero({ wall, children }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0.66;
    let y = 0.42;
    let targetX = x;
    let targetY = y;
    let lastPointer = -Infinity;
    let frame = 0;
    let running = false;
    const start = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
      lastPointer = performance.now();
    };

    const tick = (now: number) => {
      // Idle for a moment: drift on a slow figure-of-eight instead.
      if (now - lastPointer > 2600) {
        const t = (now - start) / 1000;
        targetX = 0.56 + 0.3 * Math.sin(t * 0.31);
        targetY = 0.44 + 0.2 * Math.sin(t * 0.47 + 1.2);
      }
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      hero.style.setProperty('--spot-x', `${(x * 100).toFixed(2)}%`);
      hero.style.setProperty('--spot-y', `${(y * 100).toFixed(2)}%`);
      if (clockRef.current) clockRef.current.textContent = timecode(now - start);
      frame = requestAnimationFrame(tick);
    };

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });

    visibility.observe(hero);
    hero.addEventListener('pointermove', onPointerMove);

    return () => {
      visibility.disconnect();
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <header ref={heroRef} className="ad-hero">
      <div className="ad-hero-wall" aria-hidden>
        {wall.map((still, index) => (
          <div key={still.src} className="ad-hero-cell">
            <Image
              src={still.src}
              alt=""
              fill
              sizes="(max-width: 700px) 36vw, 27vw"
              quality={60}
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      <div className="ad-hero-dark" aria-hidden />
      <div className="ad-hero-glow" aria-hidden />

      <div className="ad-hero-hud" aria-hidden>
        <span className="ad-onair">
          <i />
          On air
        </span>
        <span className="ad-timecode">
          TC <span ref={clockRef}>00:00:00:00</span>
        </span>
      </div>

      {children}
    </header>
  );
}
