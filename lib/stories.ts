import documentaries, { getAllDocumentaryParams } from '@/data/documentaries';
import { getProjectBySlug } from '@/data/projects';
import stories from '@/data/stories';
import { showcaseVideoSrc } from '@/lib/projectVideos';
import type { Story } from '@/types/story';

// On Reel Vibe Uncut only the finished pages open; the rest park on
// /maintenance until they have one. Add a slug here to publish its page.
const LIVE_REEL_PAGES = new Set(['kali', 'dark-rising', 'mistimukh', 'moonlight-dream']);

/** Whether a story or documentary page under a project is published. */
export function isPiecePublished(projectSlug: string, pieceSlug: string): boolean {
  if (projectSlug === 'reel-vibe-uncut') return LIVE_REEL_PAGES.has(pieceSlug);
  return true;
}

export function getStoriesForProject(projectSlug: string): Story[] {
  return stories.filter((story) => story.projectSlug === projectSlug);
}

export function getStoryBySlug(
  projectSlug: string,
  storySlug: string
): Story | undefined {
  return stories.find(
    (story) => story.projectSlug === projectSlug && story.slug === storySlug
  );
}

export function getAdjacentStories(
  projectSlug: string,
  storySlug: string
): { prev?: Story; next?: Story } {
  const projectStories = getStoriesForProject(projectSlug);
  const index = projectStories.findIndex((story) => story.slug === storySlug);

  if (index === -1) return {};

  return {
    prev: projectStories[index - 1],
    next: projectStories[index + 1],
  };
}

export function getAllStoryParams(): { slug: string; storySlug: string }[] {
  return stories.map((story) => ({
    slug: story.projectSlug,
    storySlug: story.slug,
  }));
}

/** Every live story or documentary page, as { project slug, piece slug }. */
export function getPublishedPieceParams(): { slug: string; storySlug: string }[] {
  return [...getAllStoryParams(), ...getAllDocumentaryParams()].filter(
    ({ slug, storySlug }) =>
      getProjectBySlug(slug)?.ready && isPiecePublished(slug, storySlug)
  );
}

export function getStorySlugForVideo(
  projectSlug: string,
  filename: string
): string | undefined {
  const videoSrc = showcaseVideoSrc(projectSlug, filename);
  const story = getStoriesForProject(projectSlug).find(
    (item) =>
      item.projectVideoFilename === filename ||
      item.heroVideo === videoSrc ||
      item.trailer === videoSrc
  );
  if (story) return story.slug;

  // A film can also open a documentary page under the same project — Dark
  // Rising does — matched by the full-length source the page plays.
  return documentaries.find(
    (documentary) =>
      documentary.projectSlug === projectSlug && documentary.video === videoSrc
  )?.slug;
}
