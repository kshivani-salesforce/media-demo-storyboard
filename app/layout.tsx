import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ad Sales in an Agentic Enterprise · Salesforce + Nine',
  description:
    'Storyboard surface for the Salesforce + Nine Ad Sales narrative: personas and the campaign lifecycle, in an agentic enterprise.'
};

// Applies the persisted theme before first paint to avoid a flash. Defaults to
// dark (the storyboard's established look); only an explicit 'light' choice in
// localStorage opens light. Kept in sync with components/ThemeToggle.tsx.
const themeInit = `(function(){try{var t=localStorage.getItem('nine-theme');var d=t!=='light';var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Typeface matched to the agentic-ad-sales-specs storyboard: Inter for
  // display + body (weights to 800 for heavy headlines) + JetBrains Mono for
  // the mono "receipts". Inter is wider and more open than DM Sans, so the
  // copy no longer reads squished.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
