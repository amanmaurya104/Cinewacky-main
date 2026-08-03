"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  trailer: string;
  poster: string;
  title: string;
};

export default function StoryTrailer({ trailer, poster, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  // Shown when autoplay is refused (browser policy, reduced motion) or on end.
  const [needsTap, setNeedsTap] = useState(false);

  // Autoplay muted once the trailer is on screen; pause when it leaves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setNeedsTap(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setNeedsTap(false))
            .catch(() => setNeedsTap(true));
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // A tap is a user gesture, so the trailer can start with sound.
  const playWithSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setMuted(false);
    void video.play();
    setNeedsTap(false);
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next && video.paused) void video.play();
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
          muted
          preload="metadata"
          onEnded={() => setNeedsTap(true)}
        />

        {needsTap ? (
          <button
            type="button"
            className="story-trailer-play"
            onClick={playWithSound}
            aria-label={`Play ${title} trailer`}
          >
            <span className="story-trailer-play-icon" aria-hidden>
              ▶
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="story-trailer-sound"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M4 9.5h3.2L12 5.6v12.8L7.2 14.5H4z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {muted ? (
                <path
                  d="M16 9.5l4.5 5m0-5L16 14.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <path
                  d="M15.8 9a4 4 0 010 6M18.4 6.8a7.5 7.5 0 010 10.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
            <span>{muted ? 'Sound off' : 'Sound on'}</span>
          </button>
        )}
      </div>
    </section>
  );
}
