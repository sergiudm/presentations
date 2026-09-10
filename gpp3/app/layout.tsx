import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Recursive Self-improvement in Agent Harness',
  description: 'An academic presentation on agent harnesses, recursive improvement, DGM, and Hyperagents.',
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: `(function(){var t='light';try{if(localStorage.getItem('agent-harness-theme')==='dark')t='dark'}catch(e){}document.documentElement.dataset.theme=t})()`}}/></head><body>{children}</body></html>;
}
