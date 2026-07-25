"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  images: string[];
  title: string;
};

export default function StoryGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close]);

  if (!images.length) return null;

  const uniqueImages = [...new Set(images)];

  return (
    <section className="story-section story-section--wide" aria-labelledby="gallery-heading">
      <p className="story-section-eyebrow">Still frames</p>
      <h2 id="gallery-heading" className="story-section-title">
        Gallery
      </h2>
      <div className="story-gallery-masonry">
        {uniqueImages.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="story-gallery-item"
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${title} gallery image ${index + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            className="story-lightbox"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button type="button" className="story-lightbox-close" onClick={close}>
              Close
            </button>
            <motion.img
              src={uniqueImages[activeIndex]}
              alt=""
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
