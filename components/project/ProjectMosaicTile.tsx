"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useHoverPreview } from '@/hooks/useHoverPreview';
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
  const { containerRef, videoRef, armed, play, stop } = useHoverPreview<HTMLElement>(
    tile.preview,
  );

  return (
    <figure
      ref={containerRef}
      className={className}
      onMouseEnter={() => play()}
      onMouseLeave={stop}
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
