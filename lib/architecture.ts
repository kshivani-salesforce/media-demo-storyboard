// Agentic Media Enterprise Architecture, faithful to the canonical
// Salesforce slide (see design/architecture-reference.png).
//
// FOUR Salesforce bands sit inside the trust boundary, each with a
// left-side label and a right-side "Any X" capability label:
//
//   System of engagement -> "Any workspace"  (Slack, Canvas, Messaging)
//   System of agency     -> "Any agent"      (Agentforce for M&E)
//   System of work       -> "Any app"        (Customer 360: Sales/Service/Marketing/...)
//   System of context    -> "Any data lake"  (Data 360)
//
// The Trust Layer is NOT a fifth peer band. It is the MEMBRANE between the
// governed Salesforce estate above and the external model providers below:
// nothing reaches a provider except through it. It is modelled separately
// (`trustLayer` + `modelProviders`) so it can be rendered as a boundary,
// not just another row.
//
// Each component carries a `vignettes` list. When a story vignette "lights
// up" some part of the architecture, those components glow and the rest
// dim. The light/dim mechanic is what makes this page useful as a story
// aid, not just a poster.

export type SystemKey =
  | 'engagement'
  | 'agency'
  | 'work'
  | 'context';

export type ArchComponent = {
  // Display label as it appears on the chip.
  label: string;
  // Image asset under /public/icons. If a SVG/PNG isn't provided, we fall
  // back to a coloured dot.
  icon?: string;
  // Vignette IDs in lib/journey.ts that exercise this component.
  vignettes?: string[];
  // Optional muted helper text (for Customer 360 sub-apps with two lines).
  caption?: string;
};

export type ArchBand = {
  key: SystemKey;
  // Band ordering top-to-bottom (1 = engagement, 5 = trust).
  index: number;
  // Left rail label, e.g. "System of engagement".
  rail: string;
  // Right rail label, e.g. "Any workspace".
  capability: string;
  // Single-word title displayed inside the band card.
  title: string;
  // Sub-line under the title.
  subline?: string;
  // Tone used by the lit-state (the band's brand colour).
  tone: string;
  components: ArchComponent[];
};

export const bands: ArchBand[] = [
  {
    key: 'engagement',
    index: 1,
    rail: 'System of engagement',
    capability: 'Any workspace',
    title: 'Slack',
    subline: 'Slackbot · Canvas · Enterprise Search · Messaging & Huddles · Tableau Viz · Data Q&A',
    tone: '#4a154b',
    components: [
      { label: 'Slackbot', icon: '/icons/slack-3d.png', vignettes: ['variance-watch', 'audience-on-the-fly'] },
      { label: 'Canvas', vignettes: ['audience-on-the-fly'] },
      { label: 'Enterprise Search', vignettes: ['past-wins'] },
      { label: 'Messaging & Huddles' },
      { label: 'Tableau Viz · Data Q&A' }
    ]
  },
  {
    key: 'agency',
    index: 2,
    rail: 'System of agency',
    capability: 'Any agent · MCP · A2A',
    title: 'Agentforce for Media & Entertainment',
    subline: 'The agents we have built for this demo. Each one is a real Agentforce employee agent in the org, grounded in CRM context.',
    tone: '#0d61f2',
    components: [
      {
        label: 'Past-campaign Citation',
        icon: '/icons/media.svg',
        caption: 'Surfaces the closest analogue from last year, with citations',
        vignettes: ['brief-arrives', 'past-wins']
      },
      {
        label: 'Ad Proposal Builder',
        icon: '/icons/media.svg',
        caption: 'Drafts side-by-side plans, then commits the curated picker',
        vignettes: ['brief-arrives', 'two-plans-side-by-side']
      },
      {
        label: 'Ad Inventory Advisor',
        icon: '/icons/media.svg',
        caption: 'Maps audience asks to live segments and lands lines on the plan',
        vignettes: ['audience-on-the-fly']
      },
      {
        label: 'Campaign Performance Monitor',
        icon: '/icons/media.svg',
        caption: 'Watches every campaign overnight, names the drag, posts to Slack',
        vignettes: ['variance-watch']
      }
    ]
  },
  {
    key: 'work',
    index: 3,
    rail: 'System of work',
    capability: 'Any app',
    title: 'Media & Entertainment Customer 360',
    subline: 'Audience · Subscriptions · Predictive Modelling · Workflow Orchestration · Audience & Behavioural Personalisation · Partner & Customer Communities',
    tone: '#5b8def',
    components: [
      { label: 'Ad Sales Mgmt', icon: '/icons/media.svg', caption: 'The proposal · the plan · the calendar', vignettes: ['brief-arrives', 'two-plans-side-by-side', 'pick-the-plan', 'calendar-check', 'campaign-live'] },
      { label: 'Subscriber Lifecycle', caption: 'Loyalty + retention motion' },
      { label: 'Predictive Modelling', caption: 'Demand forecast inputs' },
      { label: 'Workflow Orchestration', caption: 'The shared spine', vignettes: ['variance-watch', 'cco-briefed'] },
      { label: 'Audience & Personalisation', caption: 'Behavioural taxonomy', vignettes: ['audience-on-the-fly'] },
      { label: 'Partner & Customer Communities' },
      { label: 'Sales · Service · Marketing · Commerce · Revenue · Platform' }
    ]
  },
  {
    key: 'context',
    index: 4,
    rail: 'System of context',
    capability: 'Any data lake or warehouse',
    title: 'Data 360',
    subline: 'CDP · Federation · Informatica · Tableau · Structured & Unstructured · Zero copy · Real time',
    tone: '#a06cd5',
    components: [
      { label: 'Past wins library', icon: '/icons/data360.png', caption: 'Last year, last quarter, last decade', vignettes: ['past-wins'] },
      { label: 'Audience graph', icon: '/icons/data360.png', caption: 'Who, where, when', vignettes: ['audience-on-the-fly'] },
      { label: 'Live performance feed', caption: 'Pacing + delivery', vignettes: ['variance-watch', 'cco-briefed'] },
      { label: 'Federation · zero copy · real time' }
    ]
  }
];

// The Trust Layer: the membrane between the governed Salesforce estate and
// any external model. This is the headline message of the whole diagram, so
// it gets its own structure rather than being a peer band.
export const trustLayer = {
  // The claim, stated plainly.
  headline: 'Trust by construction, not by audit.',
  // How the claim is delivered. Kept to one tight line: this is a quiet
  // guarantee, not a narrative beat.
  body:
    'Your policies, sharing rules and Flow logic still govern every action. Nothing reaches an external model except through here, and it never sees raw customer data.',
  // The two sides the membrane sits between (used for the boundary labels).
  insideLabel: 'Inside your Salesforce trust boundary',
  outsideLabel: 'External models · called through the trust layer, never handed raw data',
  // What the layer actually does, as short tokens.
  guarantees: ['Grounding', 'Dynamic masking', 'Zero retention', 'Full audit trail', 'Model-partner choice']
};

export type ModelProvider = {
  // Display name (fallback when no logo asset is supplied).
  name: string;
  // White / monochrome transparent logo under /public/icons. Drop the file
  // in and set this path; until then the name renders as a wordmark chip.
  logo?: string;
};

// External model providers reachable ONLY through the trust layer.
//
// Logo notes:
//  - openai.svg : monochrome, recoloured white to read on the dark row.
//  - meta.png   : Meta infinity mark (blue), stands in for LLaMA.
//  - mistral.png: the orange pixel-castle mark, colour, reads on dark.
//  - Anthropic & Gemini render as wordmarks until white / transparent
//    variants are supplied (the files on hand are dark-on-light, which
//    disappears on the dark trust-layer row).
export const modelProviders: ModelProvider[] = [
  { name: 'OpenAI', logo: '/icons/openai.svg' },
  { name: 'Anthropic' },
  { name: 'Gemini' },
  { name: 'LLaMA', logo: '/icons/meta.png' },
  { name: 'Mistral', logo: '/icons/mistral.png' }
];

// Helper: which bands have at least one component lit by a given vignette?
export function bandsLitByVignette(vignetteId: string): Set<SystemKey> {
  const out = new Set<SystemKey>();
  for (const band of bands) {
    if (band.components.some((c) => c.vignettes?.includes(vignetteId))) {
      out.add(band.key);
    }
  }
  return out;
}

// Helper: every component-id (band+label) lit by a given vignette.
export function componentsLitByVignette(vignetteId: string): Set<string> {
  const out = new Set<string>();
  for (const band of bands) {
    for (const c of band.components) {
      if (c.vignettes?.includes(vignetteId)) {
        out.add(`${band.key}:${c.label}`);
      }
    }
  }
  return out;
}
