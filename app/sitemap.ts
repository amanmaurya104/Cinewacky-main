import type { MetadataRoute } from 'next';
import projects from '@/data/projects';
import { isLive } from '@/lib/publishing';
import { SITE_URL } from '@/lib/site';
import { getPublishedPieceParams } from '@/lib/stories';

// Live pages only: drafts redirect to /maintenance.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...projects.filter((project) => isLive(project)).map(({ slug }) => `/project/${slug}`),
    ...getPublishedPieceParams().map(({ slug, storySlug }) => `/project/${slug}/${storySlug}`),
  ];

  return paths.map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
