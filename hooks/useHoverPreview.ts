"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

function safePlay(video: HTMLVideoElement) {
  void video.play().catch(() => {
    // Autoplay policy or navigation can interrupt a pending play request.
  });
}

/**
 * A video that previews on hover but costs nothing until it is needed.
 *
 * The `src` is withheld (`armed` is false) until the container nears the
 * viewport, so a page of previews does not open every download at once. Once
 * the data lands it settles on the opening frame, or plays if the pointer got
 * there first. Pass `armed ? src : undefined` as the video's src.
 */
export function useHoverPreview<T extends HTMLElement>(src: string) {
  const containerRef = useRef<T>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoveredRef = useRef(false);
  const [armed, setArmed] = useState(false);

  const play = useCallback((withSound = false) => {
    hoveredRef.current = true;
    setArmed(true);

    const video = videoRef.current;
    if (!video) return;

    video.muted = !withSound;
    safePlay(video);
  }, []);

  const stop = useCallback(() => {
    hoveredRef.current = false;

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    if (armed) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setArmed(true);
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [armed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const settle = () => {
      if (hoveredRef.current) {
        safePlay(video);
        return;
      }

      video.pause();
      video.currentTime = 0;
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      settle();
    } else {
      video.addEventListener('loadeddata', settle, { once: true });
    }

    return () => video.removeEventListener('loadeddata', settle);
  }, [src, armed]);

  return { containerRef, videoRef, armed, play, stop };
}
