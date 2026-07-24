import type { StoryBeat } from '@/lib/story';
import { PersonaIntro } from './PersonaIntro';

// One beat on the spine: a numbered node in the left column and the beat card
// beside it. `number` is the global 1-based beat number (01..07) so numbering
// stays continuous across chapter pages. `isFinal` gives the last beat of the
// whole story its solid-blue node.
export function BeatCard({
  beat,
  number,
  isFinal = false
}: {
  beat: StoryBeat;
  number: number;
  isFinal?: boolean;
}) {
  return (
    <li className="relative">
      <div
        id={`beat-${beat.id}`}
        className="relative scroll-mt-28 pl-14 pb-12 sm:pl-16"
      >
        {/* Node */}
        <span
          className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full font-display text-base font-semibold sm:h-12 sm:w-12"
          style={{
            background: isFinal ? '#066afe' : 'rgba(6,106,254,0.16)',
            color: isFinal ? '#ffffff' : '#a8cbff',
            boxShadow: '0 0 0 1px rgba(61,139,254,0.45), 0 0 24px rgba(6,106,254,0.30)'
          }}
        >
          {String(number).padStart(2, '0')}
        </span>

        {/* Beat card */}
        <div className="rounded-[20px] bg-dark-surface/80 p-6 ring-1 ring-dark-border sm:p-7">
          <h3 className="font-display text-[30px] leading-[1.14] sm:text-[34px]">
            {beat.title}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-[1.7] text-dark-inkMuted">
            {beat.scene}
          </p>

          {/* Persona intro(s) on first entry */}
          {beat.entersHere && beat.entersHere.length > 0 && (
            <div className="mt-5 flex flex-col gap-3">
              {beat.entersHere.map((slug) => (
                <PersonaIntro key={slug} slug={slug} />
              ))}
            </div>
          )}

          {/* On-screen note */}
          <div className="mt-5 flex items-start gap-2.5 border-t border-dark-border pt-4">
            <span className="eyebrow mt-0.5 flex-none text-phos-400">
              On screen
            </span>
            <span className="text-sm leading-relaxed text-dark-ink/80">
              {beat.onScreen}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
