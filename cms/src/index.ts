import fs from 'fs';
import path from 'path';

const READ_TYPES = [
  'service-category',
  'service',
  'industry',
  'technology-group',
  'project',
  'case-study',
  'blog-post',
  'legal-page',
  'site-setting',
  'home-page',
  'about-page',
  'contact-page',
];

const readJson = (file: string) => {
  const p = path.join(process.cwd(), '..', 'content', file);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};

const items = (arr: string[] = []) => arr.map((text) => ({ text }));
const faqs = (arr: { q: string; a: string }[] = []) => arr.map((f) => ({ question: f.q, answer: f.a }));

async function seed(strapi: any) {
  const docs = (uid: string) => strapi.documents(uid);
  const existing = await docs('api::site-setting.site-setting').findFirst();
  if (existing) return;

  strapi.log.info('[seed] Empty CMS detected - importing starter content from /content');

  const settings = readJson('settings.json');
  const pages = readJson('pages.json');
  const services = readJson('services.json');
  const industries = readJson('industries.json');
  const technologies = readJson('technologies.json');
  const projects = readJson('projects.json');
  const caseStudies = readJson('case-studies.json');
  const blogs = readJson('blogs.json');

  await docs('api::site-setting.site-setting').create({
    data: {
      siteName: settings.siteName,
      tagline: settings.tagline,
      description: settings.description,
      legalEntityName: settings.legalEntityName,
      foundingYear: settings.foundingYear,
      contact: settings.contact,
      socials: settings.socials,
      seo: { allowIndexing: false, titleTemplate: settings.seo.titleTemplate },
      tracking: settings.tracking,
      cta: settings.cta,
      nav: settings.nav,
      footerTagline: settings.footerTagline,
    },
  });

  const h = pages.home;
  await docs('api::home-page.home-page').create({
    data: {
      eyebrow: h.hero.eyebrow,
      titleLead: h.hero.titleLead,
      titleHighlight: h.hero.titleHighlight,
      subtitle: h.hero.subtitle,
      terminalLines: items(h.hero.terminalLines),
      stats: h.stats,
      pillars: h.pillars,
      process: h.process,
      faqs: faqs(h.faqs),
    },
  });
  const a = pages.about;
  await docs('api::about-page.about-page').create({
    data: {
      headline: a.headline, intro: a.intro, mission: a.mission, vision: a.vision, story: a.story,
      values: a.values, differentiators: a.differentiators, facts: a.facts,
    },
  });
  const c = pages.contact;
  await docs('api::contact-page.contact-page').create({
    data: {
      headline: c.headline, intro: c.intro,
      serviceOptions: items(c.serviceOptions), budgetOptions: items(c.budgetOptions),
    },
  });
  await docs('api::legal-page.legal-page').create({ data: { title: 'Privacy Policy', slug: 'privacy', body: pages.legal.privacy } });
  await docs('api::legal-page.legal-page').create({ data: { title: 'Terms & Conditions', slug: 'terms', body: pages.legal.terms } });

  // service categories + services
  const serviceDocId: Record<string, string> = {};
  let ci = 0;
  for (const cat of services) {
    const created = await docs('api::service-category.service-category').create({
      data: { title: cat.title, slug: cat.slug, icon: cat.icon, summary: cat.summary, description: cat.description, order: ci++ },
    });
    let si = 0;
    for (const s of cat.services) {
      const svc = await docs('api::service.service').create({
        data: {
          title: s.title, slug: s.slug, summary: s.summary, description: s.description,
          deliverables: items(s.deliverables), techs: items(s.techs), faqs: faqs(s.faqs),
          category: created.documentId, order: si++,
        },
      });
      serviceDocId[s.slug] = svc.documentId;
    }
  }
  const connect = (slugs: string[] = []) => slugs.map((s) => serviceDocId[s]).filter(Boolean);

  const industryDocId: Record<string, string> = {};
  let ii = 0;
  for (const ind of industries) {
    const created = await docs('api::industry.industry').create({
      data: {
        title: ind.title, slug: ind.slug, icon: ind.icon, summary: ind.summary,
        challenges: items(ind.challenges), solutions: items(ind.solutions),
        relatedServices: connect(ind.relatedServices), order: ii++,
      },
    });
    industryDocId[ind.slug] = created.documentId;
  }

  let ti = 0;
  for (const g of technologies) {
    await docs('api::technology-group.technology-group').create({
      data: { group: g.group, description: g.description, items: items(g.items), order: ti++ },
    });
  }

  let pi = 0;
  for (const p of projects) {
    await docs('api::project.project').create({
      data: {
        title: p.title, slug: p.slug, summary: p.summary, description: p.description,
        techs: items(p.techs), highlights: items(p.highlights), isSample: p.isSample,
        industry: industryDocId[p.industry], services: connect(p.services), order: pi++,
      },
    });
  }
  let qi = 0;
  for (const cs of caseStudies) {
    await docs('api::case-study.case-study').create({
      data: {
        title: cs.title, slug: cs.slug, client: cs.client, summary: cs.summary,
        challenge: cs.challenge, solution: cs.solution, results: cs.results,
        techs: items(cs.techs), isSample: cs.isSample,
        industry: industryDocId[cs.industry], services: connect(cs.services), order: qi++,
      },
    });
  }
  for (const b of blogs) {
    await docs('api::blog-post.blog-post').create({
      data: {
        title: b.title, slug: b.slug, excerpt: b.excerpt, body: b.body, category: b.category,
        tags: items(b.tags), publishedOn: b.publishedAt, readingMinutes: b.readingMinutes,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] Starter content imported');
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    // Public (website) role: read-only content + lead creation
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
      if (publicRole) {
        const actions = [
          ...READ_TYPES.flatMap((t) => [`api::${t}.${t}.find`, `api::${t}.${t}.findOne`]),
        ];
        for (const action of actions) {
          const exists = await strapi.query('plugin::users-permissions.permission').findOne({ where: { role: publicRole.id, action } });
          if (!exists) {
            await strapi.query('plugin::users-permissions.permission').create({ data: { role: publicRole.id, action } });
          }
        }
      }
    } catch (err) {
      strapi.log.warn(`[bootstrap] permission setup skipped: ${(err as Error).message}`);
    }

    // Server-side token the website uses to save leads (never exposed publicly)
    try {
      const tokenService = strapi.service('admin::api-token');
      const found = await tokenService.getByName('website-leads');
      if (!found) {
        const created = await tokenService.create({
          name: 'website-leads',
          description: 'Used by the Next.js contact form to save enquiries',
          type: 'custom',
          lifespan: null,
          permissions: ['api::lead.lead.create'],
        });
        const out = path.join(process.cwd(), '.tmp');
        fs.mkdirSync(out, { recursive: true });
        fs.writeFileSync(path.join(out, 'website-leads-token.txt'), created.accessKey);
        strapi.log.info('[bootstrap] Created API token "website-leads" -> cms/.tmp/website-leads-token.txt (set as STRAPI_API_TOKEN in the website env)');
      }
    } catch (err) {
      strapi.log.warn(`[bootstrap] api token setup skipped: ${(err as Error).message}`);
    }

    try {
      await seed(strapi);
    } catch (err) {
      strapi.log.error(`[seed] failed: ${(err as Error).stack || err}`);
    }
  },
};
