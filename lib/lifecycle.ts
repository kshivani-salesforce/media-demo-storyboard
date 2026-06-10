// Campaign lifecycle as a closed loop, with the advertiser at its centre.
//
// The shift: Suzie (the advertiser) is *not* a stop on the loop. She is the
// centre of gravity. Every loop is a campaign for her. The publisher's
// people and agents are the cast that runs the loop on her behalf, and
// then the same shape repeats for the next campaign.
//
//   Centre:   Suzie (advertiser, always lit)
//   Loop:     Discover -> Plan -> Launch -> Monitor -> Optimise -> Discover
//
// Supporting actors per stage are kept to two at most so the cluster reads
// cleanly at a glance.

import type { PersonaSlug } from '@/lib/storyboard';
import type { StickerKey } from '@/components/StickerIcon';

export type StageKey =
  | 'discover'
  | 'plan'
  | 'launch'
  | 'monitor'
  | 'optimise';

export type Actor =
  | { kind: 'persona'; slug: PersonaSlug }
  | { kind: 'tool'; sticker: StickerKey; label?: string };

export type LifecycleStage = {
  key: StageKey;
  label: string;
  caption: string;
  // The cast that lights up at this stage. First entry is the headliner
  // (rendered larger), the rest sit in a small row below.
  actors: Actor[];
};

export const stages: LifecycleStage[] = [
  {
    key: 'discover',
    label: 'Discover',
    caption: 'A brief lands. Past wins surface. The shape of the answer arrives before the call.',
    actors: [
      { kind: 'persona', slug: 'mark' },
      { kind: 'tool', sticker: 'data360', label: 'Past-campaign citation' },
      { kind: 'tool', sticker: 'media', label: 'Media Cloud' }
    ]
  },
  {
    key: 'plan',
    label: 'Plan',
    caption: 'Two drafts side by side. A clickable picker. The proposal lands in the deal channel.',
    actors: [
      { kind: 'persona', slug: 'mark' },
      { kind: 'tool', sticker: 'agentforce', label: 'Ad Proposal Builder' },
      { kind: 'tool', sticker: 'media', label: 'Media Cloud' }
    ]
  },
  {
    key: 'launch',
    label: 'Launch',
    caption: 'Audience tweaked on the fly. Calendar checked. Plan locked. Campaign goes live.',
    actors: [
      { kind: 'persona', slug: 'mark' },
      { kind: 'tool', sticker: 'agentforce', label: 'Ad Inventory Advisor' },
      { kind: 'tool', sticker: 'slack-3d', label: 'Slack' }
    ]
  },
  {
    key: 'monitor',
    label: 'Monitor',
    caption: 'Performance streams. Variance is named overnight. The summary lands in Slack.',
    actors: [
      { kind: 'persona', slug: 'cindy' },
      { kind: 'tool', sticker: 'agentforce', label: 'Performance Monitor' },
      { kind: 'tool', sticker: 'data360', label: 'Data 360' }
    ]
  },
  {
    key: 'optimise',
    label: 'Optimise',
    caption: 'CCO walks in briefed. The drag is fixed before the next QBR. The next brief lands sooner.',
    actors: [
      { kind: 'persona', slug: 'cindy' },
      { kind: 'persona', slug: 'mark' },
      { kind: 'tool', sticker: 'slack-3d', label: 'Slack' }
    ]
  }
];

export function findStage(key: StageKey) {
  return stages.find((s) => s.key === key);
}

// Which stages does this persona appear in?
//
// Suzie is special-cased. She is the centre of the loop, not a stage; her
// "story" is that the entire loop runs for her benefit. So her driver list
// is every stage.
export function stagesForPersona(slug: PersonaSlug): {
  driver: StageKey[];
  cameo: StageKey[];
} {
  if (slug === 'suzie') {
    return { driver: stages.map((s) => s.key), cameo: [] };
  }
  const driver: StageKey[] = [];
  const cameo: StageKey[] = [];
  for (const stage of stages) {
    const personaActors = stage.actors.filter(
      (a): a is Extract<Actor, { kind: 'persona' }> => a.kind === 'persona'
    );
    const idx = personaActors.findIndex((a) => a.slug === slug);
    if (idx === 0) driver.push(stage.key);
    else if (idx > 0) cameo.push(stage.key);
  }
  return { driver, cameo };
}
