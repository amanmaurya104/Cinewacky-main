import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import DocumentaryView from '@/components/documentary/DocumentaryView';
import StoryView from '@/components/story/StoryView';
import { getDocumentaryForProject } from '@/data/documentaries';
import { getProjectBySlug } from '@/data/projects';
import { MAINTENANCE_PATH } from '@/lib/publishing';
import { getPublishedPieceParams, getStoryBySlug, isPiecePublished } from '@/lib/stories';
import PieceStyles from './PieceStyles';

interface Props {
  params: Promise<{ slug: string; storySlug: string }>;
}

// Stories and documentaries share this segment: both are pieces of work that
// belong to a project, so both live at /project/<project>/<piece>.
// Only published pieces are prebuilt; the rest redirect to /maintenance below.
export function generateStaticParams() {
  return getPublishedPieceParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, storySlug } = await params;
  const story = getStoryBySlug(slug, storySlug);

  if (story) {
    return {
      title: `${story.title} | Cinewacky`,
      description: story.synopsis,
    };
  }

  const documentary = getDocumentaryForProject(slug, storySlug);

  if (documentary) {
    return {
      title: documentary.seoTitle ?? `${documentary.title} | Cinewacky`,
      description:
        documentary.seoDescription ?? documentary.tagline ?? documentary.synopsis?.[0],
    };
  }

  return { title: 'Not Found | Cinewacky' };
}

export default async function StoryPage({ params }: Props) {
  const { slug, storySlug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  // A slug that names nothing is a 404; one that names a draft is parked.
  const story = getStoryBySlug(slug, storySlug);
  const documentary = story ? undefined : getDocumentaryForProject(slug, storySlug);
  if (!story && !documentary) return notFound();
  if (!isPiecePublished(slug, storySlug)) redirect(MAINTENANCE_PATH);

  if (story) {
    return (
      <PieceStyles name="story">
        <StoryView story={story} project={project} />
      </PieceStyles>
    );
  }

  if (!documentary) return notFound();
  return (
    <PieceStyles name={documentary.theme ?? 'standard'}>
      <DocumentaryView documentary={documentary} />
    </PieceStyles>
  );
}
