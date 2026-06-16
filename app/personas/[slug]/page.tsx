'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findPersona, type PersonaSlug } from '@/lib/storyboard';
import { journey, findVignette, nodeStageMap } from '@/lib/journey';
import { stages, stagesForPersona, type StageKey } from '@/lib/lifecycle';
import { Sparkles } from '@/components/Sparkles';
import { StickerIcon } from '@/components/StickerIcon';
import { SafeImage } from '@/components/SafeImage';
import { LifecycleArc } from '@/components/LifecycleArc';
import { LifecycleStrip } from '@/components/LifecycleStrip';
import { TopNav } from '@/components/TopNav';

// Persona page.
// Shape:
//   1. Editorial hero.
//   2. Lifecycle: the loop narrates itself (a highlight auto-walks the five
//      stages, a comet runs the ring) until you focus a story. A compact
//      switcher sits directly under the loop so selecting a story and seeing
//      the loop react happen in one glance.
//   3. Stories: each story is a stretch of the loop you can step through
//      moment by moment; stepping drives the loop's active stage in sync.

const STAGE_ORDER: StageKey[] = stages.map((s) => s.key);

// Ring tone per stage, used to colour-link the switcher pills and the
// stepped moments back to the loop.
const STAGE_RING: Record<StageKey, string> = {
  discover: '#6ee7c7',
  plan: '#b79dec',
  launch: '#f0b400',
  monitor: '#fb7185',
  optimise: '#f97583'
};

const WALK_MS = 2200;
const STEP_MS = 2500;

// Honour the OS reduced-motion setting: no auto-walk, no comet, no auto-play.
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

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

  const reducedMotion = usePrefersReducedMotion();

  const [activeVignetteId, setActiveVignetteId] = useState<string | null>(null);
  const [walkStage, setWalkStage] = useState<StageKey>(STAGE_ORDER[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const vignetteStageMap: Record<string, StageKey[]> = {
    'brief-arrives': ['discover', 'plan'],
    'past-wins': ['discover'],
    'two-plans-side-by-side': ['plan'],
    'audience-on-the-fly': ['launch'],
    'variance-watch': ['monitor', 'optimise']
  };

  // Select / clear a story. Selecting always resets the step walkthrough and
  // stops any auto-play so the loop and the story start in lockstep.
  function focusVignette(id: string | null) {
    setActiveVignetteId(id);
    setStepIndex(0);
    setPlaying(false);
  }

  // Idle auto-walk: a highlight travels the loop so the cycle narrates itself.
  // Paused whenever a story is focused (selection always wins) and skipped
  // under reduced motion.
  useEffect(() => {
    if (reducedMotion || activeVignetteId) return;
    const id = setInterval(() => {
      setWalkStage((prev) => {
        const i = STAGE_ORDER.indexOf(prev);
        return STAGE_ORDER[(i + 1) % STAGE_ORDER.length];
      });
    }, WALK_MS);
    return () => clearInterval(id);
  }, [reducedMotion, activeVignetteId]);

  // Auto-play through a focused story's moments, stopping at the last one.
  const activeVignette = activeVignetteId ? findVignette(activeVignetteId) : null;
  useEffect(() => {
    if (!playing || !activeVignette || reducedMotion) return;
    if (stepIndex >= activeVignette.nodes.length - 1) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStepIndex((s) => s + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [playing, activeVignette, stepIndex, reducedMotion]);

  // Derive what the loop shows.
  let litStages: Set<StageKey>;
  let activeStage: StageKey | undefined;
  if (activeVignetteId) {
    litStages = new Set(vignetteStageMap[activeVignetteId] ?? []);
    const currentNode = activeVignette?.nodes[stepIndex];
    activeStage =
      (currentNode && nodeStageMap[currentNode]) ||
      vignetteStageMap[activeVignetteId]?.[0];
  } else if (reducedMotion) {
    // No idle animation: rest on the stages this persona shows up in.
    litStages = baseLit;
    activeStage = undefined;
  } else {
    // The whole loop is on; the travelling highlight does the narrating.
    litStages = new Set(STAGE_ORDER);
    activeStage = walkStage;
  }

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
            <h1 className="mt-6 font-display text-[88px] leading-[1.0]">
              {persona.name}.
            </h1>
            <h2 className="mt-3 font-display italic text-[44px] leading-[1.15] phrase">
              {persona.tagline}
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-[1.7] text-dark-inkMuted">
              {persona.introParagraph}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-dark-inkMuted">
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
            <h2 className="mt-4 font-display text-[52px] leading-[1.08]">
              Where {persona.name} <span className="phrase italic">shows up.</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-relaxed text-dark-inkMuted md:block">
            Every campaign runs the same five-stage loop, over and over. Colour
            marks the stage. Pick a story below to focus the loop on the stages
            it walks through. Suzie sits at the centre because every loop is hers.
          </p>
        </div>

        <LifecycleArc
          litStages={litStages}
          activeStage={activeStage}
          reducedMotion={reducedMotion}
        />

        {/* Story switcher, directly under the loop so the loop reacts in the
            same glance you make the choice. */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="eyebrow mr-1 text-dark-inkMuted">Focus a story</span>
          {personaVignettes.map((v) => {
            const isActive = activeVignetteId === v.id;
            const ring = STAGE_RING[vignetteStageMap[v.id]?.[0] ?? 'launch'];
            return (
              <button
                key={v.id}
                onClick={() => focusVignette(isActive ? null : v.id)}
                className="group inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition duration-[120ms] ease-out-strong active:scale-[0.97]"
                style={{
                  background: isActive ? ring : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#0b1020' : '#f5f0e1',
                  boxShadow: isActive
                    ? `0 0 0 1px ${ring}, 0 8px 20px -8px ${ring}`
                    : '0 0 0 1px rgba(245,240,225,0.12)'
                }}
              >
                <span
                  className="h-2 w-2 flex-none rounded-full"
                  style={{
                    background: isActive ? '#0b1020' : ring,
                    boxShadow: isActive ? 'none' : `0 0 8px ${ring}`
                  }}
                />
                {v.pill}
              </button>
            );
          })}
          {activeVignetteId && (
            <button
              onClick={() => focusVignette(null)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-dark-inkMuted ring-1 ring-dark-border transition duration-[120ms] ease-out-strong hover:text-dark-ink active:scale-[0.97]"
            >
              Show the full loop
            </button>
          )}
        </div>

        <div className="mt-6">
          <LifecycleStrip litStages={litStages} activeStage={activeStage} />
        </div>
      </section>

      {/* Stories */}
      <section className="relative mx-auto max-w-7xl space-y-8 px-6 pb-24 sm:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-phos-400/60" />
            <span className="eyebrow text-phos-400">{persona.name}&apos;s stories</span>
          </div>
          <h2 className="mt-4 font-display text-[52px] leading-[1.08]">
            Pick a story to <span className="phrase italic">walk.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-dark-inkMuted">
            Each story is one stretch of the loop. Step through it moment by
            moment and watch the loop above light the stage you&apos;re on.
          </p>
        </div>

        {personaVignettes.map((v, i) => {
          const isActive = activeVignetteId === v.id;
          const lastIndex = v.nodes.length - 1;
          return (
            <article
              key={v.id}
              id={v.id}
              className={`relative overflow-hidden rounded-[20px] p-8 ring-1 transition duration-[220ms] ease-out-strong md:p-10 ${
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
                    Story {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <button
                  onClick={() => focusVignette(isActive ? null : v.id)}
                  className={`rounded-full px-4 py-1.5 eyebrow transition duration-[120ms] ease-out-strong active:scale-[0.97] ${
                    isActive
                      ? 'bg-phos-500 text-dark-canvas'
                      : 'bg-white/5 text-dark-ink ring-1 ring-dark-border hover:bg-white/10'
                  }`}
                >
                  {isActive ? 'Focused on the loop' : 'Focus the loop'}
                </button>
              </div>
              <h3 className="mt-4 font-display text-[40px] leading-[1.12]">
                {v.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-[1.7] text-dark-inkMuted">
                {v.paragraph}
              </p>

              {/* Step controls, only on the focused story */}
              {isActive && (
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {!reducedMotion && (
                    <button
                      onClick={() => {
                        if (stepIndex >= lastIndex) {
                          setStepIndex(0);
                          setPlaying(true);
                        } else {
                          setPlaying((p) => !p);
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-phos-500 px-5 py-2 eyebrow text-dark-canvas transition duration-[120ms] ease-out-strong active:scale-[0.97]"
                    >
                      {playing ? '❚❚ Pause' : stepIndex >= lastIndex ? '↻ Replay' : '▶ Play the story'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setPlaying(false);
                      setStepIndex((s) => (s >= lastIndex ? 0 : s + 1));
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2 eyebrow text-dark-ink ring-1 ring-dark-border transition duration-[120ms] ease-out-strong hover:bg-white/10 active:scale-[0.97]"
                  >
                    {stepIndex >= lastIndex ? '↻ Start over' : 'Next moment →'}
                  </button>
                  <span className="eyebrow text-dark-inkMuted">
                    {String(stepIndex + 1).padStart(2, '0')} / {String(v.nodes.length).padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Moments as a connected, numbered sequence. Each chip is tinted
                  to its stage tone so the colour links back to the loop. */}
              <ol className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch">
                {v.nodes.map((id, j) => {
                  const node = journey.find((n) => n.id === id);
                  if (!node) return null;
                  const tone = STAGE_RING[nodeStageMap[id] ?? 'launch'];
                  const stepActive = isActive && j === stepIndex;
                  const stepDim = isActive && j !== stepIndex;
                  return (
                    <Fragment key={id}>
                      <li
                        className="group relative flex-1 rounded-2xl p-5 transition duration-[220ms] ease-out-strong"
                        style={{
                          background: stepActive
                            ? 'rgba(13,18,48,0.95)'
                            : 'rgba(7,10,26,0.6)',
                          boxShadow: stepActive
                            ? `0 0 0 1px ${tone}, 0 18px 40px -18px rgba(0,0,0,0.7)`
                            : '0 0 0 1px rgba(34,42,85,0.7)',
                          opacity: stepDim ? 0.45 : 1,
                          transform: stepActive ? 'translateY(-3px)' : 'translateY(0)'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-7 w-7 flex-none items-center justify-center rounded-full font-display text-base leading-none"
                            style={{
                              background: stepActive ? tone : 'rgba(255,255,255,0.06)',
                              color: stepActive ? '#0b1020' : tone,
                              boxShadow: stepActive ? 'none' : `0 0 0 1px ${tone}`
                            }}
                          >
                            {j + 1}
                          </span>
                          <span className="h-px flex-1 bg-dark-border" />
                        </div>
                        <div className="mt-3 font-display text-xl leading-snug text-dark-ink">
                          {node.label}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-dark-inkMuted">
                          {node.caption}
                        </p>
                      </li>

                      {/* Connector between moments */}
                      {j < v.nodes.length - 1 && (
                        <li
                          aria-hidden
                          className="flex items-center justify-center text-dark-border md:px-0.5"
                        >
                          <span className="hidden md:block h-px w-5 bg-dark-border" />
                          <span className="md:hidden text-lg leading-none text-dark-inkMuted">
                            ↓
                          </span>
                        </li>
                      )}
                    </Fragment>
                  );
                })}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/architecture?vignette=${v.id}`}
                  className="rounded-full bg-phos-500 px-5 py-2.5 eyebrow text-dark-canvas shadow-lg shadow-phos-500/30 transition duration-[120ms] ease-out-strong hover:scale-[1.02] active:scale-[0.97]"
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
