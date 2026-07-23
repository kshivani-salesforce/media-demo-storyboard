// The cast. Three people, introduced inline in the story spine (lib/story.ts)
// the first time each one enters, so the room meets them in context rather
// than through a grid up front.
//
// Nothing here references object names, IDs, or agent versions. Story numbers
// are story numbers, not wire facts.

import type { StickerKey } from '@/components/StickerIcon';

export type PersonaSlug = 'mark' | 'suzie' | 'cindy';

export type Persona = {
  slug: PersonaSlug;
  name: string;
  // Title as their customer would describe them.
  role: string;
  // /public/personas/<slug>.jpg
  photo: string;
  // CSS object-position, hand-tuned per photo so the face lands in the visible
  // window (source photos are wide crops with the subject off-centre).
  photoFocus: string;
  // 3D bubble icon that signals which Cloud their day lives in.
  sticker: StickerKey;
  // The one line said when they first walk into the story. Who they are and
  // why the room should care, in a sentence.
  entryLine: string;
};

export const personas: Record<PersonaSlug, Persona> = {
  mark: {
    slug: 'mark',
    name: 'Mark',
    role: 'Ad Sales Rep · Nine',
    photo: '/personas/mark.jpg',
    photoFocus: '68% 28%',
    sticker: 'media',
    entryLine:
      "Mark sells media for Nine. He carries the relationship, the number, and every deal in his book. The demo is his day."
  },
  suzie: {
    slug: 'suzie',
    name: 'Suzie',
    role: 'Advertiser',
    photo: '/personas/suzie.jpg',
    photoFocus: '75% 28%',
    sticker: 'slack-3d',
    entryLine:
      "Suzie is the advertiser. She runs paid media for the apparel brand, carries the campaign to her board, and reads every conversation as a promise. She stays because Mark keeps them."
  },
  cindy: {
    slug: 'cindy',
    name: 'Cindy',
    role: 'Ad Ops · Finance · Nine',
    photo: '/personas/cindy.jpg',
    photoFocus: '30% 30%',
    sticker: 'agentforce',
    entryLine:
      "Cindy answers for what was sold once it goes live. When a campaign drifts off-pace, she is the one who has to explain it, so she wants to know first."
  }
};

export function findPersona(slug: string): Persona | undefined {
  return personas[slug as PersonaSlug];
}
