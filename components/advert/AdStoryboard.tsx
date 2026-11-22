'use client';

import Image from 'next/image';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { AdReel } from '@/types/advert';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The hotel shoots laid out the way an agency presents a spot before it is
 * cut: numbered frames on a board, each with its shot note underneath. One
 * property at a time, picked from the tabs; only the open one is rendered, so
 * the other boards' frames are not fetched until asked for.
 */
export default function AdStoryboard({ reels }: { reels: AdReel[] }) {
  const [active, setActive] = useState(reels[0]?.id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Arrow keys move between tabs, as the WAI-ARIA tabs pattern expects.
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + reels.length) % reels.length;
    setActive(reels[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ad-board">
      <div className="ad-board-head">
        <p className="ad-board-label">Storyboard</p>
        <div className="ad-board-tabs" role="tablist" aria-label="Hotel shoots">
          {reels.map((reel, index) => {
            const selected = reel.id === active;
            return (
              <button
                key={reel.id}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${reel.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${reel.id}`}
                tabIndex={selected ? 0 : -1}
                className="ad-board-tab"
                onClick={() => setActive(reel.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {reel.name}
                <small>{pad(reel.stills.length)} fr</small>
              </button>
            );
          })}
        </div>
      </div>

      {reels.map((reel) =>
        reel.id === active ? (
          <div
            key={reel.id}
            role="tabpanel"
            id={`${baseId}-panel-${reel.id}`}
            aria-labelledby={`${baseId}-tab-${reel.id}`}
            className="ad-board-panel"
          >
            <p className="ad-board-note">{reel.note}</p>
            <ol className="ad-board-grid">
              {reel.stills.map((still, index) => (
                <li key={still.src}>
                  <figure className="ad-frame">
                    <div className="ad-frame-img">
                      <Image
                        src={still.src}
                        alt=""
                        fill
                        sizes="(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 24vw"
                        quality={60}
                      />
                    </div>
                    <figcaption>
                      <span>FR {pad(index + 1)}</span>
                      {still.alt}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ol>
          </div>
        ) : null,
      )}
    </div>
  );
}
