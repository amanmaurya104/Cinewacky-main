import { Project } from '@/types/project';

export default function ProjectStats({ project }: { project: Project }) {
  return (
    <section className="py-8 px-6 bg-black">
      <div className="max-w-4xl mx-auto flex gap-8">
        <div>
          <p className="text-sm text-gray-400">Category</p>
          <p className="font-semibold">{project.category}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Year</p>
          <p className="font-semibold">{project.year}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Duration</p>
          <p className="font-semibold">{project.duration ?? '—'}</p>
        </div>
      </div>
    </section>
  );
}
