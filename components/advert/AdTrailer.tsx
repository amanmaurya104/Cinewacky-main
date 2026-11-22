'use client';

import { useCallback, useRef, useState } from 'react';
import type { AdTrailer as Trailer } from '@/types/advert';

type Props = {
  trailer?: Trailer;
  /** What is playing, for the play button and the stand-by card's label. */
  title: string;
};

// SMPTE colour bars, the card a broadcast shows while it waits for a feed.
const TOP = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];
const MIDDLE = ['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'];
const BOTTOM = ['#00214c', '#ffffff', '#32006a', '#131313', '#090909', '#131313', '#1d1d1d'];

function Bars({ colours, className }: { colours: string[]; className: string }) {
  return (
    <div className={className}>
      {colours.map((colour, index) => (
        <span key={index} style={{ background: colour }} />
      ))}
    </div>
  );
}

/**
 * A trailer in a monitor frame. Without one yet, the frame shows colour bars
 * and "please stand by"; with one, a poster and a play button, and the file is
 * only attached once someone presses play.
 */
export default function AdTrailer({ trailer, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play().catch(() => {
      // The native controls are still there if autoplay is refused.
    });
  }, []);

  return (
    <div className="ad-screen">
      <span className="ad-crops" aria-hidden />

      {trailer ? (
        <div className="ad-player">
          <video
            ref={videoRef}
            src={started ? trailer.src : undefined}
            poster={trailer.poster}
            playsInline
            controls={started}
            preload="none"
            onLoadedData={() => {
              if (started) void videoRef.current?.play().catch(() => {});
            }}
          />
          {!started ? (
            <button type="button" className="ad-play" onClick={start} aria-label={`Play ${title}`}>
              <span className="ad-play-ring" aria-hidden>
                <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          ) : null}
        </div>
      ) : (
        <div className="ad-standby" role="img" aria-label={`${title}: trailer coming soon`}>
          <Bars colours={TOP} className="ad-bars ad-bars--top" />
          <Bars colours={MIDDLE} className="ad-bars ad-bars--middle" />
          <Bars colours={BOTTOM} className="ad-bars ad-bars--bottom" />
          <p className="ad-standby-card" aria-hidden>
            <strong>Please stand by</strong>
            <span>Trailer premieres soon</span>
          </p>
        </div>
      )}
    </div>
  );
}
