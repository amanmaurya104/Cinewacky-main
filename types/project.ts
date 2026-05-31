export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  thumbnail: string;
  poster: string;
  previewVideo: string;
  heroImage: string;
  gallery: string[];
  year: string;
  duration?: string;
  client?: string;
}
