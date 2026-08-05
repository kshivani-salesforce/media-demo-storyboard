'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  bands,
  trustLayer,
  modelProviders,
  componentsLitByBeat,
  type ArchBand
} from '@/lib/architecture';
import { story } from '@/lib/story';
import { TopNav } from '@/components/TopNav';
import { GradientText } from '@/components/GradientText';
import { BrandLockup } from '@/components/BrandLockup';

// The switcher lights the architecture by story beat: each beat's id is the
// tag its participating components carry (lib/architecture.ts `beats`). Short
// pill labels keyed off the beat id so the strip stays tidy.
const BEAT_PILLS: Record<string, string> = {
  conversation: 'Conversation',
  rfp: 'RFP → deal',
  'command-center': 'Command Center',
  'deal-focus': 'Deal in focus',
  proposal: 'Optimise schedule',
  booked: 'Booked',
  monitor: 'Monitor'
};
const archThreads = story.map((b) => ({ id: b.id, pill: BEAT_PILLS[b.id] ?? b.title }));

// /architecture
//
// Direct visual lift of design/architecture-reference.png: the
// Agentic Media Enterprise Architecture slide.
//
// Layout:
//
//   [ left rail: System of … ]   [ band card: title + components ]   [ right rail: Any … ]
//
// Five bands top to bottom: engagement / agency / work / context / trust.
// A pill switcher above the diagram lets you focus a vignette;
// non-participating components dim to ~25% opacity.

type FocusKey = string; // beat id, or 'all'

export default function ArchitecturePage() {
  const [focus, setFocus] = useState<FocusKey>('all');
  const litComponentIds = focus === 'all' ? null : componentsLitByBeat(focus);

  const isLit = (band: ArchBand, label: string) => {
    if (!litComponentIds) return true;
    return litComponentIds.has(`${band.key}:${label}`);
  };

  return (
    <main className="relative min-h-screen bg-app-wash text-dark-ink">
      <TopNav active="architecture" />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-8 pt-8 pb-6">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-display text-5xl font-bold leading-[1.12] md:text-6xl">
              Agentic Media Enterprise{' '}
              <GradientText>Architecture.</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-[1.7] text-dark-inkMuted">
              Five layers under every demo. Pick a story thread and the parts
              that light up are the parts the demo actually exercises.
            </p>
          </div>
          <BrandLockup size="sm" showTitle={false} className="hidden md:flex" />
        </div>
      </section>

      {/* Vignette switcher */}
      <section className="relative mx-auto max-w-7xl px-8 pb-6">
        <div className="flex flex-wrap gap-2 rounded-2xl bg-dark-surface p-2 ring-1 ring-dark-border">
          <button
            onClick={() => setFocus('all')}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              focus === 'all'
                ? 'bg-sf-cobalt text-white shadow-lg shadow-sf-cobalt/30'
                : 'text-dark-inkMuted hover:text-dark-ink'
            }`}
          >
            All threads lit
          </button>
          {archThreads.map((v) => {
            const isActive = v.id === focus;
            return (
              <button
                key={v.id}
                onClick={() => setFocus(v.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-sf-cobalt text-white shadow-lg shadow-sf-cobalt/30'
                    : 'text-dark-inkMuted hover:text-dark-ink'
                }`}
              >
                {v.pill}
              </button>
            );
          })}
        </div>
      </section>

      {/* Architecture stack */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-8">
        {/* Inside-the-boundary marker: the four Salesforce bands all sit
            within the governed estate. */}
        <div className="mb-3 grid grid-cols-[140px_1fr_140px] gap-3 md:grid-cols-[160px_1fr_160px]">
          <div />
          <div className="flex items-center gap-3 px-1">
            <span className="h-px flex-1 bg-phos-400/25" />
            <span className="eyebrow text-phos-400/80">
              {trustLayer.insideLabel}
            </span>
            <span className="h-px flex-1 bg-phos-400/25" />
          </div>
          <div />
        </div>

        <div className="space-y-3">
          {bands
            .sort((a, b) => a.index - b.index)
            .map((band) => (
              <div
                key={band.key}
                className="grid grid-cols-[140px_1fr_140px] items-stretch gap-3 md:grid-cols-[160px_1fr_160px]"
              >
                {/* Left rail */}
                <div className="flex items-center justify-end pr-2">
                  <div className="text-right text-xs font-semibold uppercase tracking-[0.18em] text-dark-inkMuted">
                    {band.rail}
                    <div className="ml-auto mt-2 h-px w-12 bg-dark-border" />
                  </div>
                </div>

                {/* Band card. Stays light in BOTH themes (mirrors the
                    Salesforce slide), so its text uses the fixed light-ink
                    navy, not the themed dark-* tokens which would flip. */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-5 text-light-ink ring-1 ring-black/5">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-display text-2xl font-bold text-light-ink">
                      {band.title}
                    </h2>
                    {band.subline && (
                      <span className="max-w-3xl text-xs leading-snug text-slate-500">
                        {band.subline}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {band.components.map((c) => {
                      const lit = isLit(band, c.label);
                      return (
                        <div
                          key={c.label}
                          className={`flex h-full items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-light-ink ring-1 ring-slate-200 transition-opacity duration-300 ${
                            lit ? 'opacity-100' : 'opacity-30'
                          }`}
                        >
                          {c.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.icon}
                              alt=""
                              className="h-6 w-6 flex-none object-contain"
                            />
                          ) : (
                            <span
                              className="mt-1 inline-block h-2 w-2 flex-none rounded-full"
                              style={{ background: band.tone }}
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-tight">
                              {c.label}
                            </span>
                            {c.caption && (
                              <span className="text-[11px] leading-snug text-slate-500">
                                {c.caption}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right rail */}
                <div className="flex items-center pl-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-inkMuted">
                    <div className="mb-2 h-px w-12 bg-dark-border" />
                    {band.capability}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Trust membrane: a quiet seam between the Salesforce estate above
            and the external models below. Present, named, but deliberately
            understated, it is a guarantee in the architecture, not a pitch
            beat in the narrative. */}
        <div className="mt-3 grid grid-cols-[140px_1fr_140px] items-center gap-3 md:grid-cols-[160px_1fr_160px]">
          <div className="flex items-center justify-end pr-2">
            <div className="text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-dark-inkMuted">
              Trust layer
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-dark-surface/60 px-4 py-2.5 ring-1 ring-dark-border">
            <ShieldIcon />
            <p className="text-xs leading-snug text-dark-inkMuted">
              <span className="font-semibold text-dark-ink/90">
                Trust by construction, not by audit.
              </span>{' '}
              {trustLayer.body}
            </p>
          </div>

          <div className="pl-2" />
        </div>

        {/* Outside the boundary: external models, reachable only through the
            membrane above. Sits on the dark canvas, visually separated. */}
        <div className="mt-3 grid grid-cols-[140px_1fr_140px] gap-3 md:grid-cols-[160px_1fr_160px]">
          <div />
          <div>
            <div className="mb-3 flex items-center gap-3 px-1">
              <span className="h-px flex-1 bg-dark-border" />
              <span className="eyebrow text-dark-inkMuted">
                {trustLayer.outsideLabel}
              </span>
              <span className="h-px flex-1 bg-dark-border" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl bg-dark-canvas/70 px-6 py-6 ring-1 ring-dark-border">
              {modelProviders.map((p) => (
                <div key={p.name} className="flex items-center">
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="h-6 w-auto opacity-80"
                    />
                  ) : (
                    <span className="font-display text-lg font-semibold tracking-wide text-dark-ink/75">
                      {p.name}
                    </span>
                  )}
                </div>
              ))}
              <span className="eyebrow text-dark-inkMuted/70">+ open source</span>
            </div>
          </div>
          <div />
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 text-xs text-dark-inkMuted">
          <Link href="/" className="hover:text-dark-ink">
            ← Back to the storyboard
          </Link>
          <span>Agentic Media Enterprise Architecture · Salesforce + Nine</span>
        </div>
      </footer>
    </main>
  );
}

// Shield with a tick: the trust-layer mark. Small and muted so the layer
// reads as present but not front-and-centre.
function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="flex-none"
    >
      <path
        d="M12 2.5 4.5 5.5v6c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5v-6L12 2.5Z"
        stroke="#9098b8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12 2.2 2.2 4.2-4.4"
        stroke="#9098b8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
