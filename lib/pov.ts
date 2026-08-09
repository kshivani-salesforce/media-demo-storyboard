// "Why Salesforce for Nine's ad sales", the point of view that opens the
// storyboard.
//
// Deliberately punchy, not a long read: a strong thesis, a short framing, a few
// highlights, and a hand-off to the demo. The detail lives in the walked story
// people get to afterwards. Nine-specific: the converged premium portfolio
// (BVOD via 9Now, premium news + lifestyle, heritage print, linear TV, and now
// out-of-home through QMS) and Nine's "e3" strategic theme, Efficiency /
// Effectiveness / Enjoyment. Advertiser in the walked story is Macpac.
//
// House style: British English, no em dashes.

// The thesis hero. `titleAccent` renders as GradientText. Leads on the thing
// only Nine can say: the whole premium portfolio, sold as one.
export const vision = {
  eyebrow: 'Why Salesforce',
  title: 'Nine can sell the whole screen.',
  titleAccent: 'One platform should be able to sell it as one.',
  lead: 'Nine is the one partner that pairs BVOD on 9Now, premium news and lifestyle, heritage print, linear television, and now out-of-home through QMS. The advantage is the converged buy. The question is whether your technology can plan, price, book and prove it as a single motion, instead of a different system of truth for every channel.',
  body: 'Salesforce is the platform that runs the whole ad-sales motion on one estate: the meeting captures itself, agents stand the deal up, the cross-portfolio plan prices and books itself, and every line is proven live. So your sellers spend their week on the relationship, not re-keying it, and Nine sells the converged story only Nine has.'
};

// The market inflection, three tight points. Why now, for Nine.
export type MarketPoint = { title: string; body: string };
export const marketContext: { heading: string; points: MarketPoint[] } = {
  heading: 'Ad sales is at an inflection',
  points: [
    {
      title: 'The converged buy is the moat',
      body: 'Advertisers want video, digital, print, linear and out-of-home as one outcome, not five line items in five tools. The portfolio is the advantage, but only if it can be sold, booked and measured as one.'
    },
    {
      title: 'Booked is not delivered',
      body: 'Demand holds, but delivery on the most valuable premium inventory slips, and a blended number hides it. The variance on 9Now BVOD and premium display is invisible until something surfaces it line by line, overnight.'
    },
    {
      title: 'The speed bar',
      body: 'Advertisers expect a converged proposal in the meeting, not next week, and live proof it delivered, not an end-of-flight PDF. Meeting that bar is a technology question.'
    }
  ]
};

// The highlights: a few reasons, not eight. Grounded in Nine's e3 pillars and
// the real agents. Punchy on purpose.
export type Highlight = { tag: string; title: string; body: string };
export const highlights: Highlight[] = [
  {
    tag: 'Efficiency',
    title: 'The busywork disappears',
    body: 'The meeting captures itself and an agent stands the deal up: the Opportunity, the records, the account brief, nothing re-keyed between the conversation, the brief and the CRM. Sellers get their week back for the customer.'
  },
  {
    tag: 'Effectiveness',
    title: 'One converged plan, every channel, one source of truth',
    body: 'BVOD, premium display, print, linear and out-of-home planned and priced on one live view of what is available to sell, in the same workspace as the account. The whole portfolio sold as one, not reconciled by hand.'
  },
  {
    tag: 'Enjoyment',
    title: 'Nobody gets blindsided',
    body: 'It books in one action, and the performance monitor names any drift overnight and posts it to the team. Nine catches the drag before the advertiser does, and the seller walks into the review briefed, not firefighting.'
  },
  {
    tag: 'Native, not bolt-on',
    title: 'One platform, already yours',
    body: 'Atlas, the agents and the data on one governed estate, every action inside your Salesforce trust boundary. You are not adopting a new platform, you are completing the one you run.'
  }
];

// The close, handing off to the demo + story.
export const close = {
  headline: 'From point of view to proof',
  body: 'This is the case on paper. The recorded demo shows it walked end to end: one deal, from the first conversation to a booked, proven, converged campaign, on one platform.'
};
