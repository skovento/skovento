import { getSettings } from '@/lib/content';
import { baseGraph } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Tracking } from '@/components/seo/Tracking';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const gtm = settings.tracking.gtmId.replace(/[^\w-]/g, '');
  return (
    <>
      {gtm && (
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="gtm" />
        </noscript>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-base">
        Skip to content
      </a>
      <Navbar settings={settings} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
      <JsonLd data={baseGraph(settings)} />
      <Tracking t={settings.tracking} />
    </>
  );
}
