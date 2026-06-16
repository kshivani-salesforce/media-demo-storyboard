import { SafeImage } from './SafeImage';

// Co-brand lockup: Salesforce + Nine, then the demo title. Both logos carry
// transparency and sit blue-on-dark, so no background chip is needed. The
// title is set in the display serif to stay in the editorial voice.
//
// `size` controls the mark height. `showTitle` lets the nav show the full
// "Salesforce + Nine — Ad Sales in an Agentic Enterprise" lockup while
// tighter placements (e.g. a page corner) can show the logos alone.
export function BrandLockup({
  size = 'md',
  showTitle = true,
  className = ''
}: {
  size?: 'sm' | 'md';
  showTitle?: boolean;
  className?: string;
}) {
  const logoH = size === 'sm' ? 'h-6' : 'h-7';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SafeImage
        src="/icons/salesforce-cloud-logo.svg"
        alt="Salesforce"
        className={`${logoH} w-auto opacity-95`}
      />
      <span className="h-6 w-px bg-dark-border" aria-hidden />
      <SafeImage
        src="/icons/nine-logo.png"
        alt="Nine"
        className={`${logoH} w-auto opacity-95`}
      />
      {showTitle && (
        <>
          <span className="hidden h-6 w-px bg-dark-border sm:block" aria-hidden />
          <span className="hidden font-display text-sm font-semibold tracking-wide text-dark-ink sm:block">
            Ad Sales in an Agentic Enterprise
          </span>
        </>
      )}
    </div>
  );
}
