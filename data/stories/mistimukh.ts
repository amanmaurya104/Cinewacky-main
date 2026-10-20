import type { Story } from '@/types/story';
import { PROJECT, video, heroLoop, heroPoster, sharedCrew, filmStills } from './shared';

const mistimukhStills = filmStills('mistimukh');

const mistimukh: Story = {
  slug: 'mistimukh',
  status: 'live',
  projectSlug: PROJECT,
  title: 'Mistimukh',
  tagline: 'Faces behind the veil.',
  heroVideo: heroLoop('mistimukh.mp4'),
  poster: heroPoster('mistimukh.mp4'),
  thumbnail: heroPoster('mistimukh.mp4'),
  synopsis:
    'An intimate study of expression and concealment — identity rendered in glances, gestures, and the space between words.',
  visualNarrative: [
    {
      text: 'The camera lingers on faces that refuse to be read at a glance. Every look carries a second meaning.',
      image: mistimukhStills[1],
    },
    {
      text: 'Texture and silence build a portrait that feels closer to sculpture than cinema.',
      image: mistimukhStills[4],
    },
  ],
  crew: sharedCrew,
  cast: [{ actor: 'Ensemble', character: 'Mistimukh', portrait: mistimukhStills[2] }],
  gallery: mistimukhStills,
  achievements: [{ year: '2023', title: 'Portrait Study', description: 'Independent Short Form' }],
  producerNote: 'Mistimukh asks the audience to sit with ambiguity — beauty without easy answers.',
  trailer: video('mistimukh.mp4'),
};

export default mistimukh;
