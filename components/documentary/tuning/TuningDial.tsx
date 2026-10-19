'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { DocumentaryBroadcast, DocumentaryEpisode } from '@/types/documentary';
import { pad } from './format';
import { SIGNAL_HEIGHT, SIGNAL_WIDTH } from './signal';

type Props = {
  episodes: DocumentaryEpisode[];
  broadcasts: DocumentaryBroadcast[];
  /**
   * One SVG path per episode, drawn on the server. Computing them here as well
   * would run Math.sin in a second JS engine, and Safari or Firefox can round
   * a last digit differently from Node, which is a hydration mismatch.
   */
  signals: string[];
};

/**
 * The six episodes as stations on one band. It is a tab list underneath —
 * arrow keys move between stations, Home and End jump to the ends — and the
 * needle is just a CSS variable that the active tab sets.
 *
 * Every panel is rendered, inactive ones `hidden`, so all six episode texts are
 * in the HTML.
 *
 * The hero links into it as #ep-1 … #ep-6. Each of those ids is a real anchor
 * at the top of the dial, so the browser does the scrolling — including when
 * the same link is clicked twice. Choosing a station here writes its hash back
 * into the URL, so a later click on a hero link is always a change and always
 * re-tunes the dial.
 *
 * The URL has one hash and the trailer playlist writes it too (#broadcast-<id>).
 * When that broadcast is an episode's own teaser, the dial tunes to the episode,
 * so a reloaded or shared teaser link opens on the station it belongs to.
 */
export default function TuningDial({ episodes, broadcasts, signals }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = episodes.length;

  useEffect(() => {
    function fromHash() {
      const hash = window.location.hash;
      const episode = hash.match(/^#ep-(\d+)$/);
      const broadcast = hash.match(/^#broadcast-(.+)$/);
      const index = episode
        ? Number(episode[1]) - 1
        : broadcast
          ? episodes.findIndex(({ trailer }) => trailer === broadcast[1])
          : -1;
      if (index >= 0 && index < count) setActive(index);
    }

    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [episodes, count]);

  const tuneTo = useCallback(
    (index: number, focus = false) => {
      const next = (index + count) % count;
      setActive(next);
      // Keep Next's history entry state; only the hash changes.
      window.history.replaceState(window.history.state, '', `#ep-${next + 1}`);
      if (focus) tabs.current[next]?.focus();
    },
    [count],
  );

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    tuneTo(moves[event.key], true);
  }

  const style = { '--at': (active + 0.5) / count, '--stations': count } as CSSProperties;

  return (
    <div className="tuning-dial" style={style}>
      {episodes.map((episode, index) => (
        <span key={episode.place} id={`ep-${index + 1}`} className="tuning-anchor" aria-hidden />
      ))}

      <div className="tuning-band">
        <span className="tuning-band-scale" aria-hidden />
        <span className="tuning-needle" aria-hidden />
        <div
          role="tablist"
          aria-label="Episodes"
          className="tuning-stations"
          onKeyDown={onKeyDown}
        >
          {episodes.map((episode, index) => (
            <button
              key={episode.place}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tuning-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`tuning-panel-${index}`}
              tabIndex={index === active ? 0 : -1}
              className="tuning-station"
              onClick={() => tuneTo(index)}
            >
              <span className="tuning-station-number">{pad(index + 1)}</span>
              <span className="tuning-station-place">{episode.place}</span>
              <span className="tuning-station-code" aria-hidden>
                {episode.place.slice(0, 3)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {episodes.map((episode, index) => {
        const trailer = episode.trailer
          ? broadcasts.find((broadcast) => broadcast.id === episode.trailer)
          : undefined;

        return (
          <section
            key={episode.place}
            role="tabpanel"
            id={`tuning-panel-${index}`}
            aria-labelledby={`tuning-tab-${index}`}
            hidden={index !== active}
            className="tuning-episode"
          >
            <div className="tuning-episode-copy">
              <p className="tuning-episode-number">
                Episode {pad(index + 1)} <span>/ {pad(count)}</span>
              </p>
              <h3 className="tuning-episode-place">{episode.place}</h3>
              {episode.locale ? (
                <p className="tuning-episode-locale">{episode.locale}</p>
              ) : null}
              <p className="tuning-episode-text">{episode.text}</p>

              <div className="tuning-episode-actions">
                {trailer ? (
                  <a href={`#broadcast-${trailer.id}`} className="tuning-episode-trailer">
                    <span aria-hidden>▶</span> Watch the teaser
                  </a>
                ) : null}
                <div className="tuning-episode-step">
                  <button
                    type="button"
                    onClick={() => tuneTo(index - 1)}
                    aria-label="Previous episode"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden focusable="false">
                      <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => tuneTo(index + 1)}
                    aria-label="Next episode"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden focusable="false">
                      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <figure
              className={`tuning-episode-visual${episode.plate ? '' : ' tuning-episode-visual--signal'}`}
            >
              {episode.plate ? (
                <Image
                  src={episode.plate.src}
                  alt={episode.plate.caption ?? episode.place}
                  fill
                  sizes="(max-width: 900px) 92vw, 46vw"
                  loading="lazy"
                />
              ) : (
                <span className="tuning-episode-ghost" aria-hidden>
                  {pad(index + 1)}
                </span>
              )}
              <svg
                className="tuning-signal"
                viewBox={`0 0 ${SIGNAL_WIDTH} ${SIGNAL_HEIGHT}`}
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d={signals[index]} pathLength={1} />
              </svg>
              {episode.plate?.caption ? (
                <figcaption>{episode.plate.caption}</figcaption>
              ) : null}
            </figure>
          </section>
        );
      })}
    </div>
  );
}
