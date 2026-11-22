'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// Stylesheets and fonts for project pages with their own theme, loaded the way
// PieceStyles loads them for stories and documentaries (see the note there):
// through next/dynamic in a client module, so only the page that renders a
// theme links its CSS and fonts, not every project page.
const STYLES = {
  advert: dynamic(() => import('@/components/advert/styles')),
};

export type ProjectStylesName = keyof typeof STYLES;

export default function ProjectStyles({
  name,
  children,
}: {
  name: ProjectStylesName;
  children: ReactNode;
}) {
  const Styles = STYLES[name];
  return <Styles>{children}</Styles>;
}
