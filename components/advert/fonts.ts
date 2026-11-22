// Fonts for the Brand Box page. Only its components import this file, so no
// other page carries these @font-face rules.

import { Anton, DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google';

/**
 * Billboard caps: the hero, the spot numbers, the roster, the ticker. Anton is
 * the tall, tight poster grotesque of bus-shelter and hoarding type, and no
 * other page on the site uses it.
 */
export const adDisplay = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ad-display',
  display: 'swap',
  preload: false,
});

/**
 * The copywriter's voice: every slogan's second line and the print-ad
 * headline. High-contrast italic, the register of a luxury press ad.
 */
export const adSerif = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-ad-serif',
  display: 'swap',
  preload: false,
});

/** Body copy. */
export const adText = DM_Sans({
  subsets: ['latin'],
  variable: '--font-ad-text',
  display: 'swap',
  preload: false,
});

/** Slates, timecode, frame numbers and layout annotations. */
export const adMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-ad-mono',
  display: 'swap',
  preload: false,
});
