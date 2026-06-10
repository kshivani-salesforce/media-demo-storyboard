'use client';

// Serpentine campaign-lifecycle path. Direct visual lift of
// design/storyboard-reference.png ("Today's Demonstration").
//
// Three rows, S-curve, alternating direction. Each node = one story beat.
// Lit nodes glow + saturate; dim nodes drop to ~25% opacity. The active
// vignette's node range drives that state.
//
// Heroku lesson: persona avatars sit ABOVE row 0 and BELOW row 2; the
// middle row's avatar (Suzie on `audience-tweak`) sits below the row.
// Keep the SVG and the absolutely-positioned DOM in sync, same coordinate
// system, same units. SVG is 1200x540 logical viewBox.

import Link from 'next/link';
import { journey, type JourneyNode } from '@/lib/journey';
import { personas } from '@/lib/storyboard';
import { SafeImage } from './SafeImage';

const VIEWBOX = { w: 1200, h: 540 };
const ROW_Y = [120, 270, 420];
const COL_COUNT_BY_ROW: Record<0 | 1 | 2, number> = { 0: 5, 1: 5, 2: 3 };
const COL_X_BY_ROW: Record<0 | 1 | 2, number[]> = {
  0: [120, 360, 600, 840, 1080],
  1: [1080, 840, 600, 360, 120], // right-to-left
  2: [120, 360, 600]
};

// Persona portrait offset relative to the node centre.
const AVATAR_RADIUS = 36;

function nodePoint(node: JourneyNode) {
  const xs = COL_X_BY_ROW[node.row];
  const x = xs[node.col];
  const y = ROW_Y[node.row];
  return { x, y };
}

// Build the connecting path: row0 left→right, U-bend down, row1 right→left,
// U-bend down, row2 left→right, ending at the terminal flag.
function buildPath(): string {
  const r = 60; // serpentine bend radius
  const row0 = COL_X_BY_ROW[0];
  const row1 = COL_X_BY_ROW[1];
  const row2 = COL_X_BY_ROW[2];

  const startX = row0[0];
  const endRow0X = row0[row0.length - 1];
  const startRow1X = row1[0];
  const endRow1X = row1[row1.length - 1];
  const startRow2X = row2[0];
  const endRow2X = row2[row2.length - 1];

  return [
    `M ${startX} ${ROW_Y[0]}`,
    `H ${endRow0X - r}`,
    `Q ${endRow0X} ${ROW_Y[0]} ${endRow0X} ${ROW_Y[0] + r}`,
    `V ${ROW_Y[1] - r}`,
    `Q ${endRow0X} ${ROW_Y[1]} ${endRow0X - r} ${ROW_Y[1]}`,
    `H ${endRow1X + r}`,
    `Q ${endRow1X} ${ROW_Y[1]} ${endRow1X} ${ROW_Y[1] + r}`,
    `V ${ROW_Y[2] - r}`,
    `Q ${endRow1X} ${ROW_Y[2]} ${endRow1X + r} ${ROW_Y[2]}`,
    `H ${endRow2X}`
  ].join(' ');
  // (startRow1X / startRow2X aren't used in the path. Segments are
  // continuous; rows reverse direction by virtue of column layout.)
}

const PATH_D = buildPath();

export function JourneyPath({
  litNodeIds,
  activeNodeId,
  onNodeClick
}: {
  litNodeIds: Set<string>;
  activeNodeId?: string;
  onNodeClick?: (id: string) => void;
}) {
  const personaBySlug = Object.fromEntries(personas.map((p) => [p.slug, p]));
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Campaign lifecycle journey"
      >
        {/* Background path, dim */}
        <path
          d={PATH_D}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={3}
        />
        {/* Lit overlay: same path, only renders the lit segments via mask */}
        {Array.from(litNodeIds).length > 0 && (
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(13,97,242,0.45)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {/* Nodes */}
        {journey.map((node) => {
          const { x, y } = nodePoint(node);
          const isLit = litNodeIds.has(node.id);
          const isActive = node.id === activeNodeId;
          const fill = node.terminal
            ? '#ffc945'
            : isLit
              ? '#0d61f2'
              : '#1f2243';
          const ring = isActive
            ? '#ffffff'
            : isLit
              ? 'rgba(13,97,242,0.45)'
              : 'rgba(255,255,255,0.05)';
          return (
            <g
              key={node.id}
              onClick={onNodeClick ? () => onNodeClick(node.id) : undefined}
              style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
            >
              {isActive && (
                <circle cx={x} cy={y} r={32} fill="rgba(255,255,255,0.08)" />
              )}
              <circle cx={x} cy={y} r={22} fill={ring} />
              <circle cx={x} cy={y} r={16} fill={fill} />
              {node.terminal && (
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fontSize={20}
                  fill="#06070d"
                  fontWeight={700}
                >
                  ✓
                </text>
              )}
              {/* Label: above row 0, below rows 1 and 2 */}
              <text
                x={x}
                y={node.row === 0 ? y - 38 : y + 48}
                textAnchor="middle"
                fontSize={14}
                fontWeight={600}
                fill={isLit || isActive ? '#ffffff' : 'rgba(255,255,255,0.45)'}
                style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Persona avatars: DOM layer, percentage-positioned to match SVG */}
      {journey
        .filter((n) => n.pinned && n.pinned.length > 0)
        .map((node) => {
          const { x, y } = nodePoint(node);
          const isLit = litNodeIds.has(node.id);
          const offsetY = node.row === 2 ? 100 : -100; // below row 2, above otherwise
          const leftPct = (x / VIEWBOX.w) * 100;
          const topPct = ((y + offsetY) / VIEWBOX.h) * 100;
          return (
            <div
              key={`av-${node.id}`}
              className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isLit ? 'opacity-100' : 'opacity-40'
              }`}
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              {node.pinned!.map((slug) => {
                const p = personaBySlug[slug];
                if (!p) return null;
                return (
                  <Link
                    key={slug}
                    href={`/personas/${slug}`}
                    className="pointer-events-auto block"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/30 shadow-sf-tile">
                      <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
                      <SafeImage
                        src={p.photo}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: p.photoFocus }}
                      />
                    </div>
                    <div className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      {p.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
