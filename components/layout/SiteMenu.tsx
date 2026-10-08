"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { mainNavigation } from '@/data/navigation';
import projects, { getProjectHref } from '@/data/projects';
import '@/styles/menu.css';

/**
 * Hamburger button plus the fullscreen menu it opens. The overlay is portalled
 * to <body> so wheel/touch on it never reaches the showcase scroll container
 * the header lives in.
 */
export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep Tab inside the open menu instead of wandering into the page behind.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    const opener = openRef.current;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={openRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
        className="hamburger text-xl sm:text-2xl"
      >
        ☰
      </button>

      {open &&
        createPortal(
          <div
            ref={dialogRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="site-menu"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="site-menu-close"
            >
              ✕
            </button>

            <div className="site-menu-inner">
              <nav aria-label="Main" className="site-menu-main">
                {mainNavigation.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.ready ? item.href : '/maintenance'}
                    onClick={close}
                    className="site-menu-main-link"
                    style={{ animationDelay: `${80 + i * 60}ms` }}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <nav aria-label="Projects" className="site-menu-projects">
                <p className="site-menu-heading">Projects</p>
                <ul>
                  {projects.map((project, i) => (
                    <li key={project.slug}>
                      <Link
                        href={getProjectHref(project.slug)}
                        onClick={close}
                        className="site-menu-project-link"
                        aria-label={
                          project.ready ? undefined : `${project.title} — in production`
                        }
                      >
                        <span className="site-menu-project-num">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="site-menu-project-title">{project.title}</span>
                        {project.ready ? (
                          project.category && (
                            <span className="site-menu-project-cat">{project.category}</span>
                          )
                        ) : (
                          <span className="site-menu-project-cat">Coming soon</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
