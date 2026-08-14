"use client";

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoveredRef = useRef(false);
  // These banners point at full-length films (48-69MB each, six on the
  // reel-vibe-uncut page). The `src` is withheld until the banner is near the
  // viewport so the page does not open six simultaneous downloads.
  const [armed, setArmed] = useState(false);
  const accentClass = ACCENT_CLASSES[index % ACCENT_CLASSES.length];

  const safePlay = useCallback((video: HTMLVideoElement) => {
    void video.play().catch(() => {
      // Autoplay and navigation timing can interrupt a pending play request.
    });
  }, []);

  // Hovering before the observer has armed the banner still starts playback —
  // the `loadeddata` handler below picks it up once the source is attached.
  const play = useCallback(() => {
    isHoveredRef.current = true;
    setArmed(true);

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    safePlay(video);
  }, [safePlay]);

  const playWithSound = useCallback(() => {
    isHoveredRef.current = true;
    setArmed(true);

    const video = videoRef.current;
    if (!video) return;

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

  // Attach the source only once the banner is close to the viewport.
  useEffect(() => {
    if (armed) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setArmed(true);
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [armed]);

  // Once metadata is in, seek to the opening frame so the banner has an image —
  // `preload="metadata"` fetches the index and one keyframe, not the whole film.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const settle = () => {
      if (isHoveredRef.current) {
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
  }, [src, armed, safePlay]);

  return (
    <section
      ref={sectionRef}
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
        src={armed ? src : undefined}
        poster={poster}
        playsInline
        loop
        muted
        preload={armed ? 'metadata' : 'none'}
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
