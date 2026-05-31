import projects from '@/data/projects';

export type ShowcaseTitleParts = {
  lead: string;
  bold: string;
  hero: string;
};

export type ShowcaseScrollItem = {
  id: number;
  video: string;
  fallbackVideo?: string;
  category: string;
  title: string;
  titleParts: ShowcaseTitleParts;
  slug?: string;
  width: number;
  height: number;
  left: string;
  top: string;
};

/** Default homepage state — always start here on refresh */
export const DEFAULT_PROJECT_SLUG = 'life-beyond-lens';
export const INITIAL_ACTIVE_INDEX = 0;

/** Scroll order — matches showcase videos/tiles (1 → 11) */
export const SHOWCASE_SLUG_ORDER = [
  'life-beyond-lens',
  'brand-box',
  'web-stream-tales',
  'reel-vibe-uncut',
  'corporate-canvas',
  'event-echoes',
  'the-sonic-frame',
  'the-next-chapter',
  'core-realm-vision',
  'the-essence-we-build',
  'life-beyond-lens',
] as const;

const titlePartsBySlug: Record<string, ShowcaseTitleParts> = {
  'life-beyond-lens': { lead: 'Life Beyond', bold: 'Lens', hero: '' },
  'brand-box': { lead: 'Brand', bold: 'Box', hero: '' },
  'web-stream-tales': { lead: 'Web Stream', bold: 'Tales', hero: '' },
  'reel-vibe-uncut': { lead: 'Reel Vibe', bold: 'Uncut', hero: '' },
  'corporate-canvas': { lead: 'Corporate', bold: 'Canvas', hero: '' },
  'event-echoes': { lead: 'Event', bold: 'Echoes', hero: '' },
  'the-sonic-frame': { lead: 'The Sonic', bold: 'Frame', hero: '' },
  'the-next-chapter': { lead: 'The Next', bold: 'Chapter', hero: '' },
  'core-realm-vision': { lead: 'Core Realm', bold: 'Vision', hero: '' },
  'the-essence-we-build': { lead: 'The essence', bold: 'we', hero: 'build' },
};

/** Floating video positions (wireframe) — one slot per scroll step */
const layout: Omit<
  ShowcaseScrollItem,
  'video' | 'fallbackVideo' | 'category' | 'title' | 'titleParts' | 'slug'
>[] = [
  { id: 1, width: 415, height: 265, left: '38%', top: '4%' },
  { id: 2, width: 295, height: 455, left: '2%', top: '48%' },
  { id: 3, width: 355, height: 348, left: '68%', top: '26%' },
  { id: 4, width: 283, height: 414, left: '2%', top: '4%' },
  { id: 5, width: 419, height: 260, left: '68%', top: '62%' },
  { id: 6, width: 355, height: 346, left: '4%', top: '28%' },
  { id: 7, width: 393, height: 285, left: '20%', top: '3%' },
  { id: 8, width: 269, height: 466, left: '22%', top: '50%' },
  { id: 9, width: 530, height: 241, left: '50%', top: '36%' },
  { id: 10, width: 250, height: 436, left: '78%', top: '2%' },
  { id: 11, width: 234, height: 478, left: '58%', top: '48%' },
];

const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export const showcaseScrollItems: ShowcaseScrollItem[] = SHOWCASE_SLUG_ORDER.map(
  (slug, i) => {
    const project = projectBySlug[slug];
    const slot = layout[i];
    const titleParts = titlePartsBySlug[slug] ?? {
      lead: project.title,
      bold: '',
      hero: '',
    };

    return {
      ...slot,
      id: i + 1,
      video: `/showcase/${i + 1}.mp4`,
      fallbackVideo: project.previewVideo,
      category: project.category,
      title: project.title,
      titleParts,
      slug: project.slug,
    };
  }
);

export const SHOWCASE_SECTION_COUNT = showcaseScrollItems.length;
export const SHOWCASE_LOOP_COUNT = 3;
