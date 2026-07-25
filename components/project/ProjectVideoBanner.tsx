"use client";

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const ACCENT_CLASSES = [
  'project-video-banner-title--gold',
  'project-video-banner-title--ember',
  'project-video-banner-title--lime',
  'project-video-banner-title--cyan',
  'project-video-banner-title--rose',
  'project-video-banner-title--violet',
] as const;

type Props = {
  src: string;
  title: string;
  category: string;
  meta?: string;
  poster?: string;
  index: number;
  hideTitle?: boolean;
  storyHref?: string;
};

export default function ProjectVideoBanner({
  src,
  title,
  category,
  meta,
  poster,
  index,
  hideTitle = false,
  storyHref,
}: Props) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoveredRef = useRef(false);
  const accentClass = ACCENT_CLASSES[index % ACCENT_CLASSES.length];

  const safePlay = useCallback((video: HTMLVideoElement) => {
    void video.play().catch(() => {
      // Autoplay and navigation timing can interrupt a pending play request.
    });
  }, []);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isHoveredRef.current = true;
    video.muted = true;
    safePlay(video);
  }, [safePlay]);

  const playWithSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isHoveredRef.current = true;
    video.muted = false;
    safePlay(video);
  }, [safePlay]);

  const handleClick = useCallback(() => {
    if (storyHref) {
      router.push(storyHref);
      return;
    }

    playWithSound();
  }, [playWithSound, router, storyHref]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isHoveredRef.current = false;
    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showFirstFrame = () => {
      if (isHoveredRef.current) return;

      video.pause();
      video.currentTime = 0;
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showFirstFrame();
    } else {
      video.addEventListener('loadeddata', showFirstFrame, { once: true });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          showFirstFrame();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', showFirstFrame);
    };
  }, [src]);

  return (
    <section
      className="project-video-banner"
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      role={storyHref ? 'link' : undefined}
      tabIndex={storyHref ? 0 : undefined}
      aria-label={storyHref ? `Open ${title}` : title}
    >
      <video
        ref={videoRef}
        className="project-video-banner-media"
        src={src}
        poster={poster}
        playsInline
        loop
        muted
        preload="auto"
        disablePictureInPicture
      />

      <div className="project-video-banner-overlay" aria-hidden>
        <p className="project-video-banner-category">{category}</p>

        <div className="project-video-banner-copy">
          {!hideTitle ? (
            <h2 className={`project-video-banner-title ${accentClass}`}>{title}</h2>
          ) : null}
          {meta ? <p className="project-video-banner-meta">{meta}</p> : null}
        </div>
      </div>
    </section>
  );
}
