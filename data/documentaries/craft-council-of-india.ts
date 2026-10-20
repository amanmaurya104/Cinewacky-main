import type { Documentary } from '@/types/documentary';
import { LBL } from './shared';

// The 12 plates from Craft Council of India: the ten delivered stills plus the
// two frames scripts/build-craft-council.mjs lifts out of the trailer.
function plateCC(n: number): string {
  return `/documentaries/craft-council-of-india/plates/plate-${String(n).padStart(2, '0')}.jpg`;
}

const craftCouncilOfIndia: Documentary = {
  id: 'craft-council-of-india',
  slug: 'craft-council-of-india',
  status: 'live',
  theme: 'craft',
  title: 'Craft Council of India',
  tagline:
    'The people who still make things by hand, and the materials that hold them to it.',
  commission: 'For the Craft Council of India',
  location: 'West Bengal',
  factLine: ['Craft Council of India', 'West Bengal', 'Documentary'],

  heroLoop: '/documentaries/craft-council-of-india/hero-loop.mp4',
  heroPoster: '/documentaries/craft-council-of-india/hero-poster.jpg',

  video: '/documentaries/craft-council-of-india/trailer.mp4',
  videoPoster: '/documentaries/craft-council-of-india/trailer-poster.jpg',
  videoLabel: 'Trailer',

  // The film's own burned-in title cards, read off the trailer in order.
  // These are the only words on this page that come from the film itself.
  cards: ['Magnificent Art Forms', 'Incredible Artists', 'The journey begins'],

  // EDITORIAL. No brief was delivered with this footage — craft-council-of-india.md
  // arrived empty — so every paragraph below describes what is actually on
  // screen in the delivered plates and clips, and the craft, place and
  // material names are identifications made from the footage. Replace the
  // prose with the client's copy and check the districts in the register
  // before this goes out; the media paths and the structure are correct.
  overture: [
    `Five materials, and the hands that have not stopped working them. The film travels out to the districts where the work is still done the way it has always been done — a wheel turned by hand, a loom threaded by eye, brass poured into a mould of clay and wax — and stays long enough to watch something finished.`,
    `Nothing here is staged for the camera. Every object in it was going to be made that morning whether or not anyone came to film it.`,
  ],

  materials: [
    {
      name: 'Clay',
      bengali: 'মাটি',
      bengaliRoman: 'maṭi',
      swatch: '#9c4a2a',
      place: 'Bankura',
      title: 'Turned wet, fired red',
      paragraphs: [
        `The wheel is the oldest machine in the film and the only one that has not changed. A potter opens a bowl with four fingers and a thumb, and the wall rises under the hand at the speed the clay allows — no faster, and the whole thing collapses back into the middle.`,
        `Away from the wheel the same clay is pressed into moulds and built up by hand: horses, elephants, a panel of figures standing under arches. It goes into the kiln grey and comes out the red the district is known for.`,
      ],
      motion: {
        src: '/documentaries/craft-council-of-india/motion/clay.mp4',
        poster: '/documentaries/craft-council-of-india/motion/clay-poster.jpg',
        caption: 'A fired terracotta panel, figures standing under arches',
      },
      plates: [
        { src: plateCC(3), caption: 'Unfired figures, still soft enough to mark' },
        { src: plateCC(5), caption: 'The wall of a bowl rising under one hand' },
      ],
    },
    {
      name: 'Thread',
      bengali: 'সুতো',
      bengaliRoman: 'suto',
      swatch: '#a5192c',
      place: 'Bishnupur',
      title: 'Counted, not drawn',
      paragraphs: [
        `A brocade figure is not drawn onto the silk, it is counted into it — the pattern exists as a sequence the weaver holds and repeats, and the picture only appears once the cloth is off the loom. The red-and-gold panels here carry court scenes worked at the scale of a fingernail.`,
        `The same patience runs through the needlework: stone, pearl and sequin laid down one at a time across a ground that will take weeks. Beside all of it, the plainest tool in the film — a hand spindle, a stick and a weight, drawing red thread out of nothing.`,
      ],
      plates: [
        { src: plateCC(2), caption: 'Brocade figures counted into silk', tall: true },
        { src: plateCC(10), caption: 'A hand spindle drawing red thread' },
        { src: plateCC(6), caption: 'Stone and pearl, laid one at a time', tall: true },
        { src: plateCC(8), caption: 'The same ground, in colour' },
      ],
    },
    {
      name: 'Metal',
      bengali: 'ধাতু',
      bengaliRoman: 'dhatu',
      swatch: '#a8853c',
      place: 'Bikna',
      title: 'Cast once, and only once',
      paragraphs: [
        `The lost-wax casters work in wax threads, not in metal. The figure is wound entirely out of fine wax coils over a clay core, packed in more clay, and fired until the wax runs out and leaves its own shape behind as a cavity. Brass goes in after it.`,
        `The mould is broken to get the figure out, so there is no second copy and no correcting a mistake. Every hunter on this panel was wound by hand, and the coil marks left in the wax are still on the brass.`,
      ],
      motion: {
        src: '/documentaries/craft-council-of-india/motion/metal.mp4',
        poster: '/documentaries/craft-council-of-india/motion/metal-poster.jpg',
        caption: 'A cast panel of archers, the coil marks still legible',
      },
      plates: [
        { src: plateCC(7), caption: 'Hunters, drawn bows, one continuous wound thread' },
        { src: plateCC(9), caption: 'A procession, and the peacock boat behind it' },
      ],
    },
    {
      name: 'Wood',
      bengali: 'কাঠ',
      bengaliRoman: 'kaṭh',
      swatch: '#a07c4e',
      place: 'Natungram',
      title: 'Drawn in ink, taken out in chips',
      paragraphs: [
        `The only craft in the film that begins with a drawing. The figure is laid out on the block in ballpoint — a line the carver has put down knowing it will be destroyed — and then everything that is not the figure is taken away in chips, working down from the ink toward the shape underneath.`,
      ],
      plates: [
        {
          src: plateCC(4),
          caption: 'The ink line, and the chisel taking the ground away from it',
        },
      ],
    },
    {
      name: 'Mask',
      bengali: 'মুখোশ',
      bengaliRoman: 'mukhosh',
      swatch: '#cf3c7c',
      place: 'Purulia',
      title: 'Carried out to the field',
      paragraphs: [
        `The last craft is the one that is worn. Paper, clay and cloth are built up over a mould into a face too big for the head under it, painted, and hung with a crown that catches the low sun.`,
        `Then it is carried out of the workshop and across a field, and the village walks out behind it. This is the only object in the film that is not finished when the maker puts it down — it is finished when somebody dances in it.`,
      ],
      plates: [
        { src: plateCC(11), caption: 'Masks carried out under the trees' },
        { src: plateCC(1), caption: 'The walk out to the ground' },
      ],
    },
  ],

  registerTitle: 'Still worked, still sold',
  registerNote:
    'The traditions the camera found, where they are worked, and what separates each from the one before it.',
  traditions: [
    {
      craft: 'Baluchari',
      place: 'Bishnupur',
      note: 'figured silk brocade; the scene is counted into the weave, not printed on it',
    },
    {
      craft: 'Dokra',
      place: 'Bikna',
      note: 'lost-wax brass, wound from coils; the mould is broken to release the cast',
    },
    {
      craft: 'Terracotta',
      place: 'Panchmura',
      note: 'moulded and hand-built clay, fired to the red the district is named for',
    },
    {
      craft: 'Wood carving',
      place: 'Natungram',
      note: 'figures cut from a single block, laid out first in ink',
    },
    {
      craft: 'Chhau mask',
      place: 'Charida',
      note: 'paper, clay and cloth over a mould; made to be danced in, not displayed',
    },
    {
      craft: 'Zardozi',
      place: 'Kolkata',
      note: 'stone, pearl and sequin laid onto a stretched ground by needle',
    },
  ],

  sheetHeading: 'Every frame',
  plates: [
    { src: plateCC(1), caption: 'The walk out to the ground' },
    { src: plateCC(2), caption: 'Brocade figures counted into silk' },
    { src: plateCC(3), caption: 'Unfired figures, still soft' },
    { src: plateCC(4), caption: 'The ink line and the chisel' },
    { src: plateCC(5), caption: 'A bowl rising under one hand' },
    { src: plateCC(6), caption: 'Stone and pearl, laid one at a time' },
    { src: plateCC(7), caption: 'Hunters, drawn bows' },
    { src: plateCC(8), caption: 'The same ground, in colour' },
    { src: plateCC(9), caption: 'A procession in brass' },
    { src: plateCC(10), caption: 'A hand spindle drawing red thread' },
    { src: plateCC(11), caption: 'Masks carried out under the trees' },
    { src: plateCC(12), caption: 'The country the crafts come from' },
  ],

  credits: [{ role: 'Commissioned by', name: 'Craft Council of India' }],

  colophon: 'Craft Council of India — a Cinewacky production record.',
  projectSlug: LBL,
  projectTitle: 'Life Beyond Lens',
};

export default craftCouncilOfIndia;
