import Link from 'next/link';

export default function ShowcaseHeader() {
  return (
    <header className="showcase-header fixed left-0 top-0 flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <Link href="/" className="text-base font-bold sm:text-lg">
        Cinewacky
      </Link>
      <button aria-label="menu" className="hamburger text-xl sm:text-2xl">
        ☰
      </button>
    </header>
  );
}
