'use client';

import { useState } from 'react';
import { demoVideo, consensusReady } from '@/lib/config';
import { SafeImage } from './SafeImage';

// The recorded demo, as a bare player frame (poster + play button, no
// surrounding heading) so it can embed directly under the landing hero.
//
// When a real Consensus link is set (lib/config.ts), the play button opens it
// in a new tab, so Consensus captures who watched and for how long. Until then
// (or offline) it plays the bundled local MP4 inline. `consensusReady` chooses
// the path; the poster and copy are identical either way.
//
// The poster (the ad-sales command-centre frame) is 1108x720, so the frame is
// 16:9.
export function DemoPlayer({ className = '' }: { className?: string }) {
  const [playingLocal, setPlayingLocal] = useState(false);

  const onPlay = () => {
    if (consensusReady) {
      window.open(demoVideo.consensusUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setPlayingLocal(true);
  };

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-sf-cobaltDeep shadow-editorial ${
        className || 'ring-1 ring-dark-border'
      }`}
    >
      <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
        {playingLocal ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={demoVideo.fallbackSrc}
            poster={demoVideo.poster}
            controls
            autoPlay
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${demoVideo.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <SafeImage
              src={demoVideo.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Shade for legibility of the play control + caption. */}
            <span className="absolute inset-0 bg-sf-cobaltDeep/30 transition group-hover:bg-sf-cobaltDeep/20" />
            {/* Play button */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-phos-500 text-white shadow-lg shadow-phos-500/40 transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            {/* Caption */}
            <span className="absolute bottom-4 left-5 flex flex-col text-left">
              <span className="font-display text-base font-semibold text-white">
                {demoVideo.title}
              </span>
              <span className="eyebrow mt-1 text-white/70">
                {consensusReady
                  ? 'Opens the demo in a new tab'
                  : 'Plays the recorded walkthrough'}
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
