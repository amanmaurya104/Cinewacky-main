import gsap from 'gsap';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';

export type ScrollDirection = 'up' | 'down';

export const TITLE_EASE = 'power3.inOut';
/** Fallback — keep in sync with CSS `--spine-item-step` on `.showcase-root` */
export const SPINE_ITEM_STEP = 272;

const ACTIVE_COLOR = '#F5E642';
const INACTIVE_COLOR = 'rgba(255, 255, 255, 0.72)';
/** Hide belt slots far outside the viewport (still in DOM for seamless wrap). */
const MAX_VISIBLE_DELTA = 5;

export function formatShowcaseLabel(item: ShowcaseScrollItem) {
  const { lead, bold, hero } = item.titleParts;
  return [lead, bold, hero].filter(Boolean).join(' ');
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** Shortest signed offset on a circular list (negative = above center, positive = below). */
export function circularDelta(
  index: number,
  active: number,
  count: number
): number {
  if (count <= 0) return 0;
  let delta = index - active;
  const half = count / 2;
  if (delta > half) delta -= count;
  else if (delta < -half) delta += count;
  return delta;
}

/** Shortest path distance on the ring. */
export function circularDistance(
  index: number,
  active: number,
  count: number
): number {
  return Math.abs(circularDelta(index, active, count));
}

/** Fractional index (0…count) from scroll position — drives smooth belt motion. */
export function fractionalScrollIndex(
  scrollTop: number,
  sectionHeight: number,
  count: number
): number {
  if (sectionHeight <= 0 || count <= 0) return 0;
  const virtual = scrollTop / sectionHeight;
  return ((virtual % count) + count) % count;
}

function readSpineItemStep(spineEl: HTMLElement): number {
  const root =
    spineEl.closest<HTMLElement>('.showcase-root') ?? document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--spine-item-step').trim();
  const px = parseFloat(raw);
  return Number.isFinite(px) && px > 0 ? px : SPINE_ITEM_STEP;
}

function getActiveBoldRem() {
  if (typeof window === 'undefined') return 6.5;
  const w = window.innerWidth;

  /* Desktop — unchanged design-approved sizes */
  if (w >= 1025) {
    return clamp(6.5, (w * 0.11) / 16, 7.5);
  }
  if (w < 480) {
    return clamp(2.5, (w * 0.13) / 16, 3.75);
  }
  if (w < 768) {
    return clamp(3, (w * 0.11) / 16, 4.5);
  }
  return clamp(3.75, (w * 0.09) / 16, 5.25);
}

function getInactiveBoldRem() {
  if (typeof window === 'undefined') return 2;
  const w = window.innerWidth;
  if (w >= 1025) return 2.35;
  if (w < 768) return 1.4;
  return 1.75;
}

function getLeadRem(active: boolean) {
  if (typeof window === 'undefined') return active ? 1.5 : 0.85;
  const w = window.innerWidth;
  if (w >= 1025) return active ? 1.5 : 0.85;
  if (w < 480) return active ? 0.65 : 0.55;
  if (w < 768) return active ? 0.75 : 0.6;
  return active ? 0.85 : 0.7;
}

function piecewise(
  distance: number,
  stops: readonly [number, number][]
): number {
  const d = Math.max(0, distance);
  if (d <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    const [d1, v1] = stops[i - 1];
    const [d2, v2] = stops[i];
    if (d <= d2) return lerp(v1, v2, (d - d1) / (d2 - d1));
  }
  return stops[stops.length - 1][1];
}

function scaleForDistance(distance: number): number {
  return piecewise(distance, [
    [0, 1.55],
    [1, 1.22],
    [2, 1.05],
    [3, 0.88],
    [4, 0.65],
    [6, 0.48],
  ]);
}

function opacityForDistance(distance: number): number {
  return piecewise(distance, [
    [0, 1],
    [1, 0.92],
    [2, 0.72],
    [3, 0.48],
    [4, 0.22],
    [6, 0.18],
  ]);
}

function brightnessForDistance(distance: number): number {
  return piecewise(distance, [
    [0, 1],
    [1, 0.96],
    [2, 0.84],
    [3, 0.68],
    [4, 0.5],
    [6, 0.38],
  ]);
}

function zDepthForDistance(distance: number): number {
  return -Math.min(distance, 6) * 40;
}

export function updateTitleSpine(
  spineEl: HTMLElement,
  itemEls: HTMLElement[],
  scrollIndex: number,
  count: number
) {
  const spineStep = readSpineItemStep(spineEl);
  const activeBoldRem = getActiveBoldRem();
  const inactiveBoldRem = getInactiveBoldRem();

  itemEls.forEach((el) => {
    const index = Number(el.dataset.index ?? -1);
    if (index < 0) return;

    const delta = circularDelta(index, scrollIndex, count);
    const distance = Math.abs(delta);
    const isActive = distance < 0.2;
    const approachFocus = clamp(1 - Math.abs(delta), 0, 1);
    const inView = distance <= MAX_VISIBLE_DELTA;

    /** Fixed belt slot: delta × step from viewport center (e.g. −336, −168, 0, 168, 336). */
    const beltY = delta * spineStep;

    const scale = scaleForDistance(distance);
    const opacity = opacityForDistance(distance);
    const brightness = brightnessForDistance(distance);
    const zDepth = zDepthForDistance(distance);

    const visual =
      el.querySelector<HTMLElement>('.showcase-spine-item-visual') ??
      el.querySelector<HTMLElement>('.showcase-spine-item-link');

    gsap.set(el, {
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: beltY,
      scale: 1,
      opacity: inView ? 1 : 0,
      zIndex: Math.round(60 - distance * 8),
      visibility: inView ? 'visible' : 'hidden',
      force3D: true,
    });

    if (visual) {
      gsap.set(visual, {
        x: 0,
        y: 0,
        z: zDepth,
        scale,
        opacity: inView ? opacity : 0,
        filter: `brightness(${brightness})`,
        transformOrigin: '50% 50%',
        force3D: true,
      });
    }

    el.dataset.active = isActive ? 'true' : 'false';
    el.dataset.delta = String(Math.round(delta * 100) / 100);

    const lead = el.querySelector<HTMLElement>('.showcase-spine-lead');
    const bold = el.querySelector<HTMLElement>('.showcase-spine-bold');
    const hero = el.querySelector<HTMLElement>('.showcase-spine-hero');

    const boldSize = lerp(inactiveBoldRem, activeBoldRem, approachFocus);
    const boldColor = gsap.utils.interpolate(INACTIVE_COLOR, ACTIVE_COLOR, approachFocus);
    const leadColor = gsap.utils.interpolate(
      'rgba(255, 255, 255, 0.5)',
      '#ffffff',
      approachFocus
    );

    if (bold) {
      gsap.set(bold, {
        fontSize: `${boldSize}rem`,
        fontWeight: 400,
        color: boldColor,
        opacity: 1,
        force3D: true,
      });
    }

    if (hero) {
      gsap.set(hero, {
        fontSize: `${boldSize}rem`,
        fontWeight: 400,
        color: boldColor,
        opacity: 1,
        force3D: true,
      });
    }

    if (lead) {
      gsap.set(lead, {
        fontSize: `${lerp(getLeadRem(false), getLeadRem(true), approachFocus)}rem`,
        fontWeight: 900,
        color: leadColor,
        opacity: lerp(0.7, 1, approachFocus),
        force3D: true,
      });
    }
  });
}
