// The King of the Road page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { roadDisplay, roadText, roadUtility } from './fonts';
import '../base.css';
import './road.css';

export default function RoadStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[roadDisplay, roadText, roadUtility]}>{children}</FontScope>;
}
