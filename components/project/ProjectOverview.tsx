import { Project } from '@/types/project';

export default function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <p className="text-gray-300 leading-relaxed">{project.description}</p>
    </section>
  );
}
