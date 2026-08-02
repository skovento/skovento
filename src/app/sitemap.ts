import type { MetadataRoute } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/site-config';
import { servicesData } from '@/data/services';
import { caseStudiesData } from '@/data/case-studies';

/**
 * Sitemap — previously /sitemap.xml returned 404, which meant neither Google
 * nor any AI crawler had a map of the site's ~20 URLs.
 *
 * Next.js serves this at /sitemap.xml automatically. It is referenced from
 * app/robots.ts so crawlers discover it without manual submission (though you
 * should still submit it once in Google Search Console).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/process', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  ];

  // Pricing is gated behind siteConfig.publishPricing — don't advertise a
  // route to crawlers that isn't live yet.
  if (siteConfig.publishPricing) {
    staticRoutes.push({ path: '/pricing', priority: 0.9, changeFrequency: 'monthly' });
  }

  const serviceRoutes = servicesData.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const workRoutes = caseStudiesData.map((study) => ({
    url: absoluteUrl(`/work/${study.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
    ...workRoutes,
  ];
}
