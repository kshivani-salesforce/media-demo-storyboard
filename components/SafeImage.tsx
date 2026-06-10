'use client';

import { useState } from 'react';

// Plain <img> with a graceful fallback when the file is missing. Handy
// while persona photos and storyboard frames are still being captured.
// Lives in a Client Component because Server Components can't pass
// `onError` to a DOM element.
export function SafeImage({
  src,
  alt,
  className,
  style
}: {
  src: string;
  alt: string;
  className?: string;
  // Inline style escape hatch. Use this for object-position so per-photo
  // crop coordinates can be threaded through from data without minting a
  // bespoke Tailwind utility per persona.
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
