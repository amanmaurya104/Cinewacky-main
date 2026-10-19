// The Dark Rising page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { risingDisplay, risingText, risingUtility } from './fonts';
import '../base.css';
import './rising.css';

export default function RisingStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[risingDisplay, risingText, risingUtility]}>{children}</FontScope>;
}
