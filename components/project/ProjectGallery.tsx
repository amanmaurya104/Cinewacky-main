import { Project } from '@/types/project';

export default function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.gallery.map((src) => (
          <img key={src} src={src} alt={project.title} className="w-full object-cover" />
        ))}
      </div>
    </section>
  );
}
