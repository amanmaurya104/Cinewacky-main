import type { Story } from '@/types/story';
import { PROJECT, video, heroLoop, heroPoster } from './shared';

const moonlightImageFiles = [
  'Sequence 03.00_23_03_06.Still018.jpg',
  'Sequence 03.00_23_08_05.Still019.jpg',
  'Sequence 03.00_23_19_07.Still020.jpg',
  'Sequence 03.00_23_26_13.Still021.jpg',
  'Sequence 03.00_23_44_14.Still022.jpg',
  'Sequence 03.00_24_59_09.Still023.jpg',
  'Sequence 03.00_25_16_17.Still017.jpg',
  'Sequence 03.00_25_19_13.Still024.jpg',
  'Sequence 03.00_31_56_07.Still025.jpg',
  'Sequence 03.00_32_42_03.Still026.jpg',
  'Sequence 03.00_35_58_14.Still027.jpg',
  'Sequence 03.00_36_00_01.Still028.jpg',
  'Sequence 03.00_36_15_07.Still029.jpg',
  'Sequence 03.00_36_34_03.Still030.jpg',
  'Sequence 03.00_36_40_15.Still031.jpg',
  'Sequence 03.00_40_32_18.Still032.jpg',
] as const;

function moonlightImage(filename: string): string {
  return `/projects/reel-vibe-uncut/moonlight/${encodeURIComponent(filename)}`;
}

const moonlightImages = moonlightImageFiles.map(moonlightImage);

const moonlightDream: Story = {
  slug: 'moonlight-dream',
  status: 'live',
  projectSlug: PROJECT,
  theme: 'moonlight',
  galleryLayout: 'arc',
  title: 'Moonlight Dreams',
  tagline: 'Fiction is the art of giving form to imagination and soul to emotion.',
  heroVideo: heroLoop('MOONLIGHT DREAM.mp4'),
  poster: heroPoster('MOONLIGHT DREAM.mp4'),
  thumbnail: heroPoster('MOONLIGHT DREAM.mp4'),
  synopsis:
    'It creates worlds beyond reality, yet speaks intimately to the human heart. Within every frame lives a universe of dreams, desires, and untold truths. Stories become echoes of emotions that transcend time and boundaries. We craft narratives that are not simply seen, but deeply experienced. For often, the unreal reveals the most profound realities of life.',
  visualNarrative: [
    {
      text: "Moonlight Dreams unfolds as a powerful character study, weaving together the tangled threads of sisterhood, defiance, and the crushing weight of societal misogyny in the heart of India's Sundarban Delta.",
      image: moonlightImages[0],
    },
    {
      text: 'A year has passed since Krishna was led away from her village, her hands trembling beneath the weight of crimson wedding silk, married off to a man twice her age—a stranger she had never met. As the drums echoed and the scent of jasmine lingered in the air, her silent tears went unnoticed by all but her younger sister, Tara. Guests feasted, their mother beamed with pride, and the in-laws circled like spectators at a spectacle. But Tara saw. She saw everything.',
      image: moonlightImages[2],
      time: 'then',
    },
    {
      text: "Now, on the morning of Tara's own wedding, as she prepares to walk the same path of silent surrender, Krishna returns. Pregnant and uninvited, she arrives against the wishes of her in-laws, her fiery spirit dimmed but not extinguished. Tensions ignite as Krishna confronts her mother, the unspoken grief and anger of the past year boiling to the surface. And yet, there is tenderness too—an aching reunion with her sisters, Tumpa still a child, all three bound by a shared history of dreams once vibrant and now left to wither.",
      image: moonlightImages[4],
      time: 'now',
    },
    {
      text: "Their father had been a violent, drunken man, a force of terror who left behind scars long after his death. When he took his own life three years prior, the family spiraled into crushing debt. Their mother, burdened by grief and survival, made the desperate choice to barter her daughters' futures in exchange for security—marriages arranged not from hope but fear. Krishna at seventeen. Tara at fourteen. And young Tumpa, only ten, watching helplessly as her sisters' innocence was traded for survival.",
      image: moonlightImages[6],
      time: 'then',
    },
    {
      text: 'As the day unfolds, memories resurface in fragments: stolen moments of laughter under the banyan tree, whispered stories of far-off places they once dreamed of reaching, the quiet ache of love twisted into control. Through these flashbacks, the village itself becomes a living character—a microcosm of a world where patriarchy crushes and female resilience refuses to be silenced.',
      image: moonlightImages[8],
      time: 'then',
    },
    {
      text: "Now, with her own fate looming, Tara watches her sister's defiance with a mix of awe and fear. Krishna stands on a precipice, caught between submission and the spark of rebellion. Together, the sisters must face a choice: to remain bound by the chains of tradition or to reclaim their voices, daring to imagine a different future.",
      image: moonlightImages[11],
      time: 'now',
    },
    {
      text: 'Moonlight Dreams is not just a story of personal struggle—it is a mirror held up to the quiet battles fought by women across the world, a testament to the enduring power of sisterhood and hope.',
      image: moonlightImages[14],
    },
  ],
  crew: [
    { role: 'Writer / Director', name: 'JIJO' },
    { role: 'Producer', name: 'Subhajit Prasad' },
    { role: 'Sound Design', name: 'Sukanya Bhawal' },
    { role: 'Line Producer', name: 'Sanglap Barman' },
    { role: 'Music Composition', name: 'Soumik Datta' },
    { role: 'Color Grading', name: 'Vlad Barin' },
    { role: 'Editor', name: 'Subhajit Prasad' },
    { role: 'Director of Photography', name: 'JIJO' },
  ],
  cast: [
    { actor: 'Priyanka Roy', character: 'Tara', portrait: moonlightImages[1] },
    { actor: 'Ratna Chakraborty', character: 'Krishna', portrait: moonlightImages[3] },
    { actor: 'Soma Chakraborty', character: 'Mother', portrait: moonlightImages[5] },
    { actor: 'Shreya Moulick', character: 'Tumpa', portrait: moonlightImages[7] },
  ],
  gallery: [...moonlightImages],
  achievements: [
    { year: '2024', title: 'Official Selection', description: 'Cinematic Shorts Showcase' },
  ],
  producerNote:
    'Moonlight Dream was conceived as a visual poem — less plot, more atmosphere. Every choice serves the feeling of half-sleep.',
  trailer: video('MOONLIGHT DREAM.mp4'),
};

export default moonlightDream;
