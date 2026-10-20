import type { Story } from '@/types/story';
import { PROJECT, video, heroLoop, heroPoster, sharedCrew, filmStills } from './shared';

const trailerForFictionStills = filmStills('trailer-for-fiction');

const trailerForFiction: Story = {
  slug: 'trailer-for-fiction',
  status: 'draft',
  projectSlug: PROJECT,
  title: 'Trailer For Fiction',
  tagline: 'Stories that never were — until now.',
  heroVideo: heroLoop('trailer-for-fiction.mp4'),
  poster: heroPoster('trailer-for-fiction.mp4'),
  thumbnail: heroPoster('trailer-for-fiction.mp4'),
  synopsis:
    'A meta-cinematic trailer that blurs the line between imagination and reality — fiction as a living, breathing force.',
  visualNarrative: [
    {
      text: 'Titles flicker. Worlds collide. The trailer becomes its own narrative — a promise of stories yet unwritten.',
      image: trailerForFictionStills[1],
    },
    {
      text: 'Every cut teases a universe. The audience leaves hungry for a film that exists only in possibility.',
      image: trailerForFictionStills[4],
    },
  ],
  crew: sharedCrew,
  cast: [],
  gallery: trailerForFictionStills,
  achievements: [],
  trailer: video('trailer-for-fiction.mp4'),
};

export default trailerForFiction;
