import Link from 'next/link';
import type { Persona } from '@/lib/storyboard';
import { SafeImage } from './SafeImage';
import { StickerIcon } from './StickerIcon';

// Cast tile on the landing page. This is the meet-the-cast moment: portrait,
// role, and the persona's one-line intro. Every tile opens the story at
// Chapter I, the story is one linear walk, not three separate journeys, so the
// tiles are the lineup and the forward buttons drive the path.

export function PersonaTile({ persona }: { persona: Persona }) {
  return (
    <Link
      href="/story/1"
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
      </div>

      {/* Sticker, floating on the seam between photo and caption. Positioned at
          the Link level (not inside the portrait) so it isn't clipped by the
          portrait's overflow-hidden. Offset from the top by the portrait
          height (h-56 = 14rem) less part of the sticker so it hangs over the
          seam. */}
      <div className="pointer-events-none absolute right-4 top-[calc(14rem-2.75rem)] z-10">
        <StickerIcon icon={persona.sticker} size="md" float />
      </div>

      {/* Caption */}
      <div className="px-5 pb-5 pt-3">
        <div className="font-display text-xl leading-tight text-dark-ink">
          {persona.name}
        </div>
        <div className="eyebrow mt-1 text-dark-inkMuted">{persona.role}</div>
        <p className="mt-3 text-sm leading-relaxed text-dark-ink/80">
          {persona.entryLine}
        </p>
      </div>
    </Link>
  );
}
