// Stylesheet for documentaries without a theme. Loaded only through
// PieceStyles, so no other page links it.
import type { ReactNode } from 'react';
import '../base.css';

export default function StandardStyles({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
