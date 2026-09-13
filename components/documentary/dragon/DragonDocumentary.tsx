import Image from 'next/image';
import Link from 'next/link';
import { dragonDisplay, dragonText, dragonUtility } from '@/lib/fonts';
import type { Documentary } from '@/types/documentary';
import DragonHeroLoop from './DragonHeroLoop';
import DragonLoongMount from './DragonLoongMount';

type Props = {
  documentary: Documentary;
};

/**
 * The market-morning layout, used by documentaries with `theme: 'dragon'`.
 *
 * Test of China is a film about a Chinese breakfast market in Kolkata that
 * opens in the dark and is gone by the middle of the morning, so the page is
 * built on that clock: it starts on a black ground with an ember-hot dragon
 * behind it and finishes on daylight with the animal gone to steam. The hours
 * in the margin are the section markers, which is why there are no eyebrow
 * labels anywhere on the page.
 *
 * Everything here is scoped under `.dragon` so it cannot reach the archive
 * album or the default documentary template.
 */
/** Anchor id for an hour, so a single chapter of the morning can be linked to. */
function hourId(time: string): string {
  return `hour-${time.replace(/[^0-9]/g, '')}`;
}

export default function DragonDocumentary({ documentary }: Props) {
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  const fonts = `${dragonDisplay.variable} ${dragonText.variable} ${dragonUtility.variable}`;

  return (
    <main className={`dragon ${fonts}`}>
      <div className="dragon-ground" aria-hidden />

      {/* The opening frame sits outside the hero section and under the canvas,
        * so the dragon swims in front of the film rather than behind it. The
        * masthead is the only thing left in the hero, above them both. */}
      <div className="dragon-backdrop" aria-hidden>
        {documentary.heroLoop ? (
          <DragonHeroLoop
            src={documentary.heroLoop}
            poster={documentary.heroPoster}
          />
        ) : null}
        <div className="dragon-hero-veil" />
      </div>

      <DragonLoongMount />

      <header className="dragon-hero">
        <div className="dragon-mast">
          {documentary.commission ? (
            <p className="dragon-mast-commission">{documentary.commission}</p>
          ) : null}

          <h1 className="dragon-mast-title">
            {documentary.han ? (
              <span className="dragon-mast-han" lang="zh-Hant" aria-hidden>
                {documentary.han}
              </span>
            ) : null}
            <span className="dragon-mast-latin">{documentary.title}</span>
          </h1>

          {documentary.tagline ? (
            <p className="dragon-mast-line">{documentary.tagline}</p>
          ) : null}
        </div>
      </header>

      {documentary.epigraph || documentary.overture?.length ? (
        <section className="dragon-overture">
          {documentary.epigraph ? (
            <p className="dragon-epigraph">{documentary.epigraph}</p>
          ) : null}

          {documentary.overture?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="dragon-overture-text">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {documentary.chapters?.map((chapter) => (
        <section
          key={chapter.time}
          id={hourId(chapter.time)}
          className="dragon-chapter"
        >
          <div className="dragon-rail">
            <span className="dragon-rail-time">{chapter.time}</span>
            {chapter.han ? (
              <span className="dragon-rail-han" lang="zh-Hant">
                {chapter.han}
              </span>
            ) : null}
            {chapter.hanGloss ? (
              <span className="dragon-rail-gloss">{chapter.hanGloss}</span>
            ) : null}
          </div>

          <div className="dragon-chapter-body">
            <h2 className="dragon-heading">{chapter.title}</h2>
            <div className="dragon-prose">
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {chapter.plates?.length ? (
            <div className="dragon-lighttable">
              {chapter.plates.map((plate) => (
                <figure key={plate.src} className="dragon-frame">
                  <div className="dragon-frame-window">
                    <Image
                      src={plate.src}
                      alt={plate.caption ?? ''}
                      fill
                      sizes="(max-width: 880px) 92vw, 44vw"
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

      {documentary.lexicon?.length ? (
        <section className="dragon-board">
          <div className="dragon-board-head">
            {documentary.lexiconTitle ? (
              <h2 className="dragon-heading">{documentary.lexiconTitle}</h2>
            ) : null}
            {documentary.lexiconNote ? (
              <p className="dragon-board-note">{documentary.lexiconNote}</p>
            ) : null}
          </div>

          <dl className="dragon-board-list">
            {documentary.lexicon.map((entry) => (
              <div key={entry.han} className="dragon-board-row">
                <dt>
                  <span className="dragon-board-han" lang="zh-Hant">
                    {entry.han}
                  </span>
                  <span className="dragon-board-roman">{entry.roman}</span>
                </dt>
                {entry.note ? <dd>{entry.note}</dd> : null}
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {documentary.plates?.length ? (
        <section className="dragon-sheet">
          <div className="dragon-sheet-head">
            <span className="dragon-rail-time">08:00</span>
            {documentary.sheetTitle ? (
              <h2 className="dragon-sheet-han" lang="zh-Hant">
                {documentary.sheetTitle}
              </h2>
            ) : null}
            <p className="dragon-sheet-count">
              {documentary.plates.length} frames, in the order they were cut
            </p>
          </div>

          <ol className="dragon-sheet-grid">
            {documentary.plates.map((plate, index) => (
              <li key={plate.src}>
                <figure className="dragon-chip">
                  <div className="dragon-chip-window">
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
                    <span className="dragon-chip-number">
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

      <footer className="dragon-colophon">
        {documentary.credits?.length ? (
          <dl className="dragon-credits">
            {documentary.credits.map((credit) => (
              <div key={credit.role}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {documentary.attribution ? (
          <p className="dragon-attribution">
            The dragon is{' '}
            <a
              href={documentary.attribution.workUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {documentary.attribution.work}
            </a>{' '}
            by{' '}
            <a
              href={documentary.attribution.authorUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {documentary.attribution.author}
            </a>
            , used under{' '}
            <a
              href={documentary.attribution.licenseUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {documentary.attribution.license}
            </a>
            .
          </p>
        ) : null}

        <div className="dragon-colophon-foot">
          {documentary.colophon ? <p>{documentary.colophon}</p> : null}
          <Link href={backHref} className="dragon-back">
            {documentary.projectTitle ? documentary.projectTitle : 'Back'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
