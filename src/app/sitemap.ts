import type { MetadataRoute } from 'next';
import { getAllServices, getBlogs, getCaseStudies, getIndustries, getProjects, getServiceCategories, getSettings } from '@/lib/content';
import { absoluteUrl, isIndexable } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const s = await getSettings();
  // Nothing is advertised while the site is hidden from search engines.
  if (!isIndexable(s)) return [];

  const [cats, services, industries, projects, cases, posts] = await Promise.all([
    getServiceCategories(), getAllServices(), getIndustries(), getProjects(), getCaseStudies(), getBlogs(),
  ]);
  const u = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(s, path), priority, ...(lastModified ? { lastModified } : {}),
  });

  return [
    u('/', 1),
    ...['/technologies', '/services', '/industries', '/projects', '/case-studies', '/blog', '/about', '/contact'].map((p) => u(p, 0.8)),
    ...cats.map((c) => u(`/services/${c.slug}`, 0.8)),
    ...services.map((x) => u(`/services/${x.categorySlug}/${x.slug}`, 0.7)),
    ...industries.map((i) => u(`/industries/${i.slug}`, 0.7)),
    ...projects.map((p) => u(`/projects/${p.slug}`, 0.6)),
    ...cases.map((c) => u(`/case-studies/${c.slug}`, 0.6)),
    ...posts.map((b) => u(`/blog/${b.slug}`, 0.6, b.publishedAt)),
    u('/privacy', 0.2),
    u('/terms', 0.2),
  ];
}
