import type { Project } from '@/types/project';

export type ProjectVideoItem = {
  src: string;
  title: string;
  filename: string;
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

export function getProjectShowcaseVideos(project: Project): ProjectVideoItem[] {
  if (!project.videos?.length) return [];

  return project.videos.map((filename) => ({
    src: showcaseVideoSrc(project.slug, filename),
    title: videoTitleFromFilename(filename),
    filename,
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
