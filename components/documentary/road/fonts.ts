// Fonts for the King of the Road page. Only its components import this
// file, so no other page carries these @font-face rules.

import { Cutive_Mono, Oswald, Source_Serif_4 } from 'next/font/google';

/**
 * King of the Road is set in the tour's own poster language. Oswald is the
 * nearest Google face to the condensed vermilion caps of "KING OF THE ROAD" on
 * the poster. Variable, so one file covers every weight the page uses.
 */
export const roadDisplay = Oswald({
  subsets: ['latin'],
  variable: '--font-road-display',
  display: 'swap',
  preload: false,
});

/** Source Serif 4 carries the essays: an editorial text face, variable too. */
export const roadText = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-road-text',
  display: 'swap',
  preload: false,
});

/**
 * The poster lists the eighteen films in typewriter type along its foot, so the
 * filmography and the small labels are set the same way. Cutive Mono rather
 * than the Courier Prime the archive page uses.
 */
export const roadUtility = Cutive_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-road-utility',
  display: 'swap',
  preload: false,
});
