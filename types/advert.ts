// The Brand Box page: an advertising campaign told as a commercial break.
// Content lives in data/brandBox.ts; components/advert/ renders it.

export interface AdStill {
  src: string;
  /** Read as alt text, and printed as the shot note on storyboard frames. */
  alt: string;
}

/** A trailer cut. The page shows a "please stand by" card until one is set. */
export interface AdTrailer {
  /** Path under public/, e.g. /projects/brand-box/trailers/garments.mp4 */
  src: string;
  poster?: string;
}

/** One property's frames on the storyboard. */
export interface AdReel {
  id: string;
  name: string;
  note: string;
  stills: AdStill[];
}

interface AdSpotBase {
  /** Anchor id, also the hero's jump link. */
  id: string;
  number: string;
  category: string;
  /** The slogan as two lines; the second is set in the italic accent. */
  headline: [string, string];
  /** A second slogan, set smaller under the first. */
  subline?: string;
  /** The spot's own colour, picked from its footage. */
  accent: string;
  trailer?: AdTrailer;
}

/** A fashion-magazine spread: one tall plate and two small ones. */
export interface AdSpreadSpot extends AdSpotBase {
  layout: 'spread';
  stills: [AdStill, AdStill, AdStill];
}

/** Portrait cuts, as they would run on a phone. */
export interface AdVerticalSpot extends AdSpotBase {
  layout: 'vertical';
  stills: AdStill[];
}

/** An outdoor billboard, then the shoot laid out as an agency storyboard. */
export interface AdStoryboardSpot extends AdSpotBase {
  layout: 'storyboard';
  billboard: AdStill;
  reels: AdReel[];
}

/** A product hero shot with its supporting frames pinned round it. */
export interface AdPackshotSpot extends AdSpotBase {
  layout: 'packshot';
  product: string;
  hero: AdStill;
  stills: AdStill[];
}

export type AdSpot = AdSpreadSpot | AdVerticalSpot | AdStoryboardSpot | AdPackshotSpot;

export interface AdCampaign {
  kicker: string;
  /** The hero headline; the last word is lit. */
  headline: string;
  /** Frames on the wall behind the hero's spotlight. */
  wall: AdStill[];
  trailer?: AdTrailer;

  copy: {
    headline: [string, string];
    paragraphs: string[];
    signOff: string;
  };
  /** "a product into a story" and so on, as [from, to] pairs. */
  transformations: [string, string][];
  blend: string[];

  roster: string[];
  categories: string[];

  close: {
    lede: string;
    /** Set huge, one per line; decoration for the lede above them. */
    words: string[];
    line: string;
    signOff: string;
  };

  spots: AdSpot[];
}
