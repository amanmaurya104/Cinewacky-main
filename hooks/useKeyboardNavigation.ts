"use client";

import { useEffect } from 'react';
import useShowcaseStore from '@/store/showcaseStore';

export function useKeyboardNavigation() {
  const { next, prev } = useShowcaseStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);
}
