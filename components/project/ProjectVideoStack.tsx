import type { Project } from '@/types/project';
import { getProjectPlaybackVideos, getProjectVideoMeta } from '@/lib/projectVideos';
import { getStorySlugForVideo, isPiecePublished } from '@/lib/stories';
import ProjectVideoBanner from './ProjectVideoBanner';

type Props = {
  project: Project;
};

export default function ProjectVideoStack({ project }: Props) {
  const videos = getProjectPlaybackVideos(project);
  const meta = getProjectVideoMeta(project);
  const category = project.category.toUpperCase();
  // Reel Vibe Uncut banners always open something: their page once published,
  // /maintenance until then.
  const isReelVibeUncut = project.slug === 'reel-vibe-uncut';

  return (
    <div className="project-video-stack">
      {videos.map((video, index) => {
        const storySlug = getStorySlugForVideo(project.slug, video.filename);
        const storyHref =
          storySlug && isPiecePublished(project.slug, storySlug)
            ? `/project/${project.slug}/${storySlug}`
            : isReelVibeUncut
              ? '/maintenance'
              : undefined;

        return (
          <ProjectVideoBanner
            key={`${project.slug}-${video.filename}`}
            src={video.src}
            title={video.title}
            category={category}
            meta={meta}
            poster={video.poster ?? project.poster}
            index={index}
            hideTitle={index === 0}
            storyHref={storyHref}
          />
        );
      })}
    </div>
  );
}
