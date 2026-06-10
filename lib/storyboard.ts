// Personas, narrative-first. Each persona is a character in the campaign
// lifecycle story; the vignettes they appear in are defined in lib/journey.ts.
// Nothing in here references object names, IDs, agent versions, or any other
// internal artefact. If a stat appears in the prose, treat it as a story
// number, not a wire fact.

import type { StickerKey } from '@/components/StickerIcon';

export type PersonaSlug = 'mark' | 'suzie' | 'cindy';

export type Persona = {
  slug: PersonaSlug;
  name: string;
  // Title as their customer would describe them, not as their HRIS would.
  role: string;
  // The motto/headline the home page uses for them.
  tagline: string;
  // /public/personas/<slug>.jpg
  photo: string;
  // CSS object-position string, hand-tuned per photo so the face lands in
  // the visible window of each tile / portrait / avatar. Source photos are
  // wide landscape crops with the subject often well off-centre, so a
  // single global value never works for all three.
  photoFocus: string;
  // 3D bubble icon that signals which Cloud their day lives in.
  sticker: StickerKey;
  // The "who they are and why we care" paragraph.
  introParagraph: string;
  // The "what their day looks like" paragraph that anchors their page.
  dayParagraph: string;
  // Vignette IDs they're the lead character in (drives ordering on the
  // home page).
  vignetteIds: string[];
};

export const personas: Persona[] = [
  {
    slug: 'mark',
    name: 'Mark',
    role: 'Ad Sales Rep',
    tagline: 'Lead to loyalty.',
    photo: '/personas/mark.jpg',
    photoFocus: '68% 28%',
    sticker: 'media',
    introParagraph:
      "Mark sells media for a national publisher. The brief lands, the clock starts, and the customer is on a call he booked himself. He doesn't need a dashboard. He needs a head start.",
    dayParagraph:
      "His day used to be: open last year's plans, find the one that nearly worked, paste it into a slide, get on the call. Now the head start arrives before the call does. The past win cited, two drafts ready, a clickable picker live in the meeting. By the time the customer asks ‘what would you recommend?’, he already has it.",
    vignetteIds: ['brief-arrives', 'past-wins', 'two-plans-side-by-side']
  },
  {
    slug: 'suzie',
    name: 'Suzie',
    role: 'Advertiser',
    tagline: 'Conversation to booking.',
    photo: '/personas/suzie.jpg',
    photoFocus: '75% 28%',
    sticker: 'slack-3d',
    introParagraph:
      "Suzie runs paid media for the apparel brand on the other end of Mark's call. Her team is small, fast, and lives in Slack. She doesn't want to log into a portal to ask a question; she wants to ask the question.",
    dayParagraph:
      "When her planner asks her for ‘Gen Z shoppers in May’ at 4pm, she wants an answer at 4:01. Not a meeting, not a follow-up, not a dashboard tour. Now she gets one, in the same Slack channel her deal team already lives in, with the lines already landing on the live plan.",
    vignetteIds: ['audience-on-the-fly']
  },
  {
    slug: 'cindy',
    name: 'Cindy',
    role: 'Ad Ops · Finance',
    tagline: 'Bill to insights.',
    photo: '/personas/cindy.jpg',
    photoFocus: '30% 30%',
    sticker: 'agentforce',
    introParagraph:
      "Cindy owns delivery and billing across every campaign on the publisher's books. She doesn't sell. She answers for what was sold once it goes live, and when something drifts off-pace, she is the one who has to explain it.",
    dayParagraph:
      "Her job is to walk into a quarterly review with the answer, not the question. The agent watches every campaign every night, names the ones drifting off-pace, points at the lines doing the dragging, suggests a likely reason, and posts the summary into her channel before the QBR opens. She arrives briefed.",
    vignetteIds: ['variance-watch']
  }
];

export function findPersona(slug: string) {
  return personas.find((p) => p.slug === slug);
}
