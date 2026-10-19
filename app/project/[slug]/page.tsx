import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/layout/SiteHeader';
import ProjectVideoStack from '@/components/project/ProjectVideoStack';
import ProjectMosaic from '@/components/project/ProjectMosaic';
import projects, { getProjectBySlug } from '@/data/projects';
import { isLive, MAINTENANCE_PATH } from '@/lib/publishing';
import '@/styles/showcase.css';
import '@/styles/project.css';
import '@/styles/project-mosaic.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// Only live projects are prebuilt; drafts redirect to /maintenance below.
export function generateStaticParams() {
  return projects.filter((project) => isLive(project)).map(({ slug }) => ({ slug }));
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
  if (!isLive(project)) redirect(MAINTENANCE_PATH);

  if (project.layout === 'mosaic') {
    return (
      <main className="project-page">
        <SiteHeader />
        <ProjectMosaic project={project} />
      </main>
    );
  }

  return (
    <main className="project-page">
      <SiteHeader />
      <ProjectVideoStack project={project} />
    </main>
  );
}
