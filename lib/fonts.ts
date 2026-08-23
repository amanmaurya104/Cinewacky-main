import { Cormorant_Garamond } from 'next/font/google';

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
