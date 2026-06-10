# Design references

Drop the visual reference material I'll work from in this folder. Anything
you put here is treated as input — Claude reads it, you don't need to commit
it as final assets.

## Where to put what

- `design/styles/` — screenshots, exported PNG/JPG of the slide layouts you
  want me to recreate (the Netflix tile grid, the journey-path diagram,
  any persona-card reference). Filenames are free-form.
- `design/icons-source/` — the raw iconography you want me to draw from.
  PNG, SVG or AI exports all fine.
- `design/palette.md` (optional) — paste hex codes / typography rules if
  you want them locked down before I touch the Tailwind config.
- `design/notes.md` (optional) — any free-text "make it feel like X" notes.

## Where the production assets live

Once I cut the references into final assets, they go under `public/`:

- `public/personas/<slug>.jpg` — persona photos (`mark.jpg`, `scott.jpg`,
  `susan.jpg`).
- `public/icons/` — the canonical iconography used everywhere.
- `public/storyboards/<persona-slug>/<vignette-id>/<frame>.png` —
  per-vignette frame screenshots/illustrations.

The `design/` folder is for source / inputs. `public/` is what the app
actually serves. Don't worry about that split — just dump everything in
`design/` and I'll cut it down.
