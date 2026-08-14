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
