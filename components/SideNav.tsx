'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { chapters } from '@/lib/story';

// Persistent left-hand route navigator for the Nine storyboard. Unlike the
// Cartology vision (a single page whose nav switches sections), Nine is genuinely
// multi-page, so this is a ROUTE navigator: it derives the current page from the
// pathname and always offers a clear way Home plus every destination.
//
//   - Desktop (xl+): a fixed vertical rail down the left margin, current page
//     highlighted. Home is the first, explicit entry (the pain this solves:
//     getting back without hunting for the logo or a contextual back-link).
//   - Below xl: a fixed round "Menu" button bottom-left that opens the same
//     list as an overlay, so Home is one tap away on any page.

type NavItem = { label: string; href: string; num?: string; glyph?: string };

function useNavItems(): NavItem[] {
  return [
    { label: 'Home', href: '/', glyph: '⌂' },
    { label: 'The cast', href: '/cast', glyph: '☺' },
    ...chapters.map((c, i) => ({
      label: `Chapter ${c.numeral}`,
      href: `/story/${i + 1}`,
      num: String(i + 1).padStart(2, '0')
    })),
    { label: 'Full story', href: '/story', glyph: '☷' },
    { label: 'Architecture', href: '/architecture', glyph: '□' }
  ];
}

// The chapter routes share the /story/[n] shape; match exactly, and treat
// /story (no number) as Full story.
function isCurrent(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/story') return pathname === '/story';
  return pathname === href || pathname.startsWith(href + '/');
}

// Rendered per-page (not globally in layout) so the wide architecture page can
// simply omit it; Home stays reachable there via the top-nav Home pill. Kept
// off the layout because a globally-prerendered client component sees a null
// pathname at build time, which defeated a route guard.
export function SideNav() {
  const pathname = usePathname() || '/';
  const items = useNavItems();
  const [open, setOpen] = useState(false);

  const Marker = ({ item, active }: { item: NavItem; active: boolean }) => (
    <span
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full font-display text-sm font-bold transition-all duration-300 ${
        active
          ? 'bg-phos-500 text-white shadow-lg shadow-phos-500/30'
          : 'bg-dark-surface text-dark-inkMuted ring-1 ring-dark-border group-hover:text-dark-ink group-hover:ring-phos-400/50'
      }`}
    >
      {item.num ?? item.glyph}
    </span>
  );

  return (
    <>
      {/* Desktop: fixed vertical route rail. */}
      <nav
        aria-label="Pages"
        className="fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 pl-6 xl:block 2xl:pl-10"
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="group flex items-center gap-3.5 py-2"
                >
                  <Marker item={item} active={active} />
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      active
                        ? 'text-dark-ink'
                        : 'text-dark-inkMuted group-hover:text-dark-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Below xl: a floating Menu button that opens the same list. Keeps Home
          one tap away without a permanent rail crowding the narrow layout. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-phos-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-phos-500/40 xl:hidden"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Menu
      </button>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Pages">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-sf-cobaltDeep/70 backdrop-blur-sm"
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-dark-border bg-dark-canvas p-6 animate-slide-up">
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow text-phos-400">Go to</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-dark-inkMuted ring-1 ring-dark-border"
              >
                &#215;
              </button>
            </div>
            <ul className="flex flex-col">
              {items.map((item) => {
                const active = isCurrent(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-center gap-3 py-2.5"
                    >
                      <Marker item={item} active={active} />
                      <span
                        className={`text-sm font-semibold ${
                          active ? 'text-phos-400' : 'text-dark-ink'
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
