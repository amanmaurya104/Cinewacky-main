// Whether a page is open to visitors.
//
// Every project, story, documentary and menu item carries a `status`. A
// project is live when its own status is; a story or documentary only when it
// and its project both are (isPiecePublished in lib/stories.ts). Pages, links
// and the sitemap all decide through these helpers, so a page cannot be live
// in one place and parked in another.
//
// Client components import this file (the menu, the home page titles), so it
// must only depend on data/projects. The story and documentary checks need the
// full content, which must stay out of client bundles, so they live in
// lib/stories.ts instead.

import { getProjectBySlug } from '@/data/projects';
import type { PublishStatus } from '@/types/publishing';

/** Where draft pages redirect, and where links to them go. */
export const MAINTENANCE_PATH = '/maintenance';

export function isLive(item: { status: PublishStatus } | undefined): boolean {
  return item?.status === 'live';
}

/** Where a link to a project should go: its page once live, else /maintenance. */
export function getProjectHref(slug: string | undefined): string {
  const project = slug ? getProjectBySlug(slug) : undefined;
  return project && isLive(project) ? `/project/${project.slug}` : MAINTENANCE_PATH;
}
