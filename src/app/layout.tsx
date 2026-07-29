import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { GSAPCinematicScroll } from '@/components/animation/GSAPCinematicScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://skovento.com'),
  title: "Skovento — We Don't Just Build Websites. We Build Businesses That Grow.",
  description: 'Custom websites and result-driven digital marketing designed to help startups and businesses attract more customers, generate quality leads, and grow online.',
  keywords: ['Web Development', 'Digital Marketing', 'Next.js Agency', 'SEO Services', 'UI/UX Design', 'E-commerce Development', 'PPC Google Ads', 'Skovento'],
  icons: {
    icon: '/final-icon.png',
    shortcut: '/final-icon.png',
    apple: '/final-icon.png'
  },
  openGraph: {
    title: "Skovento — We Don't Just Build Websites. We Build Businesses That Grow.",
    description: 'Custom websites and result-driven digital marketing designed to help startups and businesses grow online.',
    url: 'https://skovento.com',
    siteName: 'Skovento',
    images: [
      {
        url: '/skovento-transparent.png',
        width: 1200,
        height: 630,
        alt: 'Skovento Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-[#8A2B88]/20 selection:text-[#16203D]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/final-icon.png" />
        <link rel="apple-touch-icon" href="/final-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#424965] font-sans overflow-x-hidden">
        <LenisProvider>
          <GSAPCinematicScroll>
            <CustomCursor />
            {children}
          </GSAPCinematicScroll>
        </LenisProvider>
      </body>
    </html>
  );
}
