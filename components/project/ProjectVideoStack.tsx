import type { Project } from '@/types/project';
import { getProjectPlaybackVideos, getProjectVideoMeta } from '@/lib/projectVideos';
import ProjectVideoBanner from './ProjectVideoBanner';

type Props = {
  project: Project;
};

export default function ProjectVideoStack({ project }: Props) {
  const videos = getProjectPlaybackVideos(project);
  const meta = getProjectVideoMeta(project);
  const category = project.category.toUpperCase();

  return (
    <div className="project-video-stack">
      {videos.map((video, index) => (
        <ProjectVideoBanner
          key={`${project.slug}-${video.filename}`}
          src={video.src}
          title={video.title}
          category={category}
          meta={meta}
          poster={project.poster}
          index={index}
          hideTitle={index === 0}
        />
      ))}
    </div>
  );
}
