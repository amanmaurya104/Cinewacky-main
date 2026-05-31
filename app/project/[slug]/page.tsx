import { notFound } from 'next/navigation';
import projects from '@/data/projects';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import ProjectGallery from '@/components/project/ProjectGallery';
import RelatedProjects from '@/components/project/RelatedProjects';

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen w-full">
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <RelatedProjects currentId={project.id} />
    </main>
  );
}
