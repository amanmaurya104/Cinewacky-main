"use client";

import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import ShowcaseTitleSpine from './ShowcaseTitleSpine';

type Props = {
  items: ShowcaseScrollItem[];
  activeIndex: number;
  scrollIndex: number;
};

export default function ShowcaseCenterTitle({ items, scrollIndex }: Props) {
  return <ShowcaseTitleSpine items={items} scrollIndex={scrollIndex} />;
}
