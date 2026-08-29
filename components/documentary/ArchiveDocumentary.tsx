import Image from 'next/image';
import Link from 'next/link';
import { archiveDisplay, archiveText, archiveUtility } from '@/lib/fonts';
import type { Documentary } from '@/types/documentary';
import ArchiveContactSheet from './ArchiveContactSheet';
import ArchivePlate, { plateNumber } from './ArchivePlate';
import ArchiveReveal from './ArchiveReveal';
import DocumentaryVideo from './DocumentaryVideo';

type Props = {
  documentary: Documentary;
};

/**
 * The album layout, used by documentaries with `theme: 'archive'`.
 *
 * Bird of Dusk was assembled out of archive — rare interviews, memoirs, frames
 * pulled from thirty years of Bengali cinema — so the page is built as the
 * album that assembly would have lived in: ink-dark board, paper panels mounted
 * on it, plates numbered in the margin, and a contact sheet at the end. That is
 * deliberately the opposite of the full-bleed film reel the story pages use.
 */
export default function ArchiveDocumentary({ documentary }: Props) {
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  const fonts = `${archiveDisplay.variable} ${archiveText.variable} ${archiveUtility.variable}`;

  return (
    <main className={`archive ${fonts}`}>
      <header className="archive-hero">
        {documentary.heroPlate ? (
          <div className="archive-hero-window">
            <Image
              src={documentary.heroPlate.src}
              alt={documentary.heroPlate.caption ?? ''}
              fill
              sizes="100vw"
              quality={75}
              loading="eager"
            />
          </div>
        ) : null}

        <div className="archive-titlecard">
          {documentary.tagline ? (
            <p className="archive-kicker">{documentary.tagline}</p>
          ) : null}

          <h1 className="archive-title">{documentary.title}</h1>

          {documentary.factLine?.length ? (
            <ul className="archive-facts">
              {documentary.factLine.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}

          {documentary.heroPlate ? (
            <p className="archive-slip">
              {[
                plateNumber(documentary.heroPlate.src)
                  ? `Pl. ${plateNumber(documentary.heroPlate.src)}`
                  : null,
                documentary.heroPlate.caption,
              ]
                .filter(Boolean)
                .join(' — ')}
            </p>
          ) : null}
        </div>
      </header>

      {documentary.epigraph || documentary.overture?.length ? (
        <ArchiveReveal className="archive-overture">
          {documentary.epigraph ? (
            <blockquote className="archive-epigraph">{documentary.epigraph}</blockquote>
          ) : null}

          {documentary.overture?.length ? (
            <div className="archive-columns">
              {documentary.overture.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </ArchiveReveal>
      ) : null}

      {documentary.passages?.map((passage, index) => (
        <section
          key={passage.title ?? passage.paragraphs[0].slice(0, 32)}
          className={`archive-passage${index % 2 ? ' archive-passage--flip' : ''}`}
        >
          <ArchiveReveal className="archive-panel">
            {passage.eyebrow ? (
              <p className="archive-eyebrow">{passage.eyebrow}</p>
            ) : null}
            {passage.title ? <h2 className="archive-heading">{passage.title}</h2> : null}

            <div className="archive-prose">
              {passage.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </ArchiveReveal>

          {passage.plate ? (
            <ArchiveReveal className="archive-passage-plate" delay={0.08}>
              <ArchivePlate
                plate={passage.plate}
                sizes="(max-width: 900px) 100vw, 38vw"
              />
            </ArchiveReveal>
          ) : null}
        </section>
      ))}

      {documentary.voices?.length ? (
        <ArchiveReveal className="archive-voices">
          <p className="archive-eyebrow">Voices</p>

          <div className="archive-voices-groups">
            {documentary.voices.map((group) => (
              <div key={group.group} className="archive-voices-group">
                <h2 className="archive-voices-label">{group.group}</h2>
                <ul>
                  {group.entries.map((entry) => (
                    <li key={entry.name}>
                      <span className="archive-voice-name">{entry.name}</span>
                      {entry.role ? (
                        <span className="archive-voice-role">{entry.role}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ArchiveReveal>
      ) : null}

      {documentary.video ? (
        <ArchiveReveal className="archive-screening">
          <DocumentaryVideo
            src={documentary.video}
            poster={documentary.videoPoster}
            label={documentary.videoLabel}
            title={documentary.title}
            className="archive-screening-mount"
          />
        </ArchiveReveal>
      ) : null}

      {documentary.plates?.length ? (
        <section className="archive-sheet">
          <div className="archive-sheet-head">
            <p className="archive-eyebrow">Contact sheet</p>
            <p className="archive-slip">{documentary.plates.length} frames</p>
          </div>

          <ArchiveContactSheet plates={documentary.plates} />
        </section>
      ) : null}

      <footer className="archive-colophon">
        {documentary.colophon ? <p>{documentary.colophon}</p> : null}
        <Link href={backHref} className="archive-link">
          {documentary.projectTitle ? `← ${documentary.projectTitle}` : '← Back'}
        </Link>
      </footer>
    </main>
  );
}
