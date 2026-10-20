import type { Documentary } from '@/types/documentary';
import { LBL, asset } from './shared';

// The two pieces of tour artwork, served from where they were delivered. Both
// are small enough (59-187KB) that next/image does all the work.
function korAsset(filename: string): string {
  return `/projects/life-beyond-lens/king-of-the-road/${encodeURIComponent(filename)}`;
}

const kingOfTheRoad: Documentary = {
  id: 'king-of-the-road',
  slug: 'king-of-the-road',
  status: 'live',
  theme: 'road',
  title: 'King of the Road',
  // Every fact here comes from King_of_the_Road_Profile.docx. Its accuracy
  // checklist is still open: the producer designation for Max Mueller
  // Kolkata and the "In association with" wording are unconfirmed, and the
  // tour poster gives the span as Feb 5 – March 1 where the profile gives
  // 5–23 February. The profile's dates are used.
  tagline: 'Wim Wenders — the India journey and the Kolkata chapter',
  seoTitle: 'King of the Road: Wim Wenders in India & Kolkata | Documentary',
  seoDescription:
    'Explore our documentary on Wim Wenders’ first India visit, the King of the Road retrospective, and his special Kolkata chapter.',
  director: 'Wim Wenders',
  location: 'Kolkata',

  road: {
    kicker: 'Wim Wenders',
    subtitle: 'The India Journey & Kolkata Chapter',
    counts: ['18 films', '5 cities', 'A first visit to India'],
    heroPlate: { src: asset('OPENING 5.jpg'), caption: 'From the documentary' },

    lede: 'Cinema is a way of travelling without leaving the frame — and for Wim Wenders, the road has always been one of cinema’s most powerful spaces.',
    overture: [
      'Across a career spanning more than five decades, Wenders has explored movement, memory, solitude, landscape, identity, and the quiet poetry of everyday life. His films often turn journeys into encounters and ordinary spaces into emotionally charged cinematic landscapes.',
      'King of the Road — The India Tour marked a significant new chapter in Wenders’ artistic journey: his first visit to India in February 2025. Presented by the Film Heritage Foundation, in association with the Wim Wenders Stiftung and in collaboration with Goethe-Institut / Max Mueller Bhavan, the travelling retrospective brought 18 films to five Indian cities between 5 and 23 February 2025.',
      'Through our visual documentation and editorial treatment, King of the Road becomes a record of a cultural encounter: a filmmaker’s journey meeting the creative soul of Kolkata, and a moment in which cinema creates a bridge between different histories, geographies, and ways of seeing.',
    ],

    routeTitle: 'The India Tour',
    routeSpan: '5–23 February 2025',
    stops: [
      { city: 'Mumbai' },
      { city: 'Thiruvananthapuram' },
      { city: 'Kolkata', dates: '16–19 Feb', here: true },
      { city: 'New Delhi' },
      { city: 'Pune' },
    ],

    life: {
      eyebrow: 'Life and cinematic journey',
      title: 'A road that began in Düsseldorf',
      paragraphs: [
        'Wim Wenders was born in Düsseldorf, Germany, in 1945 and became internationally recognised as one of the major figures associated with the New German Cinema of the 1970s. His creative work extends across directing, screenwriting, producing, photography, and visual art.',
        'Rather than relying only on conventional plot mechanics, Wenders frequently builds his films around atmosphere, movement, observation, and the emotional relationship between people and places.',
      ],
    },
    filmography: [
      { title: 'Alice in the Cities', year: '1974' },
      { title: 'The Wrong Move', year: '1975' },
      { title: 'Kings of the Road', year: '1976' },
      { title: 'The American Friend', year: '1977' },
      { title: 'Paris, Texas', year: '1984' },
      { title: 'Tokyo-Ga', year: '1985' },
      { title: 'Wings of Desire', year: '1987' },
      { title: 'Buena Vista Social Club', year: '1999' },
      { title: 'Pina', year: '2011' },
      { title: 'Perfect Days', year: '2023' },
    ],
    filmographyNote:
      'Selected works. Together they show a continuing interest in the road movie, the documentary gaze, memory, music, architecture, and the human experience of time.',
    lifeCoda:
      'Landscapes are not merely backgrounds; they can function as emotional spaces. Journeys are not only geographical movements; they can also represent displacement, discovery, uncertainty, and transformation.',

    tour: {
      eyebrow: 'The India Tour',
      title: 'Eighteen films, five cities, one first visit',
      paragraphs: [
        'The India Tour was conceived as a travelling retrospective dedicated to Wenders’ work across more than half a century. The programme presented 18 films — features, short films, and documentaries — in Mumbai, Thiruvananthapuram, Kolkata, New Delhi, and Pune, with Wenders attending screenings and taking part in public conversations and engagements with film communities.',
        'The official event description records that this was Wenders’ first visit to India. In the Goethe-Institut’s published introduction, Wenders reflected on India’s abundance of landscapes and images and on the central place of cinema in the country’s cultural life. His statement also acknowledged the Film Heritage Foundation’s work in preserving, restoring, and bringing Indian film heritage to contemporary audiences.',
      ],
    },
    tourLevels: [
      {
        title: 'A retrospective',
        note: 'Of Wenders’ own cinema, across more than half a century.',
      },
      {
        title: 'An exchange',
        note: 'With India’s film culture — screenings joined to conversations, masterclasses, and encounters with audiences, students, and filmmakers.',
      },
    ],

    kolkata: {
      eyebrow: 'The Kolkata chapter',
      title: 'Four days in a city of cinema',
      paragraphs: [
        'Kolkata hosted the India Tour from 16 to 19 February 2025, with screenings at Nandan and Basusree. The city chapter also included public events such as a masterclass with Wim Wenders and related conversations involving Donata Wenders.',
        'Kolkata’s importance in this context comes from its long-standing cultural relationship with cinema. The city’s creative ecosystem has been shaped by filmmakers, writers, theatre practitioners, musicians, photographers, and visual artists. Its film culture has historically encouraged close viewing, critical discussion, archival interest, and the exchange of ideas across generations.',
        'The Kolkata encounter can therefore be understood as more than a stop on a travelling programme. It brought Wenders’ work into contact with a city whose cultural identity has been deeply influenced by cinema and artistic debate.',
      ],
    },
    kolkataFacts: [
      { label: 'Dates', value: '16–19 February 2025' },
      { label: 'Screenings', value: 'Nandan and Basusree' },
      { label: 'Programme', value: '16 of the 18 films' },
      { label: 'Public events', value: 'A masterclass with Wim Wenders; conversations with Donata Wenders' },
    ],

    perspective: {
      eyebrow: 'Editorial perspective',
      title: 'Three ideas in one frame',
      paragraphs: [
        'Our documentary approaches the India visit through the language of observation and cultural documentation. It connects the public event with the wider story of Wenders’ artistic life, while giving special attention to Kolkata as a creative environment. The purpose is not simply to list screenings or reproduce an event report, but to place the encounter within a broader reflection on cinema, movement, memory, and artistic exchange.',
      ],
    },
    ideas: [
      {
        title: 'The journey of a filmmaker',
        note: 'Wenders’ artistic life, from the New German Cinema of the 1970s to Perfect Days.',
      },
      {
        title: 'A first India visit',
        note: 'The cultural significance of his first journey to India, in February 2025.',
      },
      {
        title: 'The creative character of Kolkata',
        note: 'A city where cinema is not merely an entertainment form, but a living part of cultural conversation.',
      },
    ],

    artwork: [
      {
        src: korAsset('Wim-Wenders-Poster-1.jpg.jpeg'),
        width: 768,
        height: 1024,
        caption: 'The India Tour — official poster',
      },
      {
        src: korAsset('ww_final-compressed_seite_03-700x423.jpg.jpeg'),
        width: 700,
        height: 423,
        caption: 'The India Tour — campaign artwork',
      },
    ],

    associations: [
      { role: 'In association with', name: 'Film Heritage Foundation' },
      { role: 'In association with', name: 'Wim Wenders Stiftung (Wim Wenders Foundation)' },
      { role: 'In collaboration with', name: 'Goethe-Institut / Max Mueller Bhavan Kolkata' },
      { role: 'Produced by', name: 'Max Mueller Kolkata' },
    ],
    crew: [
      { role: 'Project Coordinator', name: 'Sharmitha' },
      { role: 'Camera', name: 'Basab Mallick' },
      { role: 'Editor', name: 'Subhajit Prasad' },
      { role: 'Technical Post-Production Support', name: 'Cinewacky Production' },
      { role: 'Production Coordinator', name: 'Moinak Guho' },
      { role: 'Assistant Editor', name: 'Snigdha Prasad' },
    ],

    card: 'King of the Road explores the life and cinematic vision of Wim Wenders, his first visit to India in February 2025, and the special cultural encounter that unfolded in Kolkata — cinema as a language of movement, memory, and creative exchange.',
  },

  colophon: 'King of the Road — a Cinewacky documentary record. Kolkata, February 2025.',
  projectSlug: LBL,
  projectTitle: 'Life Beyond Lens',
};

export default kingOfTheRoad;
