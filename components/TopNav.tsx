// Slim top nav shared across the landing, chapter, full-story and architecture
// pages. Small pills on a dark bar, current page highlighted. The three chapter
// tabs are always jumpable, so the room can move around, though the story is
// still one linear walk driven by the forward buttons.

import Link from 'next/link';
import { BrandLockup } from './BrandLockup';
import { chapters } from '@/lib/story';

export type NavKey =
  | 'chapter-1'
  | 'chapter-2'
  | 'chapter-3'
  | 'full-story'
  | 'architecture';

const TABS: { key: NavKey; label: string; href: string }[] = [
  ...chapters.map((c, i) => ({
    key: `chapter-${i + 1}` as NavKey,
    label: `Ch. ${c.numeral}`,
    href: `/story/${i + 1}`
  })),
  { key: 'full-story', label: 'Full story', href: '/story' },
  { key: 'architecture', label: 'Architecture', href: '/architecture' }
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
