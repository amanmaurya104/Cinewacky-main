import { Project } from '@/types/project';

export default function ProjectVideo({ project }: { project: Project }) {
  if (!project.previewVideo) return null;
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <video controls src={project.previewVideo} className="w-full" />
      </div>
    </section>
  );
}
