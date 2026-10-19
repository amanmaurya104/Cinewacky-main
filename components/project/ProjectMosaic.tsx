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
  // With nothing in the stack the feature column spans the page
  // (project-mosaic--lone), and its tiles split the full width instead.
  const lone = stack.length === 0;
  const featureSizes = lone ? `${Math.ceil(100 / Math.max(feature.length, 1))}vw` : FEATURE_SIZES;
  // Portrait screens can only give that row the full height when every tile
  // has a portrait cut to fill it; a landscape frame would crop to a sliver.
  const fill =
    lone &&
    feature.length > 0 &&
    feature.every((tile) => tile.kind === 'image' && tile.portraitSrc);

  return (
    <div
      className={`project-mosaic${lone ? ' project-mosaic--lone' : ''}${fill ? ' project-mosaic--fill' : ''}`}
    >
      <div className="project-mosaic-feature-column">
        {feature.map((tile) => (
          <ProjectMosaicTile key={tile.title} tile={tile} feature sizes={featureSizes} />
        ))}
      </div>

      {lone ? null : (
        <div className="project-mosaic-stack">
          {stack.map((tile) => (
            <ProjectMosaicTile key={tile.title} tile={tile} sizes={STACK_SIZES} />
          ))}
        </div>
      )}
    </div>
  );
}
