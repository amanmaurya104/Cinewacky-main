import Image from 'next/image';
import Link from 'next/link';
import type { Documentary } from '@/types/documentary';
import DocumentaryAwards from './DocumentaryAwards';
import DocumentaryInfo from './DocumentaryInfo';
import DocumentaryMeta from './DocumentaryMeta';
import DocumentaryVideo from './DocumentaryVideo';

type Props = {
  documentary: Documentary;
};

/** The default documentary layout. Every section renders only if it has data. */
export default function DocumentaryStandard({ documentary }: Props) {
  const backHref = documentary.projectSlug
    ? `/project/${documentary.projectSlug}`
    : '/';

  return (
    <main className="documentary-page">
      <header className="documentary-hero">
        {documentary.heroLoop ? (
          <video
            className="documentary-hero-media"
            src={documentary.heroLoop}
            poster={documentary.heroPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
          />
        ) : documentary.heroPoster ? (
          <Image
            className="documentary-hero-media"
            src={documentary.heroPoster}
            alt=""
            fill
            sizes="100vw"
            quality={75}
            loading="eager"
          />
        ) : null}

        <div className="documentary-hero-copy">
          <Link href={backHref} className="documentary-back">
            ← {documentary.projectTitle ?? 'Back'}
          </Link>
          <h1 className="documentary-title">{documentary.title}</h1>
          {documentary.tagline ? (
            <p className="documentary-tagline">{documentary.tagline}</p>
          ) : null}
          <DocumentaryMeta documentary={documentary} />
        </div>
      </header>

      <DocumentaryInfo documentary={documentary} />

      {documentary.video ? (
        <DocumentaryVideo
          src={documentary.video}
          poster={documentary.videoPoster}
          label={documentary.videoLabel}
          title={documentary.title}
        />
      ) : null}

      {documentary.stills?.length ? (
        <section className="documentary-stills">
          <h2 className="documentary-section-title">Stills</h2>
          <div className="documentary-stills-grid">
            {documentary.stills.map((still) => (
              <div key={still} className="documentary-still">
                <Image
                  src={still}
                  alt={documentary.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <DocumentaryAwards awards={documentary.awards} />
    </main>
  );
}
