// Coral to peach to cobalt gradient text. The highlight phrase treatment
// from the Agentforce help-centre references ("every channel", "whole
// hospitality journey"). Inline-block + transparent text + bg-clip-text is
// the trick.
export function GradientText({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-sf-highlight bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
