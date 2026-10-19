import { showcaseVideoSrc } from '@/lib/mediaPaths';
import type { Documentary } from '@/types/documentary';

const LBL = 'life-beyond-lens';

function asset(filename: string): string {
  return showcaseVideoSrc(LBL, filename);
}

// The 29 stills, in the order scripts/build-bird-of-dusk.mjs wrote them.
const bodPlates = Array.from(
  { length: 29 },
  (_, i) => `/documentaries/bird-of-dusk/plates/plate-${String(i + 1).padStart(2, '0')}.jpg`,
);

// The 15 stills from Test of China, in the order
// scripts/build-test-of-china.mjs wrote them.
function plate(n: number): string {
  return `/documentaries/test-of-china/plates/plate-${String(n).padStart(2, '0')}.jpg`;
}

// The delivered trailer, still under its original project path. 63MB, so the
// player only fetches it once someone presses play. The -faststart copy is the
// same stream with its index moved to the front, so playback can begin before
// the whole file arrives.
const BOD_TRAILER =
  '/projects/life-beyond-lens/bird-of-duck/2k%20BOD%20TRAILER-faststart.mp4';

// The 12 plates from Craft Council of India: the ten delivered stills plus the
// two frames scripts/build-craft-council.mjs lifts out of the trailer.
function plateCC(n: number): string {
  return `/documentaries/craft-council-of-india/plates/plate-${String(n).padStart(2, '0')}.jpg`;
}

// The 17 plates from Margaret to Nivedita: the twelve delivered stills plus the
// five frames scripts/build-margaret-to-nivedita.mjs lifts out of the trailer.
function plateMN(n: number): string {
  return `/documentaries/margaret-to-nivedita/plates/plate-${String(n).padStart(2, '0')}.jpg`;
}

/** Everything else that build script writes, beside the plates. */
function mnAsset(filename: string): string {
  return `/documentaries/margaret-to-nivedita/${filename}`;
}

// Written by scripts/build-dark-rising.mjs: ten 2.37:1 grabs off the proof of
// concept in timecode order (frame-10 is the title card), and fourteen
// photographs from the Kibera shoot.
function drFrame(n: number): string {
  return `/documentaries/dark-rising/frames/frame-${String(n).padStart(2, '0')}.jpg`;
}

function drSet(n: number): string {
  return `/documentaries/dark-rising/set/set-${String(n).padStart(2, '0')}.jpg`;
}

// The two pieces of tour artwork, served from where they were delivered. Both
// are small enough (59-187KB) that next/image does all the work.
function korAsset(filename: string): string {
  return `/projects/life-beyond-lens/king-of-the-road/${encodeURIComponent(filename)}`;
}

// The Tuning 2 You stills, served from where they were delivered. They are
// 2048px JPEGs of 80-560KB, so next/image does the resizing. Public media is
// cached as immutable (next.config.ts): a replacement still needs a new name.
function wst(filename: string): string {
  return `/projects/web-stream-tales/${encodeURIComponent(filename)}`;
}

export const documentaries: Documentary[] = [
  {
    id: 'life-beyond-lens',
    slug: LBL,
    // Draft until the placeholder copy below is replaced.
    status: 'draft',
    title: 'Life Beyond Lens',
    // Placeholder copy, carried over from data/projects.ts. Replace the text
    // fields below — synopsis, credits, awards, language, location — with the
    // real documentary data; the media paths are already correct.
    tagline: 'Exploring life through the lens',
    synopsis: ['A cinematic exploration of the lives shaped by their cameras.'],
    year: '2024',
    duration: '12:34',
    director: 'Cinewacky',
    location: 'India',
    heroLoop: asset('OPENING 1-loop.mp4'),
    heroPoster: asset('OPENING 1-poster.jpg'),
    video: asset('DOCU TRAILER .mp4'),
    videoPoster: asset('DOCU TRAILER -poster.jpg'),
    videoLabel: 'Trailer',
    stills: [
      asset('OPENING 2.jpg'),
      asset('OPENING 3.jpg'),
      asset('OPENING 4.jpg'),
      asset('OPENING 5.jpg'),
    ],
    credits: [],
    awards: [],
    projectSlug: LBL,
    projectTitle: 'Life Beyond Lens',
  },
  {
    id: 'bird-of-dusk',
    slug: 'bird-of-dusk',
    status: 'live',
    theme: 'archive',
    title: 'Bird of Dusk',
    tagline: 'A homage to Rituparno Ghosh',
    // Every fact here comes from the brief in BIRD OF DUSK.md. The brief has no
    // release year, runtime or full credit list — add them here and they print
    // in the title block and the colophon.
    director: 'Sangeeta Datta',
    location: 'Kolkata',
    factLine: [
      'Directed by Sangeeta Datta',
      'Docu-feature',
      'Filmed over the span of a year',
      'Kolkata',
    ],
    heroPlate: { src: bodPlates[25], caption: 'Kolkata at dusk' },

    epigraph: 'Unlock stories, ignite change — watch documentaries that move you.',
    overture: [
      `We watch documentaries because they open our eyes to worlds we never knew existed. They aren't just films to us — they’re powerful stories that make us think, feel, and question. Every time we press play, we’re transported into someone else’s reality, whether it’s the life of a forgotten hero, the beauty of a faraway culture, or the raw truth behind global challenges.`,
      `Documentaries challenge our perspective. They make us uncomfortable in the best way, pushing us to see beyond our own experiences and understand the struggles and triumphs of others. They remind us that the world is vast, complex, and worth exploring.`,
      `We don't just watch documentaries to learn facts; we watch them to feel connected. They inspire us to take action, spark meaningful conversations, and remind us that stories have the power to create change.`,
    ],

    passages: [
      {
        eyebrow: 'The film',
        title: 'Bird of Dusk',
        plate: { src: bodPlates[28] },
        paragraphs: [
          `Bird of Dusk is a poetic cinematic homage to the visionary writer-director Rituparno Ghosh, crafted to honor his 10th death anniversary. Helmed by his close friend and collaborator Sangeeta Datta, the docu-feature goes beyond mere biography, unfolding as a soulful exploration of Ghosh’s artistry, legacy, and profound cultural imprint on Indian cinema.`,
          `Woven with rare interviews, personal memoirs, and reflective conversations, the documentary invites viewers into Ghosh's creative universe. Industry icons share heartfelt anecdotes, painting a vivid portrait of the auteur’s impact both on and off the screen.`,
          `The film also delves into the magic behind Ghosh’s craft, with his core creative team offering rare insights into their artistic collaborations with the master storyteller.`,
          `Celebrated far beyond India, Ghosh’s influence on global cinema is underscored by international curators from Berlin, London, and Spain, who recognize his powerful voice in world filmmaking. At its heart, Bird of Dusk is also a love letter to Kolkata, the city Ghosh cherished and captured so beautifully, with the evolving spirit of the metropolis echoing throughout the documentary, which was filmed over the span of a year.`,
        ],
      },
      {
        eyebrow: 'Our experience',
        title: 'It was a modest idea',
        plate: { src: bodPlates[0] },
        paragraphs: [
          `When "Bird of Dusk" first came to us, it was a modest idea, not something conceived on the grand scale it ultimately reached.`,
          `At the beginning, as we delved deeper into the project, we sat with the director, crafting plans and envisioning the possibilities. That’s when we realized — this wasn’t just a story; it was an opportunity to create something profound, something that could touch lives. We knew this project needed to grow.`,
          `We began to think: how do we treat this story? How do we give it the voice it deserves? And that’s when Rituparno Ghosh’s book First Person came into focus. It became the spine of our narrative, a foundation upon which we started constructing the soul of the film.`,
          `The journey wasn’t linear. We shot bits and pieces, slowly, meticulously. At the same time, the editing process began. With every step forward, with every new interview we conducted, a deeper truth about Rituparno’s life began to emerge. The story wasn’t just unfolding — it was weaving itself into something intricate, delicate, and deeply human.`,
          `But our greatest challenge was this: how do you bring someone back to life when they are no longer here? Rituparno Ghosh wasn’t just a filmmaker, an artist — he was a force of nature, a complex and layered personality. It wasn’t enough to rely on interviews alone to capture his essence.`,
        ],
      },
      {
        title: 'Resurrecting a soul',
        plate: { src: bodPlates[27] },
        paragraphs: [
          `We had to find his voice, his heart, his soul — and translate it into visuals. Whether it was the vibrant chaos of Durga Puja, a soft winter morning drenched in nostalgia, the quiet ache of his mother’s death, or even the changing seasons of Kolkata itself, every moment became a reflection of his emotional landscape.`,
          `The changing seasons weren’t just metaphors; they were mirrors to Rituparno’s mind. As spring turned into summer, as monsoons gave way to the stillness of winter, his thoughts, his dreams, his fears, and his transformations became visible. Capturing this, showing the evolution of his inner world, was one of the most emotional and challenging aspects of our journey.`,
          `And yet, we persevered. Slowly, steadily, and with a quiet determination, we found the rhythm. We brought the archival footage to life, we wove his voice into visuals, and we let his spirit guide us.`,
          `It wasn’t just about creating a film. It was about resurrecting a soul — and that, perhaps, was the most beautiful and rewarding challenge of all.`,
        ],
      },
    ],

    voices: [
      {
        group: 'On screen',
        entries: [
          { name: 'Soumitra Chatterjee' },
          { name: 'Sharmila Tagore' },
          { name: 'Aparna Sen' },
          { name: 'Prosenjit Chatterjee' },
          { name: 'Nandita Das' },
          { name: 'Arjun Rampal' },
          { name: 'Konkona Sen' },
          { name: 'Mir' },
        ],
      },
      {
        group: 'The craft',
        entries: [
          { name: 'Aveek Mukhopadhyay', role: 'Cinematography' },
          { name: 'Arghyakamal Mitra', role: 'Editing' },
          { name: 'Debajyoti Mishra', role: 'Music' },
        ],
      },
    ],

    video: BOD_TRAILER,
    videoPoster: '/documentaries/bird-of-dusk/trailer-poster.jpg',
    videoLabel: 'Trailer',
    plates: bodPlates.map((src) => ({ src })),
    colophon: 'Bird of Dusk — a Cinewacky production record.',
    projectSlug: LBL,
    projectTitle: 'Life Beyond Lens',
  },
  {
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
  },
  {
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
  },
  {
    id: 'margaret-to-nivedita',
    slug: 'margaret-to-nivedita',
    status: 'live',
    theme: 'passage',
    title: 'Margaret to Nivedita',
    tagline: 'The Irish half of an Indian life',

    // EDITORIAL. margarate-to-nivedita.md is a short client note rather than a
    // script, so the prose below is written from that note plus what is
    // actually on screen in the delivered stills and the trailer. Three things
    // to settle with the client before this goes out:
    //
    //   1. The note calls the director "Sangeeta Dutta". The Bird of Dusk entry
    //      in this same file spells her "Sangeeta Datta", and that spelling is
    //      used here so the site stays internally consistent.
    //   2. The note says the film is centred on "Sister Nivedita's tomb in
    //      Ireland". Her grave is at Darjeeling, and the trailer's own title
    //      card names the churchyard it visits as Torrington Cemetery. Nothing
    //      on this page calls that churchyard her grave.
    //   3. The note describes her as "a young Scottish woman". She was born in
    //      Dungannon, County Tyrone — which is where the whole film was shot,
    //      and what the page says instead.
    //
    // The media paths, the station order and the structure are correct.

    bornName: 'Margaret',
    givenName: 'Nivedita',
    givenBengali: 'নিবেদিতা',
    givenRoman: 'nibedita',
    givenMeaning: 'the dedicated one',
    givenOn: 'Given at her initiation · Calcutta · 25 March 1898',

    director: 'Sangeeta Datta',
    year: '2017',
    duration: '20 min',
    location: 'County Tyrone, Ireland',
    factLine: [
      'Directed by Sangeeta Datta',
      'Short documentary',
      'Twenty minutes',
      'Shot in Ireland',
      '2017',
    ],

    heroLoop: mnAsset('hero-loop.mp4'),
    heroPoster: mnAsset('hero-poster.jpg'),
    portrait: {
      src: mnAsset('portrait.jpg'),
      caption:
        'The one photograph in the film: Margaret Noble, before the name and before the crossing.',
    },

    epigraph:
      'She left as Margaret Noble. India has never called her anything but Nivedita.',
    overture: [
      `In 2017, her hundred and fiftieth year, we took a crew to Ireland to make twenty minutes about a woman the country she was born in had largely stopped mentioning and the country she chose had never stopped. The film that came out of it was directed by Sangeeta Datta and shot entirely in the county she was born in.`,
      `The making of it turned into the subject. The further we went into her life the more of it sat outside the published accounts — the hidden narratives, the untold moments, the ordinary weather of a childhood in a small market town, and then the sheer scale of what she went on to do with it.`,
      `What we were following, in the end, was a change of name. She was born Margaret Elizabeth Noble, a Wesleyan minister's daughter. She died Sister Nivedita, after thirteen years of teaching Bengali girls, nursing through a plague, and arguing in public that a country that was not hers should be given back to itself. This film stands in the first place and looks toward the second.`,
    ],

    stations: [
      {
        place: 'Dungannon',
        region: 'County Tyrone',
        year: '1867',
        title: 'A manse, a chapel, and a hill above the square',
        paragraphs: [
          `The town comes first, and it comes from the air: a market square, a hill with a tower on it, and the country running out flat behind it toward the lough. The film opens here because she opened here — on 28 October 1867, in a Wesleyan minister's house.`,
          `Her father preached in this town and his father had preached before him, which is the part that tends to fall out of the story when she is described as a woman who found faith in India. She did not find it. She was raised inside one and spent the second half of her life inside another, and the discipline she brought to the second was learned in the first.`,
          `Almost nothing of that household survives in the film. What survives is lettering: a date cut over a chapel door, still legible, from thirty-five years before she was born.`,
        ],
        inscription: 'Wesleyan Chapel · 1832',
        inscriptionSource: 'A datestone, Dungannon',
        plates: [
          { src: plateMN(1), caption: 'Dungannon from the air, the square and the hill' },
          { src: plateMN(12), caption: 'The datestone, thirty-five years older than she was' },
          { src: plateMN(10), caption: 'The church front, and the weather over it' },
        ],
      },
      {
        place: 'Tyrone',
        region: 'The country around the town',
        year: 'A childhood',
        title: 'Weather, and a great deal of green',
        paragraphs: [
          `The second thing the film does, it does without commentary: it simply stays out in the fields for a while. Cattle on a slope, ragwort along a fence line, thistles gone over against a sky doing four things at once, a street seen through rain on a moving windscreen.`,
          `None of it predicts Calcutta. That is exactly why it is in the film. Every account of her begins at the moment she becomes remarkable, and the country that actually formed her is wet, green, small and entirely ordinary — and she carried it with her through a life lived nine thousand kilometres away from it.`,
        ],
        plates: [
          { src: plateMN(13), caption: 'The towers above the town' },
          { src: plateMN(14), caption: 'Cattle and ragwort, the country she grew up in' },
          { src: plateMN(15), caption: 'Thistles gone over, and the flat land behind' },
          { src: plateMN(11), caption: 'The town through rain, from a moving car' },
        ],
      },
      {
        place: 'London',
        region: 'A drawing room in the West End',
        year: '1895',
        // No plates. There is no footage of this part of her life and the film
        // does not fake any, so the page leaves the gap where the life turns
        // over rather than filling it with Irish landscape.
        title: 'The teacher she was not looking for',
        paragraphs: [
          `By her late twenties she was a working teacher running her own school and arguing her way through every idea then available in London. In November 1895 she went, sceptically, to hear an Indian monk speak in a private drawing room — and then spent the better part of three years refusing to be convinced by him.`,
          `That is the detail the film is most interested in. She was not swept up. She interrogated Swami Vivekananda for three years before she moved anywhere, and when he finally wrote asking her to come, what he asked for was not a follower. What the work needed, he wrote, was not a man but a woman: a real lioness, to work for Indian women especially.`,
          `There is no footage of any of this, and the film invents none. It leaves the gap where a life turns over.`,
        ],
      },
      {
        place: 'Calcutta',
        region: 'Bengal',
        year: '1898',
        title: 'The name, and what she did with it',
        paragraphs: [
          `She arrived in January 1898. On 25 March she was initiated into brahmacharya and given a word rather than a name: নিবেদিতা, nibedita, the dedicated one. She used it for the remaining thirteen years of her life and signed nothing else.`,
          `That November she opened a school for girls at Bagbazar — in rooms, with almost no money, and with pupils whose families had to be persuaded one household at a time. When plague came through Calcutta the following year she was out in the lanes with a broom before she was anywhere else, organising the clearing of them herself, because a woman of her standing doing that work in public was the only argument anyone was going to listen to.`,
          `The film's one Indian voice is a sister of the order she helped make possible, interviewed a century later in a small bright room a long way from Bengal. She is also the only warm colour in twenty minutes of Irish weather.`,
        ],
        plates: [
          {
            src: plateMN(3),
            caption: 'A sister of her order, interviewed — the one warm colour in the film',
          },
        ],
      },
      {
        place: 'Dungannon',
        region: 'The same town, now',
        year: 'Today',
        title: 'Seventh on a wall of twelve',
        paragraphs: [
          `The film comes back. In a corridor in the town there is a panel of photographs headed Our Wall of Fame — soldiers, a bishop, a novelist, a sportsman, twelve names with a paragraph each. She is number seven, in the habit, photographed in India, filed between a general and a footballer.`,
          `Outside in the square the town's other memory is kept properly: a bronze soldier on a plinth and this year's poppy wreaths laid at the foot of it. The contrast is the whole reason for going back. One kind of remembering gets a monument and a date in the calendar. The other gets a paragraph in a corridor, and a film crew from Kolkata.`,
        ],
        plates: [
          { src: plateMN(5), caption: 'Twelve names on a wall, and hers among them' },
          { src: plateMN(7), caption: 'The memorial, and the courthouse behind it' },
          { src: plateMN(2), caption: 'This season’s wreaths, at the foot of the plinth' },
          { src: plateMN(4), caption: 'The spire, from the edge of the town' },
        ],
      },
      {
        place: 'Torrington',
        region: 'A churchyard at nightfall',
        year: 'The last sequence',
        title: 'Where the film stops, and where she is',
        paragraphs: [
          `The last minutes are a walk. A stone church, a path between headstones, a crucifix going flat against a blue dusk, then yew branches and the light finally gone. The title card names the place and the film explains itself no further than that.`,
          `It is worth being plain about the geography, because the ending depends on it. She is not buried here. She is buried at Darjeeling, under a sentence in English, most of a world away from this path. The film ends at dusk in a churchyard in these islands precisely because it cannot end at her grave — and that distance, between where a person starts and where they finally lie down, is what the whole twenty minutes has been about.`,
        ],
        motion: {
          src: '/documentaries/margaret-to-nivedita/motion/dusk.mp4',
          poster: '/documentaries/margaret-to-nivedita/motion/dusk-poster.jpg',
          caption: 'Yew and headstones, the last light in the film',
        },
        plates: [
          { src: plateMN(16), caption: 'The cemetery path' },
          { src: plateMN(17), caption: 'The crucifix against a blue dusk' },
        ],
      },
    ],

    ledgerTitle: 'Two halves of one person',
    ledgerNote:
      'What the town she was born in still holds of her, set against what the name she was given still carries.',
    ledgerHereLabel: 'Ireland',
    ledgerThereLabel: 'India',
    ledger: [
      {
        here: 'A birth register: Margaret Elizabeth Noble, 28 October 1867',
        there: 'A word given at an initiation: নিবেদিতা, 25 March 1898',
      },
      {
        here: 'The Wesleyan chapel her father and grandfather preached in',
        there: 'The girls’ school she opened at Bagbazar in November 1898',
      },
      {
        here: 'Seventh plaque on a wall of twelve, in a corridor',
        there: 'Nivedita Setu, carrying the road over the Hooghly',
      },
      {
        here: 'A churchyard this film walks into at dusk',
        there: 'A grave at Darjeeling, and the sentence cut into it',
      },
    ],

    video: mnAsset('trailer.mp4'),
    videoPoster: mnAsset('trailer-poster.jpg'),
    videoLabel: 'The trailer',

    epitaph: 'Here reposes Sister Nivedita, who gave her all to India.',
    epitaphSource: 'Her grave · Darjeeling · 1911',

    sheetHeading: 'Everything the camera found',
    // Plate 06 is a second take of the wall-of-fame setup already in plate 05,
    // so it is left out of the sheet. It stays on disk in case the client
    // prefers that take.
    plates: [
      { src: plateMN(1), caption: 'Dungannon from the air' },
      { src: plateMN(13), caption: 'The towers above the town' },
      { src: plateMN(12), caption: 'Wesleyan Chapel, 1832' },
      { src: plateMN(10), caption: 'The church front' },
      { src: plateMN(4), caption: 'The spire, from the edge of the town' },
      { src: plateMN(9), caption: 'A girl in the 1870s, or the idea of one' },
      { src: plateMN(14), caption: 'Cattle and ragwort' },
      { src: plateMN(15), caption: 'Thistles gone over' },
      { src: plateMN(11), caption: 'The town through rain' },
      { src: plateMN(3), caption: 'A sister of her order' },
      { src: plateMN(5), caption: 'The wall of fame' },
      { src: plateMN(8), caption: 'The establishing shot, with the town named' },
      { src: plateMN(7), caption: 'The memorial and the courthouse' },
      { src: plateMN(2), caption: 'Wreaths at the foot of the plinth' },
      { src: plateMN(16), caption: 'The cemetery path' },
      { src: plateMN(17), caption: 'The crucifix against a blue dusk' },
    ],

    credits: [
      { role: 'Directed by', name: 'Sangeeta Datta' },
      { role: 'Produced by', name: 'Cinewacky' },
      { role: 'Filmed in', name: 'County Tyrone, Ireland' },
    ],

    colophon:
      'Margaret to Nivedita — a Cinewacky production record. Twenty minutes, shot in Ireland, 2017.',
    projectSlug: LBL,
    projectTitle: 'Life Beyond Lens',
  },
  {
    id: 'dark-rising',
    slug: 'dark-rising',
    status: 'live',
    theme: 'rising',
    title: 'Dark Rising',
    // Every fact here comes from Dark_Rising_Research_Dossier.docx, and the
    // dossier's own caveats are kept as printed notes rather than dropped:
    // this is a series in development with a proof of concept, not a released
    // short film, and the audience figures are the project's own claim.
    tagline: 'A superhero fantasy-drama, rooted in Kibera',
    director: 'Souvid Datta',
    location: 'Kibera, Nairobi',
    factLine: [
      'Created & written by Souvid Datta',
      'Proof of concept',
      'Kibera, Nairobi, Kenya',
    ],

    heroLoop: showcaseVideoSrc('reel-vibe-uncut', 'DARK RISING-loop.mp4'),
    heroPoster: showcaseVideoSrc('reel-vibe-uncut', 'DARK RISING-poster.jpg'),
    // 62MB; the player only fetches it once someone presses play.
    video: showcaseVideoSrc('reel-vibe-uncut', 'DARK RISING.mp4'),
    videoPoster: drFrame(10),
    videoLabel: 'First-look teaser',

    dossier: {
      producedBy: 'SD Films',
      associate: 'Cinewacky',

      record: [
        { label: 'Format', value: 'Fantasy-drama episodic / superhero series concept' },
        { label: 'Proposed duration', value: 'Approximately 60 minutes' },
        { label: 'Production stage', value: 'In development' },
        { label: 'Proof of concept', value: 'Kibera, Nairobi, Kenya' },
        { label: 'Approach', value: 'Micro-budget production with street casting' },
        { label: 'Production company', value: 'SD Films' },
        { label: 'First unveiled', value: 'MCM Comic Con, London — May 2018' },
        {
          label: 'Genre',
          value: 'Superhero fantasy-drama with science-fiction and social themes',
        },
      ],
      recordNote:
        'Dark Rising is a proposed 60-minute episodic fantasy-drama — a superhero series in development, not a released standalone short film. The Nairobi footage is a proof of concept for the larger series.',

      question:
        'What would people actually do if they possessed extraordinary power in a world already shaped by inequality, discrimination and political conflict?',
      questionPlate: { src: drFrame(7), caption: 'Hooded, against the dusk' },

      concept: {
        eyebrow: 'The central concept',
        title: 'The Superiors',
        paragraphs: [
          'Dark Rising imagines a world where people develop extraordinary abilities, but the story is not built around conventional heroic mythology.',
          'The official project description presents a world of “Superiors” — characters whose powers emerge from traumatic experiences and disenfranchised social environments. These individuals are not necessarily noble superheroes. They may be morally compromised, politically ambitious, damaged or closer to villains than traditional protagonists.',
        ],
      },
      conceptCoda:
        'The project explores power as a social and moral problem, rather than only as a source of action spectacle.',
      themes: [
        {
          title: 'Power and responsibility',
          note: 'How individuals respond when they gain abilities beyond ordinary human limits.',
        },
        {
          title: 'Identity and discrimination',
          note: 'How societies react to people who are perceived as different or threatening.',
        },
        {
          title: 'Political ambition',
          note: 'The relationship between extraordinary abilities and the desire to influence or control society.',
        },
        {
          title: 'Personal redemption',
          note: 'Whether damaged individuals can reconstruct their moral identities.',
        },
        {
          title: 'Collective identity',
          note: 'How communities respond to fear, exclusion and emerging superhuman populations.',
        },
        {
          title: 'Humanity versus supremacy',
          note: 'Whether possessing power makes someone more liberated — or more dangerous.',
        },
      ],

      story: {
        eyebrow: 'Story and premise',
        title: 'A young man, his sister, and a rising power',
        paragraphs: [
          'The first-look material centres on troubled young people in East Africa who begin discovering dangerous and powerful abilities.',
          'According to the trailer description, the pilot follows a politically ambitious young man in Kenya who explores his emerging powers, trains his younger sister and begins pursuing greater political influence. The wider concept expands from East Africa to an international world of superhumans struggling to exist within a society that has become increasingly reactionary toward them.',
        ],
      },
      levels: [
        {
          level: 'Level 1',
          title: 'The Nairobi proof of concept',
          text: 'A grounded story set in Kibera, involving young characters, emerging abilities and the relationship between power, family and ambition.',
          status: 'shot',
          plate: { src: drFrame(8), caption: 'Brother and sister' },
        },
        {
          level: 'Level 2',
          title: 'The proposed international series',
          text: 'A broader narrative involving superhuman characters across different communities and countries, together with social, political and moral conflict.',
          status: 'proposed',
        },
      ],
      levelsNote:
        'The published trailer and project description establish the concept and proposed direction. They do not establish that a completed full season or finished feature-length film has been released.',

      ground: {
        eyebrow: 'The Nairobi and Kibera connection',
        title: 'Shot in Kibera, cast from its streets',
        paragraphs: [
          "One of the project's defining production choices was filming the proof of concept in Kibera, Nairobi, using local street casting and a micro-budget approach. The official website identifies several cast members from the Kibera community.",
        ],
      },
      reasons: [
        {
          title: 'Production authenticity',
          note: 'The story is situated within a specific social and geographical environment rather than an abstract superhero city.',
        },
        {
          title: 'Representation',
          note: 'The project seeks to move beyond the predominantly American urban settings and conventional character models associated with mainstream superhero entertainment.',
        },
      ],
      groundCoda: [
        "The creator's stated intention is to place characters from underrepresented communities at the centre of the narrative, treating their experiences as complex human stories rather than simply as background material.",
        'The official material describes the proof of concept as made with limited resources and the generosity of collaborators — an ambitious genre concept developed through a small-scale international production model.',
      ],
      // Intrinsic sizes, so the set wall lays each photograph out at its own
      // shape instead of cropping the portraits.
      set: [
        { src: drSet(1), width: 768, height: 960, caption: 'A portrait between set-ups' },
        { src: drSet(2), width: 960, height: 638, caption: 'Shooting at the kerosene depot' },
        { src: drSet(3), width: 960, height: 640, caption: 'Close quarters in the lanes' },
        { src: drSet(4), width: 960, height: 640, caption: 'Script in hand, between takes' },
        { src: drSet(5), width: 960, height: 640, caption: 'Boom and camera on the rail line' },
        { src: drSet(6), width: 960, height: 720, caption: 'An audience for the drone' },
        { src: drSet(7), width: 960, height: 720, caption: 'The drone over Kibera' },
        { src: drSet(8), width: 768, height: 960, caption: 'Portrait' },
        { src: drSet(9), width: 960, height: 720, caption: 'Night on the tracks' },
        { src: drSet(10), width: 960, height: 720, caption: 'Reading the scene' },
        { src: drSet(11), width: 960, height: 720, caption: 'Direction, pages in hand' },
        { src: drSet(12), width: 960, height: 720, caption: 'Walking up to the location' },
        { src: drSet(13), width: 960, height: 720, caption: 'Street life, mid-shoot' },
        { src: drSet(14), width: 960, height: 640, caption: 'Read-through against the tin' },
      ],

      roster: [
        { character: 'Dalila Sialo', performer: 'Ann Marie Chibole' },
        { character: 'Sefu Sialo', performer: 'Maxmillan Odhiambo' },
        { character: 'Malia Sialo', performer: 'Sabrina Faridah Athman' },
        { character: 'Solomon Kidenda', performer: 'Felix Peter Otieno' },
        { character: 'Deepak Datta', performer: 'Souvid Datta' },
        { character: 'Mary', performer: 'Michelle Mueni' },
        { character: 'Teacher', performer: 'Barrett Atho “Jublak”' },
        { character: 'Melanie McKay', performer: 'Ildiko Preszly' },
        { character: 'News Presenter', performer: 'Hans Morgeneyer' },
        { character: 'Radio Presenter', performer: 'Vivian Onyuna' },
        { character: 'Leonard', performer: 'Jared Ochieng' },
      ],
      rosterNote:
        "From the cast listing on the project's official website, which also includes supporting performers, government officers, gang members, market characters and additional performers.",
      powers: [
        {
          character: 'Sefu Sialo',
          ability: 'Metal manipulation',
          performer: 'Maxmillan Odhiambo',
          element: 'metal',
        },
        { character: 'Damini Datta', ability: 'Fire-wielding powers', element: 'fire' },
      ],
      powersNote:
        'The public information does not establish the full limits, rules or narrative development of these abilities.',

      approach: {
        eyebrow: 'Visual and directorial approach',
        title: 'Hyper-real, global, morally complicated',
        paragraphs: [
          'The creator describes Dark Rising as a project aiming for a hyper-realistic tone, global scope and cinematic vision. Rather than presenting a conventional battle between idealised heroes and clearly defined villains, the project aims to create morally complicated characters and contemporary social contexts.',
        ],
      },
      intentions: [
        {
          title: 'Grounded genre filmmaking',
          note: "Superhero abilities are placed within recognisable social environments, including Nairobi's Kibera community.",
          plate: { src: drFrame(5), caption: 'A wall of notes and protest' },
        },
        {
          title: 'Community-centred characters',
          note: 'The project uses local casting and seeks to expand representation within the superhero genre.',
          plate: { src: drFrame(2), caption: 'Balancing on the rail line' },
        },
        {
          title: 'Moral ambiguity',
          note: 'Characters are presented as people struggling with power, trauma and competing ethical choices rather than as simple heroes.',
          plate: { src: drFrame(3), caption: 'A doorway of light' },
        },
        {
          title: 'International world-building',
          note: 'The concept expands beyond a single city toward an international network of superhuman characters and political consequences.',
          plate: { src: drFrame(9), caption: 'Uniforms in the lane' },
        },
      ],
      approachNote: "These are the creator's stated artistic aims and the project's published positioning.",

      unveiling: {
        eyebrow: 'Comic Con London',
        title: 'First seen on Centre Stage',
        paragraphs: [
          "The project was publicly unveiled at MCM Comic Con London in May 2018, at Centre Stage at London's ExCeL venue. The official website says the presentation included the first teaser trailer and the launch of a fan website.",
          "A contemporary report from The People's Movies, dated 28 May 2018, also described Dark Rising as a superhero television series in development and identified Souvid Datta and Chris Bouchard in connection with the project.",
        ],
      },
      unveilingWhen: 'May 2018',
      unveilingWhere: 'MCM Comic Con · ExCeL, London',
      figures: [
        { label: 'Fans signed up', value: '3,000+' },
        { label: 'Countries', value: '14' },
      ],
      figuresNote:
        "As stated on the official project page, through the project's temporary website. Not independently audited.",

      departments: [
        {
          department: 'Direction and camera',
          credits: [
            { role: 'Director & Director of Photography', name: 'Souvid Datta' },
            { role: 'Assistant DOP', name: 'Mike Lolly P' },
            { role: 'Second Camera', name: 'Mike Dimo' },
            { role: 'Camera Assistant', name: 'Eugene Mutisya' },
          ],
        },
        {
          department: 'Production',
          credits: [
            { role: 'Creator', name: 'Souvid Datta' },
            { role: 'Production Coordinator', name: 'Leonard Klishko' },
            { role: 'Location Manager', name: 'Nixon Ochieng Oloo' },
            { role: 'Assistant Director', name: 'Melanie Cura Daball' },
            { role: 'Runner', name: 'Stephen Otieno Ofuona' },
          ],
        },
        {
          department: 'Post-production and sound',
          credits: [
            { role: 'Supervising Editor', name: 'Subhajit Prasad' },
            { role: 'Music Director', name: 'Soumik Datta' },
            { role: 'CG Artist & VFX', name: 'Michal Wojtasik' },
            { role: 'CG Artist 2', name: 'Slawek Jedrzejewski' },
            { role: 'Sound Design & Mix', name: 'Evgeny Ryabovol' },
            { role: 'Sound Mix', name: 'Nick Morchang' },
          ],
        },
      ],
      creditsNote: 'Songs performed by Bianju Morris and Moroko Kalihari.',
      companies: [
        { role: 'Produced by', name: 'SD Films' },
        { role: 'Written & created by', name: 'Souvid Datta' },
        { role: 'Development producer', name: 'Chris Bouchard' },
        { role: 'In association with', name: 'Cinewacky' },
      ],

      // The cut in timecode order, title card last.
      frames: Array.from({ length: 10 }, (_, i) => ({ src: drFrame(i + 1) })),
    },

    colophon: 'Dark Rising — a development record. SD Films, in association with Cinewacky.',
    // Lives under Reel Vibe Uncut beside Kali: its DARK RISING video tile opens
    // this page (lib/stories.ts getStorySlugForVideo matches it by `video`).
    projectSlug: 'reel-vibe-uncut',
    projectTitle: 'Reel Vibe Uncut',
  },
  {
    id: 'king-of-the-road',
    slug: 'king-of-the-road',
    status: 'live',
    theme: 'road',
    title: 'King of the Road',
    // Every fact here comes from King_of_the_Road_Profile.docx. Its accuracy
    // checklist is still open: the producer designation for Max Mueller
    // Kolkata and the "In association with" wording are unconfirmed, and the
    // tour poster gives the span as Feb 5 – March 1 where the profile gives
    // 5–23 February. The profile's dates are used.
    tagline: 'Wim Wenders — the India journey and the Kolkata chapter',
    seoTitle: 'King of the Road: Wim Wenders in India & Kolkata | Documentary',
    seoDescription:
      'Explore our documentary on Wim Wenders’ first India visit, the King of the Road retrospective, and his special Kolkata chapter.',
    director: 'Wim Wenders',
    location: 'Kolkata',

    road: {
      kicker: 'Wim Wenders',
      subtitle: 'The India Journey & Kolkata Chapter',
      counts: ['18 films', '5 cities', 'A first visit to India'],
      heroPlate: { src: asset('OPENING 5.jpg'), caption: 'From the documentary' },

      lede: 'Cinema is a way of travelling without leaving the frame — and for Wim Wenders, the road has always been one of cinema’s most powerful spaces.',
      overture: [
        'Across a career spanning more than five decades, Wenders has explored movement, memory, solitude, landscape, identity, and the quiet poetry of everyday life. His films often turn journeys into encounters and ordinary spaces into emotionally charged cinematic landscapes.',
        'King of the Road — The India Tour marked a significant new chapter in Wenders’ artistic journey: his first visit to India in February 2025. Presented by the Film Heritage Foundation, in association with the Wim Wenders Stiftung and in collaboration with Goethe-Institut / Max Mueller Bhavan, the travelling retrospective brought 18 films to five Indian cities between 5 and 23 February 2025.',
        'Through our visual documentation and editorial treatment, King of the Road becomes a record of a cultural encounter: a filmmaker’s journey meeting the creative soul of Kolkata, and a moment in which cinema creates a bridge between different histories, geographies, and ways of seeing.',
      ],

      routeTitle: 'The India Tour',
      routeSpan: '5–23 February 2025',
      stops: [
        { city: 'Mumbai' },
        { city: 'Thiruvananthapuram' },
        { city: 'Kolkata', dates: '16–19 Feb', here: true },
        { city: 'New Delhi' },
        { city: 'Pune' },
      ],

      life: {
        eyebrow: 'Life and cinematic journey',
        title: 'A road that began in Düsseldorf',
        paragraphs: [
          'Wim Wenders was born in Düsseldorf, Germany, in 1945 and became internationally recognised as one of the major figures associated with the New German Cinema of the 1970s. His creative work extends across directing, screenwriting, producing, photography, and visual art.',
          'Rather than relying only on conventional plot mechanics, Wenders frequently builds his films around atmosphere, movement, observation, and the emotional relationship between people and places.',
        ],
      },
      filmography: [
        { title: 'Alice in the Cities', year: '1974' },
        { title: 'The Wrong Move', year: '1975' },
        { title: 'Kings of the Road', year: '1976' },
        { title: 'The American Friend', year: '1977' },
        { title: 'Paris, Texas', year: '1984' },
        { title: 'Tokyo-Ga', year: '1985' },
        { title: 'Wings of Desire', year: '1987' },
        { title: 'Buena Vista Social Club', year: '1999' },
        { title: 'Pina', year: '2011' },
        { title: 'Perfect Days', year: '2023' },
      ],
      filmographyNote:
        'Selected works. Together they show a continuing interest in the road movie, the documentary gaze, memory, music, architecture, and the human experience of time.',
      lifeCoda:
        'Landscapes are not merely backgrounds; they can function as emotional spaces. Journeys are not only geographical movements; they can also represent displacement, discovery, uncertainty, and transformation.',

      tour: {
        eyebrow: 'The India Tour',
        title: 'Eighteen films, five cities, one first visit',
        paragraphs: [
          'The India Tour was conceived as a travelling retrospective dedicated to Wenders’ work across more than half a century. The programme presented 18 films — features, short films, and documentaries — in Mumbai, Thiruvananthapuram, Kolkata, New Delhi, and Pune, with Wenders attending screenings and taking part in public conversations and engagements with film communities.',
          'The official event description records that this was Wenders’ first visit to India. In the Goethe-Institut’s published introduction, Wenders reflected on India’s abundance of landscapes and images and on the central place of cinema in the country’s cultural life. His statement also acknowledged the Film Heritage Foundation’s work in preserving, restoring, and bringing Indian film heritage to contemporary audiences.',
        ],
      },
      tourLevels: [
        {
          title: 'A retrospective',
          note: 'Of Wenders’ own cinema, across more than half a century.',
        },
        {
          title: 'An exchange',
          note: 'With India’s film culture — screenings joined to conversations, masterclasses, and encounters with audiences, students, and filmmakers.',
        },
      ],

      kolkata: {
        eyebrow: 'The Kolkata chapter',
        title: 'Four days in a city of cinema',
        paragraphs: [
          'Kolkata hosted the India Tour from 16 to 19 February 2025, with screenings at Nandan and Basusree. The city chapter also included public events such as a masterclass with Wim Wenders and related conversations involving Donata Wenders.',
          'Kolkata’s importance in this context comes from its long-standing cultural relationship with cinema. The city’s creative ecosystem has been shaped by filmmakers, writers, theatre practitioners, musicians, photographers, and visual artists. Its film culture has historically encouraged close viewing, critical discussion, archival interest, and the exchange of ideas across generations.',
          'The Kolkata encounter can therefore be understood as more than a stop on a travelling programme. It brought Wenders’ work into contact with a city whose cultural identity has been deeply influenced by cinema and artistic debate.',
        ],
      },
      kolkataFacts: [
        { label: 'Dates', value: '16–19 February 2025' },
        { label: 'Screenings', value: 'Nandan and Basusree' },
        { label: 'Programme', value: '16 of the 18 films' },
        { label: 'Public events', value: 'A masterclass with Wim Wenders; conversations with Donata Wenders' },
      ],

      perspective: {
        eyebrow: 'Editorial perspective',
        title: 'Three ideas in one frame',
        paragraphs: [
          'Our documentary approaches the India visit through the language of observation and cultural documentation. It connects the public event with the wider story of Wenders’ artistic life, while giving special attention to Kolkata as a creative environment. The purpose is not simply to list screenings or reproduce an event report, but to place the encounter within a broader reflection on cinema, movement, memory, and artistic exchange.',
        ],
      },
      ideas: [
        {
          title: 'The journey of a filmmaker',
          note: 'Wenders’ artistic life, from the New German Cinema of the 1970s to Perfect Days.',
        },
        {
          title: 'A first India visit',
          note: 'The cultural significance of his first journey to India, in February 2025.',
        },
        {
          title: 'The creative character of Kolkata',
          note: 'A city where cinema is not merely an entertainment form, but a living part of cultural conversation.',
        },
      ],

      artwork: [
        {
          src: korAsset('Wim-Wenders-Poster-1.jpg.jpeg'),
          width: 768,
          height: 1024,
          caption: 'The India Tour — official poster',
        },
        {
          src: korAsset('ww_final-compressed_seite_03-700x423.jpg.jpeg'),
          width: 700,
          height: 423,
          caption: 'The India Tour — campaign artwork',
        },
      ],

      associations: [
        { role: 'In association with', name: 'Film Heritage Foundation' },
        { role: 'In association with', name: 'Wim Wenders Stiftung (Wim Wenders Foundation)' },
        { role: 'In collaboration with', name: 'Goethe-Institut / Max Mueller Bhavan Kolkata' },
        { role: 'Produced by', name: 'Max Mueller Kolkata' },
      ],
      crew: [
        { role: 'Project Coordinator', name: 'Sharmitha' },
        { role: 'Camera', name: 'Basab Mallick' },
        { role: 'Editor', name: 'Subhajit Prasad' },
        { role: 'Technical Post-Production Support', name: 'Cinewacky Production' },
        { role: 'Production Coordinator', name: 'Moinak Guho' },
        { role: 'Assistant Editor', name: 'Snigdha Prasad' },
      ],

      card: 'King of the Road explores the life and cinematic vision of Wim Wenders, his first visit to India in February 2025, and the special cultural encounter that unfolded in Kolkata — cinema as a language of movement, memory, and creative exchange.',
    },

    colophon: 'King of the Road — a Cinewacky documentary record. Kolkata, February 2025.',
    projectSlug: LBL,
    projectTitle: 'Life Beyond Lens',
  },
  {
    id: 'tuning-2-you',
    slug: 'tuning-2-you',
    status: 'live',
    theme: 'tuning',
    title: 'Tuning 2 You',
    // Every fact here comes from web-stream-tales.md / (wave stream Tales).docx.
    // Broadcast titles and channels are as each host publishes them. The brief
    // gives "over 50 artists" for the research and "a hundred artists" for the
    // series; both are printed where the brief puts them.
    tagline: 'A cultural odyssey into India’s forgotten harmonies',
    seoTitle: 'Tuning 2 You: Lost Musicians of India | Cinewacky',
    seoDescription:
      'A 6 × 30′ cultural travelogue following the last torchbearers of India’s vanishing musical traditions across six states, for Channel 4, BBC Earth, Discovery Asia and History Channel.',
    year: '2018–19',

    tuning: {
      subtitle: 'Lost Musicians of India',
      epigraph: 'A Cultural Odyssey into India’s Forgotten Harmonies',
      format: ['6 × 30′', '2018–19', 'Factual broadcast'],
      heroPlate: {
        src: wst('512867468_24087265994264227_8746614560225145935_n.jpg'),
        caption: 'Sarod and dotara, in conversation',
        width: 2048,
        height: 1365,
      },

      overture: [
        'A captivating 6 × 30′ cultural travelogue series that delves deep into the heart of India’s rich and vanishing musical heritage. This visually stunning journey follows the last torchbearers of India’s ancient musical and performance traditions, uncovering untold stories from off the beaten path.',
        'This project celebrates India’s living cultural treasures, preserving their legacies for audiences across the globe.',
      ],
      record: [
        { label: 'Year', value: '2018–19' },
        { label: 'Format', value: '6 × 30′ cultural travelogue' },
        { label: 'Project type', value: 'Factual Broadcast Production' },
      ],
      roles: [
        {
          title: 'Creative Development',
          note: 'Conceptualizing and shaping the narrative of this cultural odyssey.',
        },
        {
          title: 'Associate Production',
          note: 'Supporting the seamless execution of production on the ground.',
        },
        {
          title: 'Post-Production',
          note: 'Enhancing storytelling through meticulous editing and refinement.',
        },
      ],
      liner: [
        {
          src: wst('512755154_24086705470986946_5678611784172296258_n.jpg'),
          caption: 'Bauls beneath a banyan',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('510972309_24096998159957677_8137216255912188693_n.jpg'),
          caption: 'Qawwali',
          width: 2048,
          height: 1365,
        },
      ],

      overview: {
        eyebrow: 'Project overview',
        title: 'Melodies of the margins',
        paragraphs: [
          'To craft an eternal tribute that preserves the soul of India’s fading cultural and musical traditions, capturing the essence of a heritage on the brink of being lost. This endeavor seeks to immortalize the rich tapestry of sounds, stories, and rituals that once defined the nation’s identity, before they fade into the pages of history.',
        ],
      },
      overviewPlate: {
        src: wst('512739382_24097828566541303_5762251846368366331_n.jpg'),
        width: 2048,
        height: 1365,
      },

      episodes: [
        {
          place: 'Bengal',
          locale: 'Kolkata and the Baul villages',
          text: 'Our journey begins in the vibrant heart of Bengal, the City of Joy—Kolkata. Guided by the soulful Sarod maestro Soumik, we delve into the rich tapestry of his musical heritage. As Soumik assembles his ensemble, their path winds away from the bustling city into the serene villages, where the haunting melodies of the Bauls, the wandering minstrels of Bengal, echo through time. Together, they uncover stories and songs that bridge generations, weaving a soulful symphony of tradition and discovery.',
          plate: {
            src: wst('513825826_24086705494320277_6852792077301221404_n.jpg'),
            caption: 'Bauls of Bengal',
            width: 2048,
            height: 1365,
          },
          trailer: 'h5XWBNILxgg',
        },
        {
          place: 'Rajasthan',
          locale: 'Ajmer, and the road out of it',
          text: 'In the mystical city of Ajmer, Soumik encounters a spirited Qawwali group who invite him to perform within the hallowed walls of the majestic Ajmer Sharif Dargah. From there, the journey takes an unexpected turn—crashing a vibrant wedding, creating magic with tribal drummers, and even dodging the local police. Along the way, he discovers a remarkable group of women singers, rooted in their village yet brimming with dreams of taking their voices to the cities. Each encounter unveils the raw beauty and untamed rhythm of Rajasthan, a land where tradition and ambition collide in harmony.',
          plate: {
            src: wst('514246656_24101484456175714_6533574895992095296_n.jpg'),
            caption: 'Rajasthan',
            width: 2048,
            height: 1365,
          },
          trailer: '3Q0KwBMvhGA',
        },
        {
          place: 'Nagaland',
          locale: 'The misty eastern mountains',
          text: 'Nestled high in the misty eastern mountains of India, Soumik ventures into the heart of Nagaland, where he meets the enigmatic Naga tribes. Immersed in their world, he discovers a tapestry of ancient customs, mesmerizing chicken dances, and echoes of their head-hunting past—remnants of a culture steeped in mystery and resilience. As their unique heritage teeters on the edge of oblivion, the Nagas share their dual aspirations: to safeguard their proud identity while staking their rightful place on India’s cultural map. It’s a story of tradition, survival, and the quest for belonging.',
        },
        {
          place: 'Goa',
          locale: 'Christmas Eve on the coast',
          text: 'On Christmas Eve, we arrive in Goa, a land of contrasts where the echoes of its Portuguese colonial past meet the vibrant pulse of a modern global party hub. Here, traditions clash with the tides of tourism, and a relaxed coastal rhythm grapples with the demands of consumer culture. Through the soulful voice of an ambitious young Fado singer and the timeless wisdom of an elder violinist, the deep-seated struggle of Goa comes alive—a heartfelt narrative of identity, heritage, and the delicate dance between preserving the past and embracing the future.',
        },
        {
          place: 'Karnataka',
          locale: 'Mountains, forest and the dancers of the land',
          text: 'In the lush, tropical landscapes of Karnataka, we encounter the grace and power of its dancers, whose movements tell stories as ancient as the land itself. Amidst the towering mountains and dense forests, they reveal how the weight of India’s age-old caste system has cast shadows over their art and lives. Yet, here in this fertile paradise, music and dance are not just performances; they are the soul of the land, an eternal and sacred tradition that endures through the ages.',
        },
        {
          place: 'Varanasi',
          locale: 'The world’s oldest city',
          text: 'In the ancient heart of Varanasi, the world’s oldest city, we journey through a neighborhood steeped in the legacy of five generations of Indian classical masters. Here, we encounter widowed women singers who have devoted their lives to the worship of Lord Shiva, their voices resonating with a divine intensity. We also meet a young drummer, brimming with raw talent, destined for greatness. Amidst the sacred rhythms of this eternal city, where religion, tradition, and the forces of modern commerce collide, an unwavering dedication to the fading classical arts endures, a testament to the resilience of cultural heritage.',
        },
      ],

      mosaic: [
        { value: '6', label: 'states' },
        { value: '9', label: 'languages' },
        { value: '40', label: 'music groups' },
        { value: '100', label: 'artists' },
      ],
      mosaicLine: 'An intricate mosaic of sound and culture.',
      mosaicPlate: {
        src: wst('514477860_24096229443367882_8882196704568792492_n.jpg'),
        caption: 'From the air',
        width: 2048,
        height: 1536,
      },

      craft: {
        eyebrow: 'On a shoestring budget',
        title: 'A six-person odyssey of passion and craft',
        paragraphs: [
          'With just a six-person team, two trusty cars, seven cameras with a full lens kit, and a drone, we embark on an extraordinary journey across six states, exploring every nook and corner. Ours is no ordinary crew; each member is a powerhouse, embodying the skill and dedication of ten, seamlessly mastering production, technical finesse, and creative vision.',
          'We jam with musicians in remote villages, connect with people in bustling towns, and capture the heartbeat of cultures often overlooked. Every project is a testament to our belief in the power of collaboration, resourcefulness, and the magic of storytelling. On a shoestring budget, we prove that passion and purpose can transform limitations into breathtaking art.',
        ],
      },
      rider: [
        { quantity: '6', item: 'Crew', note: 'each with the skill of ten' },
        { quantity: '2', item: 'Cars' },
        { quantity: '7', item: 'Cameras', note: 'with a full lens kit' },
        { quantity: '1', item: 'Drone' },
        { quantity: '6', item: 'States' },
        { quantity: '8', item: 'Weeks' },
      ],
      backstage: [
        {
          src: wst('513965102_24103294202661406_5015955399114216585_n.jpg'),
          caption: 'Setting up a slider in the sand',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('514265330_24092289137095246_3284634648517952223_n.jpg'),
          caption: 'The drone',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('514045718_24092841463706680_6520166789323609907_n.jpg'),
          caption: 'Two cameras on one performer',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('513862950_24091740813816745_6037863316017968150_n.jpg'),
          caption: 'Sound, walking with an elder',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('514433228_24103294329328060_7873860576963792544_n.jpg'),
          caption: 'At the long lens',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('513741727_24103294132661413_332620993569617816_n.jpg'),
          caption: 'Toward the camel carts',
          width: 2048,
          height: 1367,
        },
      ],

      standout: {
        eyebrow: 'The research',
        title: 'Shining where others blend',
        paragraphs: [
          'Blending meticulous research with the agility of an on-the-ground production team, we embarked on an extraordinary journey across six states in just eight weeks. Driven by a mission to uncover the most authentic and impactful voices, we connected with over 50 artists—custodians of India’s hidden cultures and timeless artistic traditions.',
          'Every frame we captured was infused with their passion, every story a vivid tapestry of heritage and humanity. This was more than a project; it was a heartfelt tribute to the soul of India, told through the voices of those who keep its lesser-known treasures alive.',
        ],
      },
      sleeves: [
        {
          src: wst('513043232_24091535953837231_6548493385554902938_n.jpg'),
          caption: 'Lost in the song',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('513931331_24091536140503879_7877880093751674013_n.jpg'),
          caption: 'Tuning up',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('514025887_24096258063365020_6786814911898174056_n.jpg'),
          caption: 'The elder on the parapet',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('514062659_24091886177135542_468118493357339937_n.jpg'),
          caption: 'Harmonium, drum and voice',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('503707458_24101484389509054_7430855447918476280_n.jpg'),
          caption: 'Two frame drums',
          width: 2048,
          height: 1365,
        },
        {
          src: wst('513987645_24092133020444191_7928884426224922548_n.jpg'),
          caption: 'Talking after dark',
          width: 2048,
          height: 1365,
        },
      ],

      broadcasts: [
        {
          id: '8xTQWd0anSg',
          kind: 'youtube',
          title: 'Official Trailer 1',
          channel: 'Soumik Datta / Arts',
          href: 'https://youtu.be/8xTQWd0anSg',
          source: '8xTQWd0anSg',
          poster: 'https://i.ytimg.com/vi/8xTQWd0anSg/maxresdefault.jpg',
        },
        {
          id: 'h5XWBNILxgg',
          kind: 'youtube',
          title: 'Official Teaser 1 — Bauls of Bengal',
          channel: 'Soumik Datta / Arts',
          href: 'https://youtu.be/h5XWBNILxgg',
          source: 'h5XWBNILxgg',
          poster: 'https://i.ytimg.com/vi/h5XWBNILxgg/maxresdefault.jpg',
        },
        {
          id: 'QEfGQpPtiNY',
          kind: 'youtube',
          title: 'Trailer',
          channel: 'HISTORY TV18',
          href: 'https://youtu.be/QEfGQpPtiNY',
          source: 'QEfGQpPtiNY',
          poster: 'https://i.ytimg.com/vi/QEfGQpPtiNY/maxresdefault.jpg',
        },
        {
          id: 'DZ1a0MrtcPM',
          kind: 'youtube',
          title: 'Tuning 2 You on World Music Day',
          channel: 'Sony BBC Earth',
          href: 'https://youtu.be/DZ1a0MrtcPM',
          source: 'DZ1a0MrtcPM',
          poster: 'https://i.ytimg.com/vi/DZ1a0MrtcPM/maxresdefault.jpg',
        },
        {
          id: 'O6isqXtjczE',
          kind: 'youtube',
          title: 'India Premiere on Sony BBC Earth',
          channel: 'Bagri Foundation',
          href: 'https://youtu.be/O6isqXtjczE',
          source: 'O6isqXtjczE',
          // No HD thumbnail on this one; hqdefault is letterboxed 4:3, which the
          // 16:9 frame crops back to the picture.
          poster: 'https://i.ytimg.com/vi/O6isqXtjczE/hqdefault.jpg',
        },
        {
          id: '3Q0KwBMvhGA',
          kind: 'youtube',
          title: 'Official Teaser 3 — Drums & Dunes of Rajasthan',
          channel: 'Soumik Datta / Arts',
          href: 'https://youtu.be/3Q0KwBMvhGA',
          source: '3Q0KwBMvhGA',
          poster: 'https://i.ytimg.com/vi/3Q0KwBMvhGA/maxresdefault.jpg',
        },
        {
          id: 'facebook-trailer',
          kind: 'facebook',
          title: 'Trailer',
          channel: 'Soumik Datta',
          href: 'https://www.facebook.com/share/v/1CSMbzNHYj/',
          source: 'https://www.facebook.com/soumikmusic/videos/10157543995428214/',
          poster: wst('514057620_24093397526984407_294059156592160373_n.jpg'),
        },
      ],
      streaming:
        'From captivating journeys to timeless insights — a six-episode series now streaming on Channel 4, BBC Earth, Discovery Asia and The History Channel.',
      networks: [
        { name: 'Channel 4' },
        { name: 'BBC Earth' },
        { name: 'Discovery Asia' },
        { name: 'History Channel' },
        { name: 'Sony Liv' },
        { name: 'The Bagri Foundation' },
        { name: 'SDA' },
      ],

      // Every delivered still, in filename order. The slots above point into
      // this same set; the gallery keeps all of it when they are repointed.
      gallery: [
      { src: wst('503707458_24101484389509054_7430855447918476280_n.jpg'), caption: 'A drummer in white holding two frame drums outside a whitewashed building', width: 2048, height: 1365 }, // 01
      { src: wst('510972309_24096998159957677_8137216255912188693_n.jpg'), caption: 'Qawwali singers at their harmoniums before a packed crowd', width: 2048, height: 1365 }, // 02
      { src: wst('511192721_24093022537021906_2077046379890483675_n.jpg'), caption: 'A village gathers in front of the crew’s car', width: 2048, height: 1365 }, // 03
      { src: wst('511275158_24093237500333743_6329326842019027442_n.jpg'), caption: 'Families seated on the floor, watching a performance', width: 1920, height: 1080 }, // 04
      { src: wst('511974350_24103091689348324_5385452044540265592_n.jpg'), caption: 'The crew at dinner after a day’s shoot', width: 1365, height: 2048 }, // 05
      { src: wst('512739382_24097828566541303_5762251846368366331_n.jpg'), caption: 'A crowd seated in a lamp-lit, gilded hall', width: 2048, height: 1365 }, // 06
      { src: wst('512755154_24086705470986946_5678611784172296258_n.jpg'), caption: 'Bauls playing beneath a banyan tree, one of them dancing', width: 2048, height: 1365 }, // 07
      { src: wst('512779779_24091725327151627_2304515949414077100_n.jpg'), caption: 'An elder smoking in the half-dark', width: 2048, height: 1365 }, // 08
      { src: wst('512818458_24091544590503034_3938100485303827520_n.jpg'), caption: 'The crew talking it through in a field', width: 2048, height: 1367 }, // 09
      { src: wst('512867468_24087265994264227_8746614560225145935_n.jpg'), caption: 'A sarod and a dotara in conversation on a striped mat', width: 2048, height: 1365 }, // 10
      { src: wst('512939277_24091740787150081_954435599741874472_n.jpg'), caption: 'The crew stopping for tea in a village lane', width: 2048, height: 1365 }, // 11
      { src: wst('513043232_24091535953837231_6548493385554902938_n.jpg'), caption: 'A Baul in saffron, lost in the song', width: 2048, height: 1365 }, // 12
      { src: wst('513048912_24091556927168467_1037575326243687533_n.jpg'), caption: 'Four of the crew among the trees', width: 2048, height: 1367 }, // 13
      { src: wst('513487065_24103279589329534_1192719135061063618_n.jpg'), caption: 'The crew framing a shot inside a stone archway', width: 2048, height: 1365 }, // 14
      { src: wst('513516287_24097828866541273_8654623174927490457_n.jpg'), caption: 'Heaps of red roses at a shrine-side stall', width: 2048, height: 1365 }, // 15
      { src: wst('513604279_24093397563651070_8499790249263916501_n.jpg'), caption: 'Women carrying loads across a field at dusk', width: 2048, height: 1152 }, // 16
      { src: wst('513741727_24103294132661413_332620993569617816_n.jpg'), caption: 'A camera operator walking toward the camel carts', width: 2048, height: 1367 }, // 17
      { src: wst('513793311_24093397536984406_6564487305386221828_n.jpg'), caption: 'Cards, drives and cameras: the evening data wrangle', width: 2048, height: 1152 }, // 18
      { src: wst('513825826_24086705494320277_6852792077301221404_n.jpg'), caption: 'A Baul singer with his dotara beneath a banyan', width: 2048, height: 1365 }, // 19
      { src: wst('513853942_24092466837077476_2525888907478215571_n.jpg'), caption: 'A night-time selfie with the musicians', width: 2048, height: 1365 }, // 20
      { src: wst('513859221_24093022533688573_1529796532520714944_n.jpg'), caption: 'Three children in a doorway under hand-painted Bengali lettering', width: 2048, height: 1365 }, // 21
      { src: wst('513862950_24091740813816745_6037863316017968150_n.jpg'), caption: 'The sound recordist walking with an elder, boom raised', width: 2048, height: 1365 }, // 22
      { src: wst('513931331_24091536140503879_7877880093751674013_n.jpg'), caption: 'A musician tuning a carved, many-pegged string instrument', width: 2048, height: 1365 }, // 23
      { src: wst('513940479_24093237850333708_658628135790346623_n.jpg'), caption: 'Hands on a harmonium, in black and white', width: 2048, height: 1149 }, // 24
      { src: wst('513947759_24102684579389035_5946719883153950804_n.jpg'), caption: 'A girl carrying a young goat', width: 2048, height: 1365 }, // 25
      { src: wst('513965102_24103294202661406_5015955399114216585_n.jpg'), caption: 'Setting up a slider in the sand', width: 2048, height: 1365 }, // 26
      { src: wst('513984189_24086546431002850_5957324844444950221_n.jpg'), caption: 'On the road, inside the car', width: 2048, height: 1365 }, // 27
      { src: wst('513987645_24092133020444191_7928884426224922548_n.jpg'), caption: 'Two musicians talking at night, one in a patchwork robe', width: 2048, height: 1365 }, // 28
      { src: wst('514004151_24096998146624345_5037925604570406962_n.jpg'), caption: 'Walking through a shrine-side bazaar', width: 2048, height: 1365 }, // 29
      { src: wst('514025887_24096258063365020_6786814911898174056_n.jpg'), caption: 'An elder in a saffron turban on a stone parapet', width: 2048, height: 1365 }, // 30
      { src: wst('514039865_24103463699311123_8941179565032845673_n.jpg'), caption: 'Cameras on the table between set-ups', width: 2048, height: 1367 }, // 31
      { src: wst('514045718_24092841463706680_6520166789323609907_n.jpg'), caption: 'Filming a woman in red on a mud-walled ledge', width: 2048, height: 1365 }, // 32
      { src: wst('514049748_24093022633688563_4322657594360232498_n.jpg'), caption: 'Villagers outside a shopfront with Bengali signs', width: 2048, height: 1365 }, // 33
      { src: wst('514057620_24093397526984407_294059156592160373_n.jpg'), caption: 'Two Bauls with their instruments in a grove', width: 2048, height: 1152 }, // 34
      { src: wst('514062659_24091886177135542_468118493357339937_n.jpg'), caption: 'An elder at the harmonium, with drum and voice beside him', width: 2048, height: 1365 }, // 35
      { src: wst('514090533_24096998156624344_4856269641855326515_n.jpg'), caption: 'A night market, seen from the crew’s side', width: 2048, height: 1365 }, // 36
      { src: wst('514104029_24092822793708547_580189700150923030_n.jpg'), caption: 'Filming beneath a great old tree', width: 2048, height: 1365 }, // 37
      { src: wst('514107350_24092617900395703_3960754312424617721_n.jpg'), caption: 'Crew and hosts along a veranda', width: 2048, height: 1365 }, // 38
      { src: wst('514131703_24102684392722387_8390379102120538902_n.jpg'), caption: 'A family in the doorway of a stone house', width: 2048, height: 1365 }, // 39
      { src: wst('514233283_24103463725977787_8167377379496647338_n.jpg'), caption: 'Touch-ups beside the car', width: 2048, height: 1365 }, // 40
      { src: wst('514246656_24101484456175714_6533574895992095296_n.jpg'), caption: 'Women in bright veils seated together', width: 2048, height: 1365 }, // 41
      { src: wst('514265330_24092289137095246_3284634648517952223_n.jpg'), caption: 'The drone, in flight', width: 2048, height: 1365 }, // 42
      { src: wst('514273983_24101484509509042_2089372832263251975_n.jpg'), caption: 'Women carrying pots on their heads', width: 2048, height: 1365 }, // 43
      { src: wst('514286379_24092289177095242_1036926582721974462_n.jpg'), caption: 'A young boy looking up', width: 2048, height: 1365 }, // 44
      { src: wst('514335863_24092133047110855_7547883587669167924_n.jpg'), caption: 'Filming a singer in a saffron turban', width: 2048, height: 1365 }, // 45
      { src: wst('514349311_24091163787207781_3136326762177338330_n.jpg'), caption: 'The drone pilot among villagers and Bauls', width: 2048, height: 1152 }, // 46
      { src: wst('514364904_24092288970428596_8440777169898763370_n.jpg'), caption: 'Showing the drone footage to an elder', width: 2048, height: 1365 }, // 47
      { src: wst('514411256_24101484329509060_1381316870255924615_n.jpg'), caption: 'A crew member writing up notes', width: 2048, height: 1367 }, // 48
      { src: wst('514433228_24103294329328060_7873860576963792544_n.jpg'), caption: 'A cinematographer at a long lens', width: 2048, height: 1365 }, // 49
      { src: wst('514477860_24096229443367882_8882196704568792492_n.jpg'), caption: 'From the air: a village lined up along a hillside path', width: 2048, height: 1536 }, // 50
      { src: wst('514482709_24092832507040909_7949583558335197712_n.jpg'), caption: 'Reviewing footage by laptop light, at night', width: 2048, height: 1365 }, // 51
      { src: wst('514486581_24103236776000482_3983742037570997995_n.jpg'), caption: 'Looking up at a painted palace ceiling', width: 2048, height: 1367 }, // 52
      { src: wst('514746187_24102684499389043_8582095702089691232_n.jpg'), caption: 'A domed rooftop pavilion against the sky', width: 2048, height: 1365 }, // 53
      ],

      visionaries: [
        { role: 'Visionary Director', name: 'Jijo' },
        { role: 'Innovative Presenter & Creator', name: 'Soumik Datta' },
        { role: 'Mastermind Producer', name: 'Sir David Green' },
        { role: 'Executive Producers', name: 'Bagri Foundation & SDA' },
        { role: 'Creative Executive Producer', name: 'Weavers Studio Centre for the Arts' },
        { role: 'Dynamic Associate Producer', name: 'Jahanara Rabia Raza' },
        { role: 'In Collaboration With', name: 'Cinewacky' },
        { role: 'Principal Distributor', name: 'Stormglass Productions' },
        { role: 'Director of Cinematic Vision', name: 'Jijo' },
        { role: 'Associate Cinematic Architect', name: 'Subhadip Sarkar' },
        { role: 'Sound Alchemist', name: 'Sukanta Majumdar' },
        { role: 'Editor of Stories', name: 'Subhajit Prasad' },
      ],
      visionariesNote:
        'An artistic symphony crafted by a trailblazing team, blending culture, passion, and creativity into a visual and auditory journey.',
    },

    colophon: 'Tuning 2 You: Lost Musicians of India — made in collaboration with Cinewacky. India, 2018–19.',
    projectSlug: 'web-stream-tales',
    projectTitle: 'Web Stream Tales',
  },
];

export function getDocumentaryBySlug(slug: string): Documentary | undefined {
  return documentaries.find((documentary) => documentary.slug === slug);
}

/**
 * Documentaries live under their project, at /project/<project>/<documentary>,
 * alongside the stories — so the lookup has to be scoped by project, not just
 * by slug.
 */
export function getDocumentaryForProject(
  projectSlug: string,
  documentarySlug: string,
): Documentary | undefined {
  return documentaries.find(
    (documentary) =>
      documentary.slug === documentarySlug &&
      documentary.projectSlug === projectSlug,
  );
}

export function getAllDocumentaryParams(): { slug: string; storySlug: string }[] {
  return documentaries
    .filter((documentary) => documentary.projectSlug)
    .map((documentary) => ({
      slug: documentary.projectSlug as string,
      storySlug: documentary.slug,
    }));
}

export default documentaries;
