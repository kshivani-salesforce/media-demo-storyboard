import Link from 'next/link';
import { vision, marketContext, highlights, close } from '@/lib/pov';
import { GradientText } from '@/components/GradientText';
import { TopNav } from '@/components/TopNav';
import { DemoPlayer } from '@/components/DemoPlayer';
import { SideNav } from '@/components/SideNav';

// The front door: "Why Salesforce" for Nine's ad sales.
//
// Deliberately punchy, not a long scroll. A strong thesis (the converged
// premium portfolio only Nine has), the market inflection in three lines, the
// embedded demo front-and-centre, a few highlights on Nine's e3, and a hand-off.
// The detail lives in the walked story (the cast + chapters, reachable from the
// nav).

export default function WhyPage() {
  return (
    <main className="relative min-h-screen bg-app-wash text-dark-ink">
      <TopNav active="home" />
      <SideNav />

      {/* Thesis hero */}
      <section className="relative mx-auto max-w-5xl px-8 pt-10 pb-8">
        <div className="relative z-10 max-w-3xl animate-fade-in">
          <div className="eyebrow text-phos-400">{vision.eyebrow}</div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.08] md:text-6xl">
            {vision.title}{' '}
            <GradientText>{vision.titleAccent}</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-dark-inkMuted">
            {vision.lead}
          </p>
        </div>
      </section>

      {/* The embedded demo, front and centre. */}
      <section className="relative mx-auto max-w-5xl px-8 pb-12">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow text-phos-400">Watch the demo</span>
            <span className="h-px flex-1 bg-dark-border" />
            <span className="eyebrow text-dark-inkMuted">end to end</span>
          </div>
          <div className="group relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-phos-500/20 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <DemoPlayer className="ring-2 ring-phos-500/40" />
          </div>
        </div>
      </section>

      {/* Why it lands: the body thesis + the market inflection, tight. */}
      <section className="relative mx-auto max-w-5xl px-8 pb-12">
        <p className="max-w-3xl text-base leading-[1.7] text-dark-ink/90">
          {vision.body}
        </p>
        <div className="mt-8 mb-5 flex items-center gap-3">
          <span className="eyebrow text-phos-400">{marketContext.heading}</span>
          <span className="h-px flex-1 bg-dark-border" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {marketContext.points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-dark-surface/80 p-5 ring-1 ring-dark-border"
            >
              <div className="font-display text-lg font-semibold leading-tight text-dark-ink">
                {p.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-dark-inkMuted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights: a few reasons, grounded in e3. */}
      <section className="relative mx-auto max-w-5xl px-8 pb-14">
        <div className="mb-5 flex items-center gap-3">
          <span className="eyebrow text-phos-400">Why Salesforce, in short</span>
          <span className="h-px flex-1 bg-dark-border" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="rounded-2xl bg-dark-surface/80 p-6 ring-1 ring-dark-border"
            >
              <span className="eyebrow text-phos-400">{h.tag}</span>
              <h2 className="mt-3 font-display text-xl font-bold leading-tight text-dark-ink">
                {h.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dark-inkMuted">
                {h.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Close: hand off to the walked story. */}
      <section className="mx-auto max-w-5xl px-8 pb-24 pt-2">
        <div className="relative overflow-hidden rounded-3xl bg-sf-cobaltDeep p-8 md:p-10">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="eyebrow text-phos-200">{close.headline}</div>
              <div className="mt-2 max-w-xl font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                See the case <GradientText>walked end to end.</GradientText>
              </div>
              <p className="mt-3 max-w-xl text-sm text-white/70">{close.body}</p>
            </div>
            <Link
              href="/cast"
              className="flex-none rounded-full bg-phos-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-phos-500/30 transition-transform hover:scale-[1.03]"
            >
              Meet the cast →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6 eyebrow text-dark-inkMuted">
          <span>Salesforce + Nine · Ad Sales in an Agentic Enterprise</span>
          <Link href="/architecture" className="hover:text-dark-ink">
            Architecture →
          </Link>
        </div>
      </footer>
    </main>
  );
}
