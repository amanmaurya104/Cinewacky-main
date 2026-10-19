import type { Project } from '@/types/project';
import type { Story } from '@/types/story';
import AlternatingSideGifs from './AlternatingSideGifs';
import StoryAchievements from './StoryAchievements';
import StoryBackLink from './StoryBackLink';
import StoryCast from './StoryCast';
import StoryCrew from './StoryCrew';
import StoryGallery from './StoryGallery';
import StoryHero from './StoryHero';
import StoryProducerNote from './StoryProducerNote';
import StoryTrailer from './StoryTrailer';
import StoryVisualNarrative from './StoryVisualNarrative';
import TypedText from './TypedText';

type Props = {
  story: Story;
  project: Project;
};

export default function StoryView({ story, project }: Props) {
  // Moonlight is the one story with its own structure, not just its own
  // palette: a display serif, an unboxed narrative hung off a tide gauge, a
  // still cast row, and no side loops competing with the night sky.
  const isMoonlight = story.theme === 'moonlight';

  return (
    <main className={story.theme ? `story-page story-page--${story.theme}` : 'story-page'}>
      {isMoonlight ? null : <AlternatingSideGifs />}

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

      <StoryBackLink projectSlug={project.slug} projectTitle={project.title} />
    </main>
  );
}
