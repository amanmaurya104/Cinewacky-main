import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShowcaseHeader from '@/components/showcase/ShowcaseHeader';
import ProjectVideoStack from '@/components/project/ProjectVideoStack';
import { getAllProjectSlugs, getProjectBySlug } from '@/data/projects';
import '@/styles/showcase.css';
import '@/styles/project.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found | Cinewacky' };
  }

  return {
    title: `${project.title} | Cinewacky`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <main className="project-page">
      <ShowcaseHeader />
      <ProjectVideoStack project={project} />
    </main>
  );
}
