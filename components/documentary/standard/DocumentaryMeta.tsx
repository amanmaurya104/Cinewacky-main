import type { Documentary } from '@/types/documentary';

type Props = {
  documentary: Documentary;
};

export default function DocumentaryMeta({ documentary }: Props) {
  const rows: { label: string; value?: string }[] = [
    { label: 'Year', value: documentary.year },
    { label: 'Runtime', value: documentary.duration },
    { label: 'Director', value: documentary.director },
    { label: 'Language', value: documentary.language },
    { label: 'Location', value: documentary.location },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  if (!rows.length) return null;

  return (
    <dl className="documentary-meta">
      {rows.map((row) => (
        <div key={row.label} className="documentary-meta-row">
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
