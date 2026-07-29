import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';

export const metadata: Metadata = {
  title: 'Skovento — Full-Service Digital Partner | Web Development & Marketing',
  description: 'Skovento combines custom web development and digital marketing to build, launch, and grow high-performing digital brands worldwide.',
  keywords: ['Web Development', 'Digital Marketing', 'Next.js Agency', 'SEO Services', 'UI/UX Design', 'E-commerce Development', 'PPC Google Ads', 'Skovento'],
  openGraph: {
    title: 'Skovento — Full-Service Digital Partner',
    description: 'Build. Launch. Grow. All under one roof.',
    url: 'https://skovento.com',
    siteName: 'Skovento',
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
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#424965] font-sans overflow-x-hidden">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
