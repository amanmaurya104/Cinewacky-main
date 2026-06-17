import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

const proximaNova = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-proxima-nova',
  display: 'swap',
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return <div className={`${proximaNova.variable} ${proximaNova.className}`}>{children}</div>;
}
