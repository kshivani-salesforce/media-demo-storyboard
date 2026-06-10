// Five-card horizontal strip beneath the LifecycleArc. One card per stage
// in lifecycle order. The strip is the editorial detail layer; the loop
// above is the visual anthem. Lit/dim states mirror the loop via the same
// `litStages` set.

import { stages, type StageKey } from '@/lib/lifecycle';

const STAGE_TONES: Record<StageKey, { ring: string; accent: string; index: string }> = {
  discover: { ring: '#6ee7c7', accent: '#9ff0d8', index: '01' },
  plan:     { ring: '#b79dec', accent: '#c8b4f0', index: '02' },
  launch:   { ring: '#f0b400', accent: '#fce39a', index: '03' },
  monitor:  { ring: '#fb7185', accent: '#fda5b0', index: '04' },
  optimise: { ring: '#f97583', accent: '#fbb1ba', index: '05' }
};

export function LifecycleStrip({
  litStages,
  activeStage
}: {
  litStages: Set<StageKey>;
  activeStage?: StageKey;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {stages.map((stage) => {
        const lit = litStages.has(stage.key);
        const isActive = activeStage === stage.key;
        const tone = STAGE_TONES[stage.key];
        return (
          <article
            key={stage.key}
            className={`relative flex flex-col rounded-2xl px-5 py-5 ring-1 transition duration-500 ${
              lit
                ? 'bg-dark-surface'
                : 'bg-dark-surface/50'
            }`}
            style={{
              boxShadow: isActive
                ? `0 0 0 1px ${tone.ring}, 0 24px 48px -16px rgba(0,0,0,0.6)`
                : `0 0 0 1px ${lit ? 'rgba(245,240,225,0.12)' : 'rgba(245,240,225,0.06)'}`,
              opacity: lit ? 1 : 0.45
            }}
          >
            {/* Editorial header: index numeral, hairline rule, label */}
            <div className="flex items-baseline gap-3">
              <span
                className="font-display italic leading-none"
                style={{ color: tone.accent, fontSize: 32 }}
              >
                {tone.index}
              </span>
              <span className="h-px flex-1 bg-dark-border" />
              <span className="eyebrow" style={{ color: tone.accent }}>
                {stage.label}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-dark-ink/85">
              {stage.caption}
            </p>

            {/* Tools list at the bottom of each card */}
            <div className="mt-auto pt-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-dark-inkMuted">
                Powered by
              </div>
              <ul className="mt-2 space-y-1">
                {stage.actors.map((a, i) => {
                  if (a.kind === 'tool' && a.label) {
                    return (
                      <li
                        key={`t-${i}`}
                        className="flex items-baseline gap-2 text-[12px] text-dark-ink/85"
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 flex-none rounded-full"
                          style={{ background: tone.ring }}
                        />
                        {a.label}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
