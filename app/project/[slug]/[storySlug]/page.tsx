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
    <main
      className={`story-page${story.theme ? ` story-page--${story.theme}` : ''}`}
    >
      <AlternatingSideGifs />

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

      <StoryVisualNarrative blocks={story.visualNarrative} />

      <StoryCrew crew={story.crew} />
      <StoryCast cast={story.cast} />
      <StoryGallery images={story.gallery} title={story.title} />
      <StoryTrailer trailer={story.trailer} poster={story.poster} title={story.title} />
      <StoryAchievements achievements={story.achievements} />

      {story.producerNote ? (
        <StoryProducerNote note={story.producerNote} />
      ) : null}

      <StoryBackLink projectSlug={slug} projectTitle={project.title} />
    </main>
  );
}
