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
// Each component carries a `beats` list of story-beat ids (lib/story.ts).
// When a story beat "lights up" some part of the architecture, those
// components glow and the rest dim. The light/dim mechanic is what makes this
// page useful as a story aid, not just a poster.

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
  // Story-beat ids in lib/story.ts that exercise this component.
  beats?: string[];
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
  // Optional "bring your own surface" strip, rendered under the band header.
  // Used on the engagement band to make the Headless 360 point: the system of
  // engagement is pluggable, the same agents and work can be reached from
  // Slack, the Salesforce app, Gemini, Claude, a voice line, wherever the
  // person already is. Logo is optional; without one the name shows as a chip.
  surfaces?: { name: string; logo?: string }[];
  // Tone used by the lit-state (the band's brand colour).
  tone: string;
  components: ArchComponent[];
};

export const bands: ArchBand[] = [
  {
    key: 'engagement',
    index: 1,
    rail: 'System of engagement',
    capability: 'Any workspace · headless',
    title: 'Any surface',
    subline: 'The system of engagement is pluggable. The same agents and the same work are reached wherever the person already is, Slack, the Salesforce app, a Gemini or Claude assistant, or a voice line. Slack is shown here.',
    surfaces: [
      { name: 'Slack', logo: '/icons/slack-3d.png' },
      { name: 'Salesforce', logo: '/icons/salesforce.svg' },
      { name: 'Gemini' },
      { name: 'Claude' },
      { name: 'Voice' }
    ],
    tone: '#4a154b',
    components: [
      { label: 'In-Person Meeting Capture', icon: '/icons/salesforce.svg', caption: 'A Salesforce capability: the face-to-face meeting, captured on mobile', beats: ['conversation'] },
      { label: 'Slackbot', icon: '/icons/slack-3d.png', caption: 'The team channel where agents post and hand off', beats: ['command-center', 'monitor'] },
      { label: 'Canvas', icon: '/icons/slack-3d.png', beats: ['monitor'] },
      { label: 'Enterprise Search', icon: '/icons/slack-3d.png', beats: ['deal-focus'] },
      { label: 'Messaging & Huddles', icon: '/icons/slack-3d.png' },
      { label: 'Tableau Viz · Data Q&A', beats: ['command-center'] }
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
        label: 'Meeting 360 Intelligence',
        icon: '/icons/agentforce.png',
        caption: 'Reads the call: summary, signals, objections, next steps, sentiment, the brief',
        beats: ['conversation']
      },
      {
        label: 'RFP Agent',
        icon: '/icons/media.svg',
        caption: 'An Agentforce Media agent: reads the RFP document and stands up the Opportunity + structured records',
        beats: ['rfp']
      },
      {
        label: 'Account Briefing Agent',
        icon: '/icons/agentforce.png',
        caption: 'Assembles who the customer is and what matters to them, on the deal',
        beats: ['deal-focus']
      },
      {
        label: 'Ad Proposal Agent',
        icon: '/icons/media.svg',
        caption: 'Optimises the schedule for reach against the objective: product mix + budget split',
        beats: ['proposal']
      },
      {
        label: 'Campaign Performance Monitor',
        icon: '/icons/media.svg',
        caption: 'Watches delivery, names the drift before anyone asks, posts to the team',
        beats: ['monitor', 'conversation']
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
      { label: 'Opportunity & Records', icon: '/icons/media.svg', caption: 'The deal the RFP agent stands up: Opportunity + structured records', beats: ['rfp'] },
      { label: 'Ad Sales Command Center', icon: '/icons/media.svg', caption: 'The book of business view; agents already at work', beats: ['command-center'] },
      { label: 'Account Brief & Customer Intelligence', caption: 'The homework, assembled on the Opportunity', beats: ['deal-focus'] },
      { label: 'Ad Sales Mgmt', icon: '/icons/media.svg', caption: 'The proposal · the media plan · the calendar', beats: ['proposal', 'booked'] },
      { label: 'Quote / Media Plan', icon: '/icons/media.svg', caption: 'The proposal becomes a bookable plan', beats: ['booked'] },
      { label: 'Subscriber Lifecycle', icon: '/icons/media.svg', caption: 'Loyalty + retention motion' },
      { label: 'Predictive Modelling', caption: 'Demand forecast inputs' },
      { label: 'Workflow Orchestration', icon: '/icons/media.svg', caption: 'The shared spine', beats: ['command-center', 'monitor'] },
      { label: 'Partner & Customer Communities', icon: '/icons/media.svg' },
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
    tone: '#3d8bfe',
    components: [
      { label: 'Conversation signals', icon: '/icons/data360.png', caption: 'Every captured call, harmonised into the customer picture', beats: ['conversation', 'deal-focus'] },
      { label: 'Account & campaign history', icon: '/icons/data360.png', caption: 'What this customer has run before, grounding the brief', beats: ['deal-focus'] },
      { label: 'Audience graph', icon: '/icons/data360.png', caption: 'Who, where, when, feeding the targeting', beats: ['proposal'] },
      { label: 'Live performance feed', caption: 'Pacing + delivery', beats: ['monitor', 'command-center'] },
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

// Helper: which bands have at least one component lit by a given beat?
export function bandsLitByBeat(beatId: string): Set<SystemKey> {
  const out = new Set<SystemKey>();
  for (const band of bands) {
    if (band.components.some((c) => c.beats?.includes(beatId))) {
      out.add(band.key);
    }
  }
  return out;
}

// Helper: every component-id (band+label) lit by a given beat.
export function componentsLitByBeat(beatId: string): Set<string> {
  const out = new Set<string>();
  for (const band of bands) {
    for (const c of band.components) {
      if (c.beats?.includes(beatId)) {
        out.add(`${band.key}:${c.label}`);
      }
    }
  }
  return out;
}
