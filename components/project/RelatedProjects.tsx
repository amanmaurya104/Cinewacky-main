import Link from 'next/link';
import projects from '@/data/projects';

export default function RelatedProjects({ currentId }: { currentId: number }) {
  const related = projects.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl mb-6">Related Projects</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/project/${p.slug}`}
              className="text-left block hover:opacity-90 transition-opacity"
            >
              <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover" />
              <h4 className="mt-2">{p.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
