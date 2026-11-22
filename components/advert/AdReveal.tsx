'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Milliseconds; staggers neighbours without a shared parent. */
  delay?: number;
};

/**
 * Marks its box `data-in` the first time it scrolls into view; advert.css
 * does the rest (a short lift and fade, and the highlighter swipe on any
 * `.ad-mark` inside). Done with a class rather than framer-motion so the CSS
 * can key other effects off the same moment.
 */
export default function AdReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.in = '';
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ '--ad-delay': `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} className={className} data-reveal="" style={style}>
      {children}
    </div>
  );
}
