import type { DocumentaryAward } from '@/types/documentary';

type Props = {
  awards?: DocumentaryAward[];
};

export default function DocumentaryAwards({ awards }: Props) {
  if (!awards?.length) return null;

  return (
    <section className="documentary-awards">
      <h2 className="documentary-section-title">Selections &amp; Awards</h2>
      <ul>
        {awards.map((award) => (
          <li key={award.title}>
            <span className="documentary-award-title">{award.title}</span>
            {award.detail ? (
              <span className="documentary-award-detail">{award.detail}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
