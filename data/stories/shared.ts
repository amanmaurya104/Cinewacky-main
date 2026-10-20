import { showcaseVideoSrc } from '@/lib/mediaPaths';

// Helpers used by more than one story.

export const PROJECT = 'reel-vibe-uncut';

// Stills sampled from each film by scripts/extract-stills.mjs. These stories
// previously pointed at `poster`/`heroImage`/`gallery`, which are placeholder
// text files rather than images — the optimizer rejects them and the browser
// renders a broken image. Replace with curated frames when they are ready.
export function filmStills(slug: string, count = 8): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/projects/reel-vibe-uncut/${slug}/still-${String(i + 1).padStart(2, '0')}.jpg`,
  );
}

export function video(filename: string): string {
  return showcaseVideoSrc(PROJECT, filename);
}

// The hero plays a short silent loop cut from the film, not the film itself —
// 48-69MB per page became ~0.5MB. `trailer` still points at the full source.
// Built by scripts/build-hero-loops.mjs; re-run it if a source film changes.
export function heroLoop(filename: string): string {
  return showcaseVideoSrc(PROJECT, filename.replace(/\.mp4$/, '-loop.mp4'));
}

export function heroPoster(filename: string): string {
  return showcaseVideoSrc(PROJECT, filename.replace(/\.mp4$/, '-poster.jpg'));
}

export const kaliCrew = [
  { role: 'Writer / Director', name: 'JIJO' },
  { role: 'Producer', name: 'Subhajit Prasad' },
  { role: 'Sound', name: 'Sourav Gupta' },
  { role: 'Music', name: 'Hollie Buhagiar' },
  { role: 'VFX', name: 'Neil Rowe' },
  { role: 'Grade', name: 'Jake White' },
  { role: 'Editors', name: 'Subhajit Prasad & JIJO' },
  { role: 'DOP', name: 'JIJO' },
];

export const sharedCrew = kaliCrew;
