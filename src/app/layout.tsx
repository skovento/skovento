import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { GSAPCinematicScroll } from '@/components/animation/GSAPCinematicScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://skovento.com'),
  title: "Skovento — We Don't Just Build Websites. We Build Businesses That Grow.",
  description: 'Custom websites and result-driven digital marketing designed to help startups and businesses attract more customers, generate quality leads, and grow online.',
  keywords: ['Web Development', 'Digital Marketing', 'Next.js Agency', 'SEO Services', 'UI/UX Design', 'E-commerce Development', 'PPC Google Ads', 'Skovento'],
  openGraph: {
    title: "Skovento — We Don't Just Build Websites. We Build Businesses That Grow.",
    description: 'Custom websites and result-driven digital marketing designed to help startups and businesses grow online.',
    url: 'https://skovento.com',
    siteName: 'Skovento',
    images: [
      {
        url: '/skovento-transparent.png',
        width: 1376,
        height: 768,
        alt: 'Skovento Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  verification: {
    google: 'QlCQk-VUx4aBkjMUomqY8yOejCS7gbQmrG_om1zUDTM'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased selection:bg-[#8A2B88]/20 selection:text-[#16203D] ${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#424965] font-sans overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ3MJNT7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQ3MJNT7');`,
          }}
        />

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
