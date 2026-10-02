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
  /**
   * Crop this plate to a portrait window instead of the frame's own 16:9.
   * Only for plates that are pure texture — cloth, beadwork — where losing
   * the sides costs nothing. A plate with a subject in it loses its framing.
   */
  tall?: boolean;
  /**
   * Intrinsic size, for plates laid out at their own aspect ratio rather than
   * cropped into a fixed window — the Dark Rising set photographs are a mix of
   * portrait, 3:2 and 4:3 phone frames.
   */
  width?: number;
  height?: number;
}

/** A titled run of prose, optionally mounted beside a plate. */
export interface DocumentaryPassage {
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
  plate?: DocumentaryPlate;
}

/**
 * One hour of the market morning: the dragon theme hangs its prose off a clock
 * rather than off numbered sections, so the time and the characters beside it
 * are structure, not ornament.
 */
export interface DocumentaryChapter {
  /** Printed in the margin rail, e.g. '05:00'. */
  time: string;
  /** Set vertically under the time. Two characters reads best. */
  han?: string;
  /** Romanisation and gloss for `han`, shown on the rail. */
  hanGloss?: string;
  title: string;
  paragraphs: string[];
  /** Laid out like frames on a light table, each at its own width and offset. */
  plates?: DocumentaryPlate[];
}

/**
 * Required credit for a third-party asset. CC-BY is a condition of use, not a
 * courtesy, so the page cannot render the asset without rendering this.
 */
export interface DocumentaryAttribution {
  work: string;
  workUrl: string;
  author: string;
  authorUrl: string;
  license: string;
  licenseUrl: string;
}

/** One line of the stall board: characters, romanisation, and what it is. */
export interface DocumentaryLexiconEntry {
  han: string;
  roman: string;
  note?: string;
}

export interface DocumentaryVoiceGroup {
  group: string;
  entries: { name: string; role?: string }[];
}

/**
 * A clip that plays silent and on loop inside a chapter, where a still cannot
 * carry the point: a wheel turning, a panel moving under the light.
 */
export interface DocumentaryMotion {
  src: string;
  poster?: string;
  caption?: string;
}

/**
 * One material, and the crafts the film files under it. The craft theme is
 * organised by substance rather than by hour or by section number, so the
 * swatch colour and the two names are structure, not decoration.
 */
export interface DocumentaryMaterial {
  /** Latin name, printed large on the swatch, e.g. 'Clay'. */
  name: string;
  /** The same word in Bengali, set under it. */
  bengali?: string;
  /** Romanisation of `bengali`, for readers who do not read the script. */
  bengaliRoman?: string;
  /** Sampled off the footage; paints the swatch and tints the chapter. */
  swatch: string;
  /** Where the craft is worked, printed on the swatch, e.g. 'Panchmura'. */
  place?: string;
  title: string;
  paragraphs: string[];
  /** Laid out as mounted plates, each at its own width. */
  plates?: DocumentaryPlate[];
  motion?: DocumentaryMotion;
}

/** One line of the register: a living tradition, where it is worked, what it is. */
export interface DocumentaryTradition {
  craft: string;
  place: string;
  note?: string;
}

/**
 * One stop on the crossing. The Margaret to Nivedita page is not filed by
 * section number, by hour or by material but by place: the film is a journey
 * between two names, so each chapter is somewhere she was, and the place and
 * the year printed on its marker are the structure.
 */
export interface DocumentaryStation {
  /** Printed on the marker, e.g. 'Dungannon'. */
  place: string;
  /** The line under it, e.g. 'County Tyrone'. */
  region?: string;
  /** A year or a span, e.g. '1867' or '1895-97'. */
  year?: string;
  title: string;
  paragraphs: string[];
  /**
   * Lettering read off something the camera found: a datestone, a plaque, a
   * grave. Set cut-in rather than quoted, because it is an object in the film
   * and not a line of narration.
   */
  inscription?: string;
  /** Where the inscription is, e.g. 'Wesleyan Chapel, Dungannon'. */
  inscriptionSource?: string;
  plates?: DocumentaryPlate[];
  motion?: DocumentaryMotion;
}

/**
 * One row of the closing ledger: a thing the camera found in Ireland set
 * against what the same life left in India. The page's whole argument is that
 * these are two halves of one person, so they are printed as one row.
 */
export interface DocumentaryLedgerRow {
  /** The Irish side: what is still standing in the town she was born in. */
  here: string;
  /** The Indian side: what the name she was given still carries. */
  there: string;
}

export interface Documentary {
  id: string;
  slug: string;
  title: string;
  /**
   * 'archive' swaps the default dark template for the album layout;
   * 'dragon' for the market-morning layout with the steam dragon behind it;
   * 'craft' for the material record, filed by what the work is made of;
   * 'passage' for the memorial, filed by the places on a crossing;
   * 'rising' for the development dossier, filed as a case record;
   * 'road' for the tour record, laid out like the tour's own poster.
   */
  theme?: 'archive' | 'dragon' | 'craft' | 'passage' | 'rising' | 'road';
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
  /** Overrides for the <title> and meta description, when the brief gives them. */
  seoTitle?: string;
  seoDescription?: string;
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

  /* ---- dragon theme ---- */
  /** The title in Chinese, set beside the Latin one in the hero. */
  han?: string;
  /** Who the film was made for, printed under the title block. */
  commission?: string;
  chapters?: DocumentaryChapter[];
  /** The stall board: the dishes the market is built on. */
  lexicon?: DocumentaryLexiconEntry[];
  lexiconTitle?: string;
  lexiconNote?: string;
  /** Heading over the closing contact sheet. */
  sheetTitle?: string;
  /** Credit for the dragon model, printed in the colophon. */
  attribution?: DocumentaryAttribution;

  /* ---- craft theme ---- */
  /** The film's own burned-in title cards, in order, used as the overture. */
  cards?: string[];
  materials?: DocumentaryMaterial[];
  /** The register of living traditions, printed as a wall panel. */
  traditions?: DocumentaryTradition[];
  registerTitle?: string;
  registerNote?: string;
  /** Heading over the closing contact sheet on the craft page. */
  sheetHeading?: string;

  /* ---- passage theme ---- */
  /** The name she was born with, printed on the left of the name panel. */
  bornName?: string;
  /** The name she was given, printed on the right. */
  givenName?: string;
  /** The given name in Bengali, set large between the two. */
  givenBengali?: string;
  /** Romanisation of `givenBengali`. */
  givenRoman?: string;
  /** What the given name means as a word, e.g. 'the dedicated one'. */
  givenMeaning?: string;
  /** When and where the name was given, printed under the panel. */
  givenOn?: string;
  /** The one archival photograph, mounted beside the name panel. */
  portrait?: DocumentaryPlate;
  stations?: DocumentaryStation[];
  ledger?: DocumentaryLedgerRow[];
  ledgerTitle?: string;
  ledgerNote?: string;
  /** Column headings over the ledger. */
  ledgerHereLabel?: string;
  ledgerThereLabel?: string;
  /** The closing line, set alone over the contact sheet. */
  epitaph?: string;
  epitaphSource?: string;

  /* ---- rising theme ---- */
  dossier?: DocumentaryDossier;

  /* ---- road theme ---- */
  road?: DocumentaryRoad;
}

/* ---- rising theme ------------------------------------------------------- */

/** One line of a labelled record, e.g. 'Proposed duration' / 'Approx. 60 min'. */
export interface DocumentaryFact {
  label: string;
  value: string;
}

/** A numbered entry in a dossier list: a theme, a reason, an intention. */
export interface DocumentaryEntry {
  title: string;
  note: string;
  plate?: DocumentaryPlate;
}

/**
 * One of the two scales the project is told at. `status` is the point of the
 * section: what was shot is drawn solid, what is only proposed is drawn as an
 * outline, so the page cannot be read as claiming a finished series.
 */
export interface DocumentaryLevel {
  level: string;
  title: string;
  text: string;
  status: 'shot' | 'proposed';
  plate?: DocumentaryPlate;
}

/** An ability concept named in the official material. */
export interface DocumentaryPower {
  character: string;
  ability: string;
  performer?: string;
  /** Picks the card's treatment: brushed steel or ember. */
  element: 'metal' | 'fire';
}

export interface DocumentaryDepartment {
  department: string;
  credits: DocumentaryCredit[];
}

/**
 * The Dark Rising page is built from a research dossier rather than from a
 * finished film, and keeps the dossier's distinction between what is verified,
 * what is the project's own claim and what is only proposed. Every field that
 * carries that distinction (`recordNote`, `levelsNote`, `figuresNote`, ...)
 * prints, so the caveats travel with the facts.
 */
export interface DocumentaryDossier {
  /** Studio line over the title, e.g. 'SD Films'. */
  producedBy: string;
  associate: string;

  record: DocumentaryFact[];
  recordNote: string;

  question: string;
  questionPlate: DocumentaryPlate;

  concept: DocumentaryPassage;
  conceptCoda: string;
  themes: DocumentaryEntry[];

  story: DocumentaryPassage;
  levels: DocumentaryLevel[];
  levelsNote: string;

  ground: DocumentaryPassage;
  reasons: DocumentaryEntry[];
  groundCoda: string[];
  set: DocumentaryPlate[];

  roster: { character: string; performer: string }[];
  rosterNote: string;
  powers: DocumentaryPower[];
  powersNote: string;

  approach: DocumentaryPassage;
  intentions: DocumentaryEntry[];
  approachNote: string;

  unveiling: DocumentaryPassage;
  unveilingWhen: string;
  unveilingWhere: string;
  figures: DocumentaryFact[];
  figuresNote: string;

  departments: DocumentaryDepartment[];
  creditsNote: string;
  companies: DocumentaryCredit[];

  frames: DocumentaryPlate[];
}

/* ---- road theme --------------------------------------------------------- */

/**
 * One city on the tour. Only the stop the film covers carries dates and
 * venues; the brief gives none for the others, so none are printed.
 */
export interface DocumentaryRoadStop {
  city: string;
  dates?: string;
  /** The stop the documentary was shot at. */
  here?: boolean;
}

export interface DocumentaryFilm {
  title: string;
  year: string;
}

/**
 * King of the Road records one stop of a travelling retrospective, so the page
 * is laid out in the tour's own poster language and organised around the
 * route: the five cities, with the one the film was made in marked on it.
 */
export interface DocumentaryRoad {
  /** Set small over the title, e.g. 'Wim Wenders'. */
  kicker: string;
  /** Set under the title, e.g. 'The India Journey & Kolkata Chapter'. */
  subtitle: string;
  /** Short counts printed in the hero, e.g. '18 films'. */
  counts: string[];
  heroPlate: DocumentaryPlate;

  /** The opening sentence, set large on its own. */
  lede: string;
  overture: string[];

  routeTitle: string;
  routeSpan: string;
  stops: DocumentaryRoadStop[];

  life: DocumentaryPassage;
  filmography: DocumentaryFilm[];
  filmographyNote: string;
  lifeCoda: string;

  tour: DocumentaryPassage;
  tourLevels: DocumentaryEntry[];

  kolkata: DocumentaryPassage;
  kolkataFacts: DocumentaryFact[];
  kolkataPlate?: DocumentaryPlate;

  perspective: DocumentaryPassage;
  ideas: DocumentaryEntry[];

  /** The tour artwork, mounted as found objects. */
  artwork: DocumentaryPlate[];

  associations: DocumentaryCredit[];
  crew: DocumentaryCredit[];

  /** The one-paragraph summary, set as the closing statement. */
  card: string;
}
