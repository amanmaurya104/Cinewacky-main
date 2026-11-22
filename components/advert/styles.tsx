// The Brand Box page's stylesheet and fonts. Loaded only through
// ProjectStyles, so no other page links them.
import type { ReactNode } from 'react';
import FontScope from '@/components/layout/FontScope';
import { adDisplay, adMono, adSerif, adText } from './fonts';
import './advert.css';

export default function AdvertStyles({ children }: { children: ReactNode }) {
  return <FontScope fonts={[adDisplay, adSerif, adText, adMono]}>{children}</FontScope>;
}
