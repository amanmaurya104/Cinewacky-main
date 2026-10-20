import type { Story } from '@/types/story';
import { PROJECT, video, heroLoop, heroPoster, sharedCrew, filmStills } from './shared';

const theCatStills = filmStills('the-cat');

const theCat: Story = {
  slug: 'the-cat',
  status: 'draft',
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
      image: theCatStills[1],
    },
    {
      text: 'Play turns to poetry. The cat moves through the story like a spirit visiting for one perfect moment.',
      image: theCatStills[4],
    },
  ],
  crew: sharedCrew,
  cast: [{ actor: 'The Cat', character: 'Self', portrait: theCatStills[2] }],
  gallery: theCatStills,
  achievements: [],
  trailer: video('THE CAT.mp4'),
};

export default theCat;
