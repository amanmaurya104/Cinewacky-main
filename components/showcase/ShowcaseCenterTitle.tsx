"use client";

import type { ShowcaseScrollItem } from '@/data/showcaseScroll';
import ShowcaseTitleSpine from './ShowcaseTitleSpine';

type Props = {
  items: ShowcaseScrollItem[];
};

export default function ShowcaseCenterTitle({ items }: Props) {
  return <ShowcaseTitleSpine items={items} />;
}
