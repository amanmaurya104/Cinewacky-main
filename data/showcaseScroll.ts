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
export const DEFAULT_PROJECT_SLUG = 'reel-vibe-uncut';
export const INITIAL_ACTIVE_INDEX = 0;

/** Scroll order — matches showcase videos/tiles (1 → 11) */
export const SHOWCASE_SLUG_ORDER = [
  'reel-vibe-uncut',
  'the-sonic-frame',
  'web-stream-tales',
  'event-echoes',
  'life-beyond-lens',
  'corporate-canvas',
  'the-next-chapter',
  'brand-box',
  'core-realm-vision',
  'the-path-walked',
  'connect-with-us',
  'the-essence-we-build',
] as const;

// const titlePartsBySlug: Record<string, ShowcaseTitleParts> = {
//   'life-beyond-lens': { lead: 'Life Beyond', bold: 'Lens', hero: '' },
//   'brand-box': { lead: 'Brand', bold: 'Box', hero: '' },
//   'web-stream-tales': { lead: 'Web Stream', bold: 'Tales', hero: '' },
//   'reel-vibe-uncut': { lead: 'Reel Vibe', bold: 'Uncut', hero: '' },
//   'corporate-canvas': { lead: 'Corporate', bold: 'Canvas', hero: '' },
//   'event-echoes': { lead: 'Event', bold: 'Echoes', hero: '' },
//   'the-sonic-frame': { lead: 'The Sonic', bold: 'Frame', hero: '' },
//   'the-next-chapter': { lead: 'The Next', bold: 'Chapter', hero: '' },
//   'core-realm-vision': { lead: 'Core Realm', bold: 'Vision', hero: '' },
//   'the-essence-we-build': { lead: 'The essence', bold: 'we', hero: 'build' },
//   'connect-with-us': { lead: 'Connect With', bold: 'Us', hero: '' },
//   'the-path-walked': { lead: 'The Path', bold: 'Walked', hero: '' },
// };

const titlePartsBySlug: Record<string, ShowcaseTitleParts> = {
  'life-beyond-lens': { lead: 'LIFE BEYOND', bold: 'LENS', hero: '' },
  'brand-box': { lead: 'BRAND', bold: 'BOX', hero: '' },
  'web-stream-tales': { lead: 'WEB STREAM', bold: 'TALES', hero: '' },
  'reel-vibe-uncut': { lead: 'REEL VIBE', bold: 'UNCUT', hero: '' },
  'corporate-canvas': { lead: 'CORPORATE', bold: 'CANVAS', hero: '' },
  'event-echoes': { lead: 'EVENT', bold: 'ECHOES', hero: '' },
  'the-sonic-frame': { lead: 'THE SONIC', bold: 'FRAME', hero: '' },
  'the-next-chapter': { lead: 'THE NEXT', bold: 'CHAPTER', hero: '' },
  'core-realm-vision': { lead: 'CORE REALM', bold: 'VISION', hero: '' },
  'the-essence-we-build': { lead: 'THE ESSENCE', bold: 'WE', hero: 'BUILD' },
  'connect-with-us': { lead: 'CONNECT WITH', bold: 'US', hero: '' },
  'the-path-walked': { lead: 'THE PATH', bold: 'WALKED', hero: '' },
};

/** Floating video positions (wireframe) — one slot per scroll step */
// const layout: Omit<
//   ShowcaseScrollItem,
//   'video' | 'fallbackVideo' | 'category' | 'title' | 'titleParts' | 'slug'
// >[] = [
//   { id: 1, width: 415, height: 265, left: '38%', top: '4%' },
//   { id: 2, width: 295, height: 455, left: '2%', top: '48%' },
//   { id: 3, width: 355, height: 348, left: '68%', top: '26%' },
//   { id: 4, width: 283, height: 414, left: '2%', top: '4%' },
//   { id: 5, width: 419, height: 260, left: '68%', top: '62%' },
//   { id: 6, width: 355, height: 346, left: '4%', top: '28%' },
//   { id: 7, width: 393, height: 285, left: '20%', top: '3%' },
//   { id: 8, width: 269, height: 466, left: '22%', top: '50%' },
//   { id: 9, width: 530, height: 241, left: '50%', top: '36%' },
//   { id: 10, width: 250, height: 436, left: '78%', top: '2%' },
//   { id: 11, width: 234, height: 478, left: '58%', top: '48%' },
// ];

// const layout = [
//   // Top Row
//   { id: 1, width: 415, height: 265, left: '60%', top: '3%' },
//   { id: 7, width: 393, height: 285, left: '15%', top: '4%' },

//   // Upper Middle
//   { id: 4, width: 283, height: 414, left: '0%', top: '12%' },
//   { id: 10, width: 250, height: 436, left: '84%', top: '8%' },

//   // Center Hero
//   { id: 9, width: 530, height: 241, left: '50%', top: '28%' },

//   // Middle Side
//   { id: 6, width: 355, height: 346, left: '12%', top: '34%' },
//   { id: 3, width: 355, height: 348, left: '68%', top: '34%' },

//   // Lower Middle
//   { id: 8, width: 269, height: 466, left: '26%', top: '52%' },
//   { id: 11, width: 234, height: 478, left: '58%', top: '50%' },

//   // Bottom Corners
//   { id: 2, width: 295, height: 455, left: '2%', top: '58%' },
//   { id: 5, width: 419, height: 260, left: '70%', top: '72%' },
// ];

// const layout = [
//   { id: 1, width: 415, height: 265, left: '60%', top: '3%' },   // Life Beyond Lens

//   { id: 2, width: 295, height: 455, left: '2%', top: '58%' },   // Brand Box

//   { id: 3, width: 355, height: 348, left: '68%', top: '34%' },  // Web Stream Tales

//   { id: 4, width: 283, height: 414, left: '0%', top: '12%' },   // Reel Vibe Uncut

//   { id: 5, width: 419, height: 260, left: '70%', top: '72%' },  // Corporate Canvas

//   { id: 6, width: 355, height: 346, left: '12%', top: '34%' },  // Event Echoes

//   { id: 7, width: 393, height: 285, left: '15%', top: '4%' },   // The Sonic Frame

//   { id: 8, width: 269, height: 466, left: '26%', top: '52%' },  // The Next Chapter

//   { id: 9, width: 530, height: 241, left: '50%', top: '28%' },  // Core Realm Vision

//   { id: 10, width: 250, height: 436, left: '84%', top: '8%' },  // The essence we build

//   // { id: 11, width: 234, height: 478, left: '58%', top: '50%' }, // Connect With Us

//   // { id: 12, width: 320, height: 420, left: '40%', top: '65%' }, // The Path Walked
// ];




const layout = [
  { id: 1, width: 415, height: 265, left: '60%', top: '3%' },   // Life Beyond Lens

  { id: 2, width: 295, height: 455, left: '2%', top: '58%' },   // Brand Box

  { id: 3, width: 355, height: 348, left: '68%', top: '34%' },  // Web Stream Tales

  { id: 4, width: 283, height: 414, left: '0%', top: '12%' },   // Reel Vibe Uncut

  { id: 5, width: 419, height: 260, left: '70%', top: '72%' },  // Corporate Canvas

  { id: 6, width: 355, height: 346, left: '12%', top: '34%' },  // Event Echoes

  { id: 7, width: 393, height: 285, left: '15%', top: '4%' },   // The Sonic Frame

  { id: 8, width: 269, height: 466, left: '26%', top: '52%' },  // The Next Chapter

  { id: 9, width: 530, height: 241, left: '35%', top: '28%' },  // Core Realm Vision

  { id: 10, width: 250, height: 436, left: '84%', top: '8%' },  // The essence we build

  { id: 11, width: 234, height: 478, left: '58%', top: '50%' }, // Connect With Us

  { id: 12, width: 320, height: 420, left: '40%', top: '65%' }, // The Path Walked
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

export function getShowcaseThumbSrc(id: number): string {
  return `/showcase-thumbs/${id}.png`;
}

/** Previous, active, and next slots (circular) mount video; all others use thumbnails */
export function isShowcaseVideoSlot(slotIndex: number, activeIndex: number): boolean {
  const count = SHOWCASE_SECTION_COUNT;
  const prev = (activeIndex - 1 + count) % count;
  const next = (activeIndex + 1) % count;
  return slotIndex === prev || slotIndex === activeIndex || slotIndex === next;
}
