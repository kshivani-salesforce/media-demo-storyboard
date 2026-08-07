import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  story,
  chapters,
  chapterByNumber,
  beatsForChapter,
  chapterCount
} from '@/lib/story';
import { TopNav, type NavKey } from '@/components/TopNav';
import { GradientText } from '@/components/GradientText';
import { Spine } from '@/components/Spine';
import { BeatCard } from '@/components/BeatCard';
import { PillarChip } from '@/components/PillarChip';
import { SideNav } from '@/components/SideNav';

// One chapter to a page: /story/1, /story/2, /story/3. Renders the chapter's
// beats on the spine (global numbering preserved) with a forward button that
// walks the room to the next chapter, then to the full-story recap after the
// last one. A small stepper shows I/II/III progress; the nav tabs allow jumps.

export function generateStaticParams() {
  return chapters.map((_, i) => ({ chapter: String(i + 1) }));
}

const finalNumber = story.length; // the last beat of the whole story

export default function ChapterPage({
  params
}: {
  params: { chapter: string };
}) {
  const n = Number(params.chapter);
  if (!Number.isInteger(n)) notFound();
  const found = chapterByNumber(n);
  if (!found) notFound();

  const { chapter, number } = found;
  const beats = beatsForChapter(chapter.key);
  const isLastChapter = number === chapterCount;
  const nextHref = isLastChapter ? '/story' : `/story/${number + 1}`;
  const nextLabel = isLastChapter
    ? 'See the full story →'
    : `Chapter ${chapters[number].numeral} · ${chapters[number].title} →`;

  return (
    <main className="relative min-h-screen bg-app-wash text-dark-ink">
      <TopNav active={`chapter-${number}` as NavKey} />
      <SideNav />

      {/* Chapter header + stepper */}
      <section className="relative mx-auto max-w-5xl px-8 pt-8 pb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {chapters.map((c, i) => {
              const isCurrent = i + 1 === number;
              return (
                <Link
                  key={c.key}
                  href={`/story/${i + 1}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-semibold transition ${
                    isCurrent
                      ? 'bg-phos-500 text-white shadow-lg shadow-phos-500/30'
                      : 'bg-dark-surface text-dark-inkMuted ring-1 ring-dark-border hover:text-dark-ink'
                  }`}
                >
                  {c.numeral}
                </Link>
              );
            })}
            <span className="ml-2 eyebrow text-dark-inkMuted">
              Chapter {chapter.numeral} of {chapterCount}
            </span>
          </div>
          <PillarChip pillar={chapter.pillar} />
        </div>

        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] md:text-6xl">
          <GradientText>{chapter.title}</GradientText>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-[1.7] text-dark-inkMuted">
          {chapter.summary}
        </p>
        <p className="mt-4 flex items-start gap-2.5 border-l-2 border-phos-400/40 pl-4 text-base leading-[1.6] text-dark-ink/85">
          <span className="max-w-2xl">
            <span className="eyebrow text-phos-400">{chapter.pillar}</span>{' '}
            <span className="text-dark-inkMuted">— {chapter.pillarThesis}</span>
          </span>
        </p>
      </section>

      {/* The chapter's beats on the spine */}
      <section className="relative mx-auto max-w-5xl px-8 pb-6">
        <Spine>
          {beats.map(({ beat, number: beatNumber }) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              number={beatNumber}
              isFinal={beatNumber === finalNumber}
            />
          ))}
        </Spine>
      </section>

      {/* Forward walk */}
      <section className="mx-auto max-w-5xl px-8 pb-24 pt-2">
        <div className="flex items-center justify-between gap-4 border-t border-dark-border pt-8">
          {number > 1 ? (
            <Link
              href={`/story/${number - 1}`}
              className="eyebrow text-dark-inkMuted transition hover:text-dark-ink"
            >
              ← Chapter {chapters[number - 2].numeral}
            </Link>
          ) : (
            <Link
              href="/"
              className="eyebrow text-dark-inkMuted transition hover:text-dark-ink"
            >
              ← The cast
            </Link>
          )}
          <Link
            href={nextHref}
            className="flex-none rounded-full bg-phos-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-phos-500/30 transition-transform hover:scale-[1.03]"
          >
            {nextLabel}
          </Link>
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
