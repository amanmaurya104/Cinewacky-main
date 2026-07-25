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

export interface Story {
  slug: string;
  projectSlug: string;
  projectVideoFilename?: string;
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
