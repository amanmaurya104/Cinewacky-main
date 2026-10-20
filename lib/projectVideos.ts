import { showcaseLoopSrc, showcasePosterSrc, showcaseVideoSrc } from '@/lib/mediaPaths';
import { getPieceHref } from '@/lib/stories';
import type { Project } from '@/types/project';

export type ProjectVideoItem = {
  src: string;
  title: string;
  filename: string;
  poster?: string;
};

/** The banner title: the file name without its extension, hyphens as spaces. */
export function videoTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/-/g, ' ')
    .trim()
    .toUpperCase();
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
  return getProjectShowcaseVideos(project);
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
      /** Shown instead of `src` on portrait screens. */
      portraitSrc?: string;
    });

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
      // A draft documentary's tile opens /maintenance.
      href: item.documentary ? getPieceHref(project.slug, item.documentary) : undefined,
    };

    if (!/\.mp4$/i.test(item.file)) {
      return {
        ...base,
        kind: 'image' as const,
        src: showcaseVideoSrc(project.slug, item.file),
        portraitSrc: item.portraitFile
          ? showcaseVideoSrc(project.slug, item.portraitFile)
          : undefined,
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
