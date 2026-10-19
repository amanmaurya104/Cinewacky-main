'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { DocumentaryBroadcast } from '@/types/documentary';
import { pad } from './format';

type Props = {
  broadcasts: DocumentaryBroadcast[];
};

function embedSrc(broadcast: DocumentaryBroadcast): string {
  if (broadcast.kind === 'facebook') {
    const href = encodeURIComponent(broadcast.source);
    return `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&autoplay=true`;
  }
  return `https://www.youtube-nocookie.com/embed/${broadcast.source}?autoplay=1&rel=0&playsinline=1`;
}

function hostName(broadcast: DocumentaryBroadcast): string {
  return broadcast.kind === 'facebook' ? 'Facebook' : 'YouTube';
}

/**
 * The trailers as a playlist with one stage. Nothing from YouTube or Facebook
 * loads until someone presses play — the stage is a poster and a button until
 * then — so the page carries no third-party player weight or cookies on arrival.
 *
 * The episode dial links here as #broadcast-<id>; that tunes the stage to the
 * teaser without starting it. Those ids are anchors at the top of the block,
 * so the browser scrolls to the stage itself, and picking a track writes its
 * hash back, so the dial's link always counts as a change.
 */
export default function TuningBroadcasts({ broadcasts }: Props) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function fromHash() {
      const match = window.location.hash.match(/^#broadcast-(.+)$/);
      if (!match) return;
      const index = broadcasts.findIndex((broadcast) => broadcast.id === match[1]);
      if (index === -1) return;
      setActive(index);
      setPlaying(false);
    }

    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [broadcasts]);

  const current = broadcasts[active];
  if (!current) return null;

  return (
    <div className="tuning-broadcasts">
      {broadcasts.map((broadcast) => (
        <span
          key={broadcast.id}
          id={`broadcast-${broadcast.id}`}
          className="tuning-anchor"
          aria-hidden
        />
      ))}

      <div className="tuning-stage-column">
        <div className="tuning-stage">
          {playing ? (
            <iframe
              key={current.id}
              src={embedSrc(current)}
              title={`${current.title} — ${current.channel}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className="tuning-stage-start"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${current.title}, ${current.channel}`}
            >
              <Image
                key={current.poster}
                src={current.poster}
                alt=""
                fill
                sizes="(max-width: 900px) 92vw, 58vw"
              />
              <span className="tuning-stage-ring" aria-hidden>
                <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <div className="tuning-stage-meta">
          <p className="tuning-stage-label">
            Now tuned to <span>{pad(active + 1)}</span>
          </p>
          <h3 className="tuning-stage-title">{current.title}</h3>
          <p className="tuning-stage-channel">{current.channel}</p>
          <a
            className="tuning-stage-open"
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on {hostName(current)} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <ol className="tuning-playlist">
        {broadcasts.map((broadcast, index) => {
          const isActive = index === active;
          return (
            <li key={broadcast.id}>
              <button
                type="button"
                className="tuning-track"
                aria-current={isActive || undefined}
                onClick={() => {
                  setActive(index);
                  setPlaying(true);
                  window.history.replaceState(
                    window.history.state,
                    '',
                    `#broadcast-${broadcast.id}`,
                  );
                }}
              >
                <span className="tuning-track-number">{pad(index + 1)}</span>
                <span className="tuning-track-thumb">
                  <Image src={broadcast.poster} alt="" fill sizes="112px" quality={60} />
                </span>
                <span className="tuning-track-text">
                  <span className="tuning-track-title">{broadcast.title}</span>
                  <span className="tuning-track-channel">
                    {broadcast.channel} · {hostName(broadcast)}
                  </span>
                </span>
                <span
                  className={`tuning-eq${isActive && playing ? ' tuning-eq--live' : ''}`}
                  aria-hidden
                >
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
