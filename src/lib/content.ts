import { getSingleDoc, listDocs } from '@/lib/cms/store';
import type {
  AboutContent, BlogPost, CaseStudy, ContactContent, HomeContent, Industry, Project,
  Service, ServiceCategory, Settings, TechGroup,
} from '@/types/content';

/**
 * Public content layer. Everything the website shows comes from the admin panel's store
 * (see src/lib/cms). Until something is edited there, the starter content in /content is used.
 */

const byOrder = <T extends { order?: number }>(list: T[]): T[] => [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const arr = <T>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);
const clean = (list: string[] | undefined) => arr(list).map((s) => s.trim()).filter(Boolean);

export async function getSettings(): Promise<Settings> {
  return getSingleDoc<Settings>('settings');
}
export async function getHome(): Promise<HomeContent> {
  return getSingleDoc<HomeContent>('home');
}
export async function getAbout(): Promise<AboutContent> {
  return getSingleDoc<AboutContent>('about');
}
export async function getContactPage(): Promise<ContactContent> {
  return getSingleDoc<ContactContent>('contact');
}
export async function getLegal(slug: 'privacy' | 'terms'): Promise<{ title: string; body: string }> {
  const d = await getSingleDoc<{ privacy: string; terms: string }>('legal');
  return { title: slug === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions', body: d[slug] ?? '' };
}

// ------------------------------------------------------------------ services

type RawCategory = { id: string; title: string; icon?: string; summary?: string; description?: string; order?: number };
type RawService = { id: string; categorySlug: string; title: string; summary?: string; description?: string; deliverables?: string[]; techs?: string[]; faqs?: { q: string; a: string }[]; order?: number };

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const [cats, svcs] = await Promise.all([listDocs<RawCategory & { id: string }>('service-categories'), listDocs<RawService & { id: string }>('services')]);
  return byOrder(cats).map((c) => ({
    slug: c.id, title: c.title, icon: c.icon || 'Layers', summary: c.summary ?? '', description: c.description ?? '',
    services: byOrder(svcs.filter((s) => s.categorySlug === c.id)).map((s) => ({
      slug: s.id, title: s.title, summary: s.summary ?? '', description: s.description ?? '',
      deliverables: clean(s.deliverables), techs: clean(s.techs), faqs: arr(s.faqs).filter((f) => f.q && f.a),
    })),
  }));
}

export async function getAllServices(): Promise<Service[]> {
  const cats = await getServiceCategories();
  return cats.flatMap((c) => c.services.map((s) => ({ ...s, categorySlug: c.slug, categoryTitle: c.title })));
}

// ---------------------------------------------------------------- industries

export async function getIndustries(): Promise<Industry[]> {
  const d = await listDocs<Industry & { id: string; order?: number }>('industries');
  return byOrder(d).map((i) => ({
    slug: i.id, title: i.title, icon: i.icon || 'Briefcase', summary: i.summary ?? '',
    challenges: clean(i.challenges), solutions: clean(i.solutions), relatedServices: arr(i.relatedServices),
    image: i.image || undefined, imageAlt: i.imageAlt || i.title,
  }));
}

export async function getTechGroups(): Promise<TechGroup[]> {
  const d = await listDocs<TechGroup & { id: string; order?: number }>('technologies');
  return byOrder(d).map((g) => ({ group: g.group, description: g.description ?? '', items: clean(g.items) }));
}

// ---------------------------------------------------- projects / case studies

export async function getProjects(): Promise<Project[]> {
  const d = await listDocs<Project & { id: string; order?: number }>('projects');
  return byOrder(d).map((p) => ({
    slug: p.id, title: p.title, industry: p.industry ?? '', services: arr(p.services), summary: p.summary ?? '',
    description: p.description ?? '', techs: clean(p.techs), highlights: clean(p.highlights),
    isSample: p.isSample !== false, coverImage: p.coverImage || undefined, coverAlt: p.coverAlt || p.title,
  }));
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const d = await listDocs<CaseStudy & { id: string; order?: number }>('case-studies');
  return byOrder(d).map((c) => ({
    slug: c.id, title: c.title, client: c.client ?? '', industry: c.industry ?? '', services: arr(c.services),
    summary: c.summary ?? '', challenge: c.challenge ?? '', solution: c.solution ?? '',
    results: arr(c.results).filter((r) => r.label), techs: clean(c.techs), isSample: c.isSample !== false,
    coverImage: c.coverImage || undefined, coverAlt: c.coverAlt || c.title,
  }));
}

// --------------------------------------------------------------------- blogs

export async function getBlogs(): Promise<BlogPost[]> {
  const d = await listDocs<BlogPost & { id: string; published?: boolean }>('blogs');
  return d
    .filter((b) => b.published !== false)
    .map((b) => ({
      slug: b.id, title: b.title, category: b.category ?? '', excerpt: b.excerpt ?? '', publishedAt: b.publishedAt ?? '',
      readingMinutes: b.readingMinutes || 5, tags: clean(b.tags), body: b.body ?? '', coverImage: b.coverImage || undefined, coverAlt: b.coverAlt || b.title,
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlog(slug: string) {
  return (await getBlogs()).find((b) => b.slug === slug);
}
