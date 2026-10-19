'use client';

import Image from 'next/image';
import { useCallback, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { DocumentaryPlate } from '@/types/documentary';
import { pad } from './format';

type Props = {
  plates: DocumentaryPlate[];
  /** How many frames show before "Show all". */
  initial?: number;
};

/**
 * The full set of delivered stills, laid in columns at their own aspect ratios,
 * with a lightbox on a native <dialog>: showModal() gives the focus trap and the
 * Escape key without any of it being re-implemented here.
 *
 * The lightbox steps through every frame, not just the ones the collapsed grid
 * shows. Stepping past them expands the grid, and closing focuses the frame
 * last viewed rather than the one that opened it, so the reader lands where
 * they left off.
 */
export default function TuningGallery({ plates, initial = 18 }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const frames = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const count = plates.length;

  const open = useCallback((at: number) => {
    setIndex(at);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (by: number) => {
      if (index === null) return;
      const next = (index + by + count) % count;
      setIndex(next);
      if (next >= initial) setExpanded(true);
    },
    [index, count, initial],
  );

  // The dialog has already put focus back on its opener by the time `close`
  // fires, so this runs after it and wins.
  function onClose() {
    if (index !== null) frames.current[index]?.focus();
    setIndex(null);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  }

  // A click that lands on the dialog itself, not its contents, is the backdrop.
  function onClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  const shown = expanded ? plates : plates.slice(0, initial);
  const current = index === null ? undefined : plates[index];

  return (
    <>
      <ul ref={listRef} className="tuning-gallery">
        {shown.map((plate, at) => (
          <li key={plate.src}>
            <button
              ref={(node) => {
                frames.current[at] = node;
              }}
              type="button"
              className="tuning-gallery-frame"
              onClick={() => open(at)}
              aria-label={`Open frame ${at + 1} of ${count}${plate.caption ? `: ${plate.caption}` : ''}`}
            >
              <Image
                src={plate.src}
                alt=""
                width={plate.width ?? 1600}
                height={plate.height ?? 1067}
                sizes="(max-width: 640px) 46vw, (max-width: 1100px) 31vw, 24vw"
                quality={60}
                loading="lazy"
              />
              <span className="tuning-gallery-number" aria-hidden>
                {pad(at + 1)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {count > initial ? (
        <div className="tuning-gallery-more">
          <button
            type="button"
            onClick={() => {
              // Collapsing removes everything under the first rows; without
              // this the reader is left in the credits, far below the gallery.
              if (expanded) listRef.current?.scrollIntoView({ block: 'start' });
              setExpanded((value) => !value);
            }}
          >
            {expanded ? 'Show fewer frames' : `Show all ${count} frames`}
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className="tuning-lightbox"
        aria-label="Gallery"
        onClose={onClose}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        {current && index !== null ? (
          <figure className="tuning-lightbox-figure">
            <div className="tuning-lightbox-frame">
              <Image
                key={current.src}
                src={current.src}
                alt={current.caption ?? `Frame ${index + 1}`}
                width={current.width ?? 1600}
                height={current.height ?? 1067}
                sizes="92vw"
              />
            </div>
            <figcaption>
              <span className="tuning-lightbox-count">
                {pad(index + 1)} / {pad(count)}
              </span>
              {current.caption ? <span>{current.caption}</span> : null}
            </figcaption>
          </figure>
        ) : null}

        <button
          type="button"
          className="tuning-lightbox-close"
          onClick={close}
          aria-label="Close gallery"
        >
          ×
        </button>
        <button
          type="button"
          className="tuning-lightbox-step tuning-lightbox-step--prev"
          onClick={() => step(-1)}
          aria-label="Previous frame"
        >
          ‹
        </button>
        <button
          type="button"
          className="tuning-lightbox-step tuning-lightbox-step--next"
          onClick={() => step(1)}
          aria-label="Next frame"
        >
          ›
        </button>
      </dialog>
    </>
  );
}
