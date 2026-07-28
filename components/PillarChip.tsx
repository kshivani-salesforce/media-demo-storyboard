import type { Pillar } from '@/lib/story';

// The chapter pillar, shown as a small chip so the theme (Efficiency / Growth /
// Trust & Value) travels with the chapter on the landing, chapter and recap
// pages. Solid electric-blue fill with white text (same treatment as the
// "Begin the story" button) so it reads clearly in both light and dark, rather
// than a low-opacity tint that washes out on the light paper.
export function PillarChip({
  pillar,
  className = ''
}: {
  pillar: Pillar;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-phos-500 px-3 py-1 shadow-sm shadow-phos-500/30 ${className}`}
    >
      <span className="h-1.5 w-1.5 flex-none rounded-full bg-white/80" aria-hidden />
      <span className="eyebrow text-white">{pillar}</span>
    </span>
  );
}
