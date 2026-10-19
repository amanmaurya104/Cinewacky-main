'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// Why styles and fonts load from a client component: Next links every
// stylesheet that a route's server components import, fonts included, on every
// page of that route, even when the component itself is loaded with
// next/dynamic. A client module loaded with next/dynamic is different: its CSS
// is linked only on the pages that render it. So each page gets the
// stylesheets and fonts of its own theme here, instead of every theme's.
//
// Each module wraps the page to set its theme's font variables (see
// FontScope), which is why the page is passed in as children.
const STYLES = {
  story: dynamic(() => import('@/components/story/styles')),
  standard: dynamic(() => import('@/components/documentary/standard/styles')),
  archive: dynamic(() => import('@/components/documentary/archive/styles')),
  craft: dynamic(() => import('@/components/documentary/craft/styles')),
  dragon: dynamic(() => import('@/components/documentary/dragon/styles')),
  passage: dynamic(() => import('@/components/documentary/passage/styles')),
  rising: dynamic(() => import('@/components/documentary/rising/styles')),
  road: dynamic(() => import('@/components/documentary/road/styles')),
  tuning: dynamic(() => import('@/components/documentary/tuning/styles')),
};

export type PieceStylesName = keyof typeof STYLES;

type Props = {
  name: PieceStylesName;
  children: ReactNode;
};

export default function PieceStyles({ name, children }: Props) {
  const Styles = STYLES[name];
  return <Styles>{children}</Styles>;
}
