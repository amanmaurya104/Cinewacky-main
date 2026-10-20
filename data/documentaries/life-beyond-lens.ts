import type { Documentary } from '@/types/documentary';
import { LBL, asset } from './shared';

const lifeBeyondLens: Documentary = {
  id: 'life-beyond-lens',
  slug: LBL,
  // Draft until the placeholder copy below is replaced.
  status: 'draft',
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
  heroLoop: asset('bird-of-dusk-loop.mp4'),
  heroPoster: asset('bird-of-dusk-poster.jpg'),
  video: asset('life-beyond-lens-trailer.mp4'),
  videoPoster: asset('life-beyond-lens-trailer-poster.jpg'),
  videoLabel: 'Trailer',
  stills: [
    asset('craft-council-of-india.jpg'),
    asset('test-of-china.jpg'),
    asset('margaret-to-nivedita-churchyard.jpg'),
    asset('king-of-the-road.jpg'),
  ],
  credits: [],
  awards: [],
  projectSlug: LBL,
  projectTitle: 'Life Beyond Lens',
};

export default lifeBeyondLens;
