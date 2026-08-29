"use client";

import { useCallback, useRef, useState } from 'react';

type Props = {
  src: string;
  poster?: string;
  label?: string;
  title: string;
  /** Section class, so a themed page can frame the player its own way. */
  className?: string;
};

// The source is a full-length cut (43MB for the current trailer), so it is
// attached only once someone actually asks to watch it.
export default function DocumentaryVideo({
  src,
  poster,
  label,
  title,
  className = 'documentary-watch',
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    setStarted(true);

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play().catch(() => {
      // The user can still hit the native control if autoplay is refused.
    });
  }, []);

  return (
    <section className={className}>
      {label ? <h2 className="documentary-section-title">{label}</h2> : null}

      <div className="documentary-player">
        <video
          ref={videoRef}
          className="documentary-player-media"
          src={started ? src : undefined}
          poster={poster}
          playsInline
          controls={started}
          preload="none"
          onLoadedData={() => {
            const video = videoRef.current;
            if (video && started) void video.play().catch(() => {});
          }}
        />

        {!started ? (
          <button
            type="button"
            className="documentary-player-start"
            onClick={start}
            aria-label={`Play ${title}`}
          >
            <span className="documentary-player-ring" aria-hidden>
              <svg viewBox="0 0 24 24" width="26" height="26" focusable="false">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
