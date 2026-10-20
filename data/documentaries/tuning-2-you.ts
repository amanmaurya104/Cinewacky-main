import type { Documentary } from '@/types/documentary';

// The Tuning 2 You stills, served from where they were delivered. They are
// 2048px JPEGs of 80-560KB, so next/image does the resizing. Public media is
// cached as immutable (next.config.ts): a replacement still needs a new name.
function wst(filename: string): string {
  return `/projects/web-stream-tales/${encodeURIComponent(filename)}`;
}

const tuning2You: Documentary = {
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
      src: wst('photo-10.jpg'),
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
        src: wst('photo-07.jpg'),
        caption: 'Bauls beneath a banyan',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-02.jpg'),
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
      src: wst('photo-06.jpg'),
      width: 2048,
      height: 1365,
    },

    episodes: [
      {
        place: 'Bengal',
        locale: 'Kolkata and the Baul villages',
        text: 'Our journey begins in the vibrant heart of Bengal, the City of Joy—Kolkata. Guided by the soulful Sarod maestro Soumik, we delve into the rich tapestry of his musical heritage. As Soumik assembles his ensemble, their path winds away from the bustling city into the serene villages, where the haunting melodies of the Bauls, the wandering minstrels of Bengal, echo through time. Together, they uncover stories and songs that bridge generations, weaving a soulful symphony of tradition and discovery.',
        plate: {
          src: wst('photo-19.jpg'),
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
          src: wst('photo-41.jpg'),
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
      src: wst('photo-50.jpg'),
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
        src: wst('photo-26.jpg'),
        caption: 'Setting up a slider in the sand',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-42.jpg'),
        caption: 'The drone',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-32.jpg'),
        caption: 'Two cameras on one performer',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-22.jpg'),
        caption: 'Sound, walking with an elder',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-49.jpg'),
        caption: 'At the long lens',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-17.jpg'),
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
        src: wst('photo-12.jpg'),
        caption: 'Lost in the song',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-23.jpg'),
        caption: 'Tuning up',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-30.jpg'),
        caption: 'The elder on the parapet',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-35.jpg'),
        caption: 'Harmonium, drum and voice',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-01.jpg'),
        caption: 'Two frame drums',
        width: 2048,
        height: 1365,
      },
      {
        src: wst('photo-28.jpg'),
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
        poster: wst('photo-34.jpg'),
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
    { src: wst('photo-01.jpg'), caption: 'A drummer in white holding two frame drums outside a whitewashed building', width: 2048, height: 1365 }, // 01
    { src: wst('photo-02.jpg'), caption: 'Qawwali singers at their harmoniums before a packed crowd', width: 2048, height: 1365 }, // 02
    { src: wst('photo-03.jpg'), caption: 'A village gathers in front of the crew’s car', width: 2048, height: 1365 }, // 03
    { src: wst('photo-04.jpg'), caption: 'Families seated on the floor, watching a performance', width: 1920, height: 1080 }, // 04
    { src: wst('photo-05.jpg'), caption: 'The crew at dinner after a day’s shoot', width: 1365, height: 2048 }, // 05
    { src: wst('photo-06.jpg'), caption: 'A crowd seated in a lamp-lit, gilded hall', width: 2048, height: 1365 }, // 06
    { src: wst('photo-07.jpg'), caption: 'Bauls playing beneath a banyan tree, one of them dancing', width: 2048, height: 1365 }, // 07
    { src: wst('photo-08.jpg'), caption: 'An elder smoking in the half-dark', width: 2048, height: 1365 }, // 08
    { src: wst('photo-09.jpg'), caption: 'The crew talking it through in a field', width: 2048, height: 1367 }, // 09
    { src: wst('photo-10.jpg'), caption: 'A sarod and a dotara in conversation on a striped mat', width: 2048, height: 1365 }, // 10
    { src: wst('photo-11.jpg'), caption: 'The crew stopping for tea in a village lane', width: 2048, height: 1365 }, // 11
    { src: wst('photo-12.jpg'), caption: 'A Baul in saffron, lost in the song', width: 2048, height: 1365 }, // 12
    { src: wst('photo-13.jpg'), caption: 'Four of the crew among the trees', width: 2048, height: 1367 }, // 13
    { src: wst('photo-14.jpg'), caption: 'The crew framing a shot inside a stone archway', width: 2048, height: 1365 }, // 14
    { src: wst('photo-15.jpg'), caption: 'Heaps of red roses at a shrine-side stall', width: 2048, height: 1365 }, // 15
    { src: wst('photo-16.jpg'), caption: 'Women carrying loads across a field at dusk', width: 2048, height: 1152 }, // 16
    { src: wst('photo-17.jpg'), caption: 'A camera operator walking toward the camel carts', width: 2048, height: 1367 }, // 17
    { src: wst('photo-18.jpg'), caption: 'Cards, drives and cameras: the evening data wrangle', width: 2048, height: 1152 }, // 18
    { src: wst('photo-19.jpg'), caption: 'A Baul singer with his dotara beneath a banyan', width: 2048, height: 1365 }, // 19
    { src: wst('photo-20.jpg'), caption: 'A night-time selfie with the musicians', width: 2048, height: 1365 }, // 20
    { src: wst('photo-21.jpg'), caption: 'Three children in a doorway under hand-painted Bengali lettering', width: 2048, height: 1365 }, // 21
    { src: wst('photo-22.jpg'), caption: 'The sound recordist walking with an elder, boom raised', width: 2048, height: 1365 }, // 22
    { src: wst('photo-23.jpg'), caption: 'A musician tuning a carved, many-pegged string instrument', width: 2048, height: 1365 }, // 23
    { src: wst('photo-24.jpg'), caption: 'Hands on a harmonium, in black and white', width: 2048, height: 1149 }, // 24
    { src: wst('photo-25.jpg'), caption: 'A girl carrying a young goat', width: 2048, height: 1365 }, // 25
    { src: wst('photo-26.jpg'), caption: 'Setting up a slider in the sand', width: 2048, height: 1365 }, // 26
    { src: wst('photo-27.jpg'), caption: 'On the road, inside the car', width: 2048, height: 1365 }, // 27
    { src: wst('photo-28.jpg'), caption: 'Two musicians talking at night, one in a patchwork robe', width: 2048, height: 1365 }, // 28
    { src: wst('photo-29.jpg'), caption: 'Walking through a shrine-side bazaar', width: 2048, height: 1365 }, // 29
    { src: wst('photo-30.jpg'), caption: 'An elder in a saffron turban on a stone parapet', width: 2048, height: 1365 }, // 30
    { src: wst('photo-31.jpg'), caption: 'Cameras on the table between set-ups', width: 2048, height: 1367 }, // 31
    { src: wst('photo-32.jpg'), caption: 'Filming a woman in red on a mud-walled ledge', width: 2048, height: 1365 }, // 32
    { src: wst('photo-33.jpg'), caption: 'Villagers outside a shopfront with Bengali signs', width: 2048, height: 1365 }, // 33
    { src: wst('photo-34.jpg'), caption: 'Two Bauls with their instruments in a grove', width: 2048, height: 1152 }, // 34
    { src: wst('photo-35.jpg'), caption: 'An elder at the harmonium, with drum and voice beside him', width: 2048, height: 1365 }, // 35
    { src: wst('photo-36.jpg'), caption: 'A night market, seen from the crew’s side', width: 2048, height: 1365 }, // 36
    { src: wst('photo-37.jpg'), caption: 'Filming beneath a great old tree', width: 2048, height: 1365 }, // 37
    { src: wst('photo-38.jpg'), caption: 'Crew and hosts along a veranda', width: 2048, height: 1365 }, // 38
    { src: wst('photo-39.jpg'), caption: 'A family in the doorway of a stone house', width: 2048, height: 1365 }, // 39
    { src: wst('photo-40.jpg'), caption: 'Touch-ups beside the car', width: 2048, height: 1365 }, // 40
    { src: wst('photo-41.jpg'), caption: 'Women in bright veils seated together', width: 2048, height: 1365 }, // 41
    { src: wst('photo-42.jpg'), caption: 'The drone, in flight', width: 2048, height: 1365 }, // 42
    { src: wst('photo-43.jpg'), caption: 'Women carrying pots on their heads', width: 2048, height: 1365 }, // 43
    { src: wst('photo-44.jpg'), caption: 'A young boy looking up', width: 2048, height: 1365 }, // 44
    { src: wst('photo-45.jpg'), caption: 'Filming a singer in a saffron turban', width: 2048, height: 1365 }, // 45
    { src: wst('photo-46.jpg'), caption: 'The drone pilot among villagers and Bauls', width: 2048, height: 1152 }, // 46
    { src: wst('photo-47.jpg'), caption: 'Showing the drone footage to an elder', width: 2048, height: 1365 }, // 47
    { src: wst('photo-48.jpg'), caption: 'A crew member writing up notes', width: 2048, height: 1367 }, // 48
    { src: wst('photo-49.jpg'), caption: 'A cinematographer at a long lens', width: 2048, height: 1365 }, // 49
    { src: wst('photo-50.jpg'), caption: 'From the air: a village lined up along a hillside path', width: 2048, height: 1536 }, // 50
    { src: wst('photo-51.jpg'), caption: 'Reviewing footage by laptop light, at night', width: 2048, height: 1365 }, // 51
    { src: wst('photo-52.jpg'), caption: 'Looking up at a painted palace ceiling', width: 2048, height: 1367 }, // 52
    { src: wst('photo-53.jpg'), caption: 'A domed rooftop pavilion against the sky', width: 2048, height: 1365 }, // 53
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
};

export default tuning2You;
