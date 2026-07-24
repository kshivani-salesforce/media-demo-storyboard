import { personas, type PersonaSlug } from '@/lib/storyboard';
import { SafeImage } from './SafeImage';

// A small portrait + intro block, rendered inline in the spine when a persona
// first enters the story, so the room meets them in context.
export function PersonaIntro({ slug }: { slug: PersonaSlug }) {
  const p = personas[slug];
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-dark-surface/70 p-4 ring-1 ring-dark-border">
      <div
        className="relative h-16 w-16 flex-none overflow-hidden rounded-full"
        style={{ boxShadow: '0 0 0 2px rgba(61,139,254,0.5)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
        <SafeImage
          src={p.photo}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: p.photoFocus }}
        />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg text-dark-ink">{p.name}</span>
          <span className="eyebrow text-phos-400">meet</span>
        </div>
        <div className="eyebrow mt-0.5 text-dark-inkMuted">{p.role}</div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-dark-ink/85">
          {p.entryLine}
        </p>
      </div>
    </div>
  );
}
