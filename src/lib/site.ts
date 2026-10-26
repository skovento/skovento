import type { Metadata } from 'next';
import type { Settings } from '@/types/content';

/** Indexing is OFF unless the admin enables it AND the FORCE_NOINDEX kill switch is not set. */
export const isIndexable = (s: Settings): boolean =>
  s.seo.allowIndexing === true && process.env.FORCE_NOINDEX !== 'true';

export const siteUrl = (s: Settings): string =>
  (process.env.NEXT_PUBLIC_SITE_URL || s.url || 'http://localhost:3000').replace(/\/$/, '');

export const absoluteUrl = (s: Settings, path = '/'): string => `${siteUrl(s)}${path.startsWith('/') ? path : `/${path}`}`;

export const robotsMeta = (s: Settings): NonNullable<Metadata['robots']> =>
  isIndexable(s)
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } }
    : {
        index: false, follow: false, nocache: true, noarchive: true, nosnippet: true, noimageindex: true,
        googleBot: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
      };

interface PageMetaInput { title: string; description: string; path: string; settings: Settings; type?: 'website' | 'article'; image?: string }

/** Per-page metadata: title, description, canonical, social cards and robots. */
export function pageMetadata({ title, description: rawDescription, path, settings, type = 'website', image }: PageMetaInput): Metadata {
  const ogImage = image || settings.seo.defaultOgImage;
  const url = absoluteUrl(settings, path);
  const branded = settings.seo.titleTemplate.replace('%s', title);
  // Keep titles within ~60 characters (search results cut longer ones): drop the brand suffix when needed
  const fullTitle = path === '/' ? title : branded.length <= 60 ? branded : title;
  const description = fitDescription(rawDescription, settings);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url, ...(path === '/blog' ? { types: { 'application/rss+xml': absoluteUrl(settings, '/blog/rss.xml') } } : {}) },
    robots: robotsMeta(settings),
    openGraph: {
      title: fullTitle, description, url, siteName: settings.siteName, type, locale: settings.locale.replace('-', '_'),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, ...(ogImage ? { images: [ogImage] } : {}) },
  };
}

/** Meta descriptions read best at ~110–160 characters: pad very short ones, trim long ones at a word boundary. */
export function fitDescription(text: string, settings: Settings): string {
  let d = text.replace(/\s+/g, ' ').trim();
  if (d.length < 110) d = `${d.replace(/[.!?]$/, '')}. ${settings.siteName} builds reliable software for growing businesses.`;
  if (d.length > 160) {
    d = d.slice(0, 157);
    d = `${d.slice(0, d.lastIndexOf(' ')).replace(/[,;:\-–—]$/, '')}…`;
  }
  return d;
}

export const whatsappHref = (s: Settings): string | null => {
  const n = s.contact.whatsapp.replace(/\D/g, '');
  return n ? `https://wa.me/${n}` : null;
};

export const socialLinks = (s: Settings): { label: string; href: string }[] =>
  Object.entries(s.socials)
    .filter(([, v]) => !!v)
    .map(([k, v]) => ({ label: k === 'x' ? 'X' : k[0].toUpperCase() + k.slice(1), href: v }));

export const locationLabel = (s: Settings): string =>
  [s.contact.city, s.contact.region, s.contact.country].filter(Boolean).join(', ');
