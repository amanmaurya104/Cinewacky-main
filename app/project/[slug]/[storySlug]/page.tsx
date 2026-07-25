import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StoryAchievements from '@/components/story/StoryAchievements';
import StoryBackLink from '@/components/story/StoryBackLink';
import StoryCast from '@/components/story/StoryCast';
import StoryCrew from '@/components/story/StoryCrew';
import StoryGallery from '@/components/story/StoryGallery';
import StoryHero from '@/components/story/StoryHero';
import StoryNav from '@/components/story/StoryNav';
import StoryTrailer from '@/components/story/StoryTrailer';
import StoryVisualNarrative from '@/components/story/StoryVisualNarrative';
import { getProjectBySlug } from '@/data/projects';
import {
  getAdjacentStories,
  getAllStoryParams,
  getStoryBySlug,
} from '@/lib/stories';
import '@/styles/story.css';

interface Props {
  params: Promise<{ slug: string; storySlug: string }>;
}

export function generateStaticParams() {
  return getAllStoryParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, storySlug } = await params;
  const story = getStoryBySlug(slug, storySlug);

  if (!story) {
    return { title: 'Story Not Found | Cinewacky' };
  }

  return {
    title: `${story.title} | Cinewacky`,
    description: story.synopsis,
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug, storySlug } = await params;
  const project = getProjectBySlug(slug);
  const story = getStoryBySlug(slug, storySlug);

  if (!project || !story) return notFound();

  const { prev, next } = getAdjacentStories(slug, storySlug);

  return (
    <main className="story-page">
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
        <p className="story-synopsis">{story.synopsis}</p>
      </section>

      <StoryVisualNarrative blocks={story.visualNarrative} />

      <StoryCrew crew={story.crew} />
      <StoryCast cast={story.cast} />
      <StoryGallery images={story.gallery} title={story.title} />
      <StoryTrailer trailer={story.trailer} poster={story.poster} title={story.title} />
      <StoryAchievements achievements={story.achievements} />

      {story.producerNote ? (
        <section className="story-section" aria-labelledby="producer-note-heading">
          <p className="story-section-eyebrow">From the producer</p>
          <h2 id="producer-note-heading" className="story-section-title">
            Producer&apos;s Note
          </h2>
          <p className="story-producer-note">{story.producerNote}</p>
        </section>
      ) : null}

      <StoryBackLink projectSlug={slug} projectTitle={project.title} />
    </main>
  );
}
