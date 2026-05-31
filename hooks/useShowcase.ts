"use client";

import projects from '@/data/projects';
import useShowcaseStore from '@/store/showcaseStore';

export function useShowcase() {
  const { index, setLength, setIndex, next, prev } = useShowcaseStore();

  // initialize length
  if (projects.length !== undefined) {
    setLength(projects.length);
  }

  return {
    projects,
    index,
    setIndex,
    next,
    prev,
  };
}
