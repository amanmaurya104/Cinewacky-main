import documentaries, {
  getAllDocumentaryParams,
  getDocumentaryForProject,
} from '@/data/documentaries';
import { getProjectBySlug } from '@/data/projects';
import stories from '@/data/stories';
import { showcaseVideoSrc } from '@/lib/mediaPaths';
import { isLive, MAINTENANCE_PATH } from '@/lib/publishing';
import type { Story } from '@/types/story';

// Stories and documentaries are both "pieces" of a project, served at
// /project/<project>/<piece>. These three helpers apply the publishing rule
// from lib/publishing.ts to them. They load the full content, so import them
// from server code only.

/** Whether the story or documentary at /project/<project>/<piece> is open. */
export function isPiecePublished(projectSlug: string, pieceSlug: string): boolean {
  const piece =
    getStoryBySlug(projectSlug, pieceSlug) ?? getDocumentaryForProject(projectSlug, pieceSlug);
  return isLive(getProjectBySlug(projectSlug)) && isLive(piece);
}

/** Where a link to a story or documentary should go. */
export function getPieceHref(projectSlug: string, pieceSlug: string): string {
  return isPiecePublished(projectSlug, pieceSlug)
    ? `/project/${projectSlug}/${pieceSlug}`
    : MAINTENANCE_PATH;
}

/** Every live story or documentary page, as { project slug, piece slug }. */
export function getPublishedPieceParams(): { slug: string; storySlug: string }[] {
  return [...getAllStoryParams(), ...getAllDocumentaryParams()].filter(({ slug, storySlug }) =>
    isPiecePublished(slug, storySlug),
  );
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
