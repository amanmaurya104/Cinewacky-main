"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CircularGallery, type GalleryItem } from '@/components/ui/circular-gallery';

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

  const uniqueImages = useMemo(() => [...new Set(images)], [images]);

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      uniqueImages.map((src, index) => ({
        photo: {
          url: src,
          text: `${title} still frame ${index + 1}`,
        },
      })),
    [uniqueImages, title],
  );

  if (!images.length) return null;

  return (
    <section
      className="story-section story-section--wide story-gallery-section"
      aria-labelledby="gallery-heading"
    >
      <div className="story-gallery-stage">
        <div className="story-gallery-intro">
          <p className="story-section-eyebrow">Still frames</p>
          <h2 id="gallery-heading" className="story-section-title">
            Gallery
          </h2>
        </div>

        <CircularGallery
          items={galleryItems}
          onItemSelect={setActiveIndex}
          className="story-gallery-ring"
        />
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
