// Fonts for the Dark Rising page. Only its components import this
// file, so no other page carries these @font-face rules.

import { Barlow, Barlow_Condensed, Marcellus } from 'next/font/google';

/**
 * Dark Rising is set as a development dossier for a superhero series, so it
 * gets the one voice none of the other bespoke pages have: industrial rather
 * than literary. Marcellus is a flared inscriptional capital — the nearest
 * Google face to the bevelled steel serif on the film's own title card — and
 * it is used for the title and the section heads only.
 */
export const risingDisplay = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rising-display',
  display: 'swap',
  preload: false,
});

/** Barlow carries the reading text: plain, slightly rounded, readable on black. */
export const risingText = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-rising-text',
  display: 'swap',
  preload: false,
});

/**
 * Labels, file numbers, the record and the credits. The condensed cut of the
 * same family reads like stencilling on corrugated tin, which is the surface the
 * camera keeps returning to in Kibera.
 */
export const risingUtility = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-rising-utility',
  display: 'swap',
  preload: false,
});
