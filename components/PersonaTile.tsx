import Link from 'next/link';
import type { Persona } from '@/lib/storyboard';
import { stagesForPersona, findStage } from '@/lib/lifecycle';
import { StickerIcon } from './StickerIcon';
import { SafeImage } from './SafeImage';

// Netflix-style tile, dark-cinematic. Shape lifted from the Driva v2
// reference: portrait fills the card, role label pinned top-left, name
// banner over the photo, tagline + a small "drives" badge underneath
// telling the room which lifecycle stages this persona owns.

const STAGE_TONES: Record<string, string> = {
  discover: 'bg-sf-cobalt/20 text-sf-sky ring-sf-cobalt/40',
  plan: 'bg-sf-purple/20 text-sf-purple ring-sf-purple/40',
  launch: 'bg-sf-gold/20 text-sf-gold ring-sf-gold/40',
  monitor: 'bg-sf-sky/20 text-sf-sky ring-sf-sky/40',
  optimise: 'bg-sf-pink/20 text-sf-pink ring-sf-pink/40'
};

export function PersonaTile({ persona }: { persona: Persona }) {
  const { driver, cameo } = stagesForPersona(persona.slug);
  return (
    <Link
      href={`/personas/${persona.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-dark-surface ring-1 ring-dark-border transition-all duration-300 hover:-translate-y-1 hover:ring-sf-cobalt/60 hover:shadow-sf-tile"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
        <SafeImage
          src={persona.photo}
          alt={persona.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          style={{ objectPosition: persona.photoFocus }}
        />

        <div className="absolute top-3 right-3 z-10">
          <StickerIcon icon={persona.sticker} size="sm" />
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 pt-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sf-gold">
            {persona.role}
          </div>
          <div className="mt-1 font-display text-3xl font-bold text-white">
            {persona.name}
          </div>
          <div className="mt-1 text-sm text-dark-inkMuted">{persona.tagline}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {driver.map((s) => {
              const stage = findStage(s);
              return (
                <span
                  key={s}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ring-1 ${STAGE_TONES[s]}`}
                >
                  {stage?.label}
                </span>
              );
            })}
            {cameo.map((s) => {
              const stage = findStage(s);
              return (
                <span
                  key={s}
                  className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-dark-inkMuted ring-1 ring-dark-border"
                >
                  {stage?.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-sf-cobalt px-5 py-3 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
        Open {persona.name}&apos;s storyboard →
      </div>
    </Link>
  );
}
