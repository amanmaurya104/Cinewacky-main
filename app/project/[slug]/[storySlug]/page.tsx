import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AlternatingSideGifs from '@/components/story/AlternatingSideGifs';
import StoryAchievements from '@/components/story/StoryAchievements';
import StoryBackLink from '@/components/story/StoryBackLink';
import StoryCast from '@/components/story/StoryCast';
import StoryCrew from '@/components/story/StoryCrew';
import StoryGallery from '@/components/story/StoryGallery';
import StoryHero from '@/components/story/StoryHero';
import StoryNav from '@/components/story/StoryNav';
import StoryProducerNote from '@/components/story/StoryProducerNote';
import StoryTrailer from '@/components/story/StoryTrailer';
import StoryVisualNarrative from '@/components/story/StoryVisualNarrative';
import TypedText from '@/components/story/TypedText';
import ArchiveDocumentary from '@/components/documentary/ArchiveDocumentary';
import DocumentaryStandard from '@/components/documentary/DocumentaryStandard';
import {
  getAllDocumentaryParams,
  getDocumentaryForProject,
} from '@/data/documentaries';
import { getProjectBySlug } from '@/data/projects';
import { moonlightDisplay } from '@/lib/fonts';
import {
  getAdjacentStories,
  getAllStoryParams,
  getStoryBySlug,
} from '@/lib/stories';
import '@/styles/story.css';
import '@/styles/documentary.css';
import '@/styles/documentary-archive.css';

interface Props {
  params: Promise<{ slug: string; storySlug: string }>;
}

// Stories and documentaries share this segment: both are pieces of work that
// belong to a project, so both live at /project/<project>/<piece>.
export function generateStaticParams() {
  return [...getAllStoryParams(), ...getAllDocumentaryParams()];
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
      title: `${documentary.title} | Cinewacky`,
      description: documentary.tagline ?? documentary.synopsis?.[0],
    };
  }

  return { title: 'Not Found | Cinewacky' };
}

export default async function StoryPage({ params }: Props) {
  const { slug, storySlug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const story = getStoryBySlug(slug, storySlug);

  if (!story) {
    const documentary = getDocumentaryForProject(slug, storySlug);
    if (!documentary) return notFound();

    return documentary.theme === 'archive' ? (
      <ArchiveDocumentary documentary={documentary} />
    ) : (
      <DocumentaryStandard documentary={documentary} />
    );
  }

  const { prev, next } = getAdjacentStories(slug, storySlug);

  // Moonlight is the one story with its own structure, not just its own
  // palette: a display serif, an unboxed narrative hung off a tide gauge, a
  // still cast row, and no side loops competing with the night sky.
  const isMoonlight = story.theme === 'moonlight';

  return (
    <main
      className={[
        'story-page',
        story.theme ? `story-page--${story.theme}` : '',
        isMoonlight ? moonlightDisplay.variable : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isMoonlight ? null : <AlternatingSideGifs />}

      {/* <StoryNav
        projectSlug={slug}
        projectTitle={project.title}
        prev={prev}
        next={next}
      /> */}

      <StoryHero
        title={story.title}
        tagline={story.tagline}
        heroVideo={story.heroVideo}
        poster={story.poster}
      />

      <section className="story-section" aria-labelledby="synopsis-heading">
        <p className="story-section-eyebrow">Story</p>
        <h2 id="synopsis-heading" className="story-section-title">
          Synopsis
        </h2>
        <TypedText text={story.synopsis} className="story-synopsis" />
      </section>

      <StoryVisualNarrative
        blocks={story.visualNarrative}
        eyebrow={isMoonlight ? 'One year, two weddings' : undefined}
        title={isMoonlight ? 'The Tide' : undefined}
        variant={isMoonlight ? 'tide' : undefined}
      />

      <StoryCrew crew={story.crew} layout={isMoonlight ? 'cards' : undefined} />
      <StoryCast cast={story.cast} layout={isMoonlight ? 'comet' : undefined} />
      <StoryGallery
        images={story.gallery}
        title={story.title}
        layout={story.galleryLayout}
      />
      <StoryTrailer trailer={story.trailer} poster={story.poster} title={story.title} />
      <StoryAchievements achievements={story.achievements} />

      {story.producerNote ? (
        <StoryProducerNote note={story.producerNote} />
      ) : null}

      <StoryBackLink projectSlug={slug} projectTitle={project.title} />
    </main>
  );
}
