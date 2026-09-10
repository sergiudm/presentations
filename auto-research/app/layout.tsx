import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://auto-research-systems-deck.sergiudm.chatgpt.site'),
  title: 'Auto-Research Systems — Web Presentation',
  description: 'A widescreen interactive presentation about AI systems that perform research tasks.',
  openGraph: {
    title: 'Auto-Research Systems',
    description: 'What happens when AI starts doing research?',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Auto-Research Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-Research Systems',
    description: 'What happens when AI starts doing research?',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
