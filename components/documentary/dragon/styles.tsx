// The Test of China page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { dragonDisplay, dragonText, dragonUtility } from './fonts';
import '../base.css';
import './dragon.css';

export default function DragonStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[dragonDisplay, dragonText, dragonUtility]}>{children}</FontScope>;
}
