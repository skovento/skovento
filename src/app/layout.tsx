import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { getSettings } from '@/lib/content';
import { robotsMeta, siteUrl } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--f-inter' });
const display = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--f-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--f-mono' });

export const viewport: Viewport = { themeColor: '#060a13', colorScheme: 'dark' };

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(siteUrl(s)),
    title: { default: `${s.siteName} — ${s.tagline}`, template: s.seo.titleTemplate },
    description: s.description,
    applicationName: s.siteName,
    robots: robotsMeta(s),
    verification: {
      ...(s.tracking.googleSiteVerification ? { google: s.tracking.googleSiteVerification } : {}),
      ...(s.tracking.bingSiteVerification ? { other: { 'msvalidate.01': s.tracking.bingSiteVerification } } : {}),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
