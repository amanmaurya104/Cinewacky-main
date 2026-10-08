"use client";

import Link from 'next/link';
import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { getProjectHref } from '@/data/projects';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import {
  fractionalScrollIndex,
  updateTitleSpine,
} from '@/lib/showcaseTitleAnimation';
import ShowcaseSplitTitle from './ShowcaseSplitTitle';

type Props = {
  items: ShowcaseScrollItem[];
};

/**
 * The spine follows the scroll container directly (scroll + rAF) rather than
 * through React state, so scrolling never re-renders the showcase.
 */
export default function ShowcaseTitleSpine({ items }: Props) {
  const spineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollIndexRef = useRef(0);
  const rafRef = useRef(0);

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
  }, [syncFromScroll]);

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
    const spine = spineRef.current;
    const itemEls = itemRefs.current;
    return () => {
      gsap.killTweensOf(spine);
      itemEls.forEach((el) => {
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
                  href={getProjectHref(item.slug)}
                  className="showcase-spine-item-link showcase-spine-item-visual showcase-spine-item-inner active-title-wrapper"
                  aria-label={
                    getProjectHref(item.slug) === '/maintenance'
                      ? `${item.title} — in production`
                      : `View ${item.title}`
                  }
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
