/** Nearest section index from scroll position. */
export function nearestSectionIndex(scrollTop: number, sectionHeight: number) {
  if (sectionHeight <= 0) return 0;
  return Math.round(scrollTop / sectionHeight);
}

/** Next section index for wheel direction (never leaves between-section rest). */
export function steppedSectionIndex(
  scrollTop: number,
  sectionHeight: number,
  deltaY: number
) {
  const current = nearestSectionIndex(scrollTop, sectionHeight);
  if (deltaY > 0) return current + 1;
  if (deltaY < 0) return current - 1;
  return current;
}

export function scrollTopForSection(sectionIndex: number, sectionHeight: number) {
  return sectionIndex * sectionHeight;
}
