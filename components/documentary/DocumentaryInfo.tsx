import type { Documentary } from '@/types/documentary';

type Props = {
  documentary: Documentary;
};

export default function DocumentaryInfo({ documentary }: Props) {
  const { synopsis, credits } = documentary;
  const hasSynopsis = Boolean(synopsis?.length);
  const hasCredits = Boolean(credits?.length);

  if (!hasSynopsis && !hasCredits) return null;

  return (
    <section className="documentary-info">
      {hasSynopsis ? (
        <div className="documentary-synopsis">
          <h2 className="documentary-section-title">Synopsis</h2>
          {synopsis?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {hasCredits ? (
        <div className="documentary-credits">
          <h2 className="documentary-section-title">Credits</h2>
          <dl>
            {credits?.map((credit) => (
              <div key={`${credit.role}-${credit.name}`} className="documentary-credit">
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
