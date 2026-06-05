import Image from 'next/image';
import Link from 'next/link';

export default function ShowcaseHeader() {
  return (
    <header className="showcase-header fixed left-0 top-0 flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <Link href="/" className="flex items-center">
        {/* <Image
          src="/logo/cinewacky-logo.png"
          alt="Cinewacky"
          width={180}
          height={50}
          priority
        /> */}
        {/* <Image
  src="/logo/cinewacky-logo.png"
  alt="Cinewacky"
  width={180}
  height={50}
  className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
  priority
/> */}
      </Link>

      <button
        aria-label="menu"
        className="hamburger text-xl sm:text-2xl"
      >
        ☰
      </button>
    </header>
  );
}