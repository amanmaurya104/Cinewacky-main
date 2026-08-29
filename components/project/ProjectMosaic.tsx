import { getProjectMediaTiles } from '@/lib/projectVideos';
import type { Project } from '@/types/project';
import ProjectMosaicTile from './ProjectMosaicTile';

type Props = {
  project: Project;
};

// The feature tiles split the left column between them.
const FEATURE_SIZES = '(max-width: 1024px) 50vw, 21vw';
const STACK_SIZES = '(max-width: 1024px) 100vw, 58vw';

export default function ProjectMosaic({ project }: Props) {
  const tiles = getProjectMediaTiles(project);
  const feature = tiles.filter((tile) => tile.feature);
  const stack = tiles.filter((tile) => !tile.feature);

  return (
    <div className="project-mosaic">
      <div className="project-mosaic-feature-column">
        {feature.map((tile) => (
          <ProjectMosaicTile
            key={tile.title}
            tile={tile}
            feature
            sizes={FEATURE_SIZES}
          />
        ))}
      </div>

      <div className="project-mosaic-stack">
        {stack.map((tile) => (
          <ProjectMosaicTile key={tile.title} tile={tile} sizes={STACK_SIZES} />
        ))}
      </div>
    </div>
  );
}
