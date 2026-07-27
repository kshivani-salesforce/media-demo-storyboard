// The story spine: seven beats, one straight line, told once, grouped into
// three chapters.
//
// This replaced the earlier tangle (a circular lifecycle loop, a serpentine
// walk, a persona grid, and per-vignette step machinery). One metaphor now: a
// narrative you read top to bottom. High-level beats, a level above "every
// click", grouped into three chapters so the room can feel the acts.
//
// The arc: Mark meets his advertiser and a good conversation earns the next
// brief -> the machine stands the deal up from the RFP -> it lands in the book
// of business already running on agents -> the deal comes into focus -> the
// schedule optimises itself -> days later it books -> and the same watch that
// made the first conversation go well is already tracking the new campaign.
//
// Personas are introduced inline, the first time each one enters (entersHere),
// so the room meets them in context. No product names here, the products that
// deliver each beat live on /architecture, tagged by beat id.

import type { PersonaSlug } from '@/lib/storyboard';

export type ChapterKey = 'conversation' | 'stand-up' | 'booked';

export type StoryBeat = {
  id: string;
  // Which chapter this beat belongs to. The home page renders a chapter
  // heading before the first beat of each group.
  chapter: ChapterKey;
  // The beat title.
  title: string;
  // The scene, one or two sentences, story voice. What's happening and why it
  // matters to the person in it.
  scene: string;
  // What is literally on the screen at this beat, the demo surface. Kept
  // short; this is the presenter's "show this" note.
  onScreen: string;
  // Personas entering the story for the FIRST time at this beat. Their intro
  // line (personas[slug].entryLine) renders inline here.
  entersHere?: PersonaSlug[];
  // Personas already known who are the focus of this beat (portrait, no intro).
  focus?: PersonaSlug[];
};

// The three pillars each chapter grounds on. One per chapter: the theme the
// room should take away from that act, in the language Nine's leadership uses.
export type Pillar = 'Efficiency' | 'Growth' | 'Trust & Value';

export type Chapter = {
  key: ChapterKey;
  // Roman numeral for the chapter chip.
  numeral: string;
  // Chapter title.
  title: string;
  // The pillar this chapter grounds on.
  pillar: Pillar;
  // One line tying the chapter's beats to its pillar. Presenter's "so what".
  pillarThesis: string;
  // One-line summary, used on the landing intro and the full-story recap.
  summary: string;
};

// Chapter headings, in spine order. The story is paginated one chapter to a
// page (/story/1, /story/2, /story/3); the number is the 1-based position.
export const chapters: Chapter[] = [
  {
    key: 'conversation',
    numeral: 'I',
    title: 'The conversation',
    pillar: 'Efficiency',
    pillarThesis:
      'The busywork disappears. The meeting captures itself, nothing is re-keyed, and the time goes to the customer.',
    summary:
      'A face-to-face review goes well, and a good conversation earns Mark the next brief. The whole call is captured and turned into intelligence, no note-taking, no re-keying.'
  },
  {
    key: 'stand-up',
    numeral: 'II',
    title: 'The deal stands itself up',
    pillar: 'Growth',
    pillarThesis:
      'Every deal lands fully assembled in an operation already working pipeline in the background, so the book of business grows without adding headcount.',
    summary:
      'The brief becomes an RFP and an agent stands the deal up on its own: the Opportunity, the records, the account brief. It lands in a book of business already running on agents, assembled before Mark opens his laptop.'
  },
  {
    key: 'booked',
    numeral: 'III',
    title: 'Booked and watched',
    pillar: 'Trust & Value',
    pillarThesis:
      'The plan books, the watch names any drift before anyone asks, and the relationship compounds into the next brief. Trust, not just throughput.',
    summary:
      'The schedule optimises itself against the objective, the plan books a few days later, and from the moment it is live the watch is already on, naming any drift before anyone has to ask.'
  }
];

export const story: StoryBeat[] = [
  {
    id: 'conversation',
    chapter: 'conversation',
    title: 'It starts with a conversation',
    scene:
      "Mark and Hannah review the live campaign. There's a variance, but Mark is already on top of it, and because the conversation goes so well, Hannah trusts him with the brief for the next one: $1.5M, winter, three months. The whole call is captured and turned into intelligence, nobody takes a note.",
    onScreen: 'The meeting, captured on mobile → summary, next steps, sentiment, the brief.',
    entersHere: ['mark', 'hannah'],
    focus: ['mark', 'hannah']
  },
  {
    id: 'rfp',
    chapter: 'stand-up',
    title: 'The new brief lands',
    scene:
      "That brief becomes an RFP. Nobody re-keys it. An agent reads the document and stands up the deal on its own: the Opportunity and the structured records behind it, ready before Mark has opened his laptop.",
    onScreen: 'RFP document → agent creates the Opportunity + structured records.'
  },
  {
    id: 'command-center',
    chapter: 'stand-up',
    title: 'The deal joins the book of business',
    scene:
      "The new deal drops into Mark's book of business, and it isn't alone: the whole operation is already running on agents, working pipeline and campaigns in the background. This is the establishing shot, the deal has a home, and the home is already agentic.",
    onScreen: 'Ad Sales Command Center + the book-of-business view; agents at work.',
    focus: ['mark']
  },
  {
    id: 'deal-focus',
    chapter: 'stand-up',
    title: 'The deal comes into focus',
    scene:
      "Mark opens the Opportunity and the picture is already assembled for him: who this customer is, what they've run before (last winter's print-led campaign, $165k, twelve points of brand lift), what matters to them now. The account brief and customer intelligence do the homework he used to do by hand.",
    onScreen: 'The Opportunity: Account Briefing + Customer Intelligence panels.',
    focus: ['mark']
  },
  {
    id: 'proposal',
    chapter: 'booked',
    title: 'The schedule optimises itself',
    scene:
      "Mark gives it the objective and the budget: maximise reach for this audience, this money. The agent builds the media schedule that does it, recommending the product mix and splitting the budget across it to get the most reach for the objective. Mark sees the trade-off, adjusts, and adds. One optimised plan, shaped to this customer, not a menu to wade through.",
    onScreen: 'Ad Proposal Agent → objective + budget in; reach-optimised schedule, product mix + budget split out; Mark adjusts.',
    focus: ['mark']
  },
  {
    id: 'booked',
    chapter: 'booked',
    title: 'A few days later, it books',
    scene:
      "The proposal becomes a quote, a media plan Hannah can say yes to. She does. The plan is booked and the campaign is on its way, the promise from that first conversation now on the calendar.",
    onScreen: 'The Quote / Media Plan → booked.',
    focus: ['hannah']
  },
  {
    id: 'monitor',
    chapter: 'booked',
    title: 'And the watch is already on',
    scene:
      "From the moment it's live, the performance monitor tracks delivery and names any drift before anyone has to ask. When it catches the campaign pacing 12% behind, it flags the two lines doing the dragging with a likely reason. It's the same watch that let Mark walk into that first conversation on top of the variance, which is exactly why the next one will go just as well.",
    onScreen: 'Campaign Performance Monitor → pacing, variance named, posted to the team.',
    entersHere: ['cindy'],
    focus: ['cindy']
  }
];

// The coda line under the last beat: the story implies a cycle without drawing
// a loop. Beat 7 is what made beat 1 go well.
export const coda =
  'The next conversation is already better briefed. That is the loop, and it never has to be drawn.';

// The payoff on the full-story recap: what this whole arc changes for Nine.
// Business value, not story voice, this is the "why it matters" slide.
export const whyItMatters = {
  headline: 'Why it matters to Nine',
  lead:
    'One deal, walked end to end, but the point is not the deal. It is that the work happened whether or not anyone was watching. Here is what that changes.',
  points: [
    {
      pillar: 'Efficiency' as Pillar,
      title: 'Sellers sell, they do not re-key',
      body: "The brief, the Opportunity, the records, the account homework, all stood up by agents before Mark opens his laptop. His time goes to the customer, not the CRM."
    },
    {
      pillar: 'Growth' as Pillar,
      title: 'The book of business runs itself',
      body: 'Every deal lands in an operation already working pipeline and campaigns in the background. The book grows without more headcount.'
    },
    {
      pillar: 'Trust & Value' as Pillar,
      title: 'Nothing drifts unnoticed',
      body: 'The performance monitor names variance overnight and posts it to the team. Nine catches the drag before the advertiser does, every campaign, every night.'
    },
    {
      pillar: 'Trust & Value' as Pillar,
      title: 'The relationship compounds',
      body: 'Because the last campaign was handled well, the next brief lands sooner and better. Trust, not just throughput, is the thing the loop produces.'
    }
  ]
};

// The beat each persona first walks into, derived from `entersHere` so the
// cast tiles link straight to that person's entrance and never drift from the
// spine. Returns the beat and its 1-based number (for the tile label).
export function personaEntryBeats(): {
  slug: PersonaSlug;
  beat: StoryBeat;
  number: number;
}[] {
  const out: { slug: PersonaSlug; beat: StoryBeat; number: number }[] = [];
  story.forEach((beat, i) => {
    for (const slug of beat.entersHere ?? []) {
      out.push({ slug, beat, number: i + 1 });
    }
  });
  return out;
}

// The beats belonging to a chapter, each paired with its 1-based GLOBAL beat
// number (01..07) so numbering stays continuous across chapter pages.
export function beatsForChapter(key: ChapterKey): {
  beat: StoryBeat;
  number: number;
}[] {
  const out: { beat: StoryBeat; number: number }[] = [];
  story.forEach((beat, i) => {
    if (beat.chapter === key) out.push({ beat, number: i + 1 });
  });
  return out;
}

// Look up a chapter by its 1-based page number (1..3). Returns the chapter and
// its number, or null if out of range, used by the chapter route guard.
export function chapterByNumber(
  n: number
): { chapter: Chapter; number: number } | null {
  const chapter = chapters[n - 1];
  return chapter ? { chapter, number: n } : null;
}

export const chapterCount = chapters.length;
