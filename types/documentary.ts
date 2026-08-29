export interface DocumentaryCredit {
  role: string;
  name: string;
}

export interface DocumentaryAward {
  title: string;
  detail?: string;
}

/** One mounted image. `caption` prints on the slip beneath it. */
export interface DocumentaryPlate {
  src: string;
  caption?: string;
}

/** A titled run of prose, optionally mounted beside a plate. */
export interface DocumentaryPassage {
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
  plate?: DocumentaryPlate;
}

export interface DocumentaryVoiceGroup {
  group: string;
  entries: { name: string; role?: string }[];
}

export interface Documentary {
  id: string;
  slug: string;
  title: string;
  /** 'archive' swaps the default dark template for the album layout. */
  theme?: 'archive';
  tagline?: string;
  /** One paragraph per entry. */
  synopsis?: string[];
  year?: string;
  duration?: string;
  language?: string;
  location?: string;
  director?: string;
  /** Silent loop behind the title block. */
  heroLoop?: string;
  heroPoster?: string;
  /** Full-length source for the in-page player; loaded only on play. */
  video?: string;
  videoPoster?: string;
  videoLabel?: string;
  stills?: string[];
  credits?: DocumentaryCredit[];
  awards?: DocumentaryAward[];
  /** Back link target, e.g. /project/life-beyond-lens. */
  projectSlug?: string;
  projectTitle?: string;

  /* ---- archive theme ---- */
  /** Short facts printed under the title: director, form, place. */
  factLine?: string[];
  heroPlate?: DocumentaryPlate;
  /** The opening quote, set large. */
  epigraph?: string;
  /** The paragraphs that follow the epigraph. */
  overture?: string[];
  passages?: DocumentaryPassage[];
  voices?: DocumentaryVoiceGroup[];
  /** The closing contact sheet. */
  plates?: DocumentaryPlate[];
  colophon?: string;
}
