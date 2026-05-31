"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  /** Only forward when the event target is inside this element */
  areaRef: RefObject<HTMLElement | null>;
  scrollRef: RefObject<HTMLElement | null>;
};

/**
 * Forwards wheel / touch drag from a fixed overlay (titles, etc.)
 * to the scroll container beneath it.
 */
export function useForwardOverlayScroll({ areaRef, scrollRef }: Options) {
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const isInsideArea = (target: EventTarget | null) => {
      const area = areaRef.current;
      if (!area || !target || !(target instanceof Node)) return false;
      return area.contains(target);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInsideArea(e.target)) return;
      if (e.ctrlKey) return;

      scrollEl.scrollTop += e.deltaY;
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
      touchActive = false;
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
