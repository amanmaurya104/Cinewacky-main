"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef, type CSSProperties } from 'react';
import { CometCard } from '@/components/ui/comet-card';
import type { StoryCastMember } from '@/types/story';

type Props = {
  cast: StoryCastMember[];
  /**
   * `marquee` scrolls a repeated track, which suits a long ensemble. `row`
   * stands the cast still — right for a cast small enough to read at once.
   * `comet` is `row` with each card on a comet tilt.
   */
  layout?: 'marquee' | 'row' | 'comet';
};

/** Cards in one marquee pass — repeated so short casts still fill wide screens. */
const MIN_TRACK_ITEMS = 10;
/** Seconds each card spends crossing the viewport. */
const SECONDS_PER_CARD = 5;

export default function StoryCast({ cast, layout = 'marquee' }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  // One pass of the loop; the track renders this twice so the seam is invisible.
  const pass = useMemo(() => {
    if (!cast.length) return [];
    const repeats = Math.max(1, Math.ceil(MIN_TRACK_ITEMS / cast.length));
    return Array.from({ length: repeats }, () => cast).flat();
  }, [cast]);

  if (!cast.length) return null;

  // The stills are 2560x1080 scope frames cropped into a 2:3 portrait box, so
  // `cover` throws away ~72% of the width. What has to be sharp is the box's
  // HEIGHT, which needs a served width of roughly boxHeight x 2.37 — quoting
  // the box width here instead is what leaves the faces soft.
  const portraitSizes =
    layout === 'marquee' ? '480px' : '(max-width: 767px) 560px, 720px';

  const heading = (
    <>
      <p className="story-section-eyebrow">On screen</p>
      <h2 id="cast-heading" className="story-section-title">
        Principal Cast
      </h2>
    </>
  );

  const renderCard = (member: StoryCastMember, index: number, copy: number) => (
    <article
      key={`${copy}-${index}-${member.actor}-${member.character}`}
      className="story-cast-card"
    >
      <div className="story-cast-portrait-wrap">
        {member.portrait ? (
          <Image
            src={member.portrait}
            alt={copy === 0 ? member.actor : ''}
            fill
            sizes={portraitSizes}
            quality={60}
            className="story-cast-portrait"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="story-cast-portrait story-cast-portrait--placeholder" />
        )}
      </div>
      <p className="story-cast-actor">{member.actor}</p>
      <p className="story-cast-character">{member.character}</p>
    </article>
  );

  if (layout === 'comet') {
    return (
      <section
        ref={sectionRef}
        className="story-section story-section--wide story-cast-section story-cast-section--row"
        aria-labelledby="cast-heading"
      >
        {heading}

        <motion.div
          className="story-cast-row story-cast-row--comet"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {cast.map((member, index) => (
            <CometCard
              key={`${index}-${member.actor}-${member.character}`}
              className="story-cast-comet"
            >
              {renderCard(member, index, 0)}
            </CometCard>
          ))}
        </motion.div>
      </section>
    );
  }

  if (layout === 'row') {
    return (
      <section
        ref={sectionRef}
        className="story-section story-section--wide story-cast-section story-cast-section--row"
        aria-labelledby="cast-heading"
      >
        {heading}

        <motion.div
          className="story-cast-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {cast.map((member, index) => renderCard(member, index, 0))}
        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="story-section story-section--wide story-cast-section"
      aria-labelledby="cast-heading"
    >
      {heading}

      <motion.div
        className="story-cast-marquee"
        data-static={reduceMotion ? 'true' : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="story-cast-track"
          style={
            {
              '--marquee-duration': `${pass.length * SECONDS_PER_CARD}s`,
            } as CSSProperties
          }
        >
          <div className="story-cast-pass">
            {pass.map((member, index) => renderCard(member, index, 0))}
          </div>
          {/* Duplicate pass keeps the loop seamless; hidden from assistive tech. */}
          <div className="story-cast-pass" aria-hidden="true">
            {pass.map((member, index) => renderCard(member, index, 1))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
