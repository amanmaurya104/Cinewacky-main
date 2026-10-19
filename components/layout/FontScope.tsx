import type { ReactNode } from 'react';

type Props = {
  /** next/font fonts declared with a `variable`. */
  fonts: { variable: string }[];
  children: ReactNode;
};

/**
 * Sets next/font CSS variables for everything inside it. `display: contents`
 * keeps the wrapper out of layout, and custom properties still inherit through
 * it, so a page renders as if the classes sat on its own root element.
 */
export default function FontScope({ fonts, children }: Props) {
  return (
    <div className={fonts.map((font) => font.variable).join(' ')} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
