import Link from 'next/link';
import type { Persona } from '@/lib/storyboard';
import { SafeImage } from './SafeImage';
import { StickerIcon } from './StickerIcon';

// Cast tile. Belongs to the one story spine, it is NOT a second navigation
// system. Clicking a tile scrolls to the beat where that person walks into the
// story (in-page anchor), so the tiles are the cast lineup and the spine is
// still the only journey. The pizazz (portrait, sticker, hover lift) without a
// competing metaphor.

export function PersonaTile({
  persona,
  entersAtBeatId,
  entersAtNumber
}: {
  persona: Persona;
  entersAtBeatId: string;
  entersAtNumber: number;
}) {
  return (
    <Link
      href={`#beat-${entersAtBeatId}`}
      className="group relative block overflow-hidden rounded-[20px] bg-dark-surface ring-1 ring-dark-border shadow-editorial transition-transform duration-300 ease-out-strong hover:-translate-y-1.5"
    >
      {/* Portrait */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
        <SafeImage
          src={persona.photo}
          alt={persona.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ objectPosition: persona.photoFocus }}
        />
        {/* Bottom scrim so the name reads over any photo */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-surface via-dark-surface/60 to-transparent" />
        {/* Sticker, floating in the corner */}
        <div className="absolute -bottom-5 right-4">
          <StickerIcon icon={persona.sticker} size="md" float />
        </div>
      </div>

      {/* Caption */}
      <div className="px-5 pb-5 pt-3">
        <div className="font-display text-xl leading-tight text-dark-ink">
          {persona.name}
        </div>
        <div className="eyebrow mt-1 text-dark-inkMuted">{persona.role}</div>
        <div className="mt-3 flex items-center gap-2 text-phos-400">
          <span className="eyebrow">
            Enters · beat {String(entersAtNumber).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 bg-phos-400/25" />
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
