import gsap from 'gsap';
import type { ShowcaseScrollItem } from '@/data/showcaseScroll';

export type ScrollDirection = 'up' | 'down';

export const TITLE_EASE = 'power3.inOut';
/** Fallback — keep in sync with CSS `--spine-item-step` on `.showcase-root` */
export const SPINE_ITEM_STEP = 168;

const ACTIVE_COLOR = '#F5E642';
const INACTIVE_COLOR = 'rgba(255,255,255,0.75)';

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

function readSpineItemStep(spineEl: HTMLElement): number {
  const item = spineEl.querySelector<HTMLElement>('.showcase-spine-item');
  if (item?.offsetHeight) return item.offsetHeight;

  const root =
    spineEl.closest<HTMLElement>('.showcase-root') ?? document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--spine-item-step').trim();
  const px = parseFloat(raw);
  return Number.isFinite(px) && px > 0 ? px : SPINE_ITEM_STEP;
}

function getActiveBoldRem() {
  if (typeof window === 'undefined') return 6.5;
  const w = window.innerWidth;

  if (w < 480) {
    return clamp(2.75, (w * 0.13) / 16, 4.25);
  }
  if (w < 768) {
    return clamp(3.5, (w * 0.11) / 16, 5.5);
  }
  if (w < 1024) {
    return clamp(5, (w * 0.09) / 16, 7);
  }
  return clamp(7, (w * 0.11) / 16, 11);
}

function getInactiveBoldRem() {
  if (typeof window === 'undefined') return 2;
  return window.innerWidth < 768 ? 1.75 : 2.5;
}

function getLeadRem(active: boolean) {
  if (typeof window === 'undefined') return active ? 1.5 : 0.9;
  if (window.innerWidth < 768) return active ? 1.1 : 0.7;
  return active ? 1.5 : 0.9;
}

/** 1 at viewport center, 0 one full step away */
function focusFromDistance(distance: number) {
  return clamp(1 - distance, 0, 1);
}

export function updateTitleSpine(
  spineEl: HTMLElement,
  itemEls: HTMLElement[],
  scrollIndex: number
) {
  const spineStep = readSpineItemStep(spineEl);

  gsap.set(spineEl, {
    y: -scrollIndex * spineStep,
    force3D: true,
  });

  const activeBoldRem = getActiveBoldRem();
  const inactiveBoldRem = getInactiveBoldRem();

  itemEls.forEach((el) => {
    const index = Number(el.dataset.index ?? -1);
    if (index < 0) return;

    const distance = Math.abs(index - scrollIndex);
    // const scale = Math.max(0.65, 1 - distance * 0.18);
    const scale = Math.max(0.85, 1 - distance * 0.08);
    const opacity = Math.max(0.25, 1 - distance * 0.35);
    const focus = focusFromDistance(distance);

    gsap.set(el, {
      scale,
      opacity,
      zIndex: Math.round((1 - Math.min(distance, 2) / 2) * 20),
      y: 0,
      force3D: true,
    });

    const lead = el.querySelector<HTMLElement>('.showcase-spine-lead');
    const bold = el.querySelector<HTMLElement>('.showcase-spine-bold');
    const hero = el.querySelector<HTMLElement>('.showcase-spine-hero');
    const boldSize = lerp(inactiveBoldRem, activeBoldRem, focus);
    const boldColor =
      focus >= 1
        ? ACTIVE_COLOR
        : focus <= 0
          ? INACTIVE_COLOR
          : gsap.utils.interpolate(INACTIVE_COLOR, ACTIVE_COLOR, focus);

    if (bold) {
      gsap.set(bold, {
        fontSize: `${boldSize}rem`,
        fontWeight: 700,
        color: boldColor,
        opacity: 1,
        force3D: true,
      });
    }

    if (hero) {
      gsap.set(hero, {
        fontSize: `${boldSize}rem`,
        fontWeight: 700,
        color: boldColor,
        opacity: 1,
        force3D: true,
      });
    }

    if (lead) {
      gsap.set(lead, {
        fontSize: `${lerp(getLeadRem(false), getLeadRem(true), focus)}rem`,
        fontWeight: 500,
        color: gsap.utils.interpolate(
          INACTIVE_COLOR,
          'rgba(255,255,255,0.95)',
          focus
        ),
        opacity: 1,
        force3D: true,
      });
    }
  });
}
