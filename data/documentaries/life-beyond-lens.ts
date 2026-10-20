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
  heroLoop: asset('OPENING 1-loop.mp4'),
  heroPoster: asset('OPENING 1-poster.jpg'),
  video: asset('DOCU TRAILER .mp4'),
  videoPoster: asset('DOCU TRAILER -poster.jpg'),
  videoLabel: 'Trailer',
  stills: [
    asset('OPENING 2.jpg'),
    asset('OPENING 3.jpg'),
    asset('OPENING 4.jpg'),
    asset('OPENING 5.jpg'),
  ],
  credits: [],
  awards: [],
  projectSlug: LBL,
  projectTitle: 'Life Beyond Lens',
};

export default lifeBeyondLens;
