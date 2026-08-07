// Runtime config for the storyboard's outward-facing bits that get swapped
// per demo. Kept out of the content modules so the video source (the tracked
// Consensus link) can be changed in one place.

// The recorded end-to-end demo.
//
// `consensusUrl` is the tracked share link: when a viewer opens it, Consensus
// captures who watched and for how long (Demolytics / Buyer Signals). That is
// why the play button opens the link rather than embedding an iframe: an
// embedded public-link player only yields aggregate signal, whereas the direct
// link (or a per-recipient Merge Link) carries named-viewer attribution.
//
// While `consensusUrl` is the placeholder sentinel below, the player falls back
// to the bundled local MP4, so the storyboard still works offline and on the
// day. Fill it from Consensus: Share -> Public Link (or a Merge Link /
// DemoBoard for named attribution).
export const CONSENSUS_PLACEHOLDER = 'CONSENSUS_LINK_PENDING';

export const demoVideo = {
  // The tracked Consensus share link. The fn/ln/em/co/jt/do query params are
  // Consensus viewer-identity fields left blank ('-'); the player prompts the
  // viewer, and Demolytics attributes the session.
  consensusUrl:
    'https://play.goconsensus.com/s868ebd5c?fn=-&ln=-&em=-&co=-&jt=-&do=-',
  // Local offline fallback. Drop the recorded file here as
  // public/storyboards/nine-demo.mp4.
  fallbackSrc: '/storyboards/nine-demo.mp4',
  // Poster frame shown before play.
  poster: '/storyboards/nine-demo-poster.jpg',
  title: 'The recorded demo, end to end',
  subtitle: 'One deal, from brief to booked, on one platform'
};

// True while no real Consensus link is set. The video component reads this to
// decide whether the play button opens the tracked link or plays the local
// MP4 inline.
export const consensusReady = demoVideo.consensusUrl !== CONSENSUS_PLACEHOLDER;
