"use client";

import { useEffect, useRef } from 'react';
import useShowcaseStore from '@/store/showcaseStore';

export function useTouchNavigation() {
  const startY = useRef<number | null>(null);
  const { next, prev } = useShowcaseStore();

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => (startY.current = e.touches[0].clientY);
    const onTouchEnd = (e: TouchEvent) => {
      if (startY.current == null) return;
      const endY = e.changedTouches[0].clientY;
      const delta = startY.current - endY;
      if (delta > 50) next();
      if (delta < -50) prev();
      startY.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [next, prev]);
}
