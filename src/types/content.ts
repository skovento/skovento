export interface Faq { q: string; a: string }
export interface NavLink { label: string; href: string }

export interface Settings {
  siteName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  legalEntityName: string;
  foundingYear: string;
  contact: {
    email: string; phone: string; whatsapp: string; city: string; region: string;
    country: string; addressLine: string; hours: string;
  };
  socials: { linkedin: string; x: string; instagram: string; github: string; youtube: string };
  seo: { allowIndexing: boolean; titleTemplate: string; defaultOgImage: string };
  tracking: {
    gtmId: string; ga4Id: string; googleSiteVerification: string; bingSiteVerification: string;
    metaPixelId: string; clarityId: string; customHeadScript: string;
  };
  cta: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
  nav: NavLink[];
  footerTagline: string;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  techs: string[];
  faqs: Faq[];
  categorySlug: string;
  categoryTitle: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  services: Omit<Service, 'categorySlug' | 'categoryTitle'>[];
}

export interface Industry {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  challenges: string[];
  solutions: string[];
  relatedServices: string[];
  image?: string;
  imageAlt?: string;
}

export interface TechGroup { group: string; description: string; items: string[] }

export interface Project {
  slug: string;
  title: string;
  industry: string;
  services: string[];
  summary: string;
  description: string;
  techs: string[];
  highlights: string[];
  isSample: boolean;
  coverImage?: string;
  coverAlt?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  techs: string[];
  isSample: boolean;
  coverImage?: string;
  coverAlt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  body: string;
  coverImage?: string;
  coverAlt?: string;
}

export interface HomeContent {
  hero: { eyebrow: string; titleLead: string; titleHighlight: string; subtitle: string; terminalLines: string[] };
  stats: { value: string; label: string }[];
  pillars: { icon: string; title: string; text: string }[];
  process: { step: string; title: string; text: string }[];
  faqs: Faq[];
}

export interface AboutContent {
  headline: string; intro: string; mission: string; vision: string; story: string;
  values: { title: string; text: string }[];
  differentiators: { title: string; text: string }[];
  facts: { label: string; value: string }[];
  image?: string;
  imageAlt?: string;
}

export interface ContactContent {
  headline: string; intro: string; serviceOptions: string[]; budgetOptions: string[];
}
