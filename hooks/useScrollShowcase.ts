"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  INITIAL_ACTIVE_INDEX,
  SHOWCASE_SECTION_COUNT,
} from '@/data/showcaseScroll';
import type { ScrollDirection } from '@/lib/showcaseTitleAnimation';

function toLogicalIndex(virtualIndex: number) {
  const count = SHOWCASE_SECTION_COUNT;
  return ((virtualIndex % count) + count) % count;
}

function toActiveIndex(logicalIndex: number) {
  const count = SHOWCASE_SECTION_COUNT;
  return Math.min(count - 1, Math.max(0, Math.round(logicalIndex)));
}

function getInitialScrollTop(sectionHeight: number) {
  return (SHOWCASE_SECTION_COUNT + INITIAL_ACTIVE_INDEX) * sectionHeight;
}

export function useScrollShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE_INDEX);
  const [scrollIndex, setScrollIndex] = useState(INITIAL_ACTIVE_INDEX);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<ScrollDirection>('down');
  const prevActiveRef = useRef(INITIAL_ACTIVE_INDEX);
  const prevScrollTopRef = useRef(0);
  const initializedRef = useRef(false);

  const updateFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

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

    if (scrollTop !== prevScrollTopRef.current) {
      setDirection(scrollTop > prevScrollTopRef.current ? 'down' : 'up');
      prevScrollTopRef.current = scrollTop;
    }

    const virtualIndex = scrollTop / sectionHeight;
    const logicalIndex = toLogicalIndex(virtualIndex);
    const index = toActiveIndex(logicalIndex);

    const loopProgress =
      SHOWCASE_SECTION_COUNT > 1
        ? logicalIndex / (SHOWCASE_SECTION_COUNT - 1)
        : 0;

    setProgress(Math.min(1, Math.max(0, loopProgress)));
    setScrollIndex(logicalIndex);

    if (index !== prevActiveRef.current) {
      const prevLogical = prevActiveRef.current;
      const crossedWrap =
        (prevLogical === SHOWCASE_SECTION_COUNT - 1 && index === 0) ||
        (prevLogical === 0 && index === SHOWCASE_SECTION_COUNT - 1);

      if (!crossedWrap) {
        setDirection(index > prevActiveRef.current ? 'down' : 'up');
      }
      prevActiveRef.current = index;
    }

    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const sectionHeight = el.clientHeight;
    if (sectionHeight <= 0) return;

    el.scrollTop = getInitialScrollTop(sectionHeight);
    prevScrollTopRef.current = el.scrollTop;
    initializedRef.current = true;
    updateFromScroll();
  }, [updateFromScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (!initializedRef.current) {
      const sectionHeight = el.clientHeight;
      if (sectionHeight > 0) {
        el.scrollTop = getInitialScrollTop(sectionHeight);
        initializedRef.current = true;
      }
    }

    updateFromScroll();
    el.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);

    return () => {
      el.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, [updateFromScroll]);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const sectionHeight = el.clientHeight;
    const currentVirtual = el.scrollTop / sectionHeight;
    const currentLoop = Math.floor(currentVirtual / SHOWCASE_SECTION_COUNT);
    const targetVirtual = currentLoop * SHOWCASE_SECTION_COUNT + index;

    el.scrollTo({ top: targetVirtual * sectionHeight, behavior: 'smooth' });
  }, []);

  return {
    scrollRef,
    activeIndex,
    scrollIndex,
    progress,
    direction,
    scrollToIndex,
    setActiveIndex,
  };
}
