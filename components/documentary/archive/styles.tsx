// The Bird of Dusk page's stylesheets and fonts. Loaded only through
// PieceStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { archiveDisplay, archiveText, archiveUtility } from './fonts';
import '../base.css';
import './archive.css';

export default function ArchiveStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[archiveDisplay, archiveText, archiveUtility]}>{children}</FontScope>;
}
