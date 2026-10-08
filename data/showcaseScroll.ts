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

// WebP, built from the PNG masters by scripts/optimize-showcase-thumbs.mjs
// (6.1MB -> 0.16MB). These are also used as the `<video poster>`, which cannot
// go through the next/image optimizer, so the file on disk must be the small one.
export function getShowcaseThumbSrc(id: number): string {
  return `/showcase-thumbs/${id}.webp`;
}

/** Previous, active, and next slots (circular) mount video; all others use thumbnails */
export function isShowcaseVideoSlot(slotIndex: number, activeIndex: number): boolean {
  const count = SHOWCASE_SECTION_COUNT;
  const prev = (activeIndex - 1 + count) % count;
  const next = (activeIndex + 1) % count;
  return slotIndex === prev || slotIndex === activeIndex || slotIndex === next;
}
