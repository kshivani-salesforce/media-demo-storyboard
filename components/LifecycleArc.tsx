'use client';

// Campaign Lifecycle, two-tier composition.
//
// Tier 1 (this component): a self-contained loop. Suzie at the centre, five
// stage clusters (persona avatar + 2 tool stickers + stage label) arranged
// clockwise. Nothing punches through the frame. Read in two seconds.
//
// Tier 2 (LifecycleStrip): five prose cards in a horizontal row beneath
// the loop, one per stage in lifecycle order. Lit/dim state mirrors the
// loop. That's where the prose lives. The two tiers connect via shared
// state, not shared geometry.

import { useMemo } from 'react';
import Link from 'next/link';
import { stages, type StageKey } from '@/lib/lifecycle';
import { personas, findPersona } from '@/lib/storyboard';
import { SafeImage } from './SafeImage';
import { STICKER_SOURCES, type StickerKey } from './StickerIcon';

// Wide-oval viewBox. 16:7 aspect.
const VIEW = { w: 1600, h: 700 };
const CENTRE = { x: 800, y: 350 };
const RADIUS = { x: 600, y: 240 };

const STAGE_ORDER: StageKey[] = [
  'discover',
  'plan',
  'launch',
  'monitor',
  'optimise'
];

const STAGE_ANGLES: Record<StageKey, number> = STAGE_ORDER.reduce(
  (acc, key, i) => {
    acc[key] = -Math.PI / 2 + (i * 2 * Math.PI) / STAGE_ORDER.length;
    return acc;
  },
  {} as Record<StageKey, number>
);

const STAGE_TONES: Record<StageKey, { ring: string; soft: string; accent: string }> = {
  discover: { ring: '#6ee7c7', soft: 'rgba(110,231,199,0.18)', accent: '#9ff0d8' },
  plan:     { ring: '#b79dec', soft: 'rgba(183,157,236,0.20)', accent: '#c8b4f0' },
  launch:   { ring: '#f0b400', soft: 'rgba(240,180,0,0.24)',   accent: '#fce39a' },
  monitor:  { ring: '#fb7185', soft: 'rgba(251,113,133,0.20)', accent: '#fda5b0' },
  optimise: { ring: '#f97583', soft: 'rgba(249,117,131,0.18)', accent: '#fbb1ba' }
};

function pointAt(stage: StageKey) {
  const a = STAGE_ANGLES[stage];
  return {
    x: CENTRE.x + RADIUS.x * Math.cos(a),
    y: CENTRE.y + RADIUS.y * Math.sin(a),
    angle: a
  };
}

export function LifecycleArc({
  litStages,
  activeStage,
  reducedMotion = false
}: {
  litStages: Set<StageKey>;
  activeStage?: StageKey;
  // When true, the orbiting comet is suppressed. The looping CSS keyframes
  // (breathe / orbit-dash) are handled by the prefers-reduced-motion rule in
  // globals.css; this prop covers the SMIL comet, which CSS can't gate cleanly.
  reducedMotion?: boolean;
}) {
  const personaBySlug = useMemo(
    () => Object.fromEntries(personas.map((p) => [p.slug, p])),
    []
  );
  const suzie = findPersona('suzie');

  return (
    <div
      className="noise relative w-full overflow-hidden rounded-[28px] ring-1 ring-dark-border"
      style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
    >
      {/* Painted backdrop, two-source lighting */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 1100px 580px at 50% 55%, rgba(240,180,0,0.10) 0%, rgba(183,157,236,0.05) 35%, rgba(7,10,26,0) 70%), radial-gradient(ellipse 700px 420px at 90% 0%, rgba(110,231,199,0.06) 0%, rgba(7,10,26,0) 60%), linear-gradient(180deg, #060914 0%, #070a1a 50%, #060914 100%)'
        }}
      />

      {/* Editorial frame */}
      <div className="pointer-events-none absolute inset-5 rounded-[20px] border border-dark-border/60" />
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="relative block w-full h-auto"
        role="img"
        aria-label="Campaign lifecycle, as a closed loop"
      >
        <defs>
          <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7c7" stopOpacity="0.5" />
            <stop offset="35%" stopColor="#f0b400" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#fb7185" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b79dec" stopOpacity="0.5" />
          </linearGradient>
          <filter id="orbit-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Centre breathing halo behind Suzie */}
        <ellipse
          cx={CENTRE.x}
          cy={CENTRE.y}
          rx={260}
          ry={140}
          fill="rgba(240,180,0,0.10)"
          className="animate-breathe"
          style={{ transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}
        />

        {/* Loop: hairline base + dashed orbital + neon overlay */}
        <ellipse
          cx={CENTRE.x}
          cy={CENTRE.y}
          rx={RADIUS.x}
          ry={RADIUS.y}
          fill="none"
          stroke="rgba(245,240,225,0.10)"
          strokeWidth={1.5}
        />
        <ellipse
          cx={CENTRE.x}
          cy={CENTRE.y}
          rx={RADIUS.x + 14}
          ry={RADIUS.y + 14}
          fill="none"
          stroke="rgba(245,240,225,0.07)"
          strokeWidth={1}
          strokeDasharray="4 14"
          className="animate-orbit-dash"
        />
        <ellipse
          cx={CENTRE.x}
          cy={CENTRE.y}
          rx={RADIUS.x}
          ry={RADIUS.y}
          fill="none"
          stroke="url(#loopGrad)"
          strokeWidth={2.4}
          strokeLinecap="round"
          filter="url(#orbit-glow)"
          opacity={0.85}
        />

        {/* Comet: an amber pulse running clockwise along the loop. This is the
            single clearest cue that the lifecycle is a directional, repeating
            cycle. Pure SMIL animateMotion, declarative, off the main thread.
            Path starts at the top and sweeps clockwise (sweep-flag 1). */}
        {!reducedMotion && (
          <g filter="url(#orbit-glow)">
            <circle r={7} fill="#fce39a">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                rotate="auto"
                path={`M ${CENTRE.x},${CENTRE.y - RADIUS.y} A ${RADIUS.x},${RADIUS.y} 0 1 1 ${CENTRE.x},${CENTRE.y + RADIUS.y} A ${RADIUS.x},${RADIUS.y} 0 1 1 ${CENTRE.x},${CENTRE.y - RADIUS.y}`}
              />
            </circle>
            {/* Faint trailing wake just behind the comet head. */}
            <circle r={4} fill="rgba(240,180,0,0.55)">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                rotate="auto"
                begin="-0.22s"
                path={`M ${CENTRE.x},${CENTRE.y - RADIUS.y} A ${RADIUS.x},${RADIUS.y} 0 1 1 ${CENTRE.x},${CENTRE.y + RADIUS.y} A ${RADIUS.x},${RADIUS.y} 0 1 1 ${CENTRE.x},${CENTRE.y - RADIUS.y}`}
              />
            </circle>
          </g>
        )}

        {/* Direction arrows on each segment */}
        {STAGE_ORDER.map((key, i) => {
          const a = STAGE_ANGLES[key];
          const bRaw = STAGE_ANGLES[STAGE_ORDER[(i + 1) % STAGE_ORDER.length]];
          const b = bRaw < a ? bRaw + 2 * Math.PI : bRaw;
          const mid = (a + b) / 2;
          const x = CENTRE.x + RADIUS.x * Math.cos(mid);
          const y = CENTRE.y + RADIUS.y * Math.sin(mid);
          const tx = -RADIUS.x * Math.sin(mid);
          const ty = RADIUS.y * Math.cos(mid);
          const len = Math.hypot(tx, ty);
          const dx = (tx / len) * 12;
          const dy = (ty / len) * 12;
          const px = -dy * 0.55;
          const py = dx * 0.55;
          const lit = litStages.has(key);
          return (
            <polygon
              key={`arrow-${key}`}
              points={`${x + dx},${y + dy} ${x - dx + px},${y - dy + py} ${x - dx - px},${y - dy - py}`}
              fill="#f0b400"
              opacity={lit ? 0.92 : 0.35}
            />
          );
        })}

        {/* Per-node tone halo */}
        {stages.map((stage) => {
          const pt = pointAt(stage.key);
          const lit = litStages.has(stage.key);
          if (!lit) return null;
          const tone = STAGE_TONES[stage.key];
          const isActive = activeStage === stage.key;
          return (
            <ellipse
              key={`halo-${stage.key}`}
              cx={pt.x}
              cy={pt.y}
              rx={isActive ? 130 : 100}
              ry={isActive ? 95 : 75}
              fill={tone.soft}
              opacity={isActive ? 0.95 : 0.65}
              style={{ filter: 'blur(20px)' }}
            />
          );
        })}
      </svg>

      {/* Centre: Suzie */}
      {suzie && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Link
            href={`/personas/${suzie.slug}`}
            className="pointer-events-auto group relative block text-center"
          >
            <div
              className="relative mx-auto h-32 w-32 overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-[1.04]"
              style={{
                boxShadow:
                  '0 0 0 4px rgba(240,180,0,0.95), 0 0 0 10px rgba(245,240,225,0.06), 0 0 60px rgba(240,180,0,0.45)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
              <SafeImage
                src={suzie.photo}
                alt={suzie.name}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: suzie.photoFocus }}
              />
            </div>
            <div className="mt-4 inline-flex items-center gap-2">
              <span className="h-px w-6 bg-phos-400/60" />
              <span className="eyebrow text-phos-400">The advertiser</span>
              <span className="h-px w-6 bg-phos-400/60" />
            </div>
            <div className="mt-2 font-display text-[40px] leading-none text-dark-ink">
              {suzie.name}
            </div>
            <div className="mt-1 font-display italic text-base text-dark-inkMuted">
              every loop runs for her.
            </div>
          </Link>
        </div>
      )}

      {/* Stage clusters: avatar + tool stickers + label, no prose */}
      <div className="absolute inset-0">
        {stages.map((stage) => {
          const pt = pointAt(stage.key);
          const lit = litStages.has(stage.key);
          const isActive = activeStage === stage.key;
          const tone = STAGE_TONES[stage.key];

          const leftPct = (pt.x / VIEW.w) * 100;
          const topPct = (pt.y / VIEW.h) * 100;

          return (
            <div
              key={stage.key}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[220ms] ease-out-strong ${
                lit ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              <Cluster
                actors={stage.actors}
                tone={tone}
                lit={lit}
                isActive={isActive}
                stageLabel={stage.label}
                personaBySlug={personaBySlug}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- Cluster --------------------------------------------------------------

// Persona avatar headline + two tool stickers in a tight horizontal row
// underneath, then the stage label as a single word in serif italic.
function Cluster({
  actors,
  tone,
  lit,
  isActive,
  stageLabel,
  personaBySlug
}: {
  actors: typeof stages[number]['actors'];
  tone: { ring: string; soft: string; accent: string };
  lit: boolean;
  isActive: boolean;
  stageLabel: string;
  personaBySlug: Record<string, (typeof personas)[number]>;
}) {
  const headliner = actors[0];
  // Take only the first two non-persona supporting actors to keep the row
  // tidy. Any persona cameo also counts.
  const supporting = actors.slice(1, 3);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Headliner avatar */}
      {headliner.kind === 'persona' ? (
        <PersonaHead
          persona={personaBySlug[headliner.slug]!}
          tone={tone}
          lit={lit}
          isActive={isActive}
        />
      ) : (
        <ToolHead sticker={headliner.sticker} tone={tone} lit={lit} />
      )}

      {/* Stage name in serif italic, the only label on the loop */}
      <div className="text-center">
        <div
          className="font-display italic leading-none"
          style={{
            color: lit ? tone.accent : 'rgba(245,240,225,0.5)',
            fontSize: 18
          }}
        >
          {stageLabel}
        </div>
      </div>

      {/* Tools row, fixed gap, no overlap */}
      {supporting.length > 0 && (
        <div className="flex items-start justify-center gap-2">
          {supporting.map((a, i) =>
            a.kind === 'persona' ? (
              <PersonaSmall
                key={`sup-${i}`}
                persona={personaBySlug[a.slug]!}
                tone={tone}
              />
            ) : (
              <ToolSmall
                key={`sup-${i}`}
                sticker={a.sticker}
                tone={tone}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

function PersonaHead({
  persona,
  tone,
  lit,
  isActive
}: {
  persona: (typeof personas)[number];
  tone: { ring: string; soft: string };
  lit: boolean;
  isActive: boolean;
}) {
  return (
    <Link
      href={`/personas/${persona.slug}`}
      className="pointer-events-auto block text-center transition-transform duration-300 hover:-translate-y-1"
      style={{
        filter: lit
          ? `drop-shadow(0 0 18px ${tone.soft}) drop-shadow(0 6px 14px rgba(0,0,0,0.45))`
          : 'none'
      }}
    >
      <div
        className="relative mx-auto h-[80px] w-[80px] overflow-hidden rounded-full"
        style={{
          boxShadow: `0 0 0 3px ${tone.ring}, 0 0 0 7px rgba(245,240,225,0.06)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
        <SafeImage
          src={persona.photo}
          alt={persona.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: persona.photoFocus }}
        />
      </div>
      <div
        className={`eyebrow mt-1.5 ${
          isActive ? 'text-dark-ink' : 'text-dark-ink/85'
        }`}
      >
        {persona.name}
      </div>
    </Link>
  );
}

function PersonaSmall({
  persona,
  tone
}: {
  persona: (typeof personas)[number];
  tone: { ring: string; soft: string };
}) {
  return (
    <Link
      href={`/personas/${persona.slug}`}
      className="pointer-events-auto block transition-transform hover:-translate-y-0.5"
      style={{ filter: `drop-shadow(0 0 6px ${tone.soft})` }}
    >
      <div
        className="relative h-10 w-10 overflow-hidden rounded-full"
        style={{ boxShadow: `0 0 0 2px ${tone.ring}` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
        <SafeImage
          src={persona.photo}
          alt={persona.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: persona.photoFocus }}
        />
      </div>
    </Link>
  );
}

// One white bubble, the icon image rendered straight inside it. No nested
// StickerIcon (that produced a white-on-white double circle and squished the
// icon into an oval). `flex-none` + `object-contain` keep the icon round and
// uncompressed inside the padded bubble.
function ToolHead({
  sticker,
  tone,
  lit
}: {
  sticker: StickerKey;
  tone: { ring: string; soft: string };
  lit: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-white/95"
      style={{
        width: 80,
        height: 80,
        boxShadow: `0 0 0 3px ${tone.ring}, 0 0 0 7px rgba(245,240,225,0.06), 0 0 24px ${
          lit ? tone.soft : 'transparent'
        }`,
        padding: 12
      }}
    >
      <SafeImage
        src={STICKER_SOURCES[sticker]}
        alt=""
        className="block h-full w-full flex-none object-contain"
      />
    </div>
  );
}

function ToolSmall({
  sticker,
  tone
}: {
  sticker: StickerKey;
  tone: { ring: string; soft: string };
}) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95"
      style={{
        boxShadow: `0 0 0 2px ${tone.ring}, 0 0 10px ${tone.soft}`,
        padding: 6
      }}
    >
      <SafeImage
        src={STICKER_SOURCES[sticker]}
        alt=""
        className="block h-full w-full flex-none object-contain"
      />
    </div>
  );
}

// ---- Decorative corner brackets ------------------------------------------

function CornerBracket({
  position
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const map = {
    'top-left': 'left-6 top-6',
    'top-right': 'right-6 top-6',
    'bottom-left': 'left-6 bottom-6',
    'bottom-right': 'right-6 bottom-6'
  } as const;
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  const stroke = 'rgba(240,180,0,0.45)';
  return (
    <div className={`pointer-events-none absolute ${map[position]}`}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d={
            isTop && isLeft
              ? 'M 0 12 L 0 0 L 12 0'
              : isTop && !isLeft
                ? 'M 24 12 L 24 0 L 12 0'
                : !isTop && isLeft
                  ? 'M 0 12 L 0 24 L 12 24'
                  : 'M 24 12 L 24 24 L 12 24'
          }
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
}
