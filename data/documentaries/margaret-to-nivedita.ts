import type { Documentary } from '@/types/documentary';
import { LBL } from './shared';

// The 17 plates from Margaret to Nivedita: the twelve delivered stills plus the
// five frames scripts/build-margaret-to-nivedita.mjs lifts out of the trailer.
function plateMN(n: number): string {
  return `/documentaries/margaret-to-nivedita/plates/plate-${String(n).padStart(2, '0')}.jpg`;
}

/** Everything else that build script writes, beside the plates. */
function mnAsset(filename: string): string {
  return `/documentaries/margaret-to-nivedita/${filename}`;
}

const margaretToNivedita: Documentary = {
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
};

export default margaretToNivedita;
