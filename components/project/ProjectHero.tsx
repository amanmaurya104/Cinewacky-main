import { Project } from '@/types/project';

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="w-full h-screen relative flex items-center justify-center bg-black">
      <img
        src={project.heroImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 text-center max-w-4xl">
        <p className="text-sm tracking-widest text-gray-300">{project.category}</p>
        <h1 className="text-6xl font-bold mt-4">{project.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{project.tagline}</p>
      </div>
    </section>
  );
}
