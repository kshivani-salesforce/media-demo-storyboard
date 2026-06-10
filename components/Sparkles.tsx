// Decorative scatter of yellow stars, pink dots and blue diamonds: the
// "sticker" layer that sits behind/around the hero in the Agentforce
// help-centre references. Pure SVG, position: absolute children. The parent
// must be `relative` for these to anchor.
//
// `density` controls how many shapes get rendered. The positions are
// hand-tuned, not random, so a re-render doesn't shuffle them.

type Variant = 'on-light' | 'on-dark';

const STAR = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
  </svg>
);

const DIAMOND = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M12 2l8 10-8 10-8-10 8-10z" />
  </svg>
);

const DOT = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <circle cx="12" cy="12" r="6" />
  </svg>
);

type Sparkle = {
  shape: 'star' | 'diamond' | 'dot';
  className: string;
  colour: string;
};

const SCATTER: Sparkle[] = [
  { shape: 'star',    className: 'top-[8%] left-[6%]   w-5 h-5 rotate-[12deg]',   colour: 'text-sf-gold' },
  { shape: 'star',    className: 'top-[18%] right-[10%] w-7 h-7 -rotate-[10deg]', colour: 'text-sf-gold' },
  { shape: 'dot',     className: 'top-[36%] left-[14%]  w-3 h-3',                  colour: 'text-sf-pink' },
  { shape: 'diamond', className: 'top-[54%] right-[8%]  w-4 h-4 rotate-[18deg]',  colour: 'text-sf-sky' },
  { shape: 'dot',     className: 'bottom-[18%] left-[8%] w-2 h-2',                colour: 'text-sf-pink' },
  { shape: 'star',    className: 'bottom-[10%] right-[14%] w-5 h-5',              colour: 'text-sf-gold' },
  { shape: 'diamond', className: 'top-[28%] left-[42%]  w-3 h-3 rotate-[8deg]',   colour: 'text-sf-sky' }
];

export function Sparkles({ variant = 'on-light' as Variant }: { variant?: Variant }) {
  // The pieces stay the same shapes/colours in both variants; the variant
  // prop is reserved for future fine-tuning (e.g. softer opacity on dark).
  const opacity = variant === 'on-dark' ? 'opacity-80' : 'opacity-100';
  return (
    <div className={`pointer-events-none absolute inset-0 ${opacity}`} aria-hidden>
      {SCATTER.map((s, i) => {
        const Shape = s.shape === 'star' ? STAR : s.shape === 'diamond' ? DIAMOND : DOT;
        return (
          <Shape
            key={i}
            className={`absolute ${s.className} ${s.colour} drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]`}
          />
        );
      })}
    </div>
  );
}
