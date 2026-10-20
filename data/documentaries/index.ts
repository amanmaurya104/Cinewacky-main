import type { Documentary } from '@/types/documentary';
import lifeBeyondLens from './life-beyond-lens';
import birdOfDusk from './bird-of-dusk';
import testOfChina from './test-of-china';
import craftCouncilOfIndia from './craft-council-of-india';
import margaretToNivedita from './margaret-to-nivedita';
import darkRising from './dark-rising';
import kingOfTheRoad from './king-of-the-road';
import tuning2You from './tuning-2-you';

export const documentaries: Documentary[] = [
  lifeBeyondLens,
  birdOfDusk,
  testOfChina,
  craftCouncilOfIndia,
  margaretToNivedita,
  darkRising,
  kingOfTheRoad,
  tuning2You,
];

/**
 * Documentaries live under their project, at /project/<project>/<documentary>,
 * alongside the stories — so the lookup has to be scoped by project, not just
 * by slug.
 */
export function getDocumentaryForProject(
  projectSlug: string,
  documentarySlug: string,
): Documentary | undefined {
  return documentaries.find(
    (documentary) =>
      documentary.slug === documentarySlug &&
      documentary.projectSlug === projectSlug,
  );
}

export function getAllDocumentaryParams(): { slug: string; storySlug: string }[] {
  return documentaries
    .filter((documentary) => documentary.projectSlug)
    .map((documentary) => ({
      slug: documentary.projectSlug as string,
      storySlug: documentary.slug,
    }));
}

export default documentaries;
