import {
  Archivo,
  Bodoni_Moda,
  Cinzel,
  Cormorant_Garamond,
  Courier_Prime,
  Eczar,
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Karla,
  Lora,
  Newsreader,
  Noto_Serif_Bengali,
  Spectral,
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
