// URL builders for media under public/showcase/. Kept free of imports so the
// content in data/ can use them without depending on any other module.

export function showcaseVideoSrc(slug: string, filename: string): string {
  const encodedFilename = filename
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `/showcase/${slug}/${encodedFilename}`;
}

// The project page shows these as hover-preview banners and clicking one
// navigates to the story, so they play the short loop rather than the film —
// otherwise browsing the page streams 340MB of full-length features.
// Built by scripts/build-hero-loops.mjs.
export function showcaseLoopSrc(slug: string, filename: string): string {
  return showcaseVideoSrc(slug, filename.replace(/\.mp4$/, '-loop.mp4'));
}

export function showcasePosterSrc(slug: string, filename: string): string {
  return showcaseVideoSrc(slug, filename.replace(/\.mp4$/, '-poster.jpg'));
}
