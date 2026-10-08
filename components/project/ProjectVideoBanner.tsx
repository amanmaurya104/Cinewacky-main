"use client";

import Link from 'next/link';
import { useHoverPreview } from '@/hooks/useHoverPreview';

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

// The banners play short hover loops (see showcaseLoopSrc), loaded lazily by
// useHoverPreview. With a storyHref the whole banner is a real link, so it
// prefetches and supports middle-click / open in new tab; without one, a click
// plays the loop with sound.
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
  const { containerRef, videoRef, armed, play, stop } = useHoverPreview<HTMLElement>(src);
  const accentClass = ACCENT_CLASSES[index % ACCENT_CLASSES.length];

  return (
    <section
      ref={containerRef}
      className="project-video-banner"
      onMouseEnter={() => play()}
      onMouseLeave={stop}
      onClick={storyHref ? undefined : () => play(true)}
      aria-label={storyHref ? undefined : title}
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

      {storyHref ? (
        <Link href={storyHref} className="project-video-banner-open" aria-label={`Open ${title}`} />
      ) : null}

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
