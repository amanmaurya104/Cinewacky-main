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
  /**
   * When in the story this passage sits. Only the tide layout reads it, to mark
   * which passages are the wedding morning and which are the year behind it.
   */
  time?: 'now' | 'then';
}

export interface StoryAchievement {
  year?: string;
  title: string;
  description?: string;
}

/** Optional per-story colour treatment; see the theme blocks in story.css. */
export type StoryTheme = 'moonlight';

/**
 * How the still-frame gallery is laid out. `ring` is the default 3D carousel of
 * 16:9 stills; `arc` fans portrait cards over a rising disc.
 */
export type StoryGalleryLayout = 'ring' | 'arc';

export interface Story {
  slug: string;
  projectSlug: string;
  projectVideoFilename?: string;
  theme?: StoryTheme;
  galleryLayout?: StoryGalleryLayout;
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
