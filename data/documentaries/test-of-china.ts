import type { Documentary } from '@/types/documentary';
import { LBL } from './shared';

// The 15 stills from Test of China, in the order
// scripts/build-test-of-china.mjs wrote them.
function plate(n: number): string {
  return `/documentaries/test-of-china/plates/plate-${String(n).padStart(2, '0')}.jpg`;
}

const testOfChina: Documentary = {
  id: 'test-of-china',
  slug: 'test-of-china',
  status: 'live',
  theme: 'dragon',
  title: 'Test of China',
  han: '唐人街',
  tagline: "Kolkata's oldest Chinese food culture, at Tiretti Market",
  commission: 'Commissioned by the PING Channel',
  director: 'Subhajit Prasad',
  location: 'Tiretti Market, Kolkata',
  factLine: [
    'Directed by Subhajit Prasad',
    'Commissioned by the PING Channel',
    'Tiretti Market, Kolkata',
  ],

  heroLoop: '/documentaries/test-of-china/hero-loop.mp4',
  heroPoster: '/documentaries/test-of-china/hero-poster.jpg',

  // The client brief, verbatim. Everything invented for the layout — the
  // chapter titles, the hours, the plate captions, the board — is marked
  // where it appears, so it can be swapped for the real thing without
  // touching the brief's own words.
  epigraph: 'An ancient culture living harmoniously in a modern city.',
  overture: [
    `We were commissioned by the PING Channel to create a captivating documentary on Kolkata's oldest Chinese food culture, with a deep dive into the heart of the city’s Tiretti Market — the epicenter of Kolkata’s rich Chinese heritage.`,
  ],

  chapters: [
    {
      time: '05:00',
      han: '炭火',
      hanGloss: 'charcoal fire',
      title: 'The fire before the market',
      paragraphs: [
        `Guided by the visionary direction of Subhajit Prasad, and his unparalleled expertise in both cinematography and editing, we bring to life the story of Tiretti Market, where Kolkata's largest Chinese community once thrived.`,
        `This historic neighbourhood, often referred to as Chinatown, is more than just a market; it’s a vibrant hub where generations of Chinese families have preserved their culinary traditions. Over the decades, the authentic flavours and recipes from this market gradually expanded across Bengal, leaving an indelible mark on the region's food culture.`,
      ],
      plates: [
        { src: plate(1), caption: 'Charcoal catching in the dark' },
        { src: plate(2), caption: 'A stall lit from inside, before the street wakes' },
        { src: plate(5), caption: 'Crates set out at the kerb' },
      ],
    },
    {
      time: '06:00',
      han: '蒸氣',
      hanGloss: 'steam',
      title: 'Everything arrives at once',
      paragraphs: [
        `In this documentary, we don’t just explore the food; we immerse ourselves in the soul of Tiretti Market — the sizzling woks, the mouthwatering aromas, and the bustling street food stalls that tell the story of an ancient culture living harmoniously in a modern city.`,
        `From dim sum to chop suey, we showcase the delicacies that have made Tiretti Market a haven for food lovers. It’s a place where authentic Chinese flavours blend with local tastes, creating an extraordinary culinary fusion.`,
      ],
      plates: [
        { src: plate(9), caption: 'Steam off the tray, against the low sun' },
        { src: plate(10), caption: 'A full tray of shui mai' },
        { src: plate(11), caption: 'The lid comes off the buns' },
        { src: plate(3), caption: 'Lifting the tray clear of the pot' },
      ],
    },
    {
      time: '07:00',
      han: '早市',
      hanGloss: 'morning trade',
      title: 'Eaten standing, in the street',
      paragraphs: [
        `Through our lens, we capture the vibrancy and rich history of Tiretti Market, unveiling the culture that has been passed down through generations.`,
        `It’s not just about food — it’s about a living legacy that continues to flourish in Kolkata, offering a unique window into a timeless tradition.`,
      ],
      plates: [
        { src: plate(12), caption: 'Broth ladled out into bowls' },
        { src: plate(8), caption: 'Soup and dumplings on a steel plate' },
        { src: plate(6), caption: 'Breakfast eaten standing, in the street' },
      ],
    },
  ],

  lexiconTitle: 'What the market is built on',
  lexiconNote: 'The dishes named in the brief, and the ones the camera keeps returning to.',
  lexicon: [
    { han: '點心', roman: 'dim sum', note: 'the small plates the morning is built on' },
    { han: '燒賣', roman: 'shui mai', note: 'open-topped dumplings, steamed in stacked trays' },
    { han: '包子', roman: 'bao', note: 'buns lifted off the tray by hand' },
    { han: '湯', roman: 'tong', note: 'broth ladled into bowls at the kerb' },
    { han: '炒雜碎', roman: 'chop suey', note: 'the dish that travelled furthest out of the market' },
  ],

  sheetTitle: '收市',
  plates: [
    { src: plate(1), caption: 'Charcoal catching in the dark' },
    { src: plate(2), caption: 'A stall lit from inside' },
    { src: plate(3), caption: 'Lifting the tray clear of the pot' },
    { src: plate(4), caption: 'The same lift, from further back' },
    { src: plate(5), caption: 'Crates set out at the kerb' },
    { src: plate(6), caption: 'Breakfast eaten standing' },
    { src: plate(7), caption: 'Two men over the same bowl' },
    { src: plate(8), caption: 'Soup and dumplings on a steel plate' },
    { src: plate(9), caption: 'Steam against the low sun' },
    { src: plate(10), caption: 'A full tray of shui mai' },
    { src: plate(11), caption: 'The lid comes off the buns' },
    { src: plate(12), caption: 'Broth ladled out into bowls' },
    { src: plate(13), caption: 'Baked buns carried past the stalls' },
    { src: plate(14), caption: 'Soup, chilli oil, one spoon' },
    { src: plate(15), caption: 'Green dumplings waiting to go in' },
  ],

  credits: [
    { role: 'Direction, cinematography, editing', name: 'Subhajit Prasad' },
    { role: 'Commissioned by', name: 'PING Channel' },
  ],

  // CC-BY-4.0: crediting the model is a condition of using it, so this is
  // wired into the data rather than left to the template.
  attribution: {
    work: 'Chinese dragon',
    workUrl:
      'https://sketchfab.com/3d-models/chinese-dragon-a5ad5ec06f43461f95bb93e95fe7553b',
    author: 'MAXDESIGN-3D',
    authorUrl: 'https://sketchfab.com/MAXDESIGN',
    license: 'CC-BY-4.0',
    licenseUrl: 'http://creativecommons.org/licenses/by/4.0/',
  },

  colophon: 'Test of China — a Cinewacky production record.',
  projectSlug: LBL,
  projectTitle: 'Life Beyond Lens',
};

export default testOfChina;
