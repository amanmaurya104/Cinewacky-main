import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Documentary, DocumentaryPassage } from '@/types/documentary';
import TuningBroadcasts from './TuningBroadcasts';
import TuningDial from './TuningDial';
import TuningGallery from './TuningGallery';
import TuningOrchestra from './TuningOrchestra';
import { pad } from './format';
import { SIGNAL_HEIGHT, SIGNAL_WIDTH, signalPath } from './signal';

type Props = {
  documentary: Documentary;
};

/** The "2" in the title is set in the lyric italic, in teal. */
function Title({ text }: { text: string }) {
  return (
    <>
      {text.split(/\b(2)\b/).map((part, index) =>
        part === '2' ? (
          <span key={index} className="tuning-title-two">
            2
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Four bars of signal strength, the mark every section head carries. */
function Bars() {
  return (
    <span className="tuning-bars" aria-hidden>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/**
 * Section head, set as a channel readout: CH 03 · eyebrow, then the title.
 * `hiddenTitle` keeps the title for screen readers only, for a section whose
 * eyebrow already says it all on screen.
 */
function Channel({
  number,
  eyebrow,
  title,
  hiddenTitle = false,
  id,
}: {
  number: number;
  eyebrow?: string;
  title?: string;
  hiddenTitle?: boolean;
  id: string;
}) {
  return (
    <header className="tuning-head">
      <p className="tuning-channel">
        <Bars />
        <span className="tuning-channel-number">CH {pad(number)}</span>
        {eyebrow ? <span>{eyebrow}</span> : null}
      </p>
      {title ? (
        <h2 id={id} className={hiddenTitle ? 'tuning-visually-hidden' : 'tuning-heading'}>
          {title}
        </h2>
      ) : null}
    </header>
  );
}

function Prose({ passage, className }: { passage: DocumentaryPassage; className?: string }) {
  return (
    <div className={`tuning-prose${className ? ` ${className}` : ''}`}>
      {passage.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * The music series, used by documentaries with `theme: 'tuning'`.
 *
 * Tuning 2 You is a travelogue about musicians, and its own title is a radio
 * pun, so the page is laid out on a tuning dial. The six episodes are stations
 * on one band with a needle that moves between them; the section heads are
 * channel readouts; the trailers are a playlist; the kit list is a band's tech
 * rider; the musicians' portraits are mounted as record sleeves, sides A and B.
 *
 * The palette is the client's: warm ivory paper and deep teal ink, from the
 * theme artwork whose line-drawn instruments frame the hero and move. The
 * dial, the figures and the broadcast band are set as deep-teal panels —
 * "lighting" in the brief — with the ivory carried as their type.
 *
 * Photographs are placed by named slot and the whole delivered set is repeated
 * in the closing gallery, so a new batch of stills only repoints the slots.
 *
 * Everything is scoped under `.tuning`.
 */
export default function TuningDocumentary({ documentary }: Props) {
  const tuning = documentary.tuning;
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  if (!tuning) return null;

  const episodeCount = tuning.episodes.length;
  const loudest = Math.max(...tuning.mosaic.map((fact) => Number(fact.value) || 0), 1);

  return (
    <main className="tuning">
      {/* ---- hero ---- */}

      <header className="tuning-hero">
        <TuningOrchestra />

        <div className="tuning-hero-type">
          <p className="tuning-onair">
            <span className="tuning-onair-dot" aria-hidden />
            On air
          </p>
          <h1 className="tuning-title">
            <Title text={documentary.title} />
          </h1>
          <p className="tuning-subtitle">{tuning.subtitle}</p>
          <p className="tuning-epigraph">{tuning.epigraph}</p>
          <ul className="tuning-format">
            {tuning.format.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <nav
          className="tuning-hero-band"
          aria-label="Jump to an episode"
          style={{ '--stations': episodeCount } as CSSProperties}
        >
          <span className="tuning-band-scale" aria-hidden />
          <span className="tuning-hero-needle" aria-hidden />
          <ol className="tuning-hero-stations">
            {tuning.episodes.map((episode, index) => (
              <li key={episode.place}>
                <a href={`#ep-${index + 1}`}>
                  <span className="tuning-station-number">{pad(index + 1)}</span>
                  <span className="tuning-station-place">{episode.place}</span>
                  <span className="tuning-station-code" aria-hidden>
                    {episode.place.slice(0, 3)}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* The hero belongs to the drawn instruments; the first photograph
          opens the page directly under them, at full width. */}
      <figure className="tuning-opening">
        <div className="tuning-opening-frame">
          <Image
            src={tuning.heroPlate.src}
            alt={tuning.heroPlate.caption ?? documentary.title}
            fill
            sizes="(max-width: 1340px) 92vw, 1240px"
          />
        </div>
        {tuning.heroPlate.caption ? <figcaption>{tuning.heroPlate.caption}</figcaption> : null}
      </figure>

      {/* ---- 01 liner notes ---- */}

      <section className="tuning-section tuning-liner" aria-labelledby="tuning-liner-title">
        <Channel
          number={1}
          eyebrow="Liner notes"
          title="Liner notes"
          hiddenTitle
          id="tuning-liner-title"
        />

        <div className="tuning-liner-grid">
          <div className="tuning-liner-copy">
            <p className="tuning-lede">{tuning.overture[0]}</p>
            {tuning.overture.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="tuning-liner-coda">
                {paragraph}
              </p>
            ))}

            <ol className="tuning-roles">
              {tuning.roles.map((role, index) => (
                <li key={role.title}>
                  <span className="tuning-roles-number" aria-hidden>
                    {pad(index + 1)}
                  </span>
                  <h3 className="tuning-subheading">{role.title}</h3>
                  <p>{role.note}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="tuning-liner-side">
            <dl className="tuning-record">
              {tuning.record.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="tuning-liner-plates">
              {tuning.liner.map((plate) => (
                <figure key={plate.src}>
                  <div className="tuning-liner-frame">
                    <Image
                      src={plate.src}
                      alt={plate.caption ?? ''}
                      fill
                      sizes="(max-width: 900px) 80vw, 30vw"
                      loading="lazy"
                    />
                  </div>
                  {plate.caption ? <figcaption>{plate.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ---- 02 overview ---- */}

      <section className="tuning-overview" aria-labelledby="tuning-overview-title">
        <div className="tuning-overview-media" aria-hidden>
          <Image
            src={tuning.overviewPlate.src}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            loading="lazy"
          />
        </div>
        <div className="tuning-overview-inner">
          <Channel
            number={2}
            eyebrow={tuning.overview.eyebrow}
            title={tuning.overview.title}
            id="tuning-overview-title"
          />
          <Prose passage={tuning.overview} className="tuning-prose--statement" />
        </div>
      </section>

      {/* ---- 03 the dial ---- */}

      <section className="tuning-section tuning-tune" aria-labelledby="tuning-tune-title">
        <Channel
          number={3}
          eyebrow="Tune in"
          title={`${episodeCount} episodes, ${episodeCount} states`}
          id="tuning-tune-title"
        />
        <TuningDial
          episodes={tuning.episodes}
          broadcasts={tuning.broadcasts}
          signals={tuning.episodes.map((_, index) => signalPath(index + 1))}
        />
      </section>

      {/* ---- the mosaic, as a crescendo ---- */}

      <section className="tuning-mosaic" aria-label="The series in numbers">
        <figure className="tuning-mosaic-plate">
          <Image
            src={tuning.mosaicPlate.src}
            alt={tuning.mosaicPlate.caption ?? ''}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={60}
            loading="lazy"
          />
        </figure>
        <div className="tuning-mosaic-copy">
          <ul className="tuning-crescendo">
            {tuning.mosaic.map((fact) => (
              <li
                key={fact.label}
                style={
                  {
                    '--v': Math.sqrt((Number(fact.value) || 0) / loudest),
                  } as CSSProperties
                }
              >
                <span className="tuning-crescendo-value">{fact.value}</span>
                <span className="tuning-crescendo-label">{fact.label}</span>
              </li>
            ))}
          </ul>
          <p className="tuning-mosaic-line">{tuning.mosaicLine}</p>
          <svg
            className="tuning-mosaic-signal"
            viewBox={`0 0 ${SIGNAL_WIDTH} ${SIGNAL_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={signalPath(episodeCount + 3)} />
          </svg>
        </div>
      </section>

      {/* ---- 04 the production ---- */}

      <section className="tuning-section tuning-craft" aria-labelledby="tuning-craft-title">
        <Channel
          number={4}
          eyebrow={tuning.craft.eyebrow}
          title={tuning.craft.title}
          id="tuning-craft-title"
        />

        <div className="tuning-split">
          <Prose passage={tuning.craft} />

          <table className="tuning-rider">
            <caption>Tech rider — on the road</caption>
            <thead>
              <tr>
                <th scope="col">Ch</th>
                <th scope="col">Qty</th>
                <th scope="col">Item</th>
              </tr>
            </thead>
            <tbody>
              {tuning.rider.map((row, index) => (
                <tr key={row.item}>
                  <td className="tuning-rider-channel">
                    <span className="tuning-rider-led" aria-hidden />
                    {pad(index + 1)}
                  </td>
                  <td className="tuning-rider-quantity">{row.quantity}</td>
                  <th scope="row">
                    {row.item}
                    {row.note ? <span>{row.note}</span> : null}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="tuning-backstage">
          {tuning.backstage.map((plate) => (
            <li key={plate.src}>
              <figure>
                <div className="tuning-backstage-frame">
                  <Image
                    src={plate.src}
                    alt={plate.caption ?? ''}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 31vw"
                    quality={60}
                    loading="lazy"
                  />
                </div>
                {plate.caption ? <figcaption>{plate.caption}</figcaption> : null}
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- 05 the musicians ---- */}

      <section className="tuning-section tuning-standout" aria-labelledby="tuning-standout-title">
        <Channel
          number={5}
          eyebrow={tuning.standout.eyebrow}
          title={tuning.standout.title}
          id="tuning-standout-title"
        />
        <Prose passage={tuning.standout} className="tuning-prose--columns" />

        <ul className="tuning-sleeves">
          {tuning.sleeves.map((plate, index) => {
            const half = Math.ceil(tuning.sleeves.length / 2);
            const side = index < half ? 'A' : 'B';
            const track = (index % half) + 1;
            return (
              <li key={plate.src} className="tuning-sleeve">
                <span className="tuning-sleeve-disc" aria-hidden />
                <div className="tuning-sleeve-cover">
                  <Image
                    src={plate.src}
                    alt={plate.caption ?? ''}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1100px) 42vw, 26vw"
                    loading="lazy"
                  />
                </div>
                <p className="tuning-sleeve-label">
                  <span>
                    {side}
                    {track}
                  </span>
                  {plate.caption}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- 06 broadcasts ---- */}

      <section className="tuning-section tuning-air" aria-labelledby="tuning-air-title">
        <Channel
          number={6}
          eyebrow="Broadcasts"
          title="Trailers & teasers"
          id="tuning-air-title"
        />
        <TuningBroadcasts broadcasts={tuning.broadcasts} />
      </section>

      <section className="tuning-streaming" aria-label="Clients and broadcasters">
        <p className="tuning-streaming-quote">{tuning.streaming}</p>
        <div className="tuning-marquee">
          <ul className="tuning-marquee-track">
            {tuning.networks.map((network) => (
              <li key={network.name}>
                {network.logo ? (
                  <Image src={network.logo} alt={network.name} width={160} height={48} />
                ) : (
                  network.name
                )}
              </li>
            ))}
          </ul>
          {/* The second copy closes the loop; screen readers get the first. */}
          <ul className="tuning-marquee-track" aria-hidden>
            {tuning.networks.map((network) => (
              <li key={network.name}>
                {network.logo ? (
                  <Image src={network.logo} alt="" width={160} height={48} />
                ) : (
                  network.name
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 07 gallery ---- */}

      <section className="tuning-section tuning-sheet" aria-labelledby="tuning-sheet-title">
        <div className="tuning-sheet-head">
          <Channel
            number={7}
            eyebrow="Contact sheet"
            title="The road, frame by frame"
            id="tuning-sheet-title"
          />
          <p className="tuning-sheet-count">{tuning.gallery.length} frames</p>
        </div>
        <TuningGallery plates={tuning.gallery} />
      </section>

      {/* ---- 08 credits ---- */}

      <footer className="tuning-section tuning-credits" aria-labelledby="tuning-credits-title">
        <Channel number={8} eyebrow="Credits" title="The visionaries" id="tuning-credits-title" />

        <dl className="tuning-credits-list">
          {tuning.visionaries.map((credit) => (
            <div key={`${credit.role}-${credit.name}`}>
              <dt>{credit.role}</dt>
              <dd data-house={credit.name === 'Cinewacky' || undefined}>{credit.name}</dd>
            </div>
          ))}
        </dl>

        <p className="tuning-credits-note">{tuning.visionariesNote}</p>

        <div className="tuning-colophon">
          {documentary.colophon ? <p>{documentary.colophon}</p> : null}
          <Link href={backHref} className="tuning-back">
            <span aria-hidden>←</span> {documentary.projectTitle ?? 'Back'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
