import { Project } from '@/types/project';

// The life-beyond-lens trailer tile (commented out in its media list below)
// opens this documentary. Uncomment both together to bring the tile back.
// const DOC = 'life-beyond-lens';

const projects: Project[] = [
  {
    id: 1,
    title: 'Life Beyond Lens',
    slug: 'life-beyond-lens',
    category: 'Documentary',
    tagline: 'Exploring life through the lens',
    description: 'A cinematic exploration of the lives shaped by their cameras.',
    year: '2024',
    duration: '12:34',
    client: 'Independent',
    layout: 'mosaic',
    ready: true,
    // Files under public/showcase/life-beyond-lens/. `title` is what the tile
    // shows — rename freely, the filename is only the asset lookup.
    // `feature: true` puts a tile in the tall left column; the rest fill the
    // right stack. Order within each column follows this list.
    media: [
      {
        file: 'OPENING 2.jpg',
        title: 'CRAFT COUNCIL OF INDIA',
        feature: true,
        documentary: 'craft-council-of-india',
      },
      {
        file: 'OPENING 1.mp4',
        title: 'BIRD OF DUSK',
        // caption: 'Cinewacky / India',
        feature: true,
        documentary: 'bird-of-dusk',
      },
      { file: 'OPENING 3.jpg', title: 'INTO THE CHINA TOWN', documentary: 'test-of-china' },
      {
        file: 'NIVEDITA.jpg',
        title: 'MARGARET TO NIVEDITA',
        documentary: 'margaret-to-nivedita',
      },
      // { file: 'DOCU TRAILER .mp4', title: 'OUR DOCUMENTARY TRAILER', documentary: DOC },
      {
        file: 'OPENING 5.jpg',
        title: 'KING OF THE ROAD: Wim Wenders',
        documentary: 'king-of-the-road',
      },
    ],
  },
  {
    id: 2,
    title: 'Brand Box',
    slug: 'brand-box',
    category: 'Commercial',
    tagline: 'Packaging ideas into motion',
    description: 'High-energy brand films and identity pieces.',
    year: '2023',
    client: 'BrandCo',
  },
  {
    id: 3,
    title: 'Web Stream Tales',
    slug: 'web-stream-tales',
    category: 'Web',
    tagline: 'Stories built for the stream',
    description: 'Long-form content for modern platforms.',
    year: '2025',
    layout: 'mosaic',
    ready: true,
    // Files under public/showcase/web-stream-tales/.
    media: [
      {
        file: 'TUNING 2 YOU.jpg',
        // A Baul singer with his dotara: the same musician as the landscape
        // cover, cut from gallery still 513825826 (Bengal, beneath a banyan).
        portraitFile: 'TUNING 2 YOU-portrait.jpg',
        title: 'TUNING 2 YOU: Lost Musicians of India',
        feature: true,
        documentary: 'tuning-2-you',
      },
    ],
  },
  {
    id: 4,
    title: 'Reel Vibe Uncut',
    slug: 'reel-vibe-uncut',
    category: '',
    tagline: '',
    description: 'A cinematic exploration of the lives shaped by their cameras.',
    year: '',
    ready: true,
    videos: [
      'trailer for fiction.mp4',
      'KALI .mp4',
      'MOONLIGHT DREAM.mp4',
      'DARK RISING.mp4',
      'MISTIMUKH.mp4',
      'THE CAT.mp4',
    ],
  },
  {
    id: 5,
    title: 'Corporate Canvas',
    slug: 'corporate-canvas',
    category: 'Corporate',
    tagline: 'Elegant corporate storytelling',
    description: 'Polished films for corporate audiences.',
    year: '2021',
  },
  {
    id: 6,
    title: 'Event Echoes',
    slug: 'event-echoes',
    category: 'Live',
    tagline: 'Capturing live moments',
    description: 'Event coverage with cinematic flair.',
    year: '2020',
  },
  {
    id: 7,
    title: 'The Sonic Frame',
    slug: 'the-sonic-frame',
    category: 'Music',
    tagline: 'Where sound meets vision',
    description: 'Music-driven visual experiences.',
    year: '2024',
  },
  {
    id: 8,
    title: 'The Next Chapter',
    slug: 'the-next-chapter',
    category: 'Documentary',
    tagline: 'Turning pages into frames',
    description: 'Personal stories told with cinematic depth.',
    year: '2023',
  },
  {
    id: 9,
    title: 'Core Realm Vision',
    slug: 'core-realm-vision',
    category: 'Art',
    tagline: 'Imagery with intention',
    description: 'Art films exploring conceptual realms.',
    year: '2022',
  },
  {
    id: 10,
    title: 'The Essence We Build',
    slug: 'the-essence-we-build',
    category: 'Brand',
    tagline: 'Building essence through visuals',
    description: 'Brand films that define identity.',
    year: '2025',
  },
  {
    id: 11,
    title: 'The Path Walked',
    slug: 'the-path-walked',
    category: 'Documentary',
    tagline: 'The path walked',
    description: 'The path walked',
    year: '2022',
  },
  {
    id: 12,
    title: 'Connect With Us',
    slug: 'connect-with-us',
    category: 'Documentary',
    tagline: 'Connect with us',
    description: 'Connect with us',
    year: '2022',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Where a link to this project should go: its page once `ready`, else /maintenance. */
export function getProjectHref(slug: string | undefined): string {
  const project = slug ? getProjectBySlug(slug) : undefined;
  return project?.ready ? `/project/${project.slug}` : '/maintenance';
}

export default projects;
