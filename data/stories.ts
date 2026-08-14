import { showcaseVideoSrc } from '@/lib/projectVideos';
import type { Story } from '@/types/story';

const PROJECT = 'reel-vibe-uncut';
const poster = '/projects/reel-vibe-uncut/poster.jpg';
const heroImage = '/projects/reel-vibe-uncut/hero.jpg';
const gallery = [
  '/projects/reel-vibe-uncut/1.jpg',
  '/projects/reel-vibe-uncut/2.jpg',
];

const kaliImageFiles = [
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_00_16_16.Still001.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_11_50_00.Still003.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_12_04_09.Still002.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_12_11_16.Still004.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_12_26_16.Still005.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_19_29_10.Still006.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_22_35_09.Still008.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_22_45_00.Still007.jpg',
  'kali_-_neo-noir,_magic-realist_short_film (1440p)(1).mp4.00_23_55_00.Still009.jpg',
  'Sequence 05.00_00_06_07.Still002.jpg',
  'Sequence 05.00_00_13_06.Still004.jpg',
  'Sequence 05.00_00_14_06.Still003.jpg',
  'Sequence 05.00_00_23_05.Still001.jpg',
  'Sequence 05.00_00_53_00.Still005.jpg',
  'Sequence 05.00_01_03_15.Still006.jpg',
  'Sequence 05.00_01_10_22.Still007.jpg',
  'Sequence 05.00_01_29_13.Still008.jpg',
  'Sequence 05.00_01_51_11.Still009.jpg',
  'Sequence 05.00_02_07_20.Still010.jpg',
  'Sequence 05.00_02_32_23.Still011.jpg',
] as const;

function kaliImage(filename: string): string {
  return `/projects/reel-vibe-uncut/kali/${encodeURIComponent(filename)}`;
}

const kaliImages = kaliImageFiles.map(kaliImage);

function video(filename: string): string {
  return showcaseVideoSrc(PROJECT, filename);
}

// The hero plays a short silent loop cut from the film, not the film itself —
// 48-69MB per page became ~0.5MB. `trailer` still points at the full source.
// Built by scripts/build-hero-loops.mjs; re-run it if a source film changes.
function heroLoop(filename: string): string {
  return showcaseVideoSrc(PROJECT, filename.replace(/\.mp4$/, '-loop.mp4'));
}

function heroPoster(filename: string): string {
  return showcaseVideoSrc(PROJECT, filename.replace(/\.mp4$/, '-poster.jpg'));
}

const KALI_TRAILER = '/projects/reel-vibe-uncut/kali_trailer/kali_official_trailer.mp4';
const KALI_LOOP = '/projects/reel-vibe-uncut/kali_trailer/kali_official_trailer-loop.mp4';
const KALI_POSTER =
  '/projects/reel-vibe-uncut/kali_trailer/kali_official_trailer-poster.jpg';

const kaliCrew = [
  { role: 'Writer / Director', name: 'JIJO' },
  { role: 'Producer', name: 'Subhajit Prasad' },
  { role: 'Sound', name: 'Sourav Gupta' },
  { role: 'Music', name: 'Hollie Buhagiar' },
  { role: 'VFX', name: 'Neil Rowe' },
  { role: 'Grade', name: 'Jake White' },
  { role: 'Editors', name: 'Subhajit Prasad & JIJO' },
  { role: 'DOP', name: 'JIJO' },
];

const sharedCrew = kaliCrew;

const kaliCast = [
  { actor: 'Disha Bhattacharjee', character: 'Deepa / Kali', portrait: kaliImages[0] },
  { actor: 'Ujjayini Chattopadhyay', character: 'Damini', portrait: kaliImages[1] },
  { actor: 'Rujana Thakur', character: 'Lela', portrait: kaliImages[2] },
  { actor: 'Arijeet Ganguly', character: 'Bikash', portrait: kaliImages[3] },
  { actor: 'Manoj Mondal', character: 'Father', portrait: kaliImages[4] },
  { actor: 'Priyanath Mukherjee', character: 'Ram Bhai', portrait: kaliImages[5] },
];

const kaliAchievements = [
  { year: 'Winner', title: 'Cannes Young Directors Award, Silver', description: '2024' },
  { year: 'Winner', title: 'Best Picture & Best Director', description: 'London Global Film Awards, 2024' },
  { year: 'Winner', title: 'Best Director', description: 'Emerging Talent Film Festival, 2024' },
  { year: 'Winner', title: 'Best Short Film', description: 'Blue Bird Film Festival, 2023' },
  { year: 'Winner', title: 'Best Director', description: 'Mumbai Short Film Festival, 2023' },
  { year: 'Official Selection', title: 'Bengaluru International Short Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Best of India, Shorts TV', description: '2024' },
  { year: 'Official Selection', title: 'UK Asian Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'London Indian Film Festival', description: '2023' },
  { year: 'Official Selection', title: 'Indian Panorama Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Jaipur International Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Lift-Off Film Festival', description: '2023' },
  { year: 'Official Selection', title: 'Goa Short Film Festival' },
  { year: 'Official Selection', title: 'South Asian Short Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Bengal International Short Film Festival', description: '2024' },
  { year: 'Semi-Finalist', title: "Flickers' Rhode Island International Film Festival" },
];

const stories: Story[] = [
  {
    slug: 'moonlight-dream',
    projectSlug: PROJECT,
    title: 'Moonlight Dream',
    tagline: 'Where silence becomes light.',
    heroVideo: heroLoop('MOONLIGHT DREAM.mp4'),
    poster: heroPoster('MOONLIGHT DREAM.mp4'),
    thumbnail: heroPoster('MOONLIGHT DREAM.mp4'),
    synopsis:
      'A nocturnal reverie unfolds between memory and moonlight — fragments of longing stitched together in silver and shadow.',
    visualNarrative: [
      {
        text: 'The night opens like a curtain. Every frame breathes in slow rhythm, holding space between dream and waking.',
        image: heroImage,
      },
      {
        text: 'Moonlight drifts across empty rooms and distant shorelines, painting faces that almost remember each other.',
        image: gallery[0],
      },
      {
        text: 'In the final breath of the dream, light dissolves into dawn — and the story lingers like a song half-remembered.',
        image: gallery[1],
      },
    ],
    crew: sharedCrew,
    cast: [
      { actor: 'Lead', character: 'The Dreamer', portrait: poster },
      { actor: 'Supporting', character: 'The Memory', portrait: gallery[0] },
    ],
    gallery: [...gallery, poster, heroImage],
    achievements: [
      { year: '2024', title: 'Official Selection', description: 'Cinematic Shorts Showcase' },
    ],
    producerNote:
      'Moonlight Dream was conceived as a visual poem — less plot, more atmosphere. Every choice serves the feeling of half-sleep.',
    trailer: video('MOONLIGHT DREAM.mp4'),
  },
  {
    slug: 'kali',
    projectSlug: PROJECT,
    projectVideoFilename: 'KALI .mp4',
    title: 'Kali',
    tagline: '',
    heroVideo: KALI_LOOP,
    poster: KALI_POSTER,
    thumbnail: KALI_POSTER,
    synopsis:
      'Corruption festers and innocence shatters, one woman rises — a storm of justice and vengeance entwined. When heroism turns ruthless and humanity hangs by a thread, Kali awakens.',
    visualNarrative: [
      {
        text: 'In the twisting labyrinth of Kolkata, whispers swirl about a ghostly figure — the vigilante known only as "Ma Kali." Cloaked in red and black, she delivers her justice with fists that bruise and bones that break. Appearing only in shadows, her legend is as elusive as it is terrifying. But behind the myth lies a woman with a vendetta — one that the underworld trembles to remember.',
        image: kaliImages[0],
      },
      {
        text: 'Meet Deepa, a young woman trapped between the chains of family duty and an unrelenting thirst for vengeance. As she steps into a high-risk prison visit, fragments of a painful past resurface — a lost twin sister, a promise made in the heart of a brutal slum, and a violent storm that forever altered her destiny. Each piece of the puzzle leads to the unstoppable force that is Ma Kali. But with every step, the walls tighten. Will Deepa\'s father ever see the monster she\'s become? And can society survive the fury of a woman who refuses to be controlled?',
        image: kaliImages[1],
      },
      {
        text: 'Kali is not just a tale of slums, noir shadows, or a vigilante’s revenge. It’s a visceral descent into a world where justice and vengeance blur into a single, dark truth. With a fusion of gripping cinematography, collaborative filmmaking, and a touch of magical realism, the film takes viewers on a winding, emotional journey into the heart of darkness, where moral boundaries dissolve and power demands a heavy price.',
        image: kaliImages[2],
      },
      {
        text: 'Set against the stark, vivid contrasts of modern-day India, Kali is a suspenseful thriller, a meditation on power, identity, and the human condition. This proof-of-concept short immerses audiences in a 36-hour odyssey — one woman’s path to retribution that will leave you on the edge of your seat and questioning everything long after the screen fades to black.',
        image: kaliImages[3],
      },
    ],
    crew: kaliCrew,
    cast: kaliCast,
    gallery: [...kaliImages],
    achievements: kaliAchievements,
    producerNote:
      '"In a world of shadows, the truth will always find its way" Born from a shoestring budget and driven by a collective of fiercely dedicated, up-and-coming filmmakers, Kali emerges as a testament to the power of passion and ingenuity. The crew, many from the very slum where the story unfolds, worked alongside up-and-coming talent from across West Bengal, infusing the film with authenticity and heart. A true labour of love, this film pioneers a fresh approach to superhero storytelling — one that is authentic, rooted in real human experience, and non-exploitative. It goes beyond mere spectacle, translating its raw energy not just on screen but in the very methodology of its creation. Kali reimagines the superhero myth, transforming it into something more profound — more human. It’s a meditation on justice, vengeance, and the blurred lines between dreams and reality, built for cinematic scale yet grounded in an emotional depth only possible through high-end arthouse filmmaking. This film is a bold step toward telling stories that resonate on a deeper level — stories that stir empathy, ignite awareness, and provoke meaningful change. It reflects my vision as a director: to weave social relevance into gripping genre narratives that challenge the status quo. We invite you to step into a world where heroism is born from the ordinary, where the power of will can turn the most fragile into the extraordinary. Kali is a celebration of light, even in the darkest corners, where the fight for justice isn’t just a battle — it’s an awakening.',
    trailer: KALI_TRAILER,
  },
  {
    slug: 'dark-rising',
    projectSlug: PROJECT,
    title: 'Dark Rising',
    tagline: 'From shadow, something stirs.',
    heroVideo: heroLoop('DARK RISING.mp4'),
    poster: heroPoster('DARK RISING.mp4'),
    thumbnail: heroPoster('DARK RISING.mp4'),
    synopsis:
      'A slow-burn ascent through tension and revelation — where the darkest hour holds the sharpest truth.',
    visualNarrative: [
      {
        text: 'Shadows lengthen. The world contracts to a single point of focus — something is about to break the surface.',
        image: heroImage,
      },
      {
        text: 'Light fractures through smoke and rain. The rise is not triumphant — it is inevitable.',
        image: gallery[1],
      },
    ],
    crew: sharedCrew,
    cast: [{ actor: 'Lead', character: 'The Ascendant', portrait: gallery[0] }],
    gallery,
    achievements: [],
    trailer: video('DARK RISING.mp4'),
  },
  {
    slug: 'mistimukh',
    projectSlug: PROJECT,
    title: 'Mistimukh',
    tagline: 'Faces behind the veil.',
    heroVideo: heroLoop('MISTIMUKH.mp4'),
    poster: heroPoster('MISTIMUKH.mp4'),
    thumbnail: heroPoster('MISTIMUKH.mp4'),
    synopsis:
      'An intimate study of expression and concealment — identity rendered in glances, gestures, and the space between words.',
    visualNarrative: [
      {
        text: 'The camera lingers on faces that refuse to be read at a glance. Every look carries a second meaning.',
        image: gallery[0],
      },
      {
        text: 'Texture and silence build a portrait that feels closer to sculpture than cinema.',
        image: gallery[1],
      },
    ],
    crew: sharedCrew,
    cast: [{ actor: 'Ensemble', character: 'Mistimukh', portrait: poster }],
    gallery,
    achievements: [{ year: '2023', title: 'Portrait Study', description: 'Independent Short Form' }],
    producerNote: 'Mistimukh asks the audience to sit with ambiguity — beauty without easy answers.',
    trailer: video('MISTIMUKH.mp4'),
  },
  {
    slug: 'trailer-for-fiction',
    projectSlug: PROJECT,
    title: 'Trailer For Fiction',
    tagline: 'Stories that never were — until now.',
    heroVideo: heroLoop('trailer for fiction.mp4'),
    poster: heroPoster('trailer for fiction.mp4'),
    thumbnail: heroPoster('trailer for fiction.mp4'),
    synopsis:
      'A meta-cinematic trailer that blurs the line between imagination and reality — fiction as a living, breathing force.',
    visualNarrative: [
      {
        text: 'Titles flicker. Worlds collide. The trailer becomes its own narrative — a promise of stories yet unwritten.',
        image: heroImage,
      },
      {
        text: 'Every cut teases a universe. The audience leaves hungry for a film that exists only in possibility.',
        image: gallery[0],
      },
    ],
    crew: sharedCrew,
    cast: [],
    gallery,
    achievements: [],
    trailer: video('trailer for fiction.mp4'),
  },
  {
    slug: 'the-cat',
    projectSlug: PROJECT,
    title: 'The Cat',
    tagline: 'Nine lives. One frame.',
    heroVideo: heroLoop('THE CAT.mp4'),
    poster: heroPoster('THE CAT.mp4'),
    thumbnail: heroPoster('THE CAT.mp4'),
    synopsis:
      'A surreal vignette where feline grace meets human longing — playful, strange, and unexpectedly tender.',
    visualNarrative: [
      {
        text: 'Whiskers cut through golden light. The ordinary becomes mythic in a single unbroken gaze.',
        image: gallery[1],
      },
      {
        text: 'Play turns to poetry. The cat moves through the story like a spirit visiting for one perfect moment.',
        image: heroImage,
      },
    ],
    crew: sharedCrew,
    cast: [{ actor: 'The Cat', character: 'Self', portrait: poster }],
    gallery,
    achievements: [],
    trailer: video('THE CAT.mp4'),
  },
];

export default stories;
