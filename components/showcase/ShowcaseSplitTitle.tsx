import type { ShowcaseTitleParts } from '@/data/showcaseScroll';

type Props = {
  parts: ShowcaseTitleParts;
};

export default function ShowcaseSplitTitle({ parts }: Props) {
  const { lead, bold, hero } = parts;
  const hasHero = hero.length > 0;

  return (
    <>
      {lead ? <p className="showcase-spine-lead">{lead}</p> : null}
      <p className="showcase-spine-hero-line">
        {bold ? <span className="showcase-spine-bold">{bold}</span> : null}
        {hasHero ? (
          <>
            {' '}
            <span className="showcase-spine-hero">{hero}</span>
          </>
        ) : null}
      </p>
    </>
  );
}
