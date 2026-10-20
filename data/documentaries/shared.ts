import { showcaseVideoSrc } from '@/lib/mediaPaths';

// Helpers used by more than one documentary.

export const LBL = 'life-beyond-lens';

export function asset(filename: string): string {
  return showcaseVideoSrc(LBL, filename);
}
