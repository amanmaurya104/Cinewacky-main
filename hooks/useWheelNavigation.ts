"use client";

import { useEffect } from 'react';
import useShowcaseStore from '@/store/showcaseStore';

export function useWheelNavigation() {
  const { next, prev } = useShowcaseStore();

  useEffect(() => {
    let ticking = false;
    const onWheel = (e: WheelEvent) => {
      if (ticking) return;
      ticking = true;
      if (e.deltaY > 10) next();
      if (e.deltaY < -10) prev();
      setTimeout(() => (ticking = false), 150);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev]);
}
