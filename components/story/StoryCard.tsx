"use client";

import Link from 'next/link';
import type { Story } from '@/types/story';

type Props = {
  story: Story;
  projectSlug: string;
};

export default function StoryCard({ story, projectSlug }: Props) {
  return (
    <Link
      href={`/project/${projectSlug}/${story.slug}`}
      className="story-card group"
    >
      <img
        src={story.thumbnail}
        alt={story.title}
        className="story-card-media"
        loading="lazy"
        draggable={false}
      />
      <div className="story-card-overlay" aria-hidden />
      <div className="story-card-content">
        {story.tagline ? (
          <p className="story-card-tagline">{story.tagline}</p>
        ) : null}
        <h3 className="story-card-title">{story.title}</h3>
      </div>
    </Link>
  );
}
