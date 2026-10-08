import type { MetadataRoute } from 'next';
import projects from '@/data/projects';
import { SITE_URL } from '@/lib/site';
import { getPublishedPieceParams } from '@/lib/stories';

// Only finished pages: unfinished ones redirect to /maintenance.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...projects.filter((project) => project.ready).map(({ slug }) => `/project/${slug}`),
    ...getPublishedPieceParams().map(({ slug, storySlug }) => `/project/${slug}/${storySlug}`),
  ];

  return paths.map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
