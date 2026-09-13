import Image from 'next/image';
import Link from 'next/link';
import DocumentaryVideo from '@/components/documentary/DocumentaryVideo';
import SilentLoop from '@/components/documentary/SilentLoop';
import {
  passageBengali,
  passageDisplay,
  passageText,
  passageUtility,
} from '@/lib/fonts';
import type { Documentary } from '@/types/documentary';

type Props = {
  documentary: Documentary;
};

const NUMERALS = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII',
];

/**
 * Anchor id for a station. The index is part of it because a journey can come
 * back to a place it has already been — this film returns to Dungannon at the
 * end — and two stations named the same must not share an id or a React key.
 */
function stationId(place: string, index: number): string {
  return `station-${index + 1}-${place.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

/**
 * The memorial, used by documentaries with `theme: 'passage'`.
 *
 * The film is a journey between two names, so the page is filed by the places
 * on it: each chapter is a station, and the marker in its margin — numeral,
 * place, county, year — is the section head. There are no eyebrow labels
 * anywhere, because the place is the label.
 *
 * One idea carries the whole layout. Every frame in this documentary was shot
 * in Ireland, in weather, and the only warm colour in any of it is the ochre of
 * a nun's robe in an interview. So the page sits on cold wet stone and holds
 * exactly one warm accent, and that accent travels: each station sets a
 * `--travel` between 0 and 1, and the marker, the rule and the small type mix
 * that far from slate toward ochre. By the last station the page has crossed
 * over. The colour is the argument, which is why it is computed from the
 * station's position rather than written into the data.
 *
 * It is dark where the craft page is paper, and grey-green where the archive
 * and dragon pages are black, so the five bespoke pages stay apart.
 *
 * Everything is scoped under `.passage` so it cannot reach the archive album,
 * the dragon market, the craft record or the default documentary template.
 */
export default function PassageDocumentary({ documentary }: Props) {
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  const fonts = [
    passageDisplay.variable,
    passageText.variable,
    passageUtility.variable,
    passageBengali.variable,
  ].join(' ');

  const stations = documentary.stations ?? [];

  // 0 at the first station, 1 at the last. A single station sits at 0 rather
  // than dividing by zero.
  const travel = (index: number) =>
    stations.length > 1 ? index / (stations.length - 1) : 0;

  return (
    <main className={`passage ${fonts}`}>
      <div className="passage-ground" aria-hidden />

      {/* ---- hero ---- */}

      <header className="passage-hero">
        <div className="passage-mast">
          {documentary.commission ? (
            <p className="passage-mast-commission">{documentary.commission}</p>
          ) : null}

          {/* The title is the journey, so it is set as the journey: the name
            * she was born with, a rule the width of the page, the name she was
            * given. The <h1> carries the whole thing for a screen reader. */}
          <h1 className="passage-mast-title">
            {documentary.bornName && documentary.givenName ? (
              <>
                <span className="passage-mast-from">{documentary.bornName}</span>
                <span className="passage-mast-rule" aria-hidden />
                <span className="passage-mast-to">{documentary.givenName}</span>
              </>
            ) : (
              documentary.title
            )}
          </h1>

          {documentary.tagline ? (
            <p className="passage-mast-line">{documentary.tagline}</p>
          ) : null}

          {documentary.factLine?.length ? (
            <ul className="passage-mast-facts">
              {documentary.factLine.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="passage-hero-backdrop" aria-hidden>
          {documentary.heroLoop ? (
            <SilentLoop
              src={documentary.heroLoop}
              poster={documentary.heroPoster}
              className="passage-hero-loop"
            />
          ) : null}
          <div className="passage-hero-veil" />
        </div>
      </header>

      {/* ---- the name, and the one photograph ---- */}

      {documentary.givenBengali || documentary.portrait ? (
        <section className="passage-name" aria-labelledby="passage-name-title">
          {documentary.portrait ? (
            <figure className="passage-portrait">
              <div className="passage-portrait-window">
                <Image
                  src={documentary.portrait.src}
                  alt={documentary.portrait.caption ?? documentary.title}
                  fill
                  sizes="(max-width: 900px) 62vw, 28vw"
                  quality={75}
                  priority
                />
              </div>
              {documentary.portrait.caption ? (
                <figcaption>{documentary.portrait.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="passage-name-body">
            <h2 id="passage-name-title" className="passage-name-heading">
              The name
            </h2>

            {documentary.bornName ? (
              <p className="passage-name-born">{documentary.bornName}</p>
            ) : null}

            {documentary.givenBengali ? (
              <p className="passage-name-bengali" lang="bn">
                {documentary.givenBengali}
              </p>
            ) : null}

            <p className="passage-name-gloss">
              {documentary.givenRoman ? (
                <span className="passage-name-roman">
                  {documentary.givenRoman}
                </span>
              ) : null}
              {documentary.givenMeaning ? (
                <span className="passage-name-meaning">
                  {documentary.givenMeaning}
                </span>
              ) : null}
            </p>

            {documentary.givenOn ? (
              <p className="passage-name-on">{documentary.givenOn}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---- opening prose ---- */}

      {documentary.overture?.length ? (
        <section className="passage-overture">
          {documentary.epigraph ? (
            <p className="passage-epigraph">{documentary.epigraph}</p>
          ) : null}

          <div className="passage-overture-prose">
            {documentary.overture.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {/* ---- the itinerary: the whole film as a list of places ---- */}

      {stations.length ? (
        <nav className="passage-itinerary" aria-label="Places">
          <ol className="passage-itinerary-list">
            {stations.map((station, index) => (
              <li key={stationId(station.place, index)}>
                <a
                  className="passage-itinerary-stop"
                  href={`#${stationId(station.place, index)}`}
                  style={
                    { '--travel': travel(index) } as React.CSSProperties
                  }
                >
                  <span className="passage-itinerary-dot" aria-hidden />
                  <span className="passage-itinerary-place">
                    {station.place}
                  </span>
                  {station.year ? (
                    <span className="passage-itinerary-year">
                      {station.year}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {/* ---- one chapter per place ---- */}

      {stations.length ? (
        <div className="passage-road">
          {stations.map((station, index) => (
            <section
              key={stationId(station.place, index)}
              id={stationId(station.place, index)}
              className="passage-station"
              style={{ '--travel': travel(index) } as React.CSSProperties}
              aria-labelledby={`${stationId(station.place, index)}-title`}
            >
              {/* Sticky, so the place stays named for as long as its chapter
                * runs — the reader should never have to scroll back to find
                * out where they are. */}
              <div className="passage-marker">
                <span className="passage-marker-dot" aria-hidden />
                <span className="passage-marker-numeral" aria-hidden>
                  {NUMERALS[index] ?? String(index + 1)}
                </span>
                <span className="passage-marker-place">{station.place}</span>
                {station.region ? (
                  <span className="passage-marker-region">{station.region}</span>
                ) : null}
                {station.year ? (
                  <span className="passage-marker-year">{station.year}</span>
                ) : null}
              </div>

              <div className="passage-station-body">
                <h2
                  id={`${stationId(station.place, index)}-title`}
                  className="passage-heading"
                >
                  {station.title}
                </h2>

                <div className="passage-prose">
                  {station.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>

                {/* Lettering the camera found, set the way it was cut: caps,
                  * letterspaced, centred on its own stone. */}
                {station.inscription ? (
                  <figure className="passage-stone">
                    <blockquote>{station.inscription}</blockquote>
                    {station.inscriptionSource ? (
                      <figcaption>{station.inscriptionSource}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </div>

              {station.motion ? (
                <figure className="passage-motion">
                  <div className="passage-motion-window">
                    <SilentLoop
                      src={station.motion.src}
                      poster={station.motion.poster}
                      className="passage-motion-media"
                    />
                  </div>
                  {station.motion.caption ? (
                    <figcaption>{station.motion.caption}</figcaption>
                  ) : null}
                </figure>
              ) : null}

              {station.plates?.length ? (
                <div className="passage-mounts" data-count={station.plates.length}>
                  {station.plates.map((plate) => (
                    <figure
                      key={plate.src}
                      className={`passage-mount${plate.tall ? ' passage-mount--tall' : ''}`}
                    >
                      <div className="passage-mount-window">
                        <Image
                          src={plate.src}
                          alt={plate.caption ?? ''}
                          fill
                          sizes="(max-width: 900px) 92vw, 44vw"
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
        </div>
      ) : null}

      {/* ---- the ledger: what the town keeps, what the name carries ---- */}

      {documentary.ledger?.length ? (
        <section className="passage-ledger" aria-labelledby="passage-ledger-title">
          <div className="passage-ledger-head">
            {documentary.ledgerTitle ? (
              <h2 id="passage-ledger-title" className="passage-heading">
                {documentary.ledgerTitle}
              </h2>
            ) : null}
            {documentary.ledgerNote ? (
              <p className="passage-ledger-note">{documentary.ledgerNote}</p>
            ) : null}
          </div>

          <div className="passage-ledger-columns" aria-hidden>
            <span>{documentary.ledgerHereLabel}</span>
            <span>{documentary.ledgerThereLabel}</span>
          </div>

          <ol className="passage-ledger-list">
            {documentary.ledger.map((row) => (
              <li key={row.here} className="passage-ledger-row">
                <span className="passage-ledger-here">{row.here}</span>
                <span className="passage-ledger-join" aria-hidden />
                <span className="passage-ledger-there">{row.there}</span>
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
          className="passage-watch"
        />
      ) : null}

      {/* ---- the epitaph, then the contact sheet ---- */}

      {documentary.epitaph ? (
        <section className="passage-epitaph">
          <blockquote>{documentary.epitaph}</blockquote>
          {documentary.epitaphSource ? (
            <p className="passage-epitaph-source">{documentary.epitaphSource}</p>
          ) : null}
        </section>
      ) : null}

      {documentary.plates?.length ? (
        <section className="passage-sheet" aria-labelledby="passage-sheet-title">
          <div className="passage-sheet-head">
            {documentary.sheetHeading ? (
              <h2 id="passage-sheet-title" className="passage-heading">
                {documentary.sheetHeading}
              </h2>
            ) : null}
            <p className="passage-sheet-count">
              {documentary.plates.length} frames off a twenty-minute film
            </p>
          </div>

          <ol className="passage-sheet-grid">
            {documentary.plates.map((plate, index) => (
              <li key={plate.src}>
                <figure className="passage-chip">
                  <div className="passage-chip-window">
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
                    <span className="passage-chip-number">
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

      <footer className="passage-colophon">
        {documentary.credits?.length ? (
          <dl className="passage-credits">
            {documentary.credits.map((credit) => (
              <div key={credit.role}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {documentary.awards?.length ? (
          <ul className="passage-awards">
            {documentary.awards.map((award) => (
              <li key={award.title}>
                <span className="passage-award-title">{award.title}</span>
                {award.detail ? (
                  <span className="passage-award-detail">{award.detail}</span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="passage-colophon-foot">
          {documentary.colophon ? <p>{documentary.colophon}</p> : null}
          <Link href={backHref} className="passage-back">
            {documentary.projectTitle ? documentary.projectTitle : 'Back'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
