"use client";

import Link from 'next/link';
import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import {
  fractionalScrollIndex,
  updateTitleSpine,
} from '@/lib/showcaseTitleAnimation';
import ShowcaseSplitTitle from './ShowcaseSplitTitle';

type Props = {
  items: ShowcaseScrollItem[];
  scrollIndex: number;
};

export default function ShowcaseTitleSpine({ items, scrollIndex }: Props) {
  const spineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollIndexRef = useRef(scrollIndex);
  const rafRef = useRef(0);

  scrollIndexRef.current = scrollIndex;

  const applySpine = useCallback(() => {
    const spine = spineRef.current;
    if (!spine) return;

    const itemEls = itemRefs.current.filter((el): el is HTMLElement => el !== null);
    if (itemEls.length === 0) return;

    updateTitleSpine(spine, itemEls, scrollIndexRef.current, items.length);
  }, [items.length]);

  const syncFromScroll = useCallback(() => {
    const scrollRoot = spineRef.current?.closest<HTMLElement>('.showcase-root');
    if (!scrollRoot) return;

    const sectionHeight = scrollRoot.clientHeight;
    const count = items.length;
    if (sectionHeight <= 0 || count <= 0) return;

    scrollIndexRef.current = fractionalScrollIndex(
      scrollRoot.scrollTop,
      sectionHeight,
      count
    );
    applySpine();
  }, [applySpine, items.length]);

  useLayoutEffect(() => {
    syncFromScroll();
  }, [scrollIndex, items.length, syncFromScroll]);

  useLayoutEffect(() => {
    const scrollRoot = spineRef.current?.closest<HTMLElement>('.showcase-root');
    if (!scrollRoot) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        syncFromScroll();
      });
    };

    scrollRoot.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scrollRoot.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [syncFromScroll]);

  useLayoutEffect(() => {
    window.addEventListener('resize', syncFromScroll);
    return () => window.removeEventListener('resize', syncFromScroll);
  }, [syncFromScroll]);

  useLayoutEffect(() => {
    return () => {
      gsap.killTweensOf(spineRef.current);
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.killTweensOf(el);
        const visual = el.querySelector('.showcase-spine-item-visual');
        if (visual) gsap.killTweensOf(visual);
      });
    };
  }, []);

  return (
    <div className="showcase-spine-viewport pointer-events-none absolute inset-0 overflow-hidden">
      <div className="showcase-spine-track">
        <div className="showcase-spine-hub">
          <div ref={spineRef} className="showcase-spine">
            {items.map((item, i) => (
              <article
                key={`${item.slug ?? item.id}-${i}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                  if (el && i === items.length - 1) {
                    requestAnimationFrame(syncFromScroll);
                  }
                }}
                className="showcase-spine-item"
                data-index={i}
              >
                <Link
                  href="/maintenance"
                  className="showcase-spine-item-link showcase-spine-item-visual showcase-spine-item-inner active-title-wrapper"
                  aria-label={`${item.title} — in production`}
                >
                  <ShowcaseSplitTitle parts={item.titleParts} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="showcase-spine-mask" aria-hidden />
    </div>
  );
}
