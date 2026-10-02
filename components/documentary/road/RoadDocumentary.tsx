import Image from 'next/image';
import Link from 'next/link';
import { roadDisplay, roadText, roadUtility } from '@/lib/fonts';
import type { Documentary, DocumentaryPassage } from '@/types/documentary';

type Props = {
  documentary: Documentary;
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Section head, set as a milestone: the number on a vermilion stone, the
 * brief's own heading beside it, the title under both.
 */
function Milestone({
  number,
  passage,
  id,
}: {
  number: number;
  passage: DocumentaryPassage;
  id: string;
}) {
  return (
    <header className="road-head">
      <p className="road-mark">
        <span className="road-stone" aria-hidden>
          {pad(number)}
        </span>
        {passage.eyebrow ? <span>{passage.eyebrow}</span> : null}
      </p>
      {passage.title ? (
        <h2 id={id} className="road-heading">
          {passage.title}
        </h2>
      ) : null}
    </header>
  );
}

function Prose({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`road-prose${className ? ` ${className}` : ''}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * The tour record, used by documentaries with `theme: 'road'`.
 *
 * King of the Road documents one stop — Kolkata — of a travelling Wim Wenders
 * retrospective, and the only pictures delivered with it are the tour's own
 * artwork and one frame of the film. So the page borrows the poster's language
 * rather than inventing one: warm poster paper, condensed vermilion caps,
 * black-and-white photography mounted like collage, a typewritten film list,
 * the city names run up the margin.
 *
 * What it adds is the road. A dashed lane line runs down the page, sections
 * are numbered on milestones, and the tour is drawn as a road through five
 * cities with the one this film was made in lit. Nothing on the route carries
 * a date the brief does not give.
 *
 * It is warm paper where the passage page is cold stone and the craft page is
 * pale card, and its accent is vermilion, which no other page uses.
 *
 * Everything is scoped under `.road`.
 */
export default function RoadDocumentary({ documentary }: Props) {
  const road = documentary.road;
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  const fonts = [roadDisplay.variable, roadText.variable, roadUtility.variable].join(' ');

  if (!road) return null;

  const cities = road.stops.map((stop) => stop.city).join(' — ');

  return (
    <main className={`road ${fonts}`}>
      <div className="road-lane" aria-hidden />

      {/* ---- hero ---- */}

      <header className="road-hero">
        <p className="road-hero-cities" aria-hidden>
          {cities}
        </p>

        <div className="road-hero-type">
          <p className="road-kicker">{road.kicker}</p>
          <h1 className="road-title">{documentary.title}</h1>
          <p className="road-subtitle">{road.subtitle}</p>
          <ul className="road-counts">
            {road.counts.map((count) => (
              <li key={count}>{count}</li>
            ))}
          </ul>
          <p className="road-span">({road.routeSpan})</p>
        </div>

        <figure className="road-hero-collage">
          <span className="road-block" aria-hidden />
          <span className="road-tape" aria-hidden />
          <div className="road-hero-frame">
            <Image
              src={road.heroPlate.src}
              alt={road.heroPlate.caption ?? documentary.title}
              fill
              sizes="(max-width: 900px) 92vw, 58vw"
              quality={78}
              priority
            />
          </div>
          {road.heroPlate.caption ? (
            <figcaption>{road.heroPlate.caption}</figcaption>
          ) : null}
        </figure>
      </header>

      {/* ---- lede ---- */}

      <section className="road-opening" aria-label="Introduction">
        <p className="road-lede">{road.lede}</p>
        <Prose paragraphs={road.overture} className="road-prose--columns" />
      </section>

      {/* ---- the route ---- */}

      <section className="road-route" aria-labelledby="road-route-title">
        <div className="road-route-head">
          <h2 id="road-route-title" className="road-route-title">
            {road.routeTitle}
          </h2>
          <p className="road-route-span">{road.routeSpan}</p>
        </div>

        <ol className="road-route-line">
          {road.stops.map((stop) => (
            <li
              key={stop.city}
              className={`road-stop${stop.here ? ' road-stop--here' : ''}`}
              aria-current={stop.here ? 'location' : undefined}
            >
              <span className="road-stop-pin" aria-hidden />
              <span className="road-stop-city">{stop.city}</span>
              {stop.dates ? <span className="road-stop-dates">{stop.dates}</span> : null}
              {stop.here ? <span className="road-stop-flag">Filmed here</span> : null}
            </li>
          ))}
        </ol>
      </section>

      {/* ---- 01 life ---- */}

      <section className="road-section road-life" aria-labelledby="road-life-title">
        <Milestone number={1} passage={road.life} id="road-life-title" />

        <div className="road-split">
          <div>
            <Prose paragraphs={road.life.paragraphs} />
            <blockquote className="road-pull">
              <p>{road.lifeCoda}</p>
            </blockquote>
          </div>

          <div className="road-slip">
            <p className="road-slip-label">Selected filmography</p>
            <ol className="road-films">
              {road.filmography.map((film, index) => (
                <li key={film.title}>
                  <span className="road-films-number">{index + 1}.</span>
                  <span className="road-films-title">{film.title}</span>
                  <span className="road-films-year">({film.year})</span>
                </li>
              ))}
            </ol>
            <p className="road-slip-note">{road.filmographyNote}</p>
          </div>
        </div>
      </section>

      {/* ---- 02 the tour ---- */}

      <section className="road-section road-tour" aria-labelledby="road-tour-title">
        <Milestone number={2} passage={road.tour} id="road-tour-title" />
        <Prose paragraphs={road.tour.paragraphs} className="road-prose--columns" />

        <ul className="road-tickets">
          {road.tourLevels.map((level, index) => (
            <li key={level.title} className="road-ticket">
              <span className="road-ticket-stub" aria-hidden>
                {pad(index + 1)}
              </span>
              <div className="road-ticket-body">
                <h3 className="road-subheading">{level.title}</h3>
                <p>{level.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- 03 Kolkata ---- */}

      <section className="road-section road-kolkata" aria-labelledby="road-kolkata-title">
        <Milestone number={3} passage={road.kolkata} id="road-kolkata-title" />

        <div className="road-split">
          <Prose paragraphs={road.kolkata.paragraphs} />

          <dl className="road-schedule">
            {road.kolkataFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {road.kolkataPlate ? (
          <figure className="road-kolkata-plate">
            <div className="road-kolkata-frame">
              <Image
                src={road.kolkataPlate.src}
                alt={road.kolkataPlate.caption ?? ''}
                fill
                sizes="100vw"
                quality={75}
                loading="lazy"
              />
            </div>
            {road.kolkataPlate.caption ? (
              <figcaption>{road.kolkataPlate.caption}</figcaption>
            ) : null}
          </figure>
        ) : null}
      </section>

      {/* ---- 04 perspective ---- */}

      <section className="road-section road-perspective" aria-labelledby="road-perspective-title">
        <Milestone number={4} passage={road.perspective} id="road-perspective-title" />
        <Prose paragraphs={road.perspective.paragraphs} />

        <ol className="road-ideas">
          {road.ideas.map((idea, index) => (
            <li key={idea.title}>
              <span className="road-ideas-number" aria-hidden>
                {pad(index + 1)}
              </span>
              <h3 className="road-subheading">{idea.title}</h3>
              <p>{idea.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- the tour artwork ---- */}

      {road.artwork.length ? (
        <section className="road-section road-artwork" aria-label="Tour artwork">
          <ul className="road-artwork-wall">
            {road.artwork.map((piece) => (
              <li key={piece.src}>
                <figure>
                  <Image
                    src={piece.src}
                    alt={piece.caption ?? ''}
                    width={piece.width ?? 800}
                    height={piece.height ?? 600}
                    sizes="(max-width: 900px) 92vw, 44vw"
                    quality={82}
                    loading="lazy"
                  />
                  {piece.caption ? <figcaption>{piece.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ---- closing statement and credits ---- */}

      <footer className="road-credits">
        <p className="road-card">{road.card}</p>

        <div className="road-credits-grid">
          <dl className="road-credits-list road-credits-list--partners">
            {road.associations.map((credit) => (
              <div key={`${credit.role}-${credit.name}`}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>

          <dl className="road-credits-list">
            {road.crew.map((credit) => (
              <div key={`${credit.role}-${credit.name}`}>
                <dt>{credit.role}</dt>
                <dd data-house={credit.name.startsWith('Cinewacky') || undefined}>
                  {credit.name}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="road-colophon">
          {documentary.colophon ? <p>{documentary.colophon}</p> : null}
          <Link href={backHref} className="road-back">
            {documentary.projectTitle ?? 'Back'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
