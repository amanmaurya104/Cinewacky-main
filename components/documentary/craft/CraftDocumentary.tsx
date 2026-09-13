import Image from 'next/image';
import Link from 'next/link';
import DocumentaryVideo from '@/components/documentary/DocumentaryVideo';
import {
  craftBengali,
  craftDisplay,
  craftText,
  craftUtility,
} from '@/lib/fonts';
import type { Documentary } from '@/types/documentary';
import SilentLoop from '@/components/documentary/SilentLoop';

type Props = {
  documentary: Documentary;
};

/** Anchor id for a material, so the swatch index can jump to its chapter. */
function materialId(name: string): string {
  return `material-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

/**
 * The material record, used by documentaries with `theme: 'craft'`.
 *
 * The film is about handicraft, so the page is filed the way a craft collection
 * is filed: by what the work is made of. Each chapter is one material, and the
 * swatch in its margin — colour sampled off the footage, the name in Latin and
 * in Bengali, the district it is worked in — is the section marker. That is why
 * there are no numbered sections and no eyebrow labels anywhere on the page.
 *
 * It sits on warm paper rather than on black, deliberately. The other three
 * bespoke pages on this site are all dark, and this one is a book of mounted
 * plates: the photography is of small objects held close, and it reads as
 * objects on a page rather than as frames in a reel.
 *
 * Everything is scoped under `.craft` so it cannot reach the archive album,
 * the dragon market or the default documentary template.
 */
export default function CraftDocumentary({ documentary }: Props) {
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  const fonts = [
    craftDisplay.variable,
    craftText.variable,
    craftUtility.variable,
    craftBengali.variable,
  ].join(' ');

  const materials = documentary.materials ?? [];

  return (
    <main className={`craft ${fonts}`}>
      <div className="craft-ground" aria-hidden />

      {/* ---- hero ---- */}

      <header className="craft-hero">
        <div className="craft-hero-backdrop" aria-hidden>
          {documentary.heroLoop ? (
            <SilentLoop
              src={documentary.heroLoop}
              poster={documentary.heroPoster}
              className="craft-hero-loop"
            />
          ) : null}
          <div className="craft-hero-veil" />
        </div>

        <div className="craft-mast">
          {documentary.commission ? (
            <p className="craft-mast-commission">{documentary.commission}</p>
          ) : null}

          <h1 className="craft-mast-title">{documentary.title}</h1>

          {documentary.tagline ? (
            <p className="craft-mast-line">{documentary.tagline}</p>
          ) : null}

          {documentary.factLine?.length ? (
            <ul className="craft-mast-facts">
              {documentary.factLine.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {/* ---- the film's own title cards, then the opening prose ---- */}

      {documentary.cards?.length || documentary.overture?.length ? (
        <section className="craft-overture">
          {documentary.cards?.length ? (
            <ol className="craft-cards">
              {documentary.cards.map((card) => (
                <li key={card} className="craft-card">
                  {card}
                </li>
              ))}
            </ol>
          ) : null}

          {documentary.overture?.length ? (
            <div className="craft-overture-prose">
              {documentary.overture.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ---- the swatch index: the whole film, as five colours ---- */}

      {materials.length ? (
        <nav className="craft-index" aria-label="Materials">
          <ol className="craft-index-list">
            {materials.map((material) => (
              <li key={material.name}>
                <a
                  className="craft-index-chip"
                  href={`#${materialId(material.name)}`}
                  style={{ '--swatch': material.swatch } as React.CSSProperties}
                >
                  <span className="craft-index-block" aria-hidden />
                  <span className="craft-index-name">{material.name}</span>
                  {material.bengali ? (
                    <span className="craft-index-bengali" lang="bn">
                      {material.bengali}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {/* ---- one chapter per material ---- */}

      {materials.map((material) => (
        <section
          key={material.name}
          id={materialId(material.name)}
          className="craft-chapter"
          style={{ '--swatch': material.swatch } as React.CSSProperties}
          aria-labelledby={`${materialId(material.name)}-title`}
        >
          {/* Sticky, so the material stays named for as long as its chapter
            * runs — the reader should never have to scroll back to find out
            * what they are looking at. */}
          <div className="craft-rail">
            <span className="craft-rail-block" aria-hidden />
            <span className="craft-rail-name">{material.name}</span>
            {material.bengali ? (
              <span className="craft-rail-bengali" lang="bn">
                {material.bengali}
              </span>
            ) : null}
            {material.bengaliRoman ? (
              <span className="craft-rail-roman">{material.bengaliRoman}</span>
            ) : null}
            {material.place ? (
              <span className="craft-rail-place">{material.place}</span>
            ) : null}
          </div>

          <div className="craft-chapter-body">
            <h2
              id={`${materialId(material.name)}-title`}
              className="craft-heading"
            >
              {material.title}
            </h2>

            <div className="craft-prose">
              {material.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {material.motion ? (
            <figure className="craft-motion">
              <div className="craft-motion-window">
                <SilentLoop
                  src={material.motion.src}
                  poster={material.motion.poster}
                  className="craft-motion-media"
                />
              </div>
              {material.motion.caption ? (
                <figcaption>{material.motion.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}

          {material.plates?.length ? (
            <div className="craft-mounts" data-count={material.plates.length}>
              {material.plates.map((plate) => (
                <figure
                  key={plate.src}
                  className={`craft-mount${plate.tall ? ' craft-mount--tall' : ''}`}
                >
                  <div className="craft-mount-window">
                    <Image
                      src={plate.src}
                      alt={plate.caption ?? ''}
                      fill
                      sizes="(max-width: 880px) 92vw, 46vw"
                      quality={75}
                      loading="lazy"
                    />
                  </div>
                  {plate.caption ? (
                    <figcaption>{plate.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      {/* ---- the register: the traditions, where they are worked ---- */}

      {documentary.traditions?.length ? (
        <section className="craft-register" aria-labelledby="craft-register-title">
          <div className="craft-register-head">
            {documentary.registerTitle ? (
              <h2 id="craft-register-title" className="craft-heading">
                {documentary.registerTitle}
              </h2>
            ) : null}
            {documentary.registerNote ? (
              <p className="craft-register-note">{documentary.registerNote}</p>
            ) : null}
          </div>

          <ol className="craft-register-list">
            {documentary.traditions.map((tradition) => (
              <li key={tradition.craft} className="craft-register-row">
                <span className="craft-register-craft">{tradition.craft}</span>
                <span className="craft-register-place">{tradition.place}</span>
                {tradition.note ? (
                  <span className="craft-register-detail">{tradition.note}</span>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ---- the trailer ---- */}

      {documentary.video ? (
        <DocumentaryVideo
          src={documentary.video}
          poster={documentary.videoPoster}
          label={documentary.videoLabel}
          title={documentary.title}
          className="craft-watch"
        />
      ) : null}

      {/* ---- closing contact sheet ---- */}

      {documentary.plates?.length ? (
        <section className="craft-sheet" aria-labelledby="craft-sheet-title">
          <div className="craft-sheet-head">
            {documentary.sheetHeading ? (
              <h2 id="craft-sheet-title" className="craft-heading">
                {documentary.sheetHeading}
              </h2>
            ) : null}
            <p className="craft-sheet-count">
              {documentary.plates.length} frames, in the order they were cut
            </p>
          </div>

          <ol className="craft-sheet-grid">
            {documentary.plates.map((plate, index) => (
              <li key={plate.src}>
                <figure className="craft-chip">
                  <div className="craft-chip-window">
                    <Image
                      src={plate.src}
                      alt={plate.caption ?? ''}
                      fill
                      sizes="(max-width: 700px) 46vw, 17vw"
                      quality={60}
                      loading="lazy"
                    />
                  </div>
                  <figcaption>
                    <span className="craft-chip-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {plate.caption ? <span>{plate.caption}</span> : null}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ---- colophon ---- */}

      <footer className="craft-colophon">
        {documentary.credits?.length ? (
          <dl className="craft-credits">
            {documentary.credits.map((credit) => (
              <div key={credit.role}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="craft-colophon-foot">
          {documentary.colophon ? <p>{documentary.colophon}</p> : null}
          <Link href={backHref} className="craft-back">
            {documentary.projectTitle ? documentary.projectTitle : 'Back'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
