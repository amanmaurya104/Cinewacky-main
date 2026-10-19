// The Craft Council of India page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { craftDisplay, craftText, craftUtility, craftBengali } from './fonts';
import '../base.css';
import './craft.css';

export default function CraftStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[craftDisplay, craftText, craftUtility, craftBengali]}>{children}</FontScope>;
}
