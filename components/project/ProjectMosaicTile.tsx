"use client";

import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { useHoverPreview } from '@/hooks/useHoverPreview';
import type { ProjectMediaTile } from '@/lib/projectVideos';

type Props = {
  tile: ProjectMediaTile;
  /** The tall left-hand tiles: bigger type, eager image. */
  feature?: boolean;
  sizes: string;
};

// Where a tile's portrait cut takes over. project-mosaic.css gives the
// full-height row under the same query; change both together.
const PORTRAIT_MEDIA = '(max-width: 1024px) and (orientation: portrait)';

export default function ProjectMosaicTile({ tile, feature = false, sizes }: Props) {
  const className = `project-mosaic-tile${feature ? ' project-mosaic-tile--feature' : ''}`;

  if (tile.kind === 'image') {
    return (
      <figure className={className}>
        <TileImage tile={tile} feature={feature} sizes={sizes} />
        <TileLink href={tile.href} title={tile.title} />
        <TileCaption title={tile.title} caption={tile.caption} feature={feature} />
      </figure>
    );
  }

  return <VideoTile tile={tile} feature={feature} className={className} />;
}

// With a portrait cut this is a <picture>, so the browser downloads only the
// file for the screen it is on (Next's art-direction pattern, getImageProps).
function TileImage({
  tile,
  feature,
  sizes,
}: {
  tile: Extract<ProjectMediaTile, { kind: 'image' }>;
  feature: boolean;
  sizes: string;
}) {
  const alt = tile.title;
  const common = {
    fill: true,
    sizes,
    quality: 75,
    loading: feature ? 'eager' : 'lazy',
  } as const;

  if (!tile.portraitSrc) {
    return <Image className="project-mosaic-media" src={tile.src} alt={alt} {...common} />;
  }

  const {
    props: { srcSet: portrait },
  } = getImageProps({ ...common, alt, src: tile.portraitSrc });
  const { props } = getImageProps({ ...common, alt, src: tile.src });

  return (
    <picture>
      <source media={PORTRAIT_MEDIA} srcSet={portrait} sizes={sizes} />
      <img className="project-mosaic-media" {...props} alt={alt} />
    </picture>
  );
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
