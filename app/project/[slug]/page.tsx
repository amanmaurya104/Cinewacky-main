import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteMenu from '@/components/layout/SiteMenu';
import ProjectVideoStack from '@/components/project/ProjectVideoStack';
import ProjectMosaic from '@/components/project/ProjectMosaic';
import BrandBoxAdvert from '@/components/advert/BrandBoxAdvert';
import brandBox from '@/data/brandBox';
import projects, { getProjectBySlug } from '@/data/projects';
import ProjectStyles from './ProjectStyles';
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

  if (project.layout === 'advert') {
    return (
      <ProjectStyles name="advert">
        {/* Floats with a dark backing, like on story pages: this page has light sections. */}
        <div className="site-menu-float">
          <SiteMenu />
        </div>
        <BrandBoxAdvert campaign={brandBox} />
      </ProjectStyles>
    );
  }

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
