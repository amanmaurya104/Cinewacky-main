import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Courier_Prime,
  Newsreader,
} from 'next/font/google';

/**
 * Display face for the moonlight story only — its hairlines hold at the sizes
 * that page sets its titles at, where Montserrat 700 just reads as a poster.
 * `preload: false` keeps the files off the wire for every other story, which
 * all stay on Montserrat.
 */
export const moonlightDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal', 'italic'],
  variable: '--font-moonlight-display',
  display: 'swap',
  preload: false,
});

/**
 * The Bird of Dusk page is set as an archive album rather than a film reel:
 * a Didone masthead over mounted paper panels, with typewriter slips for the
 * plate numbers and captions. Three faces, three jobs, and `preload: false`
 * so the rest of the site never pays for them.
 *
 * Bodoni Moda is the film-magazine masthead voice — deliberately not the
 * Cormorant Garamond that carries the moonlight story, so the two classic
 * pages on this site do not read as one theme.
 */
export const archiveDisplay = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-archive-display',
  display: 'swap',
  preload: false,
});

/** Newsreader was drawn for long-form reading on screen; it carries the essays. */
export const archiveText = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-archive-text',
  display: 'swap',
  preload: false,
});

/** Screenplay typewriter, for plate numbers, captions and the running head. */
export const archiveUtility = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-archive-utility',
  display: 'swap',
  preload: false,
});
