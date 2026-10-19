import type { PublishStatus } from '@/types/publishing';

/** One tile on a mosaic project page. `file` lives under public/showcase/{slug}/. */
export interface ProjectMediaItem {
  file: string;
  title: string;
  caption?: string;
  /** Renders in the tall left column instead of the right stack. */
  feature?: boolean;
  /**
   * Images only: a portrait cut, also under public/showcase/{slug}/, shown on
   * portrait phones and tablets. A lone feature tile that has one fills the
   * screen there instead of sitting in a short landscape row.
   */
  portraitFile?: string;
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
  year: string;
  duration?: string;
  client?: string;
  /** Filenames under public/showcase/{slug}/ */
  videos?: string[];
  /** 'stack' (default) is the full-width banner list; 'mosaic' is the sidebar grid. */
  layout?: 'stack' | 'mosaic';
  /** Mosaic tiles, in order. Videos and images may be mixed. */
  media?: ProjectMediaItem[];
  /** `live` opens the project page, and lets its stories and documentaries go live. */
  status: PublishStatus;
}
