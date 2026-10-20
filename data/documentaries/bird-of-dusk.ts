import type { Documentary } from '@/types/documentary';
import { LBL } from './shared';

// The 29 stills, in the order scripts/build-bird-of-dusk.mjs wrote them.
const bodPlates = Array.from(
  { length: 29 },
  (_, i) => `/documentaries/bird-of-dusk/plates/plate-${String(i + 1).padStart(2, '0')}.jpg`,
);

// The delivered trailer, remuxed with its index at the front so playback can
// begin before the whole file arrives. 63MB, so the player only fetches it
// once someone presses play.
const BOD_TRAILER = '/projects/life-beyond-lens/bird-of-dusk/trailer.mp4';

const birdOfDusk: Documentary = {
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
};

export default birdOfDusk;
