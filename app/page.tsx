import Link from 'next/link';
import { story, coda, chapters, personaEntryBeats } from '@/lib/story';
import { personas, type PersonaSlug } from '@/lib/storyboard';
import { GradientText } from '@/components/GradientText';
import { Sparkles } from '@/components/Sparkles';
import { TopNav } from '@/components/TopNav';
import { SafeImage } from '@/components/SafeImage';
import { PersonaTile } from '@/components/PersonaTile';

// Home page: the whole demo as one vertical story spine. Read top to bottom.
// Seven beats on a single connecting line, grouped into three chapters;
// personas walk in inline the first time each one enters. No loop, no
// serpentine, no step machinery, one metaphor, one page. The "how" (products
// per beat) lives on /architecture.

// A small portrait + intro block, rendered inline when a persona first enters.
function PersonaIntro({ slug }: { slug: PersonaSlug }) {
  const p = personas[slug];
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-dark-surface/70 p-4 ring-1 ring-dark-border">
      <div
        className="relative h-16 w-16 flex-none overflow-hidden rounded-full"
        style={{ boxShadow: '0 0 0 2px rgba(61,139,254,0.5)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surfaceLift to-dark-surface" />
        <SafeImage
          src={p.photo}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: p.photoFocus }}
        />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg text-dark-ink">{p.name}</span>
          <span className="eyebrow text-phos-400">meet</span>
        </div>
        <div className="eyebrow mt-0.5 text-dark-inkMuted">{p.role}</div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-dark-ink/85">
          {p.entryLine}
        </p>
      </div>
    </div>
  );
}

// A chapter heading, rendered before the first beat of each chapter. Sits to
// the left of the node column so it reads as a section break in the spine.
function ChapterHeading({ numeral, title }: { numeral: string; title: string }) {
  return (
    <div className="relative pb-8 pl-14 pt-2 sm:pl-16">
      <div className="flex items-center gap-3">
        <span className="eyebrow text-phos-400">Chapter {numeral}</span>
        <span className="h-px flex-1 bg-dark-border" />
      </div>
      <h2 className="mt-2 font-display text-2xl font-bold text-dark-ink sm:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

export default function HomePage() {
  const lastIndex = story.length - 1;
  const cast = personaEntryBeats();
  const chapterTitle = (key: string) => chapters.find((c) => c.key === key);

  return (
    <main className="relative min-h-screen bg-sf-dark-wash text-dark-ink">
      <TopNav active="story" />

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-8 pt-10 pb-10">
        <Sparkles variant="on-dark" />
        <div className="relative z-10 max-w-3xl animate-fade-in">
          <div className="eyebrow text-phos-400">Today&apos;s demonstration</div>
          <h1 className="mt-5 font-display text-6xl font-bold leading-[1.1]">
            One deal, <GradientText>end to end.</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-dark-inkMuted">
            From the conversation that starts it to the campaign that runs
            itself, one story, told once. Seven beats, three chapters. Read it
            top to bottom.
          </p>
        </div>
      </section>

      {/* The cast — pizazz, but wired to the spine: each tile scrolls to the
          beat where that person walks in. */}
      <section className="relative mx-auto max-w-5xl px-8 pb-14">
        <div className="mb-5 flex items-center gap-3">
          <span className="eyebrow text-phos-400">The cast</span>
          <span className="h-px flex-1 bg-dark-border" />
          <span className="eyebrow text-dark-inkMuted">
            three people, met in the story
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cast.map(({ slug, beat, number }) => (
            <PersonaTile
              key={slug}
              persona={personas[slug]}
              entersAtBeatId={beat.id}
              entersAtNumber={number}
            />
          ))}
        </div>
      </section>

      {/* The spine */}
      <section className="relative mx-auto max-w-5xl px-8 pb-10">
        <ol className="relative">
          {/* The connecting line runs behind the node column. */}
          <span
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-phos-400/50 via-phos-500/40 to-phos-700/30 sm:left-[23px]"
          />

          {story.map((beat, i) => {
            const isChapterStart =
              i === 0 || story[i - 1].chapter !== beat.chapter;
            const chapter = chapterTitle(beat.chapter);
            return (
              <li key={beat.id} className="relative">
                {isChapterStart && chapter && (
                  <ChapterHeading
                    numeral={chapter.numeral}
                    title={chapter.title}
                  />
                )}

                <div
                  id={`beat-${beat.id}`}
                  className="relative scroll-mt-28 pl-14 pb-12 sm:pl-16"
                >
                  {/* Node */}
                  <span
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full font-display text-base font-semibold sm:h-12 sm:w-12"
                    style={{
                      background: i === lastIndex ? '#066afe' : 'rgba(6,106,254,0.16)',
                      color: i === lastIndex ? '#ffffff' : '#a8cbff',
                      boxShadow: '0 0 0 1px rgba(61,139,254,0.45), 0 0 24px rgba(6,106,254,0.30)'
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Beat card */}
                  <div className="rounded-[20px] bg-dark-surface/80 p-6 ring-1 ring-dark-border sm:p-7">
                    <h3 className="font-display text-[30px] leading-[1.14] sm:text-[34px]">
                      {beat.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-[1.7] text-dark-inkMuted">
                      {beat.scene}
                    </p>

                    {/* Persona intro(s) on first entry */}
                    {beat.entersHere && beat.entersHere.length > 0 && (
                      <div className="mt-5 flex flex-col gap-3">
                        {beat.entersHere.map((slug) => (
                          <PersonaIntro key={slug} slug={slug} />
                        ))}
                      </div>
                    )}

                    {/* On-screen note */}
                    <div className="mt-5 flex items-start gap-2.5 border-t border-dark-border pt-4">
                      <span className="eyebrow mt-0.5 flex-none text-phos-400">
                        On screen
                      </span>
                      <span className="text-sm leading-relaxed text-dark-ink/80">
                        {beat.onScreen}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Coda */}
        <div className="relative pl-14 sm:pl-16">
          <p className="max-w-2xl font-display text-xl italic leading-[1.5] text-dark-inkMuted">
            <span className="phrase">{coda}</span>
          </p>
        </div>
      </section>

      {/* Architecture pointer */}
      <section className="mx-auto max-w-5xl px-8 pb-24 pt-4">
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
          <Link href="/architecture" className="hover:text-dark-ink">
            Architecture →
          </Link>
        </div>
      </footer>
    </main>
  );
}
