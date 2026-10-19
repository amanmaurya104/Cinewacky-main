// The Margaret to Nivedita page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { passageDisplay, passageText, passageUtility, passageBengali } from './fonts';
import '../base.css';
import './passage.css';

export default function PassageStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[passageDisplay, passageText, passageUtility, passageBengali]}>{children}</FontScope>;
}
