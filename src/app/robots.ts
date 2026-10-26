import type { MetadataRoute } from 'next';
import { getSettings } from '@/lib/content';
import { absoluteUrl, isIndexable } from '@/lib/site';

/**
 * While indexing is OFF (the default), every crawler is told to stay away.
 * Indexing is switched on from the admin panel: Site Settings → SEO → Allow indexing.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const s = await getSettings();
  if (!isIndexable(s)) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }],
    sitemap: absoluteUrl(s, '/sitemap.xml'),
  };
}
