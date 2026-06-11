import { SafeImage } from './SafeImage';

// Wrapper around a 3D bubble icon (Agentforce / Data360 / Marketing /
// Slack / Collaboration) so it gets the floating-shadow + soft-circle
// background treatment seen in the references.
//
// Sizes are deliberate: `sm` works as a tile-corner sticker, `md` for inline
// callouts, `lg` for hero illustrations.

type Size = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'w-12 h-12 p-1.5',
  md: 'w-16 h-16 p-2',
  lg: 'w-24 h-24 p-3',
  xl: 'w-32 h-32 p-4'
};

export type StickerKey =
  | 'agentforce'
  | 'data360'
  | 'media'
  | 'marketing'
  | 'slack-3d'
  | 'collaboration';

const SOURCES: Record<StickerKey, string> = {
  agentforce: '/icons/agentforce.png',
  data360: '/icons/data360.png',
  // The canonical Media Cloud / Agentforce-for-M&E icon. Use this for
  // anything Media Cloud or Agentforce-for-Media. The 'marketing' icon
  // is reserved for Marketing Cloud surfaces only.
  media: '/icons/media.svg',
  marketing: '/icons/marketing.png',
  'slack-3d': '/icons/slack-3d.png',
  collaboration: '/icons/collaboration.png'
};

// Exported so surfaces that already supply their own bubble (e.g. the
// LifecycleArc stage clusters) can render the raw icon image directly,
// without nesting a second StickerIcon bubble inside theirs. Nesting two
// bubbles squished the icon: the inner fixed-size bubble was wider than the
// outer one's padded content box, so as a flex child it collapsed on the
// main axis into an oval. Render the image straight into one bubble instead.
export const STICKER_SOURCES = SOURCES;

export function StickerIcon({
  icon,
  size = 'md',
  className = '',
  float = false
}: {
  icon: StickerKey;
  size?: Size;
  className?: string;
  // When true, the icon gets a soft floating animation. Use sparingly;
  // animating every sticker is busy.
  float?: boolean;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sf-card ring-1 ring-light-surface ${
        SIZE_CLASSES[size]
      } ${float ? 'animate-float-slow' : ''} ${className}`}
    >
      <SafeImage
        src={SOURCES[icon]}
        alt=""
        className="h-full w-full object-contain"
      />
    </div>
  );
}
