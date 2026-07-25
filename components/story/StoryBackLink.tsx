import Link from 'next/link';

type Props = {
  projectSlug: string;
  projectTitle: string;
};

export default function StoryBackLink({ projectSlug, projectTitle }: Props) {
  return (
    <section className="story-back-section">
      <Link href={`/project/${projectSlug}`} className="story-back-link">
        Back to {projectTitle}
      </Link>
    </section>
  );
}
