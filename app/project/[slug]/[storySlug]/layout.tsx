import type { ReactNode } from 'react';
import SiteMenu from '@/components/layout/SiteMenu';

// Story and documentary pages have no header of their own, so the menu floats.
export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="site-menu-float">
        <SiteMenu />
      </div>
      {children}
    </>
  );
}
