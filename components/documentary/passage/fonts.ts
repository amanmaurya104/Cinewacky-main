// Fonts for the Margaret to Nivedita page. Only its components import this
// file, so no other page carries these @font-face rules.

import { Cinzel, Karla, Lora, Noto_Serif_Bengali } from 'next/font/google';

/**
 * Margaret to Nivedita is set as a memorial rather than as a film page: the
 * whole documentary is shot in Ireland, and what it photographs, over and over,
 * is lettering cut into stone — a chapel datestone of 1832, a war memorial, the
 * plaques of a town wall of fame, the headstones of a churchyard at dusk.
 *
 * Cinzel is drawn from Roman inscriptional capitals, so it is the one face on
 * this site whose letterforms are the same letterforms the camera keeps finding.
 * It carries the two names and nothing else. It is also nothing like the Bodoni,
 * Cormorant, Fraunces or Eczar already in use, which is what keeps the five
 * bespoke pages apart.
 */
export const passageDisplay = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-passage-display',
  display: 'swap',
  preload: false,
});

/**
 * Lora holds the essays. Its serifs are brushed rather than cut, which is the
 * warmth the Cinzel deliberately does not have — the page needs one voice for
 * the stone and another for the life, and the italic carries the epitaph.
 */
export const passageText = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-passage-text',
  display: 'swap',
  preload: false,
});

/**
 * Years, place names, station numbers and the ledger. A humanist sans with real
 * quirks in the lowercase, so the small type reads as a curator's label and not
 * as the typewriter the archive page uses or the mono the dragon page uses.
 */
export const passageUtility = Karla({
  subsets: ['latin'],
  variable: '--font-passage-utility',
  display: 'swap',
  preload: false,
});

/**
 * Bengali for the given name only — two words on the whole page, set large.
 * নিবেদিতা is the word Vivekananda gave her, so it has to be set in the script
 * it was given in rather than transliterated away.
 */
export const passageBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-passage-bengali',
  display: 'swap',
  preload: false,
});
