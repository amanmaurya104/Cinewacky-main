// Fonts for the Test of China page. Only its components import this
// file, so no other page carries these @font-face rules.

import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';

/**
 * Test of China is set as a market board rather than an album: the display face
 * has to read like the hand-cut lettering on a stall sign, not like a fashion
 * masthead. Fraunces is drawn with a `WONK` axis that puts the flick back into
 * the terminals at large sizes, which is what separates it from the Bodoni the
 * archive page uses and the Cormorant the moonlight page uses.
 */
export const dragonDisplay = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-dragon-display',
  display: 'swap',
  preload: false,
});

/**
 * The prose runs in a sans, deliberately: both other themed pages on this site
 * set their essays in a serif, and this market is aluminium and steel rather
 * than paper. Plex has the squared-off engineering to match it and stays out of
 * the display face's way.
 */
export const dragonText = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dragon-text',
  display: 'swap',
  preload: false,
});

/** Clock times and frame numbers only — the digits are content on this page. */
export const dragonUtility = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dragon-utility',
  display: 'swap',
  preload: false,
});
