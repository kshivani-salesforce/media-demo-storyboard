import Link from 'next/link';
import { chapters } from '@/lib/story';
import { personas } from '@/lib/storyboard';
import { GradientText } from '@/components/GradientText';
import { Sparkles } from '@/components/Sparkles';
import { TopNav } from '@/components/TopNav';
import { PersonaTile } from '@/components/PersonaTile';
import { PillarChip } from '@/components/PillarChip';
import { SideNav } from '@/components/SideNav';

// The cast: meet the three people, then begin. This was the original landing;
// it now lives at /cast, reached from the Why front door and the top nav, so
// the room can meet the people before walking the story chapter by chapter.

const castOrder = [personas.mark, personas.hannah, personas.cindy];

export default function CastPage() {
  return (
    <main className="relative min-h-screen bg-app-wash text-dark-ink">
      <TopNav active="cast" />
      <SideNav />

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-8 pt-10 pb-10">
        <Sparkles variant="on-dark" />
        <div className="relative z-10 max-w-3xl animate-fade-in">
          <div className="eyebrow text-phos-400">The story</div>
          <h1 className="mt-5 font-display text-6xl font-bold leading-[1.1]">
            One deal, <GradientText>end to end.</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-dark-inkMuted">
            From the conversation that starts it to the campaign that runs
            itself, one story, told once. Three chapters. Meet the three people
            you will follow, then walk it beat by beat.
          </p>
        </div>
      </section>

      {/* The cast */}
      <section className="relative mx-auto max-w-5xl px-8 pb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="eyebrow text-phos-400">The cast</span>
          <span className="h-px flex-1 bg-dark-border" />
          <span className="eyebrow text-dark-inkMuted">
            three people, one deal
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {castOrder.map((persona) => (
            <PersonaTile key={persona.slug} persona={persona} />
          ))}
        </div>
      </section>

      {/* The chapters + begin */}
      <section className="relative mx-auto max-w-5xl px-8 pb-14">
        <div className="rounded-3xl bg-dark-surface/80 p-8 ring-1 ring-dark-border md:p-10">
          <div className="mb-2 flex items-center gap-3">
            <span className="eyebrow text-phos-400">Three chapters · Nine&apos;s e3</span>
            <span className="h-px flex-1 bg-dark-border" />
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-dark-inkMuted">
            One chapter to each of Nine&apos;s three E&apos;s. Efficiency and
            Effectiveness compound into Enjoyment: work that runs itself is work
            people, and the customer, actually enjoy.
          </p>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {chapters.map((c, i) => (
              <li key={c.key}>
                <Link
                  href={`/story/${i + 1}`}
                  className="group block h-full rounded-2xl bg-dark-canvas/50 p-5 ring-1 ring-dark-border transition-transform duration-300 ease-out-strong hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow text-phos-400">Chapter {c.numeral}</span>
                    <PillarChip pillar={c.pillar} />
                  </div>
                  <div className="mt-3 font-display text-xl leading-tight text-dark-ink">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-dark-inkMuted">
                    {c.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-dark-inkMuted">
              Start at the beginning and walk it forward, or jump straight to any
              chapter.
            </p>
            <Link
              href="/story/1"
              className="flex-none rounded-full bg-phos-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-phos-500/30 transition-transform hover:scale-[1.03]"
            >
              Begin the story →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6 eyebrow text-dark-inkMuted">
          <span>Salesforce + Nine · Ad Sales in an Agentic Enterprise</span>
          <Link href="/" className="hover:text-dark-ink">
            ← Why Salesforce
          </Link>
        </div>
      </footer>
    </main>
  );
}
