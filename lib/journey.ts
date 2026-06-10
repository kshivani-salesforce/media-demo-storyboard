// The campaign lifecycle, told as a single connected story (see
// design/storyboard-reference.png). This is the spine of the demo:
// every vignette lights up a stretch of nodes; everything else dims.
//
// 12 nodes, three rows, S-curve serpentine: same shape as the slide.
// The nodes are story beats, not technical steps. No record IDs.
// No object names. If someone in the room asks what an AdQuoteLine is,
// they're reading the wrong page.

export type JourneyNode = {
  id: string;
  // Display label on the node.
  label: string;
  // One-sentence "what's happening here" caption shown when this node
  // is the active story beat.
  caption: string;
  // Which row of the serpentine this node sits on (0 = top, 1 = middle,
  // 2 = bottom). Drives the SVG path generation.
  row: 0 | 1 | 2;
  // Column position 0..n-1 within the row (left to right).
  col: number;
  // Persona avatars pinned at this node (rendered above the node).
  pinned?: ('mark' | 'suzie' | 'cindy')[];
  // Optional terminal flag, renders a flag icon, not a circle.
  terminal?: boolean;
};

export const journey: JourneyNode[] = [
  // Row 0, left to right
  { id: 'brief',         label: 'A brief lands',            caption: 'A retail apparel brand asks: $1.5M, winter, three months. Where do we start?', row: 0, col: 0, pinned: ['mark'] },
  { id: 'past-wins',     label: 'Find a past win',          caption: 'The closest analogue from last year surfaces in seconds: print-led, +12pp brand lift, the playbook is right there.', row: 0, col: 1 },
  { id: 'two-plans',     label: 'Two plans, side by side',  caption: 'Agentforce drafts the digital-led plan. Gemini drafts the linear-led plan. Both stream, both grounded, the rep picks one.', row: 0, col: 2 },
  { id: 'picker',        label: 'Curated picker',           caption: 'A clickable proposal: packages, mix, budget split. The rep tweaks live and commits with one click.', row: 0, col: 3 },
  { id: 'channel-post',  label: 'Slack the deal team',      caption: 'The summary lands in the deal channel before the call ends. Account director sees it. Trader sees it. No re-typing.', row: 0, col: 4 },

  // Row 1, right to left (S-curve)
  { id: 'calendar-check', label: 'Calendar check',          caption: 'Inventory calendar lights up: where the chosen mix has slots, where capacity is tight, what would push.', row: 1, col: 4 },
  { id: 'audience-tweak', label: 'Audience on the fly',     caption: '“Find me Gen Z shoppers in May.” The advisor maps it to live segments and drops the lines on the plan.', row: 1, col: 3, pinned: ['suzie'] },
  { id: 'plan-locked',    label: 'Plan locked',             caption: 'Quote signed. Lines flow into the system of work as the campaign of record.', row: 1, col: 2 },
  { id: 'campaign-live',  label: 'Campaign goes live',      caption: 'Inventory burns. Impressions roll. Pacing data starts streaming back in.', row: 1, col: 1 },
  { id: 'pacing',         label: 'Performance streams',     caption: 'Every line, every channel, every day, measured against what was promised.', row: 1, col: 0 },

  // Row 2, left to right
  { id: 'variance',     label: 'Variance caught',           caption: 'The campaign is pacing 12% behind. The two worst-offender lines are flagged with a likely reason, autonomously, overnight.', row: 2, col: 0, pinned: ['cindy'] },
  { id: 'cco-briefed',  label: 'CCO walks in briefed',      caption: 'The Slack summary is in-thread before the QBR starts. Susan opens the meeting with the answer, not the question.', row: 2, col: 1 },
  { id: 'win',          label: 'Loyalty earned',            caption: 'The advertiser sees a partner who caught the drag before they did. Next brief lands sooner.', row: 2, col: 2, terminal: true }
];

// Story vignettes. Each one is a *named stretch* of the journey. The
// home page renders these as a switcher; selecting one lights the
// matching node range on the serpentine and the matching components on
// the architecture diagram.
export type Vignette = {
  id: string;
  title: string;
  // Short label for the switcher pill.
  pill: string;
  // The persona this vignette is anchored on (for portrait + voice).
  persona: 'mark' | 'suzie' | 'cindy';
  // The story beat (one paragraph, narrative voice).
  paragraph: string;
  // Range of journey node ids that this vignette walks through.
  nodes: string[];
};

export const vignettes: Vignette[] = [
  {
    id: 'brief-arrives',
    title: 'A brief becomes a proposal',
    pill: 'Brief → proposal',
    persona: 'mark',
    paragraph:
      "It's the first call of the week and a retail apparel brand wants a winter campaign: $1.5M, three months. Mark used to need a day for this. Now he asks for the closest past win, gets two plans drafted side-by-side, picks the digital-led one, tweaks the mix in a clickable picker, and the summary is in the deal channel before he hangs up.",
    nodes: ['brief', 'past-wins', 'two-plans', 'picker', 'channel-post']
  },
  {
    id: 'past-wins',
    title: 'Where have I done this before?',
    pill: 'Past wins',
    persona: 'mark',
    paragraph:
      "The first thing any seller asks. Mark types the brief into a search box and the closest analogue from last year surfaces: print-led, $165k, twelve points of brand lift in the right age band. The playbook is right there, with citations he can quote on the call.",
    nodes: ['brief', 'past-wins']
  },
  {
    id: 'two-plans-side-by-side',
    title: 'Two plans, side by side',
    pill: 'Two plans',
    persona: 'mark',
    paragraph:
      "The brief PDF flows in. Two streams start at once: an Agentforce draft on the left, a Gemini draft on the right. Same brief, two takes. Mark watches both fill in, picks the one his customer will respond to, and moves on. The other one is still useful; it gets archived as the alternate.",
    nodes: ['two-plans', 'picker']
  },
  {
    id: 'audience-on-the-fly',
    title: 'Audience, on the fly',
    pill: 'Audience tweak',
    persona: 'suzie',
    paragraph:
      "Suzie's at the advertiser. Her team buys in Slack the same way they DM each other. She types ‘find me Gen Z shoppers in May’ and gets a clean answer: what matched the literal filter, what was widened, what's available. She picks her rows. Real lines land on the live plan.",
    nodes: ['audience-tweak', 'plan-locked']
  },
  {
    id: 'variance-watch',
    title: 'Variance caught before the meeting',
    pill: 'Variance watch',
    persona: 'cindy',
    paragraph:
      "Cindy walks into the QBR. She already knows the campaign is twelve points behind, she already knows which two lines are dragging, and she already knows the likely reason. Not because she chased it. Because the agent watched it overnight, named it, and posted the summary into the channel before she sat down.",
    nodes: ['pacing', 'variance', 'cco-briefed', 'win']
  }
];

export const allVignetteIds = vignettes.map((v) => v.id);

export function findVignette(id: string) {
  return vignettes.find((v) => v.id === id);
}
