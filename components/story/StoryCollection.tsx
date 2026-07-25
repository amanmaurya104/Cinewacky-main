import type { Story } from '@/types/story';
import StoryCard from './StoryCard';

type Props = {
  projectSlug: string;
  stories: Story[];
};

export default function StoryCollection({ projectSlug, stories }: Props) {
  if (!stories.length) return null;

  return (
    <section className="story-collection" aria-labelledby="story-collection-heading">
      <div className="story-divider" />
      <header className="story-collection-header">
        <h2 id="story-collection-heading" className="story-collection-title">
          Stories
        </h2>
      </header>
      <div className="story-collection-grid">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} projectSlug={projectSlug} />
        ))}
      </div>
    </section>
  );
}
