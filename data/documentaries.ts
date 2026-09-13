import { showcaseVideoSrc } from '@/lib/projectVideos';
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
// player only fetches it once someone presses play.
const BOD_TRAILER = '/projects/life-beyond-lens/bird-of-duck/2k%20BOD%20TRAILER.mp4';

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

export const documentaries: Documentary[] = [
  {
    id: 'life-beyond-lens',
    slug: LBL,
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
