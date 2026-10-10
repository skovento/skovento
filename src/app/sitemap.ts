import type { MetadataRoute } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/site-config';
import { servicesData } from '@/data/services';
import { caseStudiesData } from '@/data/case-studies';

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
    { path: '/process', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  if (siteConfig.publishPricing) {
    staticRoutes.push({ path: '/pricing', priority: 0.7, changeFrequency: 'monthly' });
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
    priority: 0.7,
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
