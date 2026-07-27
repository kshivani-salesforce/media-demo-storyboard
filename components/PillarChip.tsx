import type { Pillar } from '@/lib/story';

// The chapter pillar, shown as a small chip so the theme (Efficiency / Growth /
// Trust & Value) travels with the chapter on the landing, chapter and recap
// pages. `as` lets it render as an eyebrow-style label in the chapter header or
// a pill elsewhere; the wording stays the same so the room hears one theme.
export function PillarChip({
  pillar,
  className = ''
}: {
  pillar: Pillar;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-phos-500/12 px-3 py-1 ring-1 ring-phos-400/30 ${className}`}
    >
      <span className="h-1.5 w-1.5 flex-none rounded-full bg-phos-400" aria-hidden />
      <span className="eyebrow text-phos-200">{pillar}</span>
    </span>
  );
}
