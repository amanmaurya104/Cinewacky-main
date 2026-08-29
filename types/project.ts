/** One tile on a mosaic project page. `file` lives under public/showcase/{slug}/. */
export interface ProjectMediaItem {
  file: string;
  title: string;
  caption?: string;
  /** Renders in the tall left column instead of the right stack. */
  feature?: boolean;
  /** Slug in data/documentaries.ts; clicking the tile opens that page. */
  documentary?: string;
}

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
  /** Filenames under public/showcase/{slug}/ */
  videos?: string[];
  /** 'stack' (default) is the full-width banner list; 'mosaic' is the sidebar grid. */
  layout?: 'stack' | 'mosaic';
  /** Mosaic tiles, in order. Videos and images may be mixed. */
  media?: ProjectMediaItem[];
}
