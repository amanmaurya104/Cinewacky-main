import Link from 'next/link';
import type { Story } from '@/types/story';

type Props = {
  projectSlug: string;
  projectTitle: string;
  prev?: Story;
  next?: Story;
};

export default function StoryNav({ projectSlug, projectTitle, prev, next }: Props) {
  return (
    <nav className="story-nav" aria-label="Story navigation">
      <Link href={`/project/${projectSlug}`} className="story-nav-link">
        ← {projectTitle}
      </Link>
      <div className="story-nav-prev-next">
        {prev ? (
          <Link
            href={`/project/${projectSlug}/${prev.slug}`}
            className="story-nav-link"
          >
            ← {prev.title}
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/project/${projectSlug}/${next.slug}`}
            className="story-nav-link"
          >
            {next.title} →
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
