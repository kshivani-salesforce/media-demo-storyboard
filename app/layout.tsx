import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ad Sales in an Agentic Enterprise · Salesforce + Nine',
  description:
    'Storyboard surface for the Salesforce + Nine Ad Sales narrative: personas and the campaign lifecycle, in an agentic enterprise.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Editorial pairing: Instrument Serif (display) + DM Sans (body). Picked
  // deliberately to avoid the generic Inter / Plus Jakarta Sans / Space
  // Grotesk look that signals AI-generated product pages.
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
