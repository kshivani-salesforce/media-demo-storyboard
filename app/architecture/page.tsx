'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  bands,
  componentsLitByVignette,
  type ArchBand
} from '@/lib/architecture';
import { vignettes } from '@/lib/journey';
import { TopNav } from '@/components/TopNav';
import { GradientText } from '@/components/GradientText';
import { SafeImage } from '@/components/SafeImage';

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

type FocusKey = string; // vignette id, or 'all'

export default function ArchitecturePage() {
  const [focus, setFocus] = useState<FocusKey>('all');
  const litComponentIds = focus === 'all' ? null : componentsLitByVignette(focus);

  const isLit = (band: ArchBand, label: string) => {
    if (!litComponentIds) return true;
    return litComponentIds.has(`${band.key}:${label}`);
  };

  return (
    <main className="relative min-h-screen bg-sf-dark-wash text-dark-ink">
      <TopNav active="architecture" />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-8 pt-8 pb-6">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Agentic Media Enterprise{' '}
              <GradientText>Architecture.</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-dark-inkMuted">
              Five layers under every demo. Pick a story thread and the parts
              that light up are the parts the demo actually exercises.
            </p>
          </div>
          <SafeImage
            src="/icons/salesforce-cloud-logo.svg"
            alt="Salesforce"
            className="hidden h-8 w-auto opacity-90 md:block"
          />
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
          {vignettes.map((v) => {
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
        <div className="space-y-3">
          {bands
            .sort((a, b) => a.index - b.index)
            .map((band) => {
              const isTrust = band.key === 'trust';
              return (
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

                  {/* Band card */}
                  <div
                    className={`relative overflow-hidden rounded-2xl p-5 ring-1 ${
                      isTrust
                        ? 'bg-dark-canvas ring-dark-border'
                        : 'bg-white text-dark-canvas ring-white/10'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <h2
                        className={`font-display text-2xl font-bold ${
                          isTrust ? 'text-white' : 'text-dark-canvas'
                        }`}
                      >
                        {band.title}
                      </h2>
                      {band.subline && (
                        <span
                          className={`text-xs ${
                            isTrust ? 'text-dark-inkMuted' : 'text-slate-500'
                          }`}
                        >
                          {band.subline}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {band.components.map((c) => {
                        const lit = isLit(band, c.label);
                        return (
                          <div
                            key={c.label}
                            className={`flex items-start gap-2 rounded-xl px-3 py-2 transition-opacity duration-300 ${
                              isTrust
                                ? 'bg-dark-surface ring-1 ring-dark-border text-dark-ink'
                                : 'bg-slate-50 ring-1 ring-slate-200 text-dark-canvas'
                            } ${lit ? 'opacity-100' : 'opacity-30'}`}
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
                                <span
                                  className={`text-[11px] leading-snug ${
                                    isTrust
                                      ? 'text-dark-inkMuted'
                                      : 'text-slate-500'
                                  }`}
                                >
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
              );
            })}
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 text-xs text-dark-inkMuted">
          <Link href="/" className="hover:text-dark-ink">
            ← Back to the storyboard
          </Link>
          <span>Agentic Media Enterprise Architecture · Salesforce</span>
        </div>
      </footer>
    </main>
  );
}
