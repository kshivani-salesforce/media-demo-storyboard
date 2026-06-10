# demo-storyboard — design notes

Notes for future Claude sessions and any SE who picks this up cold.

## Persona ↔ UC mapping (locked 2026-06-01)

The four canonical use cases of the myRetailGoldenDemo Nine SIC narrative
(per `references/STEEL_THREAD_RECORDS.md`,
`specs/results-canvas-lwc-contract.md`, and
`~/.claude/plans/we-are-running-a-compressed-candle.md`):

| UC | Title | Producer | Steel-thread anchor |
|----|---|---|---|
| **UC1** | "Where have I done this before?" | `geminiCampaignIntelligence` LWC | Past_Campaign__c "Apparel Brand Summer Push - Dec 2024" |
| **UC2** | Campaign Brief Ingestion + A2A façade | `mt_AI_Capture_Screen_Flow` → `campaignBriefIntake` LWC + Ad Proposal Builder + nineAdOrderBuilder_7dbf9c CLT | Macpac brief PDF |
| **UC3** | Autonomous Campaign Performance Monitor + Slack | Schedule-Triggered Flow + Campaign Performance Monitor agent + OOTB Slack action | AdQuote 0q8Ic000000Kys1IAC, −12.45% variance |
| **UC4** | Slack as Command Centre | Ad Inventory Advisor agent in Slack channel C0B58JQNL6N | Real AdQuoteLines on the Macpac AdQuote |

Mapping into the persona-led storyboard:

| Persona | Role | UC(s) |
|---|---|---|
| **Mark** | Ad Sales Rep · Nine | **UC1 + UC2** fused (brief → past-campaign citation → A2A panels → CLT picker → Slack) |
| **Susan** | Commercial Officer · Nine | **UC3** (variance roll-up → agent narration → Slack the CCO) |
| **Scott** | Advertiser · Macpac | **UC4** (Slack convo with Inventory Advisor → real AdQuoteLines on the live plan) |

When in doubt: cite real records (Opp `006J2000005Unh7IAC`, Quote
`0Q0J2000000YSGzKAO`, AdQuote `0q8Ic000000Kys1IAC`, BVOD + Premium Display
at −22.1% each, Past_Campaign $165k +12pp) — NOT made-up numbers.

## 4-layer Salesforce architecture

Used as the framing for `/architecture`:

```
Layer 01 — Apps         (Media Cloud / Ad Sales Mgmt; AdQuote, calendar, custom UI)
Layer 02 — AI           (Agentforce: Proposal Builder, Performance Monitor, Inventory Advisor, ...)
Layer 03 — Data         (Past_Campaign__c, rollup-summary chains, AdTargetCategory, Data 360 future-swap)
Layer 04 — Foundations  (aiAuthoringBundles, CLTs, permsets, Slack channel convention)
```

Each vignette declares which layers it lights up via `Vignette.layers`.
The `/architecture` page reads that array to drive its highlight states.

## Design language

- **Mode**: dark throughout. Driva v2 proved the dark hero + dark content
  layout reads fine; no need to flip to a light "help-centre" register on
  vignette pages.
- **Reference**: `git.soma.salesforce.com/droach/project-multiplier-toolkit`,
  cloned to `/tmp/pmt-probe/` while authoring this app. The single most
  useful artefact in there is
  `examples/driva-v2/screenshots/driva_1440.png` — the canonical L3
  reference. We lifted: hero composition (1.6fr text + central glowing
  agent bubble), 4-cell KPI rail, agent / use-case cards with sticker
  icons, navy "Try the agent yourself" CTA bar with cobalt pill button.
- **Typography**: Inter (body) + Plus Jakarta Sans (display). Deliberately
  not Google Sans — that belongs to `sbr-gemini-demo`.
- **Iconography**: 3D bubble system shipped in `public/icons/` —
  `agentforce.png`, `data360.png`, `marketing.png`, `slack-3d.png`,
  `collaboration.png`, plus the Salesforce cloud SVG. Source originals
  live in `design/icons/`.

## Sticker icons mapped to Cloud / vibe

| Sticker | Used for |
|---|---|
| `agentforce` | Anything agent-driven; Mark's persona; default centre of `<AgentBubble>` |
| `data360` | Data layer references; Past_Campaign__c grounding; rollup-summary plumbing |
| `marketing` | Susan's persona; UC3 Performance Monitor framing |
| `slack-3d` | UC3 hand-off + UC4 command centre; any Slack hand-off frame |
| `collaboration` | Scott's persona; Slack-as-conversation framing |

## On the project-multiplier-toolkit

What it actually is: a fleet of Claude Code subagents (Albert orchestrator
+ 20 specialists — MULTIPLIER, NINJA, CANVAS, POLISH, PROOF, REVIEWER,
FORGE, BLACKSMITH, CHISEL etc.) that compose and PR L3 customer pages
back to the canonical `website-agent` repo on Heroku.

What it isn't: a UI design system or component library we can drop in.
The render code lives in `website-agent`, not the toolkit.

What's actually useful for us:

- `examples/driva-v2/screenshots/driva_{1440,768,375}.png` — the canonical
  L3 reference. Direct visual source for our home + persona pages.
- `examples/driva-v2/manifest/driva.yml` — the L3 manifest schema. Drove
  the shape of `Vignette` and `Persona` in `lib/storyboard.ts` (KPIs as
  a 4-cell rail, use_cases array with id/slug/title/role/track/desc, etc.).
- `examples/driva-v2/charter/{architecture.md,use-cases.md}` — illustrates
  the level of specificity charter docs ship at. Worth reading if we ever
  push *this* demo through the Multiplier process.

If the demo grows into a real L3 page, the path is: write a charter
bundle (architecture.md + use-cases.md + brand tokens) → spawn Albert in
`/tmp/pmt-probe/` → MULTIPLIER composes the manifest → CANVAS renders →
PR back to `website-agent`. The local `demo-storyboard` app is the
*design exploration* surface; the L3 is the eventual output.

## Run it

```
cd demo-storyboard
npm install
npm run dev
```

`http://localhost:3002` — port chosen so it doesn't clash with
`headless360-voice` (3000) or `sbr-gemini-demo` (3001).
