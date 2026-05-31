"use client";

import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import { formatShowcaseLabel } from '@/lib/showcaseTitleAnimation';

type Props = {
  items: ShowcaseScrollItem[];
  activeIndex: number;
};

const SLOTS = [
  { offset: -2, className: 'showcase-ambient showcase-ambient--far-top' },
  { offset: -1, className: 'showcase-ambient showcase-ambient--near-top' },
  { offset: 1, className: 'showcase-ambient showcase-ambient--near-bottom' },
  { offset: 2, className: 'showcase-ambient showcase-ambient--far-bottom' },
] as const;

export default function ShowcaseAmbientTitles({ items, activeIndex }: Props) {
  return (
    <div className="showcase-ambient-root pointer-events-none absolute inset-0">
      {SLOTS.map(({ offset, className }) => {
        const index = activeIndex + offset;
        if (index < 0 || index >= items.length) return null;

        const item = items[index];
        const isNear = Math.abs(offset) === 1;

        return (
          <p
            key={`${offset}-${item.id}`}
            data-ambient-title
            data-offset={offset}
            className={`${className} ${isNear ? 'showcase-ambient--near' : ''}`}
          >
            {formatShowcaseLabel(item)}
          </p>
        );
      })}
    </div>
  );
}
