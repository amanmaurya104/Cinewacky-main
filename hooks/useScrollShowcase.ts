"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  INITIAL_ACTIVE_INDEX,
  SHOWCASE_SECTION_COUNT,
} from '@/data/showcaseScroll';
import { fractionalScrollIndex } from '@/lib/showcaseTitleAnimation';
import {
  nearestSectionIndex,
  scrollTopForSection,
} from '@/lib/showcaseScrollSnap';

function toActiveIndex(logicalIndex: number) {
  const count = SHOWCASE_SECTION_COUNT;
  return Math.min(count - 1, Math.max(0, Math.round(logicalIndex)));
}

function getInitialVirtualIndex() {
  return SHOWCASE_SECTION_COUNT + INITIAL_ACTIVE_INDEX;
}

/**
 * Infinite, section-snapping scroll for the homepage showcase.
 *
 * Only `activeIndex` is React state, and it changes once per section, not per
 * scroll frame: re-rendering the whole showcase on every scroll event made the
 * page janky. Anything that needs the fractional position (the title spine)
 * reads `scrollTop` from the scroll container itself.
 */
export function useScrollShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE_INDEX);
  const initializedRef = useRef(false);
  /** Logical scroll position in "sections" — survives mobile viewport resizes */
  const virtualIndexRef = useRef(getInitialVirtualIndex());
  const isSnappingRef = useRef(false);

  const snapToNearestSection = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current;
    if (!el || !initializedRef.current || isSnappingRef.current) return;

    const sectionHeight = el.clientHeight;
    if (sectionHeight <= 0) return;

    const nearest = nearestSectionIndex(el.scrollTop, sectionHeight);
    const targetTop = scrollTopForSection(nearest, sectionHeight);

    if (Math.abs(el.scrollTop - targetTop) < 2) return;

    isSnappingRef.current = true;
    el.scrollTo({ top: targetTop, behavior });
    window.setTimeout(() => {
      isSnappingRef.current = false;
    }, behavior === 'smooth' ? 450 : 0);
  }, []);

  const applyVirtualScroll = useCallback((el: HTMLDivElement) => {
    const sectionHeight = el.clientHeight;
    if (sectionHeight <= 0) return false;
    el.scrollTop = virtualIndexRef.current * sectionHeight;
    return true;
  }, []);

  const updateFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !initializedRef.current) return;

    const sectionHeight = el.clientHeight;
    if (sectionHeight <= 0) return;

    let scrollTop = el.scrollTop;
    const loopHeight = SHOWCASE_SECTION_COUNT * sectionHeight;
    const minBound = loopHeight * 0.5;
    const maxBound = loopHeight * 2.5;

    if (scrollTop < minBound) {
      el.scrollTop = scrollTop + loopHeight;
      scrollTop = el.scrollTop;
    } else if (scrollTop >= maxBound) {
      el.scrollTop = scrollTop - loopHeight;
      scrollTop = el.scrollTop;
    }

    virtualIndexRef.current = scrollTop / sectionHeight;

    const logicalIndex = fractionalScrollIndex(
      scrollTop,
      sectionHeight,
      SHOWCASE_SECTION_COUNT
    );
    // React bails out when the index is unchanged, so this is cheap per frame.
    setActiveIndex(toActiveIndex(logicalIndex));
  }, []);

  const initializeScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return false;

    if (!applyVirtualScroll(el)) return false;

    initializedRef.current = true;
    updateFromScroll();
    return true;
  }, [applyVirtualScroll, updateFromScroll]);

  const resyncScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !initializedRef.current) return;
    if (!applyVirtualScroll(el)) return;
    updateFromScroll();
  }, [applyVirtualScroll, updateFromScroll]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    virtualIndexRef.current = getInitialVirtualIndex();
    initializeScroll();
  }, [initializeScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!initializedRef.current) {
          virtualIndexRef.current = getInitialVirtualIndex();
        }
        initializeScroll();
      });
    });

    const retryTimer = window.setTimeout(() => {
      if (!initializedRef.current) {
        virtualIndexRef.current = getInitialVirtualIndex();
        initializeScroll();
      }
    }, 150);

    const onScrollEnd = () => snapToNearestSection('smooth');

    el.addEventListener('scroll', updateFromScroll, { passive: true });
    el.addEventListener('scrollend', onScrollEnd);
    window.addEventListener('resize', resyncScrollPosition);
    window.visualViewport?.addEventListener('resize', resyncScrollPosition);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(retryTimer);
      el.removeEventListener('scroll', updateFromScroll);
      el.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('resize', resyncScrollPosition);
      window.visualViewport?.removeEventListener('resize', resyncScrollPosition);
    };
  }, [initializeScroll, resyncScrollPosition, updateFromScroll, snapToNearestSection]);

  return { scrollRef, activeIndex };
}
