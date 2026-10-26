import settingsJson from '../../../content/settings.json';
import pagesJson from '../../../content/pages.json';
import servicesJson from '../../../content/services.json';
import industriesJson from '../../../content/industries.json';
import technologiesJson from '../../../content/technologies.json';
import projectsJson from '../../../content/projects.json';
import caseStudiesJson from '../../../content/case-studies.json';
import blogsJson from '../../../content/blogs.json';

/**
 * Starter content. The admin panel shows (and edits) these until something is saved;
 * the first save of a collection copies them into the database so nothing is lost.
 */

export type Doc = { id: string; [k: string]: unknown };

const withOrder = <T extends object>(list: T[]) => list.map((x, i) => ({ ...x, order: i }));

const categories = servicesJson.map((c, i) => ({
  id: c.slug, title: c.title, icon: c.icon, summary: c.summary, description: c.description, order: i,
}));

const services = servicesJson.flatMap((c) =>
  c.services.map((s, i) => ({ id: s.slug, categorySlug: c.slug, ...s, order: i })),
).map(({ slug: _slug, ...rest }) => rest);

export const defaultCollections: Record<string, Doc[]> = {
  'service-categories': categories,
  services: services as Doc[],
  industries: withOrder(industriesJson).map(({ slug, ...r }) => ({ id: slug, ...r })),
  technologies: withOrder(technologiesJson).map((g) => ({ id: g.group.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), ...g })),
  projects: withOrder(projectsJson).map(({ slug, ...r }) => ({ id: slug, ...r })),
  'case-studies': withOrder(caseStudiesJson).map(({ slug, ...r }) => ({ id: slug, ...r })),
  blogs: blogsJson.map(({ slug, ...r }) => ({ id: slug, published: true, ...r })),
  leads: [],
};

export const defaultSingles: Record<string, Record<string, unknown>> = {
  settings: settingsJson,
  home: { hero: pagesJson.home.hero, stats: pagesJson.home.stats, pillars: pagesJson.home.pillars, process: pagesJson.home.process, faqs: pagesJson.home.faqs },
  about: pagesJson.about,
  contact: pagesJson.contact,
  legal: pagesJson.legal,
};
