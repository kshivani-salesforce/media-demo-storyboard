'use client';

import { useSyncExternalStore } from 'react';

// Light/dark toggle. The initial theme is set pre-paint by the inline script in
// app/layout.tsx (reads localStorage 'nine-theme', defaults to dark), so there
// is no hydration flash. The visible sun/moon crossfade is pure CSS driven by
// the `.dark` class; we read the current theme via useSyncExternalStore only to
// label the control accessibly. No dependency, hand-rolled for Tailwind v3.

const THEME_EVENT = 'nine-theme-change';
const STORAGE_KEY = 'nine-theme';

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

const getSnapshot = () =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark');
const getServerSnapshot = () => true; // default is dark

export function ThemeToggle({ className = '' }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    root.classList.toggle('dark', next);
    root.style.colorScheme = next ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // ignore persistence failures (e.g. private mode)
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-dark-surface text-dark-inkMuted ring-1 ring-dark-border transition hover:text-dark-ink ${className}`}
    >
      {/* Sun (visible in light mode) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon (visible in dark mode) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
        aria-hidden
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
