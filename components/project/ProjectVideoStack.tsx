import type { Project } from '@/types/project';
import { getProjectPlaybackVideos, getProjectVideoMeta } from '@/lib/projectVideos';
import { getStorySlugForVideo } from '@/lib/stories';
import ProjectVideoBanner from './ProjectVideoBanner';

type Props = {
  project: Project;
};

export default function ProjectVideoStack({ project }: Props) {
  const videos = getProjectPlaybackVideos(project);
  const meta = getProjectVideoMeta(project);
  const category = project.category.toUpperCase();
  const isReelVibeUncut = project.slug === 'reel-vibe-uncut';
  // On Reel Vibe Uncut only the finished pages open; the rest park on
  // /maintenance until they have one.
  const liveReelPages = new Set(['kali', 'dark-rising']);

  return (
    <div className="project-video-stack">
      {videos.map((video, index) => {
        const storySlug = getStorySlugForVideo(project.slug, video.filename);
        const storyHref = isReelVibeUncut
          ? storySlug && liveReelPages.has(storySlug)
            ? `/project/${project.slug}/${storySlug}`
            : '/maintenance'
          : storySlug
            ? `/project/${project.slug}/${storySlug}`
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
