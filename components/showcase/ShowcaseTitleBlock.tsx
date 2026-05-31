"use client";

import { forwardRef } from 'react';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';

type WordLineProps = {
  text: string;
  className?: string;
};

function WordLine({ text, className }: WordLineProps) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (!words.length) return null;

  return (
    <p className={`showcase-title-line ${className ?? ''}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="showcase-word-mask">
            <span data-showcase-word className="showcase-word">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  );
}

type Props = {
  item: ShowcaseScrollItem;
  className?: string;
};

const ShowcaseTitleBlock = forwardRef<HTMLDivElement, Props>(function ShowcaseTitleBlock(
  { item, className = '' },
  ref
) {
  const { lead, bold, hero } = item.titleParts;
  const heroText = hero ? `${bold} ${hero}`.trim() : bold;
  const isFeatured = item.id === 9;

  return (
    <div ref={ref} className={`active-title-wrapper ${className}`.trim()}>
      <p data-showcase-category className="showcase-category">
        {item.category}
      </p>

      <div className="showcase-title-body">
        <WordLine
          text={lead}
          className="showcase-title-lead"
        />

        <WordLine
          text={heroText}
          className={`showcase-title-hero${isFeatured ? ' showcase-title-hero--featured' : ''}`}
        />
      </div>
    </div>
  );
});

export default ShowcaseTitleBlock;
