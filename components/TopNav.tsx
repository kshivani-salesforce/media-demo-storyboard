// Slim top nav shared across home, persona and architecture pages. Echoes
// the Driva v2 tab strip: small pills on a dark bar, current page
// highlighted.

import Link from 'next/link';
import { BrandLockup } from './BrandLockup';

type NavKey = 'personas' | 'architecture' | 'vignettes';

const TABS: { key: NavKey; label: string; href: string }[] = [
  { key: 'personas', label: 'Personas', href: '/' },
  { key: 'architecture', label: 'Architecture', href: '/architecture' },
  { key: 'vignettes', label: 'Vignettes', href: '/#vignettes' }
];

export function TopNav({ active }: { active?: NavKey }) {
  return (
    <nav className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
      <Link href="/" className="flex items-center">
        <BrandLockup />
      </Link>
      <div className="flex items-center gap-1 rounded-full bg-dark-surface px-1.5 py-1.5 ring-1 ring-dark-border">
        {TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? 'bg-sf-cobalt text-white shadow-lg shadow-sf-cobalt/30'
                  : 'text-dark-inkMuted hover:text-dark-ink'
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
