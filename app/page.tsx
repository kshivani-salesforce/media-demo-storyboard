import Link from 'next/link';
import { personas } from '@/lib/storyboard';
import { PersonaTile } from '@/components/PersonaTile';
import { GradientText } from '@/components/GradientText';
import { Sparkles } from '@/components/Sparkles';
import { TopNav } from '@/components/TopNav';

// Home page: persona-led. Tiles open into per-persona storyboards.
// The campaign lifecycle arc lives on the persona pages, not here.

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-sf-dark-wash text-dark-ink">
      <TopNav active="personas" />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-8 pt-10 pb-12">
        <Sparkles variant="on-dark" />
        <div className="relative z-10 max-w-4xl animate-fade-in">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-sf-gold">
            Today&apos;s demonstration
          </div>
          <h1 className="mt-5 font-display text-6xl font-bold leading-[1.12]">
            One campaign.
            <br />
            <GradientText>Three lives changed.</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-dark-inkMuted">
            From the brief landing on Monday to the QBR on Friday: the full
            campaign lifecycle, told as one story. Pick the person whose day
            you want to walk.
          </p>
        </div>
      </section>

      {/* Persona grid */}
      <section
        id="personas"
        className="relative mx-auto max-w-7xl px-8 pb-16 scroll-mt-24"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <PersonaTile key={persona.slug} persona={persona} />
          ))}
        </div>
      </section>

      {/* Architecture pointer */}
      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-sf-cobaltDeep p-10">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-sf-gold">
                The platform under the demo
              </div>
              <div className="mt-2 font-display text-3xl font-bold text-white">
                Five layers, <GradientText>one story.</GradientText>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-dark-inkMuted">
                Engagement, agency, work, context, trust. Open the architecture
                view and pick a story thread to see what lights up.
              </p>
            </div>
            <Link
              href="/architecture"
              className="rounded-full bg-sf-cobalt px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sf-cobalt/30 hover:scale-[1.03] transition-transform"
            >
              See the architecture →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 text-xs text-dark-inkMuted">
          <span>Salesforce + Nine · Ad Sales in an Agentic Enterprise</span>
          <Link href="/architecture" className="hover:text-dark-ink">
            Architecture →
          </Link>
        </div>
      </footer>
    </main>
  );
}
