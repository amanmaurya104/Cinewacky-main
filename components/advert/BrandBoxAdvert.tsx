import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { mainNavigation } from '@/data/navigation';
import { isLive, MAINTENANCE_PATH } from '@/lib/publishing';
import type {
  AdCampaign,
  AdPackshotSpot,
  AdSpot,
  AdSpreadSpot,
  AdStill,
  AdStoryboardSpot,
  AdVerticalSpot,
} from '@/types/advert';
import AdReveal from './AdReveal';
import AdSpotlightHero from './AdSpotlightHero';
import AdStoryboard from './AdStoryboard';
import AdTrailer from './AdTrailer';

const pad = (n: number) => String(n).padStart(2, '0');

/** "In a world full of noise," -> ["In a world full of ", "noise", ","] */
function splitLastWord(line: string): [string, string, string] {
  const match = line.match(/^(.*\s)?(\S+?)([.,;:!?]*)$/);
  return match ? [match[1] ?? '', match[2], match[3]] : ['', line, ''];
}

/* ---------------------------------------------------------------- spots -- */

/** The clapperboard: what the spot is, before the spot itself. */
function SlateCells({ spot }: { spot: AdSpot }) {
  return (
    <div className="ad-slate">
      <span className="ad-slate-clap" aria-hidden />
      <dl className="ad-slate-cells">
        <div>
          <dt>Spot</dt>
          <dd>{spot.number}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{spot.category}</dd>
        </div>
        <div>
          <dt>Cut</dt>
          <dd>Trailer</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{spot.trailer ? 'On air' : 'Soon'}</dd>
        </div>
      </dl>
    </div>
  );
}

function SpotHeadline({ spot }: { spot: AdSpot }) {
  return (
    <>
      <h2 id={`${spot.id}-title`} className="ad-headline">
        {spot.headline[0]} <em>{spot.headline[1]}</em>
      </h2>
      {spot.subline ? <p className="ad-subline">{spot.subline}</p> : null}
    </>
  );
}

function Plate({ still, sizes, className }: { still: AdStill; sizes: string; className?: string }) {
  return (
    <figure className={`ad-plate${className ? ` ${className}` : ''}`}>
      <Image src={still.src} alt={still.alt} fill sizes={sizes} quality={75} />
    </figure>
  );
}

/** Garments: a fashion spread, one tall plate facing the headline. */
function SpreadBody({ spot }: { spot: AdSpreadSpot }) {
  const [main, ...pair] = spot.stills;
  return (
    <>
      <SlateCells spot={spot} />
      <div className="ad-spread">
        <AdReveal className="ad-spread-main">
          <Plate still={main} sizes="(max-width: 820px) 92vw, 42vw" />
        </AdReveal>
        <div className="ad-spread-side">
          <SpotHeadline spot={spot} />
          <div className="ad-spread-pair">
            {pair.map((still, index) => (
              <AdReveal key={still.src} delay={index * 140}>
                <Plate still={still} sizes="(max-width: 820px) 45vw, 24vw" />
              </AdReveal>
            ))}
          </div>
          <p className="ad-folio">
            <span>Brand Box</span>
            <span>
              Spot {spot.number} — {spot.category}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

/** ITC: portrait cuts, framed like the phones they run on. */
function VerticalBody({ spot }: { spot: AdVerticalSpot }) {
  return (
    <>
      <SlateCells spot={spot} />
      <div className="ad-vertical-head">
        <SpotHeadline spot={spot} />
        <p className="ad-vertical-note">
          Vertical cut · 9:16 · {pad(spot.stills.length)} frames
          <span className="ad-swipe" aria-hidden>
            Swipe <span>→</span>
          </span>
        </p>
      </div>
      <AdReveal>
        <ol className="ad-vertical" tabIndex={0} aria-label={`${spot.category} frames`}>
          {spot.stills.map((still, index) => (
            <li key={still.src} className="ad-phone">
              <figure>
                <Image
                  src={still.src}
                  alt={still.alt}
                  fill
                  sizes="(max-width: 820px) 62vw, 19vw"
                  quality={75}
                />
              </figure>
              <span className="ad-phone-tag" aria-hidden>
                {pad(index + 1)} / {pad(spot.stills.length)}
              </span>
            </li>
          ))}
        </ol>
      </AdReveal>
    </>
  );
}

/** Hotels: the slogan up on a lit billboard, then the shoots as a storyboard. */
function StoryboardBody({ spot }: { spot: AdStoryboardSpot }) {
  return (
    <>
      <SlateCells spot={spot} />
      <AdReveal>
        <div className="ad-billboard">
          <div className="ad-billboard-face">
            <Image
              src={spot.billboard.src}
              alt={spot.billboard.alt}
              fill
              sizes="(max-width: 1400px) 92vw, 1320px"
              quality={75}
            />
            <div className="ad-billboard-copy">
              <SpotHeadline spot={spot} />
            </div>
          </div>
          <span className="ad-billboard-lamps" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="ad-billboard-legs" aria-hidden />
        </div>
      </AdReveal>
      <AdStoryboard reels={spot.reels} />
    </>
  );
}

/** Product: the packshot, with the rest of the shoot pinned round it. */
function PackshotBody({ spot }: { spot: AdPackshotSpot }) {
  return (
    <div className="ad-pack">
      <div className="ad-pack-copy">
        <SlateCells spot={spot} />
        <SpotHeadline spot={spot} />
        <p className="ad-pack-product">
          <span>Featured product</span>
          {spot.product}
        </p>
      </div>
      <AdReveal className="ad-pack-stage">
        <figure className="ad-pack-hero">
          <div className="ad-plate">
            <Image
              src={spot.hero.src}
              alt={spot.hero.alt}
              fill
              sizes="(max-width: 820px) 56vw, 24vw"
              quality={75}
            />
          </div>
          <span className="ad-crops" aria-hidden />
        </figure>
        {spot.stills.map((still, index) => (
          <figure key={still.src} className={`ad-pack-pin ad-pack-pin--${index + 1}`}>
            <Image src={still.src} alt={still.alt} fill sizes="(max-width: 820px) 30vw, 14vw" quality={75} />
          </figure>
        ))}
      </AdReveal>
    </div>
  );
}

function SpotSection({ spot }: { spot: AdSpot }) {
  const style = { '--spot': spot.accent } as CSSProperties;

  return (
    <section
      id={spot.id}
      className={`ad-spot ad-spot--${spot.layout}`}
      style={style}
      aria-labelledby={`${spot.id}-title`}
    >
      <span className="ad-spot-number" aria-hidden>
        {spot.number}
      </span>
      <div className="ad-spot-inner">
        {spot.layout === 'spread' ? <SpreadBody spot={spot} /> : null}
        {spot.layout === 'vertical' ? <VerticalBody spot={spot} /> : null}
        {spot.layout === 'storyboard' ? <StoryboardBody spot={spot} /> : null}
        {spot.layout === 'packshot' ? <PackshotBody spot={spot} /> : null}

        {spot.trailer ? (
          <div className="ad-spot-trailer">
            <AdTrailer trailer={spot.trailer} title={`${spot.category} trailer`} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- page -- */

/**
 * Brand Box, the advertising project, staged as a commercial break.
 *
 * The delivered brief is an agency pitch (Advertisement.pdf) and four trailers
 * — garments, ITC, hotels, a product — with frame grabs from each shoot. So
 * the page takes the language of advertising itself rather than of cinema:
 * a spotlight on a wall of campaign frames, an on-air light and timecode, the
 * pitch set as a print ad with its layout annotations still on, a ticker of
 * every slogan, and each trailer presented as a spot behind a clapperboard
 * slate, in the format its category would run in — a magazine spread for
 * garments, phone-shaped vertical cuts for ITC, a lit billboard and an agency
 * storyboard for the hotels, a packshot for the product.
 *
 * Black stage, warm paper for the print pages, and one signal yellow; each
 * spot adds its own colour, taken from its footage. Everything is scoped
 * under `.ad` (advert.css).
 */
export default function BrandBoxAdvert({ campaign }: { campaign: AdCampaign }) {
  const contact = mainNavigation.find((item) => item.href === '/contact');
  const contactHref = contact && isLive(contact) ? contact.href : MAINTENANCE_PATH;

  const heroWords = campaign.headline.split(' ');
  const litWord = heroWords.pop();
  const [noiseBefore, noiseWord, noiseAfter] = splitLastWord(campaign.copy.headline[0]);
  const [shineBefore, shineWord, shineAfter] = splitLastWord(campaign.copy.headline[1]);

  const slogans = campaign.spots.flatMap((spot) => [
    spot.headline.join(' '),
    ...(spot.subline ? [spot.subline] : []),
  ]);

  return (
    <main className="ad">
      {/* ---- hero ---- */}

      <AdSpotlightHero wall={campaign.wall}>
        <div className="ad-hero-type">
          <p className="ad-kicker">{campaign.kicker}</p>
          <h1 className="ad-hero-title">
            {heroWords.join(' ')} <span className="ad-lit">{litWord}</span>
          </h1>
          <nav className="ad-hero-index" aria-label="Spots">
            <ol>
              {campaign.spots.map((spot) => (
                <li key={spot.id}>
                  <a href={`#${spot.id}`}>
                    <span>{spot.number}</span>
                    {spot.category}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </AdSpotlightHero>

      {/* ---- showreel ---- */}

      <section className="ad-reel" aria-labelledby="ad-reel-title">
        <div className="ad-reel-head">
          <div>
            <p className="ad-label">Showreel</p>
            <h2 id="ad-reel-title" className="ad-section-title">
              The trailer
            </h2>
          </div>
          <p className="ad-reel-meta">
            {campaign.spots.map((spot) => spot.category).join(' · ')}
          </p>
        </div>
        <AdReveal>
          <AdTrailer trailer={campaign.trailer} title="Brand Box showreel" />
        </AdReveal>
      </section>

      {/* ---- the pitch, as a print ad ---- */}

      <section className="ad-copy" aria-labelledby="ad-copy-title">
        <div className="ad-copy-layout">
          <p className="ad-spec">Headline</p>
          <AdReveal>
            <h2 id="ad-copy-title" className="ad-copy-headline">
              {noiseBefore}
              {/* Kept with its punctuation, or the comma can wrap to a line of its own. */}
              <span className="ad-nowrap">
                <span className="ad-noise">{noiseWord}</span>
                {noiseAfter}
              </span>{' '}
              <em>{shineBefore}</em>
              <span className="ad-nowrap">
                <mark className="ad-mark">
                  <em>{shineWord}</em>
                </mark>
                <em>{shineAfter}</em>
              </span>
            </h2>
          </AdReveal>

          <p className="ad-spec">Body copy</p>
          <div className="ad-copy-body">
            {campaign.copy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <p className="ad-spec">Proposition</p>
          <div>
            <p className="ad-turns-lede">What advertising does</p>
            <ul className="ad-turns">
              {campaign.transformations.map(([from, to]) => (
                <li key={from}>
                  <span className="ad-turn-from">{from}</span>
                  <span className="ad-turn-arrow" aria-hidden>
                    →
                  </span>
                  <span className="ad-sr"> becomes </span>
                  <span className="ad-turn-to">{to}</span>
                </li>
              ))}
            </ul>
            <ul className="ad-blend" aria-label="The blend">
              {campaign.blend.map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
          </div>

          <p className="ad-spec">Sign-off</p>
          <p className="ad-copy-sign">{campaign.copy.signOff}</p>
        </div>
      </section>

      {/* ---- ticker ---- */}

      <div className="ad-ticker" aria-hidden>
        <div className="ad-ticker-track">
          {[...slogans, ...slogans].map((slogan, index) => (
            <span key={index}>
              {slogan}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* ---- the spots ---- */}

      {campaign.spots.map((spot) => (
        <SpotSection key={spot.id} spot={spot} />
      ))}

      {/* ---- roster ---- */}

      <section className="ad-roster" aria-labelledby="ad-roster-title">
        <p className="ad-label">On the roster</p>
        <h2 id="ad-roster-title" className="ad-sr">
          Brands
        </h2>
        <ul className="ad-roster-list">
          {campaign.roster.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
        <p className="ad-roster-cats">{campaign.categories.join(' / ')}</p>
      </section>

      {/* ---- close ---- */}

      <section className="ad-close" aria-labelledby="ad-close-title">
        <div className="ad-close-inner">
          <p className="ad-close-lede">{campaign.close.lede}</p>
          <p className="ad-close-words" aria-hidden>
            {campaign.close.words.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </p>
          <h2 id="ad-close-title" className="ad-close-line">
            {campaign.close.line}
          </h2>
          <div className="ad-close-actions">
            <Link href={contactHref} className="ad-cta">
              Start your campaign <span aria-hidden>→</span>
            </Link>
            <Link href="/" className="ad-back">
              Back to all projects
            </Link>
          </div>
          <p className="ad-close-sign">
            <span>{campaign.close.signOff}</span>
            <span>Brand Box · Cinewacky</span>
          </p>
        </div>
      </section>
    </main>
  );
}
