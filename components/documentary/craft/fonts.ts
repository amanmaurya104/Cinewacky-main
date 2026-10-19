// Fonts for the Craft Council of India page. Only its components import this
// file, so no other page carries these @font-face rules.

import { Archivo, Eczar, Noto_Serif_Bengali, Spectral } from 'next/font/google';

/**
 * Craft Council of India is set as a material record rather than a film page:
 * a warm paper ground, the crafts filed by the stuff they are made of, and a
 * swatch of that material in the margin of every chapter.
 *
 * Eczar is the one display face on this site drawn for an Indian brief — Vaibhav
 * Singh designed it for Devanagari first and cut the Latin to match, so its
 * flared, high-contrast terminals carry the same chisel as the wood and brass
 * the film is about. It is also nothing like the Bodoni, Cormorant and Fraunces
 * already in use, which is what keeps the four bespoke pages apart.
 */
export const craftDisplay = Eczar({
  subsets: ['latin'],
  variable: '--font-craft-display',
  display: 'swap',
  preload: false,
});

/**
 * Spectral holds the essays. It was drawn for screen reading at long lengths
 * and its italic is the closest match on Google Fonts to the italic serif the
 * film burns its own title cards in, which is why the overture cards are set
 * in it rather than in the display face.
 */
export const craftText = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-craft-text',
  display: 'swap',
  preload: false,
});

/**
 * The museum-label voice: material names, plate numbers, the register of
 * traditions. A grotesque rather than the typewriter the archive page uses or
 * the mono the dragon page uses — this page's small type is wall caption, not
 * screenplay slug.
 */
export const craftUtility = Archivo({
  subsets: ['latin'],
  variable: '--font-craft-utility',
  display: 'swap',
  preload: false,
});

/**
 * Bengali for the material names only — around a dozen words. The crafts in
 * the film are Bengal crafts (Baluchari from Bishnupur, Dokra from Bankura,
 * Chhau from Purulia), so the second name on each swatch is the one the
 * artisans use.
 */
export const craftBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-craft-bengali',
  display: 'swap',
  preload: false,
});
