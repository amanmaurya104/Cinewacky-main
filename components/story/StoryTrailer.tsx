"use client";

import { useCallback, useRef, useState } from 'react';

type Props = {
  trailer: string;
  poster: string;
  title: string;
};

export default function StoryTrailer({ trailer, poster, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play();
    setPlaying(true);
  }, []);

  return (
    <section className="story-section story-section--wide" aria-labelledby="trailer-heading">
      <p className="story-section-eyebrow">Watch</p>
      <h2 id="trailer-heading" className="story-section-title">
        Trailer
      </h2>
      <div className="story-trailer-wrap">
        <video
          ref={videoRef}
          className="story-trailer-video"
          src={trailer}
          poster={poster}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />
        {!playing ? (
          <button
            type="button"
            className="story-trailer-play"
            onClick={play}
            aria-label={`Play ${title} trailer`}
          >
            <span className="story-trailer-play-icon" aria-hidden>
              ▶
            </span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
