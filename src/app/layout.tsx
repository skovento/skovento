import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { GSAPCinematicScroll } from '@/components/animation/GSAPCinematicScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { JsonLd } from '@/components/seo/JsonLd';
import { baseGraph } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

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

/**
 * Title is 56 characters — under the ~60 char point where Google truncates.
 * The previous title was 71 and was being cut off in results.
 *
 * The description leads with the entity and the specific capability rather than
 * a slogan, because this string is frequently what an AI engine quotes when
 * asked "what is Skovento?".
 */
const TITLE = 'Skovento — 3D Animated Website Design & Growth';
const DESCRIPTION =
  'Skovento builds 3D scroll-animated, server-rendered websites on Next.js, GSAP and Three.js for D2C brands, cafes and clinics in India — with a written performance guarantee: LCP under 2.5s on 4G.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: '%s | Skovento'
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  keywords: [
    '3d animated website',
    'website design india',
    'web design agency india',
    'nextjs development company',
    'threejs website',
    'scroll animation website',
    'ecommerce website development india',
    'technical seo',
    'generative engine optimization',
    'Skovento'
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // Self-referencing canonical. Child routes override this with their own path.
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/skovento-transparent.png',
        width: 1376,
        height: 768,
        alt: 'Skovento — web design and growth studio'
      }
    ],
    // en_IN, not en_US — this site sells to Indian businesses.
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/skovento-transparent.png']
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
    <html lang={siteConfig.locale} className={`h-full antialiased selection:bg-[#8A2B88]/20 selection:text-[#16203D] ${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/*
          Organization + WebSite structured data, emitted on every page.
          Rendered as a plain <script> in the server response so that crawlers
          which do not execute JavaScript (GPTBot, ClaudeBot, PerplexityBot)
          can still read it. See components/seo/JsonLd.tsx.
        */}
        <JsonLd data={baseGraph()} />
      </head>
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
