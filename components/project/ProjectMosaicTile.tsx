"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProjectMediaTile } from '@/lib/projectVideos';

type Props = {
  tile: ProjectMediaTile;
  /** The tall left-hand tiles: bigger type, eager image. */
  feature?: boolean;
  sizes: string;
};

export default function ProjectMosaicTile({ tile, feature = false, sizes }: Props) {
  const className = `project-mosaic-tile${feature ? ' project-mosaic-tile--feature' : ''}`;

  if (tile.kind === 'image') {
    return (
      <figure className={className}>
        <Image
          className="project-mosaic-media"
          src={tile.src}
          alt={tile.title}
          fill
          sizes={sizes}
          quality={75}
          loading={feature ? 'eager' : 'lazy'}
        />
        <TileLink href={tile.href} title={tile.title} />
        <TileCaption title={tile.title} caption={tile.caption} feature={feature} />
      </figure>
    );
  }

  return <VideoTile tile={tile} feature={feature} className={className} />;
}

function TileCaption({
  title,
  caption,
  feature,
}: {
  title: string;
  caption?: string;
  feature: boolean;
}) {
  return (
    <figcaption className="project-mosaic-caption">
      <h2 className={`project-mosaic-title${feature ? ' project-mosaic-title--feature' : ''}`}>
        {title}
      </h2>
      {caption ? <p className="project-mosaic-meta">{caption}</p> : null}
    </figcaption>
  );
}

// The whole tile is the hit area. No play affordance: the click opens the
// documentary page, it does not start the film here.
function TileLink({ href, title }: { href?: string; title: string }) {
  if (!href) return null;

  return (
    <Link href={href} className="project-mosaic-open" aria-label={`Open ${title}`} />
  );
}

function VideoTile({
  tile,
  feature,
  className,
}: {
  tile: Extract<ProjectMediaTile, { kind: 'video' }>;
  feature: boolean;
  className: string;
}) {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoveredRef = useRef(false);
  // The loop is withheld until the tile nears the viewport, so opening the page
  // does not start every preview download at once.
  const [armed, setArmed] = useState(false);

  const safePlay = useCallback((video: HTMLVideoElement) => {
    void video.play().catch(() => {
      // Autoplay policy or navigation can interrupt a pending play request.
    });
  }, []);

  const handleEnter = useCallback(() => {
    hoveredRef.current = true;
    setArmed(true);

    const video = videoRef.current;
    if (video) safePlay(video);
  }, [safePlay]);

  const handleLeave = useCallback(() => {
    hoveredRef.current = false;

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    if (armed) return;

    const figure = figureRef.current;
    if (!figure) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setArmed(true);
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, [armed]);

  // Show the opening frame rather than black once the loop's data lands.
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
  }, [armed, safePlay]);

  return (
    <figure
      ref={figureRef}
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <video
        ref={videoRef}
        className="project-mosaic-media"
        src={armed ? tile.preview : undefined}
        poster={tile.poster}
        playsInline
        loop
        muted
        preload={armed ? 'metadata' : 'none'}
        disablePictureInPicture
      />

      <TileLink href={tile.href} title={tile.title} />
      <TileCaption title={tile.title} caption={tile.caption} feature={feature} />
    </figure>
  );
}
