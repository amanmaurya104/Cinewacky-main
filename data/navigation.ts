import type { PublishStatus } from '@/types/publishing';

export type NavigationItem = {
  title: string;
  href: string;
  /** Set to `live` once the page is built; until then the link opens /maintenance. */
  status: PublishStatus;
};

export const mainNavigation: NavigationItem[] = [
  { title: 'Home', href: '/', status: 'live' },
  { title: 'Experience', href: '/experience', status: 'draft' },
  { title: 'Achievements', href: '/achievements', status: 'draft' },
  { title: 'Contact', href: '/contact', status: 'draft' },
];

export default mainNavigation;
