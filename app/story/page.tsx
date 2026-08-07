import Link from 'next/link';
import {
  chapters,
  coda,
  whyItMatters,
  beatsForChapter
} from '@/lib/story';
import { TopNav } from '@/components/TopNav';
import { GradientText } from '@/components/GradientText';
import { PillarChip } from '@/components/PillarChip';
import { SideNav } from '@/components/SideNav';

// Full story: the recap tab. A condensed run through the three chapters (title,
// summary, the beats we saw) rather than the full detail of the chapter pages,
// then the coda and the "why it matters to Nine" payoff. This is the wrap-up
// the room lands on after walking Chapters I to III.

export default function FullStoryPage() {
  return (
    <main className="relative min-h-screen bg-app-wash text-dark-ink">
      <TopNav active="full-story" />
      <SideNav />

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-8 pt-8 pb-8">
        <div className="eyebrow text-phos-400">The full story</div>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[1.1] md:text-6xl">
          One deal, <GradientText>in three chapters.</GradientText>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-[1.7] text-dark-inkMuted">
          A recap of what we just walked, and why it changes the day for Nine.
        </p>
      </section>

      {/* Chapter recap */}
      <section className="relative mx-auto max-w-5xl px-8 pb-6">
        <ol className="flex flex-col gap-4">
          {chapters.map((c, i) => {
            const beats = beatsForChapter(c.key);
            return (
              <li
                key={c.key}
                className="rounded-[20px] bg-dark-surface/80 p-6 ring-1 ring-dark-border sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="eyebrow text-phos-400">
                      Chapter {c.numeral}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-dark-ink">
                      {c.title}
                    </h2>
                  </div>
                  <PillarChip pillar={c.pillar} className="flex-none self-center" />
                </div>
                <p className="mt-3 max-w-3xl text-base leading-[1.7] text-dark-inkMuted">
                  {c.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {beats.map(({ beat, number }) => (
                    <Link
                      key={beat.id}
                      href={`/story/${i + 1}#beat-${beat.id}`}
                      className="rounded-full bg-dark-canvas/60 px-3 py-1.5 text-xs text-dark-ink/80 ring-1 ring-dark-border transition hover:text-dark-ink"
                    >
                      <span className="text-phos-400">
                        {String(number).padStart(2, '0')}
                      </span>{' '}
                      {beat.title}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Coda */}
        <p className="mt-8 max-w-2xl font-display text-xl italic leading-[1.5] text-dark-inkMuted">
          <span className="phrase">{coda}</span>
        </p>
      </section>

      {/* Why it matters to Nine */}
      <section className="relative mx-auto max-w-5xl px-8 pb-14 pt-6">
        <div className="rounded-3xl bg-dark-surface/80 p-8 ring-1 ring-dark-border md:p-10">
          <div className="eyebrow text-phos-400">The payoff</div>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-dark-ink md:text-4xl">
            {whyItMatters.headline}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-[1.7] text-dark-inkMuted">
            {whyItMatters.lead}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {whyItMatters.points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-dark-canvas/50 p-5 ring-1 ring-dark-border"
              >
                <PillarChip pillar={p.pillar} />
                <div className="mt-3 font-display text-lg leading-tight text-dark-ink">
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-dark-inkMuted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture pointer */}
      <section className="mx-auto max-w-5xl px-8 pb-24 pt-2">
        <div className="relative overflow-hidden rounded-3xl bg-sf-cobaltDeep p-8 md:p-10">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="eyebrow text-phos-200">The platform under the story</div>
              <div className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Every beat, <GradientText>and what powers it.</GradientText>
              </div>
              <p className="mt-3 max-w-xl text-sm text-dark-inkMuted">
                The story is the what. The architecture is the how. Pick any beat
                and see exactly which agents, apps and data light up.
              </p>
            </div>
            <Link
              href="/architecture"
              className="flex-none rounded-full bg-phos-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-phos-500/30 transition-transform hover:scale-[1.03]"
            >
              See the architecture →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6 eyebrow text-dark-inkMuted">
          <span>Salesforce + Nine · Ad Sales in an Agentic Enterprise</span>
          <Link href="/" className="hover:text-dark-ink">
            ← Back to the cast
          </Link>
        </div>
      </footer>
    </main>
  );
}
