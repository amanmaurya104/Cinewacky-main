// Set `ready: true` once a page is built; until then links to it open /maintenance.
export const mainNavigation = [
  { title: 'Home', href: '/', ready: true },
  { title: 'Experience', href: '/experience', ready: false },
  { title: 'Achievements', href: '/achievements', ready: false },
  { title: 'Contact', href: '/contact', ready: false },
];

export default mainNavigation;
