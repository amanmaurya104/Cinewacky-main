import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * The instruments that frame the hero, cut out of the client's theme artwork
 * by scripts/build-tuning-instruments.mjs, each with its own motion: the
 * strings sway from the body, the drums thump in call and response, the
 * cymbals jingle, the flute floats. The staff lines are drawn here as SVG and
 * flow; the notes rise off them.
 *
 * Purely decorative and all CSS — it sits still for anyone who has asked for
 * reduced motion (tuning.css).
 */

const ART = '/documentaries/tuning-2-you/instruments';

/** Intrinsic sizes are the build script's output, 3x the artwork. */
const INSTRUMENTS = [
  { name: 'sitar', width: 585, height: 579 },
  { name: 'tabla', width: 261, height: 228 },
  { name: 'harmonica', width: 351, height: 222 },
  { name: 'flute', width: 525, height: 525 },
  { name: 'lute', width: 363, height: 423 },
  { name: 'cymbals', width: 345, height: 276 },
  { name: 'violin', width: 369, height: 573 },
  { name: 'djembe', width: 249, height: 297 },
] as const;

/**
 * Where the notes rise from, as hero percentages, with a stagger. `top` notes
 * sit by the strings and are the only ones a phone keeps.
 */
const NOTES = [
  { x: 20, y: 7, delay: 0, top: true },
  { x: 10, y: 41, delay: 2.2 },
  { x: 7, y: 64, delay: 4.1 },
  { x: 18.5, y: 89, delay: 1.3 },
  { x: 84, y: 11, delay: 3.4, top: true },
  { x: 87.5, y: 57, delay: 0.8 },
  { x: 86, y: 76, delay: 5 },
];

/**
 * Three parallel staff lines per bundle, as cubic curves in a 300 x 768 box per
 * side, mirroring where the artwork puts them.
 */
function bundle(start: [number, number], c1: [number, number], c2: [number, number], end: [number, number]) {
  return [0, 13, 26].map(
    (o) => `M${start[0]} ${start[1] + o} C${c1[0]} ${c1[1] + o} ${c2[0]} ${c2[1] + o} ${end[0]} ${end[1] + o}`,
  );
}

const LEFT_STAVES = [
  ...bundle([0, 104], [70, 82], [150, 172], [300, 134]),
  ...bundle([0, 300], [60, 332], [120, 384], [210, 392]),
  ...bundle([0, 624], [110, 606], [210, 700], [300, 768]),
];

const RIGHT_STAVES = [
  ...bundle([70, -16], [130, 26], [230, 30], [300, 0]),
  ...bundle([60, 236], [150, 222], [250, 172], [300, 142]),
  ...bundle([90, 768], [160, 740], [230, 660], [300, 600]),
];

function Staves({ side, paths }: { side: 'left' | 'right'; paths: string[] }) {
  return (
    <svg
      className={`tuning-staves tuning-staves--${side}`}
      viewBox="0 0 300 768"
      preserveAspectRatio="none"
    >
      {paths.map((d, index) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={{ animationDelay: `${-index * 1.7}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** A pair of beamed quavers, the note the artwork uses. */
function Note() {
  return (
    <svg viewBox="0 0 24 28" width="24" height="28" focusable="false">
      <path d="M8 4 L21 1 V19" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M8 4 V22" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M8 4 L21 1 V5 L8 8 Z" fill="currentColor" />
      <ellipse cx="5" cy="22.5" rx="4.2" ry="3.2" transform="rotate(-20 5 22.5)" fill="currentColor" />
      <ellipse cx="18" cy="19.5" rx="4.2" ry="3.2" transform="rotate(-20 18 19.5)" fill="currentColor" />
    </svg>
  );
}

export default function TuningOrchestra() {
  return (
    <div className="tuning-orchestra" aria-hidden>
      <Staves side="left" paths={LEFT_STAVES} />
      <Staves side="right" paths={RIGHT_STAVES} />

      {INSTRUMENTS.map(({ name, width, height }) => (
        <span key={name} className={`tuning-instrument tuning-instrument--${name}`}>
          <Image
            src={`${ART}/${name}.png`}
            alt=""
            width={width}
            height={height}
            sizes="(max-width: 760px) 26vw, 16vw"
            // Lazy, not eager: a phone hides five of the eight, and an eager
            // image downloads even under display: none.
            loading="lazy"
          />
        </span>
      ))}

      {NOTES.map((note) => (
        <span
          key={`${note.x}-${note.y}`}
          className={`tuning-note${note.top ? ' tuning-note--top' : ''}`}
          style={
            {
              left: `${note.x}%`,
              top: `${note.y}%`,
              animationDelay: `${note.delay}s`,
            } as CSSProperties
          }
        >
          <Note />
        </span>
      ))}
    </div>
  );
}
