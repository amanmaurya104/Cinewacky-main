// The Tuning 2 You page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { tuningDisplay, tuningLyric, tuningUtility } from './fonts';
import '../base.css';
import './tuning.css';

export default function TuningStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[tuningDisplay, tuningLyric, tuningUtility]}>{children}</FontScope>;
}
