"use client";

import { useRef } from 'react';
import ShowcaseHeader from './ShowcaseHeader';
import ShowcaseCenterTitle from './ShowcaseCenterTitle';
import ShowcaseScrollVideo from './ShowcaseScrollVideo';
import { showcaseScrollItems, SHOWCASE_LOOP_COUNT } from '@/data/showcaseScroll';
import { useForwardOverlayScroll } from '@/hooks/useForwardWheelScroll';
import { useScrollShowcase } from '@/hooks/useScrollShowcase';
import '@/styles/showcase.css';

export default function Showcase() {
  const { scrollRef, activeIndex, scrollIndex } = useScrollShowcase();
  const stageRef = useRef<HTMLDivElement>(null);

  useForwardOverlayScroll({ areaRef: stageRef, scrollRef });

  return (
    <div
      ref={scrollRef}
      className="showcase-root showcase-scroll-track relative h-dvh w-full overflow-y-auto overscroll-contain bg-black text-white"
      aria-label="Showcase scroll"
    >
      <ShowcaseHeader />

      <div
        ref={stageRef}
        className="showcase-stage pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="showcase-videos-layer">
          <div className="showcase-videos-scaler">
            {showcaseScrollItems.map((item, i) => (
              <ShowcaseScrollVideo
                key={item.id}
                item={item}
                active={i === activeIndex}
                featured={i === activeIndex}
              />
            ))}
          </div>
        </div>
        <ShowcaseCenterTitle
          items={showcaseScrollItems}
          activeIndex={activeIndex}
          scrollIndex={scrollIndex}
        />
      </div>

      {Array.from({ length: SHOWCASE_LOOP_COUNT }, (_, loop) =>
        showcaseScrollItems.map((item) => (
          <section
            key={`${loop}-${item.id}`}
            className="showcase-scroll-section h-dvh min-h-dvh w-full shrink-0"
            aria-hidden
          />
        ))
      )}
    </div>
  );
}
