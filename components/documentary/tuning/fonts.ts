// Fonts for the Tuning 2 You page. Only its components import this
// file, so no other page carries these @font-face rules.

import { Bricolage_Grotesque, Instrument_Serif, Space_Mono } from 'next/font/google';

/**
 * Tuning 2 You is the one music page on the site, so it is set like a record
 * sleeve rather than a book: Bricolage Grotesque has the ink-trap, gig-poster
 * grotesque the other bespoke pages all avoid, and its optical-size axis lets
 * one family carry both the 9rem title and the running text.
 */
export const tuningDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-tuning-display',
  display: 'swap',
  preload: false,
});

/**
 * The lyric voice: the epigraph, the episode localities and the "2" in the
 * title. One weight, mostly italic, never below display size.
 */
export const tuningLyric = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-tuning-lyric',
  display: 'swap',
  preload: false,
});

/**
 * The readouts: dial numbers, channel labels, the tech rider. A geometric
 * mono, not the typewriter faces the archive and road pages use.
 */
export const tuningUtility = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-tuning-utility',
  display: 'swap',
  preload: false,
});
