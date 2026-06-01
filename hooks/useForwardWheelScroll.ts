"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  nearestSectionIndex,
  scrollTopForSection,
  steppedSectionIndex,
} from "@/lib/showcaseScrollSnap";

type Options = {
  /** Only forward when the event target is inside this element */
  areaRef: RefObject<HTMLElement | null>;
  scrollRef: RefObject<HTMLElement | null>;
};

/**
 * Forwards wheel / touch from the fixed overlay to the scroll container.
 * Always moves one section at a time so a title lands active at center.
 */
export function useForwardOverlayScroll({ areaRef, scrollRef }: Options) {
  const wheelLockRef = useRef(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const isInsideArea = (target: EventTarget | null) => {
      const area = areaRef.current;
      if (!area || !target || !(target instanceof Node)) return false;
      return area.contains(target);
    };

    const scrollToSection = (sectionIndex: number) => {
      const sectionHeight = scrollEl.clientHeight;
      if (sectionHeight <= 0) return;
      scrollEl.scrollTo({
        top: scrollTopForSection(sectionIndex, sectionHeight),
        behavior: "smooth",
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInsideArea(e.target)) return;
      if (e.ctrlKey) return;
      if (wheelLockRef.current) return;

      if (e.target === scrollEl || scrollEl.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest(".showcase-spine-item-link")) return;
      }

      const sectionHeight = scrollEl.clientHeight;
      if (sectionHeight <= 0) return;

      const nextIndex = steppedSectionIndex(
        scrollEl.scrollTop,
        sectionHeight,
        e.deltaY
      );
      const currentIndex = nearestSectionIndex(
        scrollEl.scrollTop,
        sectionHeight
      );

      if (nextIndex === currentIndex) return;

      wheelLockRef.current = true;
      scrollToSection(nextIndex);
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);

      e.preventDefault();
    };

    let touchStartY = 0;
    let touchActive = false;

    const onTouchStart = (e: TouchEvent) => {
      if (!isInsideArea(e.target) || e.touches.length !== 1) return;
      touchActive = true;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchActive || e.touches.length !== 1) return;
      if (!isInsideArea(e.target)) return;

      const y = e.touches[0].clientY;
      scrollEl.scrollTop += touchStartY - y;
      touchStartY = y;
      e.preventDefault();
    };

    const onTouchEnd = () => {
      if (!touchActive) return;
      touchActive = false;

      const sectionHeight = scrollEl.clientHeight;
      if (sectionHeight <= 0) return;

      const nearest = nearestSectionIndex(scrollEl.scrollTop, sectionHeight);
      scrollToSection(nearest);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { capture: true });
    window.addEventListener("touchcancel", onTouchEnd, { capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      window.removeEventListener("touchcancel", onTouchEnd, { capture: true });
    };
  }, [areaRef, scrollRef]);
}
