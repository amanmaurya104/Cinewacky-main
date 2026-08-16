export interface StoryCrewMember {
  role: string;
  name: string;
}

export interface StoryCastMember {
  actor: string;
  character: string;
  portrait?: string;
}

export interface StoryNarrativeBlock {
  text: string;
  image: string;
}

export interface StoryAchievement {
  year?: string;
  title: string;
  description?: string;
}

/** Optional per-story colour treatment; see the theme blocks in story.css. */
export type StoryTheme = 'moonlight';

export interface Story {
  slug: string;
  projectSlug: string;
  projectVideoFilename?: string;
  theme?: StoryTheme;
  title: string;
  tagline: string;
  heroVideo: string;
  poster: string;
  thumbnail: string;
  synopsis: string;
  visualNarrative: StoryNarrativeBlock[];
  crew: StoryCrewMember[];
  cast: StoryCastMember[];
  gallery: string[];
  achievements: StoryAchievement[];
  producerNote?: string;
  trailer: string;
}
