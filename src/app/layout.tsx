import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';
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

const TITLE = 'Skovento — Digital Solutions Studio';
const DESCRIPTION =
  'We design and develop modern websites, web applications and digital tools for businesses. Skovento is an independent digital solutions brand based in India.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: '%s | Skovento'
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  keywords: [
    'digital solutions',
    'web development',
    'business websites',
    'web applications',
    'booking systems',
    'technical seo',
    'generative engine optimization',
    'Skovento'
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
    <html lang={siteConfig.locale} className={`h-full antialiased selection:bg-indigo-100 selection:text-[#16203D] ${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <JsonLd data={baseGraph()} />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#424965] font-sans overflow-x-hidden relative">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ3MJNT7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
          <div className="relative z-10">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
