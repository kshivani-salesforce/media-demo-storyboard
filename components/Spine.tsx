import type { ReactNode } from 'react';

// The spine: an ordered list with a vertical gradient connector line running
// behind the node column. Wraps a set of <BeatCard> children. Used on each
// chapter page (and re-usable anywhere the beats are listed on the rail).
export function Spine({ children }: { children: ReactNode }) {
  return (
    <ol className="relative">
      {/* The connecting line runs behind the node column. */}
      <span
        aria-hidden
        className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-phos-400/50 via-phos-500/40 to-phos-700/30 sm:left-[23px]"
      />
      {children}
    </ol>
  );
}
