import Image from 'next/image';
import Link from 'next/link';
import DocumentaryVideo from '@/components/documentary/DocumentaryVideo';
import SilentLoop from '@/components/documentary/SilentLoop';
import { risingDisplay, risingText, risingUtility } from '@/lib/fonts';
import type { Documentary, DocumentaryPassage } from '@/types/documentary';

type Props = {
  documentary: Documentary;
};

const pad = (n: number) => String(n).padStart(2, '0');

/** Section head: a file number, the dossier's own heading, and the title. */
function FileHead({
  file,
  passage,
  id,
}: {
  file: number;
  passage: DocumentaryPassage;
  id: string;
}) {
  return (
    <header className="rising-file-head">
      <p className="rising-file-tab">
        <span className="rising-file-number">File {pad(file)}</span>
        {passage.eyebrow ? <span>{passage.eyebrow}</span> : null}
      </p>
      {passage.title ? (
        <h2 id={id} className="rising-heading">
          {passage.title}
        </h2>
      ) : null}
    </header>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="rising-prose">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * The development dossier, used by documentaries with `theme: 'rising'`.
 *
 * Dark Rising is not a finished film but a series in development with a
 * proof of concept shot in Kibera, and the page is built from a research
 * dossier that is careful about the difference. So the page is filed as a
 * case record — numbered files and a record sheet — and the
 * dossier's caveats print as notes beside the facts they qualify instead of
 * being smoothed away.
 *
 * The look is lifted off the footage. Every frame of the proof of concept is
 * backlit dusk over tin roofs: a low ember sun, mauve sky, and shadow that is
 * blue rather than black. The page starts in that dusk and lets the dark rise
 * as it scrolls — the glow at the foot of the viewport sinks and the ground
 * goes to night — which is the title, done as a background. The one cold
 * accent is steel, from the bevelled title card, and it is kept for the title
 * and the metal-power card; the one warm accent is the ember of the sun.
 *
 * It is black-blue where the archive and dragon pages are pure black and the
 * passage page is pale stone, so the bespoke pages stay apart.
 *
 * Everything is scoped under `.rising`.
 */
export default function RisingDocumentary({ documentary }: Props) {
  const dossier = documentary.dossier;
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  const fonts = [
    risingDisplay.variable,
    risingText.variable,
    risingUtility.variable,
  ].join(' ');

  if (!dossier) return null;

  return (
    <main className={`rising ${fonts}`}>
      <div className="rising-sky" aria-hidden>
        <div className="rising-sky-glow" />
      </div>

      {/* ---- hero ---- */}

      <header className="rising-hero">
        <div className="rising-hero-backdrop" aria-hidden>
          {documentary.heroLoop ? (
            <SilentLoop
              src={documentary.heroLoop}
              poster={documentary.heroPoster}
              className="rising-hero-loop"
            />
          ) : null}
          <div className="rising-hero-veil" />
        </div>

        <div className="rising-hero-top">
          <p className="rising-hero-studio">
            {dossier.producedBy}
            <span aria-hidden> · </span>
            <span className="rising-hero-assoc">
              in association with {dossier.associate}
            </span>
          </p>
        </div>

        <div className="rising-hero-title">
          <h1 className="rising-title">{documentary.title}</h1>
          <span className="rising-horizon" aria-hidden>
            <span className="rising-sun" />
          </span>
          {documentary.tagline ? (
            <p className="rising-tagline">{documentary.tagline}</p>
          ) : null}
          {documentary.factLine?.length ? (
            <ul className="rising-facts">
              {documentary.factLine.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {/* ---- the record ---- */}

      <section className="rising-record" aria-labelledby="rising-record-title">
        <header className="rising-file-head">
          <p className="rising-file-tab">
            <span className="rising-file-number">File 00</span>
            <span>Basic information</span>
          </p>
          <h2 id="rising-record-title" className="rising-heading">
            The record
          </h2>
        </header>

        <dl className="rising-record-sheet">
          {dossier.record.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <aside className="rising-note rising-note--key">
          <p className="rising-note-label">On the record</p>
          <p>{dossier.recordNote}</p>
        </aside>
      </section>

      {/* ---- the question ---- */}

      <section className="rising-question" aria-label="The central question">
        <div className="rising-question-frame" aria-hidden>
          <Image
            src={dossier.questionPlate.src}
            alt=""
            fill
            sizes="100vw"
            quality={75}
          />
        </div>
        <blockquote className="rising-question-text">
          <p>{dossier.question}</p>
        </blockquote>
      </section>

      {/* ---- 01 the concept ---- */}

      <section className="rising-file rising-concept" aria-labelledby="rising-concept-title">
        <FileHead file={1} passage={dossier.concept} id="rising-concept-title" />

        <div className="rising-split">
          <div>
            <Prose paragraphs={dossier.concept.paragraphs} />
            <p className="rising-coda">{dossier.conceptCoda}</p>
          </div>

          <ol className="rising-index" aria-label="Main thematic areas">
            {dossier.themes.map((theme, index) => (
              <li key={theme.title}>
                <span className="rising-index-number" aria-hidden>
                  {pad(index + 1)}
                </span>
                <span className="rising-index-title">{theme.title}</span>
                <span className="rising-index-note">{theme.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- 02 the story, at two scales ---- */}

      <section className="rising-file rising-story" aria-labelledby="rising-story-title">
        <FileHead file={2} passage={dossier.story} id="rising-story-title" />
        <Prose paragraphs={dossier.story.paragraphs} />

        {/* Solid for what was shot, outline for what is only proposed. */}
        <ol className="rising-levels">
          {dossier.levels.map((level) => (
            <li key={level.level} className={`rising-level rising-level--${level.status}`}>
              {level.plate ? (
                <div className="rising-level-frame">
                  <Image
                    src={level.plate.src}
                    alt={level.plate.caption ?? ''}
                    fill
                    sizes="(max-width: 860px) 92vw, 46vw"
                    quality={75}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="rising-level-frame rising-level-frame--empty" aria-hidden>
                  <span>Not yet filmed</span>
                </div>
              )}
              <div className="rising-level-body">
                <p className="rising-level-meta">
                  <span>{level.level}</span>
                  <span className="rising-level-status">
                    {level.status === 'shot' ? 'Shot' : 'Proposed'}
                  </span>
                </p>
                <h3 className="rising-subheading">{level.title}</h3>
                <p>{level.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="rising-note">{dossier.levelsNote}</p>
      </section>

      {/* ---- 03 Kibera ---- */}

      <section className="rising-file rising-ground" aria-labelledby="rising-ground-title">
        <FileHead file={3} passage={dossier.ground} id="rising-ground-title" />

        <div className="rising-split">
          <div>
            <Prose paragraphs={dossier.ground.paragraphs} />
            <ol className="rising-reasons">
              {dossier.reasons.map((reason, index) => (
                <li key={reason.title}>
                  <span className="rising-index-number" aria-hidden>
                    {pad(index + 1)}
                  </span>
                  <h3 className="rising-subheading">{reason.title}</h3>
                  <p>{reason.note}</p>
                </li>
              ))}
            </ol>
          </div>
          <Prose paragraphs={dossier.groundCoda} />
        </div>

        <div className="rising-set">
          <p className="rising-set-label">
            From the set <span>Kibera, Nairobi</span>
          </p>
          <ul className="rising-set-wall">
            {dossier.set.map((photo) => (
              <li key={photo.src}>
                <figure>
                  <Image
                    src={photo.src}
                    alt={photo.caption ?? ''}
                    width={photo.width ?? 960}
                    height={photo.height ?? 640}
                    sizes="(max-width: 600px) 46vw, (max-width: 1100px) 31vw, 23vw"
                    quality={70}
                    loading="lazy"
                  />
                  {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 04 cast and powers ---- */}

      <section className="rising-file rising-cast" aria-labelledby="rising-cast-title">
        <header className="rising-file-head">
          <p className="rising-file-tab">
            <span className="rising-file-number">File {pad(4)}</span>
            <span>Main cast</span>
          </p>
          <h2 id="rising-cast-title" className="rising-heading">
            The people of Dark Rising
          </h2>
        </header>

        <div className="rising-powers">
          {dossier.powers.map((power) => (
            <article
              key={power.character}
              className={`rising-power rising-power--${power.element}`}
            >
              <p className="rising-power-label">Ability concept</p>
              <h3 className="rising-power-ability">{power.ability}</h3>
              <p className="rising-power-who">
                {power.character}
                {power.performer ? <span>played by {power.performer}</span> : null}
              </p>
            </article>
          ))}
          <p className="rising-note rising-powers-note">{dossier.powersNote}</p>
        </div>

        <table className="rising-roster">
          <caption className="rising-visually-hidden">Cast</caption>
          <thead>
            <tr>
              <th scope="col">Character</th>
              <th scope="col">Performer</th>
            </tr>
          </thead>
          <tbody>
            {dossier.roster.map((row) => (
              <tr key={row.character}>
                <th scope="row">{row.character}</th>
                <td>{row.performer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="rising-note">{dossier.rosterNote}</p>
      </section>

      {/* ---- 05 approach ---- */}

      <section className="rising-file rising-approach" aria-labelledby="rising-approach-title">
        <FileHead file={5} passage={dossier.approach} id="rising-approach-title" />
        <Prose paragraphs={dossier.approach.paragraphs} />

        <ol className="rising-intentions">
          {dossier.intentions.map((intention, index) => (
            <li key={intention.title}>
              {intention.plate ? (
                <div className="rising-intention-frame">
                  <Image
                    src={intention.plate.src}
                    alt={intention.plate.caption ?? ''}
                    fill
                    sizes="(max-width: 760px) 92vw, 45vw"
                    quality={72}
                    loading="lazy"
                  />
                </div>
              ) : null}
              <p className="rising-index-number" aria-hidden>
                {pad(index + 1)}
              </p>
              <h3 className="rising-subheading">{intention.title}</h3>
              <p>{intention.note}</p>
            </li>
          ))}
        </ol>

        <p className="rising-note">{dossier.approachNote}</p>
      </section>

      {/* ---- 06 the unveiling ---- */}

      <section className="rising-file rising-unveiling" aria-labelledby="rising-unveiling-title">
        <FileHead file={6} passage={dossier.unveiling} id="rising-unveiling-title" />

        <div className="rising-split">
          <div className="rising-stamp">
            <p className="rising-stamp-when">{dossier.unveilingWhen}</p>
            <p className="rising-stamp-where">{dossier.unveilingWhere}</p>
            <dl className="rising-figures">
              {dossier.figures.map((figure) => (
                <div key={figure.label}>
                  <dt>{figure.label}</dt>
                  <dd>{figure.value}</dd>
                </div>
              ))}
            </dl>
            <p className="rising-note">{dossier.figuresNote}</p>
          </div>
          <Prose paragraphs={dossier.unveiling.paragraphs} />
        </div>
      </section>

      {/* ---- the teaser ---- */}

      {documentary.video ? (
        <DocumentaryVideo
          src={documentary.video}
          poster={documentary.videoPoster}
          label={documentary.videoLabel}
          title={documentary.title}
          className="rising-watch"
        />
      ) : null}

      {/* ---- frames ---- */}

      <section className="rising-frames" aria-labelledby="rising-frames-title">
        <h2 id="rising-frames-title" className="rising-file-tab">
          <span className="rising-file-number">Frames</span>
          <span>From the proof of concept</span>
        </h2>
        <ol className="rising-frames-strip">
          {dossier.frames.map((frame, index) => (
            <li key={frame.src}>
              <div className="rising-frames-window">
                <Image
                  src={frame.src}
                  alt={frame.caption ?? `Dark Rising, frame ${index + 1}`}
                  fill
                  sizes="(max-width: 760px) 92vw, 46vw"
                  quality={70}
                  loading="lazy"
                />
              </div>
              <span className="rising-frames-number">{pad(index + 1)}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- credits ---- */}

      <footer className="rising-credits">
        <dl className="rising-companies">
          {dossier.companies.map((company) => (
            <div key={company.role}>
              <dt>{company.role}</dt>
              <dd>{company.name}</dd>
            </div>
          ))}
        </dl>

        <div className="rising-departments">
          {dossier.departments.map((department) => (
            <section key={department.department} aria-label={department.department}>
              <h3 className="rising-department-title">{department.department}</h3>
              <dl>
                {department.credits.map((credit) => (
                  <div key={credit.role}>
                    <dt>{credit.role}</dt>
                    <dd>{credit.name}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <p className="rising-note">{dossier.creditsNote}</p>

        <div className="rising-colophon">
          {documentary.colophon ? <p>{documentary.colophon}</p> : null}
          <Link href={backHref} className="rising-back">
            {documentary.projectTitle ?? 'Back'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
