import type { Project } from '@/types/project';
import { getProjectPlaybackVideos, getProjectVideoMeta } from '@/lib/projectVideos';
import { MAINTENANCE_PATH } from '@/lib/publishing';
import { getPieceHref, getStorySlugForVideo } from '@/lib/stories';
import ProjectVideoBanner from './ProjectVideoBanner';

type Props = {
  project: Project;
};

export default function ProjectVideoStack({ project }: Props) {
  const videos = getProjectPlaybackVideos(project);
  const meta = getProjectVideoMeta(project);
  const category = project.category.toUpperCase();
  // A banner with a page opens it, or /maintenance while it is a draft. Reel
  // Vibe Uncut banners always open something, so one with no page at all
  // opens /maintenance too.
  const isReelVibeUncut = project.slug === 'reel-vibe-uncut';

  return (
    <div className="project-video-stack">
      {videos.map((video, index) => {
        const storySlug = getStorySlugForVideo(project.slug, video.filename);
        const storyHref = storySlug
          ? getPieceHref(project.slug, storySlug)
          : isReelVibeUncut
            ? MAINTENANCE_PATH
            : undefined;

        return (
          <ProjectVideoBanner
            key={`${project.slug}-${video.filename}`}
            src={video.src}
            title={video.title}
            category={category}
            meta={meta}
            poster={video.poster}
            index={index}
            hideTitle={index === 0}
            storyHref={storyHref}
          />
        );
      })}
    </div>
  );
}
