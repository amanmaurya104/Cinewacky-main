import { Project } from '@/types/project';

export default function ProjectCredits({ project }: { project: Project }) {
  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-medium">Credits</h3>
        <ul className="text-gray-300 mt-4">
          <li>Client: {project.client ?? '—'}</li>
          <li>Year: {project.year}</li>
          <li>Duration: {project.duration ?? '—'}</li>
        </ul>
      </div>
    </section>
  );
}
