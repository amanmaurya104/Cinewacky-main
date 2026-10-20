import type { Story } from '@/types/story';
import { PROJECT, filmStills, kaliCrew } from './shared';

const kaliImages = filmStills('kali', 20);

const KALI_TRAILER = '/projects/reel-vibe-uncut/kali/trailer.mp4';

const KALI_LOOP = '/projects/reel-vibe-uncut/kali/trailer-loop.mp4';

const KALI_POSTER =
  '/projects/reel-vibe-uncut/kali/trailer-poster.jpg';

const kaliCast = [
  { actor: 'Disha Bhattacharjee', character: 'Deepa / Kali', portrait: kaliImages[0] },
  { actor: 'Ujjayini Chattopadhyay', character: 'Damini', portrait: kaliImages[1] },
  { actor: 'Rujana Thakur', character: 'Lela', portrait: kaliImages[2] },
  { actor: 'Arijeet Ganguly', character: 'Bikash', portrait: kaliImages[3] },
  { actor: 'Manoj Mondal', character: 'Father', portrait: kaliImages[4] },
  { actor: 'Priyanath Mukherjee', character: 'Ram Bhai', portrait: kaliImages[5] },
];

const kaliAchievements = [
  { year: 'Winner', title: 'Cannes Young Directors Award, Silver', description: '2024' },
  { year: 'Winner', title: 'Best Picture & Best Director', description: 'London Global Film Awards, 2024' },
  { year: 'Winner', title: 'Best Director', description: 'Emerging Talent Film Festival, 2024' },
  { year: 'Winner', title: 'Best Short Film', description: 'Blue Bird Film Festival, 2023' },
  { year: 'Winner', title: 'Best Director', description: 'Mumbai Short Film Festival, 2023' },
  { year: 'Official Selection', title: 'Bengaluru International Short Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Best of India, Shorts TV', description: '2024' },
  { year: 'Official Selection', title: 'UK Asian Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'London Indian Film Festival', description: '2023' },
  { year: 'Official Selection', title: 'Indian Panorama Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Jaipur International Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Lift-Off Film Festival', description: '2023' },
  { year: 'Official Selection', title: 'Goa Short Film Festival' },
  { year: 'Official Selection', title: 'South Asian Short Film Festival', description: '2024' },
  { year: 'Official Selection', title: 'Bengal International Short Film Festival', description: '2024' },
  { year: 'Semi-Finalist', title: "Flickers' Rhode Island International Film Festival" },
];

const kali: Story = {
  slug: 'kali',
  status: 'live',
  projectSlug: PROJECT,
  projectVideoFilename: 'kali.mp4',
  title: 'Kali',
  tagline: '',
  heroVideo: KALI_LOOP,
  poster: KALI_POSTER,
  thumbnail: KALI_POSTER,
  synopsis:
    'Corruption festers and innocence shatters, one woman rises — a storm of justice and vengeance entwined. When heroism turns ruthless and humanity hangs by a thread, Kali awakens.',
  visualNarrative: [
    {
      text: 'In the twisting labyrinth of Kolkata, whispers swirl about a ghostly figure — the vigilante known only as "Ma Kali." Cloaked in red and black, she delivers her justice with fists that bruise and bones that break. Appearing only in shadows, her legend is as elusive as it is terrifying. But behind the myth lies a woman with a vendetta — one that the underworld trembles to remember.',
      image: kaliImages[0],
    },
    {
      text: 'Meet Deepa, a young woman trapped between the chains of family duty and an unrelenting thirst for vengeance. As she steps into a high-risk prison visit, fragments of a painful past resurface — a lost twin sister, a promise made in the heart of a brutal slum, and a violent storm that forever altered her destiny. Each piece of the puzzle leads to the unstoppable force that is Ma Kali. But with every step, the walls tighten. Will Deepa\'s father ever see the monster she\'s become? And can society survive the fury of a woman who refuses to be controlled?',
      image: kaliImages[1],
    },
    {
      text: 'Kali is not just a tale of slums, noir shadows, or a vigilante’s revenge. It’s a visceral descent into a world where justice and vengeance blur into a single, dark truth. With a fusion of gripping cinematography, collaborative filmmaking, and a touch of magical realism, the film takes viewers on a winding, emotional journey into the heart of darkness, where moral boundaries dissolve and power demands a heavy price.',
      image: kaliImages[2],
    },
    {
      text: 'Set against the stark, vivid contrasts of modern-day India, Kali is a suspenseful thriller, a meditation on power, identity, and the human condition. This proof-of-concept short immerses audiences in a 36-hour odyssey — one woman’s path to retribution that will leave you on the edge of your seat and questioning everything long after the screen fades to black.',
      image: kaliImages[3],
    },
  ],
  crew: kaliCrew,
  cast: kaliCast,
  gallery: [...kaliImages],
  achievements: kaliAchievements,
  producerNote:
    '"In a world of shadows, the truth will always find its way" Born from a shoestring budget and driven by a collective of fiercely dedicated, up-and-coming filmmakers, Kali emerges as a testament to the power of passion and ingenuity. The crew, many from the very slum where the story unfolds, worked alongside up-and-coming talent from across West Bengal, infusing the film with authenticity and heart. A true labour of love, this film pioneers a fresh approach to superhero storytelling — one that is authentic, rooted in real human experience, and non-exploitative. It goes beyond mere spectacle, translating its raw energy not just on screen but in the very methodology of its creation. Kali reimagines the superhero myth, transforming it into something more profound — more human. It’s a meditation on justice, vengeance, and the blurred lines between dreams and reality, built for cinematic scale yet grounded in an emotional depth only possible through high-end arthouse filmmaking. This film is a bold step toward telling stories that resonate on a deeper level — stories that stir empathy, ignite awareness, and provoke meaningful change. It reflects my vision as a director: to weave social relevance into gripping genre narratives that challenge the status quo. We invite you to step into a world where heroism is born from the ordinary, where the power of will can turn the most fragile into the extraordinary. Kali is a celebration of light, even in the darkest corners, where the fight for justice isn’t just a battle — it’s an awakening.',
  trailer: KALI_TRAILER,
};

export default kali;
