# demo-storyboard

Netflix-style demo storyboard for the myRetailGoldenDemo Media Cloud / Ad
Sales narrative. Persona grid on the home page, per-persona vignette pages
that frame the in-org and Gemini surfaces.

## Run it

```bash
npm install
npm run dev
```

Defaults to `http://localhost:3002` (3000 is `headless360-voice`, 3001 is
`sbr-gemini-demo`).

## Where to put things

- **Design reference material I send Claude** → `design/` (see
  `design/README.md`).
- **Final persona photos** → `public/personas/<slug>.jpg`.
- **Iconography that's used everywhere** → `public/icons/`.
- **Per-vignette frame illustrations / screenshots** →
  `public/storyboards/<persona-slug>/<vignette-id>/<n>.png`.
- **Storyboard content (personas, vignettes, copy)** → `lib/storyboard.ts`.

## Layout

```
demo-storyboard/
├── app/
│   ├── layout.tsx              # Google Sans, dark canvas
│   ├── page.tsx                # Netflix-style persona grid
│   ├── globals.css
│   └── personas/[slug]/page.tsx  # Per-persona vignette storyboard
├── components/
│   └── PersonaTile.tsx
├── lib/
│   └── storyboard.ts           # Personas + vignettes content
├── design/                     # Inputs: design refs, raw icons, notes
├── public/
│   ├── personas/               # <slug>.jpg
│   ├── icons/
│   └── storyboards/
├── tailwind.config.ts          # Placeholder palette (replace once design lands)
└── package.json
```

## Sibling apps

- `../sbr-gemini-demo/` (port 3001) — Gemini Enterprise UI imitation.
- `../headless360-voice/` (port 3000) — voice client.
- `../myRetailGoldenDemo/` — the SFDX project / live org surface.

The storyboard deep-links into all three.
