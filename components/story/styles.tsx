// Story page stylesheet and fonts. Loaded only through PieceStyles, so
// documentary pages never link them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { moonlightDisplay } from './fonts';
import '@/styles/story.css';

export default function StoryStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[moonlightDisplay]}>{children}</FontScope>;
}
