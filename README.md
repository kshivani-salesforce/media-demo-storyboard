# demo-storyboard

Storyboard for the Salesforce + Nine Media Cloud / Ad Sales narrative. One deal,
walked end to end as a guided story: a landing page introduces the cast, then
three chapter pages walk the beats top to bottom, and a full-story page recaps
it and lands the "why it matters to Nine" payoff.

## Run it

```bash
npm install
npm run dev
```

Defaults to `http://localhost:3002` (3000 is `headless360-voice`, 3001 is
`sbr-gemini-demo`).

## The shape

One story, one source of truth (`lib/story.ts`): seven high-level beats grouped
into three chapters, personas introduced inline the first time each enters.
There is no loop, serpentine, persona grid or per-vignette stepper, one
metaphor, walked forward.

- **Landing (`/`)** — meet the cast (three persona tiles + intro), a chapter
  overview, and a "Begin the story" button. All entries open Chapter I.
- **Chapter pages (`/story/1`, `/story/2`, `/story/3`)** — each renders its own
  beats on the spine (global 01–07 numbering preserved), with a chapter stepper
  and a forward button that walks I → II → III → the full story.
- **Full story (`/story`)** — a condensed recap of the three chapters plus the
  "Why it matters to Nine" business-value payoff.
- **Architecture (`/architecture`)** — the four-band Agentic Media Enterprise
  diagram; a beat pill switcher lights the components each beat exercises.

## Where to put things

- **Design reference material I send Claude** → `design/` (see
  `design/README.md`).
- **Final persona photos** → `public/personas/<slug>.jpg`.
- **Iconography that's used everywhere** → `public/icons/`.
- **Story content (beats, chapters, the payoff)** → `lib/story.ts`.
- **The cast (personas + intro lines)** → `lib/storyboard.ts`.
- **Architecture bands + components** → `lib/architecture.ts`.

## Layout

```
demo-storyboard/
├── app/
│   ├── layout.tsx                 # Inter + JetBrains Mono, dark canvas
│   ├── page.tsx                   # Landing: meet the cast + begin
│   ├── story/
│   │   ├── page.tsx               # Full-story recap + why it matters
│   │   └── [chapter]/page.tsx     # Chapter pages (/story/1..3)
│   ├── architecture/page.tsx      # Agentic Media Enterprise diagram
│   └── globals.css
├── components/
│   ├── BrandLockup.tsx            # Salesforce + Nine co-brand
│   ├── TopNav.tsx                 # Ch I/II/III · Full story · Architecture
│   ├── PersonaTile.tsx            # Cast tile on the landing page
│   ├── PersonaIntro.tsx           # Inline persona intro in the spine
│   ├── BeatCard.tsx               # One beat: numbered node + card
│   ├── Spine.tsx                  # The connecting-line <ol> wrapper
│   ├── GradientText.tsx / Sparkles.tsx / StickerIcon.tsx / SafeImage.tsx
├── lib/
│   ├── story.ts                   # Beats, chapters, payoff (source of truth)
│   ├── storyboard.ts              # Personas
│   └── architecture.ts            # Architecture bands + beat mapping
├── design/                        # Inputs: design refs, raw icons, notes
├── public/
│   ├── personas/                  # <slug>.jpg
│   └── icons/
├── tailwind.config.ts             # Salesforce DMS (Night / Electric Blue)
└── package.json
```

## Sibling apps

- `../sbr-gemini-demo/` (port 3001) — Gemini Enterprise UI imitation.
- `../headless360-voice/` (port 3000) — voice client.
- `../myRetailGoldenDemo/` — the SFDX project / live org surface.

The storyboard deep-links into all three.
