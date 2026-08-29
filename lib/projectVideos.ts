import type { Project } from '@/types/project';

export type ProjectVideoItem = {
  src: string;
  title: string;
  filename: string;
  poster?: string;
};

export function videoTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .trim()
    .toUpperCase();
}

export function showcaseVideoSrc(slug: string, filename: string): string {
  const encodedFilename = filename
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `/showcase/${slug}/${encodedFilename}`;
}

// The project page shows these as hover-preview banners and clicking one
// navigates to the story, so they play the short loop rather than the film —
// otherwise browsing the page streams 340MB of full-length features.
// Built by scripts/build-hero-loops.mjs.
export function showcaseLoopSrc(slug: string, filename: string): string {
  return showcaseVideoSrc(slug, filename.replace(/\.mp4$/, '-loop.mp4'));
}

export function showcasePosterSrc(slug: string, filename: string): string {
  return showcaseVideoSrc(slug, filename.replace(/\.mp4$/, '-poster.jpg'));
}

export function getProjectShowcaseVideos(project: Project): ProjectVideoItem[] {
  if (!project.videos?.length) return [];

  return project.videos.map((filename) => ({
    src: showcaseLoopSrc(project.slug, filename),
    title: videoTitleFromFilename(filename),
    filename,
    poster: showcasePosterSrc(project.slug, filename),
  }));
}

export function getProjectPlaybackVideos(project: Project): ProjectVideoItem[] {
  const showcaseVideos = getProjectShowcaseVideos(project);
  if (showcaseVideos.length) return showcaseVideos;

  if (!project.previewVideo) return [];

  return [
    {
      src: project.previewVideo,
      title: project.title.toUpperCase(),
      filename: 'preview',
    },
  ];
}

export function getProjectVideoMeta(project: Project): string | undefined {
  const parts = [project.client, project.year].filter(Boolean);
  return parts.length ? parts.join(' / ') : project.tagline;
}

type ProjectMediaTileBase = {
  title: string;
  caption?: string;
  feature: boolean;
  /** Where the tile navigates when clicked, if anywhere. */
  href?: string;
};

export type ProjectMediaTile =
  | (ProjectMediaTileBase & {
      kind: 'video';
      /** Short silent loop, played on hover. */
      preview: string;
      poster: string;
    })
  | (ProjectMediaTileBase & {
      kind: 'image';
      src: string;
    });

// The documentary pages are not published yet, so every tile that names one is
// parked on the maintenance screen. Flip this to false to send tiles through to
// /project/<project>/<documentary>; the route and its data are already in place.
const PARK_TILES_ON_MAINTENANCE: boolean = true;

// Mosaic tiles never point at the full film: the documentary cuts here are
// 43MB and 25MB. Hover plays the ~1MB loop built by scripts/build-hero-loops.mjs,
// and clicking opens the documentary page rather than an inline player.
export function getProjectMediaTiles(project: Project): ProjectMediaTile[] {
  if (!project.media?.length) return [];

  return project.media.map((item) => {
    const base = {
      title: item.title,
      caption: item.caption,
      feature: item.feature ?? false,
      href: item.documentary
        ? PARK_TILES_ON_MAINTENANCE
          ? '/maintenance'
          : `/project/${project.slug}/${item.documentary}`
        : undefined,
    };

    if (!/\.mp4$/i.test(item.file)) {
      return {
        ...base,
        kind: 'image' as const,
        src: showcaseVideoSrc(project.slug, item.file),
      };
    }

    return {
      ...base,
      kind: 'video' as const,
      preview: showcaseLoopSrc(project.slug, item.file),
      poster: showcasePosterSrc(project.slug, item.file),
    };
  });
}
