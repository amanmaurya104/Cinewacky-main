import stories from '@/data/stories';
import { showcaseVideoSrc } from '@/lib/projectVideos';
import type { Story } from '@/types/story';

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
  return story?.slug;
}
