'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findPersona, type PersonaSlug } from '@/lib/storyboard';
import { vignettes, journey, findVignette } from '@/lib/journey';
import { stagesForPersona, type StageKey } from '@/lib/lifecycle';
import { Sparkles } from '@/components/Sparkles';
import { StickerIcon } from '@/components/StickerIcon';
import { SafeImage } from '@/components/SafeImage';
import { LifecycleArc } from '@/components/LifecycleArc';
import { LifecycleStrip } from '@/components/LifecycleStrip';
import { TopNav } from '@/components/TopNav';

// Persona page, editorial pass.
// Shape:
//   1. Editorial hero: oversize serif tagline, supporting prose, portrait
//      card breaks the right column.
//   2. Lifecycle: a single integrated composition. Cluster + prose card
//      live together inside the loop frame, no rail of duplicates beneath.
//   3. Story beats: vignette panels with light/dim toggle that re-focuses
//      the lifecycle.

export default function PersonaPage({
  params
}: {
  params: { slug: string };
}) {
  const persona = findPersona(params.slug as PersonaSlug);
  if (!persona) notFound();

  const personaVignettes = persona.vignetteIds
    .map((id) => findVignette(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const baseLit: Set<StageKey> = new Set([
    ...stagesForPersona(persona.slug).driver,
    ...stagesForPersona(persona.slug).cameo
  ]);
  const [activeVignetteId, setActiveVignetteId] = useState<string | null>(null);

  const vignetteStageMap: Record<string, StageKey[]> = {
    'brief-arrives': ['discover', 'plan'],
    'past-wins': ['discover'],
    'two-plans-side-by-side': ['plan'],
    'audience-on-the-fly': ['launch'],
    'variance-watch': ['monitor', 'optimise']
  };

  const litStages: Set<StageKey> = activeVignetteId
    ? new Set(vignetteStageMap[activeVignetteId] ?? [])
    : baseLit;

  const activeStage: StageKey | undefined = activeVignetteId
    ? vignetteStageMap[activeVignetteId]?.[0]
    : undefined;

  return (
    <main className="relative min-h-screen bg-sf-dark-wash text-dark-ink">
      <TopNav active="personas" />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-6 pb-16 sm:px-10">
        <Sparkles variant="on-dark" />
        <Link
          href="/"
          className="relative z-10 inline-flex items-center gap-2 eyebrow text-dark-inkMuted hover:text-dark-ink"
        >
          ← All personas
        </Link>
        <div className="relative z-10 mt-10 grid grid-cols-1 items-end gap-12 md:grid-cols-[1.5fr_1fr]">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-phos-400/60" />
              <span className="eyebrow text-phos-400">{persona.role}</span>
            </div>
            <h1 className="mt-6 font-display text-[88px] leading-[0.95] tracking-tight">
              {persona.name}.
            </h1>
            <h2 className="mt-2 font-display italic text-[44px] leading-[1.05] phrase">
              {persona.tagline}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-dark-inkMuted">
              {persona.introParagraph}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-inkMuted">
              {persona.dayParagraph}
            </p>
          </div>

          {/* Portrait card with sticker overlay, slight lean */}
          <div
            className="relative justify-self-end animate-slide-up"
            style={{ transform: 'rotate(-1.2deg)' }}
          >
            <div className="relative h-[360px] w-[280px] overflow-hidden rounded-[20px] bg-dark-surface ring-1 ring-dark-border shadow-editorial">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
              <SafeImage
                src={persona.photo}
                alt={persona.name}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: persona.photoFocus }}
              />
              {/* Editorial caption strip across the bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                <span className="font-display italic text-phos-400" style={{ fontSize: 14 }}>
                  fig. 01
                </span>
                <span className="h-px flex-1 bg-phos-400/30" />
                <span className="eyebrow text-dark-ink/90">{persona.tagline}</span>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-7">
              <StickerIcon icon={persona.sticker} size="lg" float />
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle composition */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-20 sm:px-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-phos-400/60" />
              <span className="eyebrow text-phos-400">The campaign lifecycle</span>
            </div>
            <h2 className="mt-4 font-display text-[52px] leading-[0.95]">
              Where {persona.name} <span className="phrase italic">shows up.</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-dark-inkMuted md:block">
            Tap a story below to focus the loop on the stages it walks through.
            Suzie sits at the centre because every loop is hers.
          </p>
        </div>
        <LifecycleArc litStages={litStages} activeStage={activeStage} />
        <div className="mt-6">
          <LifecycleStrip litStages={litStages} activeStage={activeStage} />
        </div>
      </section>

      {/* Story beats */}
      <section className="relative mx-auto max-w-7xl space-y-8 px-6 pb-24 sm:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-phos-400/60" />
            <span className="eyebrow text-phos-400">{persona.name}&apos;s threads</span>
          </div>
          <h2 className="mt-4 font-display text-[52px] leading-[0.95]">
            Pick a story to <span className="phrase italic">walk.</span>
          </h2>
        </div>
        {personaVignettes.map((v, i) => {
          const isActive = activeVignetteId === v.id;
          return (
            <article
              key={v.id}
              id={v.id}
              className={`relative overflow-hidden rounded-[20px] p-8 ring-1 transition md:p-10 ${
                isActive
                  ? 'bg-dark-surface ring-phos-400/50 shadow-editorial'
                  : 'bg-dark-surface/80 ring-dark-border'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display italic text-phos-400" style={{ fontSize: 32 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow text-dark-inkMuted">
                    Thread {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVignetteId(isActive ? null : v.id)}
                  className={`rounded-full px-4 py-1.5 eyebrow transition ${
                    isActive
                      ? 'bg-phos-500 text-dark-canvas'
                      : 'bg-white/5 text-dark-ink ring-1 ring-dark-border hover:bg-white/10'
                  }`}
                >
                  {isActive ? 'Lit' : 'Light up the loop'}
                </button>
              </div>
              <h3 className="mt-4 font-display text-[40px] leading-[1.05]">
                {v.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-dark-inkMuted">
                {v.paragraph}
              </p>

              {/* Moments inside the story */}
              <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {v.nodes.map((id, j) => {
                  const node = journey.find((n) => n.id === id);
                  if (!node) return null;
                  return (
                    <div
                      key={id}
                      className="group relative rounded-2xl bg-dark-canvas/60 p-5 ring-1 ring-dark-border transition hover:ring-phos-400/40"
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-display italic text-phos-400/70"
                          style={{ fontSize: 22 }}
                        >
                          {String(j + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px flex-1 bg-dark-border" />
                      </div>
                      <div className="mt-3 font-display text-xl leading-snug text-dark-ink">
                        {node.label}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-dark-inkMuted">
                        {node.caption}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/architecture?vignette=${v.id}`}
                  className="rounded-full bg-phos-500 px-5 py-2.5 eyebrow text-dark-canvas shadow-lg shadow-phos-500/30 transition hover:scale-[1.02]"
                >
                  See what lights up in the platform →
                </Link>
                <Link
                  href="/"
                  className="rounded-full bg-white/5 px-5 py-2.5 eyebrow text-dark-ink ring-1 ring-dark-border hover:bg-white/10"
                >
                  Back to all personas
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 eyebrow text-dark-inkMuted">
          <Link href="/" className="hover:text-dark-ink">
            ← Back to the storyboard
          </Link>
          <span>
            {persona.name} · {persona.role}
          </span>
        </div>
      </footer>
    </main>
  );
}
