import Link from 'next/link';
import SiteMenu from './SiteMenu';

export default function SiteHeader() {
  return (
    <header className="showcase-header fixed left-0 top-0 flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <Link href="/" className="flex items-center" aria-label="Cinewacky home">
        {/* Logo is hidden for now. To restore it, `import Image from 'next/image'` and:
        <Image
          src="/logo/cinewacky-logo.png"
          alt="Cinewacky"
          width={180}
          height={50}
          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          priority
        /> */}
      </Link>

      <SiteMenu />
    </header>
  );
}
