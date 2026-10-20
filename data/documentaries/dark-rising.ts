import { showcaseVideoSrc } from '@/lib/mediaPaths';
import type { Documentary } from '@/types/documentary';

// Written by scripts/build-dark-rising.mjs: ten 2.37:1 grabs off the proof of
// concept in timecode order (frame-10 is the title card), and fourteen
// photographs from the Kibera shoot.
function drFrame(n: number): string {
  return `/documentaries/dark-rising/frames/frame-${String(n).padStart(2, '0')}.jpg`;
}

function drSet(n: number): string {
  return `/documentaries/dark-rising/set/set-${String(n).padStart(2, '0')}.jpg`;
}

const darkRising: Documentary = {
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

  heroLoop: showcaseVideoSrc('reel-vibe-uncut', 'dark-rising-loop.mp4'),
  heroPoster: showcaseVideoSrc('reel-vibe-uncut', 'dark-rising-poster.jpg'),
  // 62MB; the player only fetches it once someone presses play.
  video: showcaseVideoSrc('reel-vibe-uncut', 'dark-rising.mp4'),
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
};

export default darkRising;
