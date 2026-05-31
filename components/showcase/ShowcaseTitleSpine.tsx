"use client";

import Link from 'next/link';
import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import { updateTitleSpine } from '@/lib/showcaseTitleAnimation';
import ShowcaseSplitTitle from './ShowcaseSplitTitle';

type Props = {
  items: ShowcaseScrollItem[];
  scrollIndex: number;
};

export default function ShowcaseTitleSpine({ items, scrollIndex }: Props) {
  const spineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollIndexRef = useRef(scrollIndex);

  scrollIndexRef.current = scrollIndex;

  const applySpine = useCallback(() => {
    const spine = spineRef.current;
    if (!spine) return;

    const itemEls = itemRefs.current.filter((el): el is HTMLElement => el !== null);
    if (itemEls.length === 0) return;

    updateTitleSpine(spine, itemEls, scrollIndexRef.current);
  }, []);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(applySpine);
    return () => cancelAnimationFrame(frame);
  }, [scrollIndex, items.length, applySpine]);

  useLayoutEffect(() => {
    window.addEventListener('resize', applySpine);
    return () => window.removeEventListener('resize', applySpine);
  }, [applySpine]);

  useLayoutEffect(() => {
    return () => {
      gsap.killTweensOf(spineRef.current);
      itemRefs.current.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, []);

  return (
    <div className="showcase-spine-viewport pointer-events-none absolute inset-0 overflow-hidden">
      <div className="showcase-spine-track">
        <div ref={spineRef} className="showcase-spine">
          {items.map((item, i) => (
            <article
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
                if (el && i === items.length - 1) {
                  requestAnimationFrame(applySpine);
                }
              }}
              className="showcase-spine-item"
              data-index={i}
            >
              <Link
                href="/maintenance"
                className="showcase-spine-item-link showcase-spine-item-inner active-title-wrapper"
                aria-label={`${item.title} — in production`}
              >
                <ShowcaseSplitTitle parts={item.titleParts} />
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="showcase-spine-mask" aria-hidden />
    </div>
  );
}
