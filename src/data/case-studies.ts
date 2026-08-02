export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  isConcept: true;
  category: 'Web Development' | 'E-commerce' | 'SaaS' | 'Healthcare';
  title: string;
  highlightResult: string;
  metrics: { value: string; label: string }[];
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  conceptNote: string;
  imageColor: string;
}

// These are self-initiated concept builds, not real client engagements.
// Skovento is a new studio — every "client" name here is fictional, and every
// metric is measured directly off the demo build (Lighthouse, PageSpeed),
// not invented business results.
export const caseStudiesData: CaseStudy[] = [
  {
    id: 'aura-luxe',
    slug: 'aura-luxe-fashion',
    client: 'Aura Luxe Fashion — Concept Brand',
    isConcept: true,
    category: 'E-commerce',
    title: 'Concept Build: A Sub-Second Luxury Fashion Storefront',
    highlightResult: 'Lighthouse 97/100',
    metrics: [
      { value: '97', label: 'Lighthouse Performance' },
      { value: '0.8s', label: 'Largest Contentful Paint' },
      { value: '340KB', label: 'Total Page Weight' }
    ],
    summary: 'A self-initiated concept exploring how a luxury D2C fashion brand could launch on a bespoke, mobile-first storefront instead of a generic template — built to demonstrate what "fast and premium" actually looks like in the browser.',
    problem: 'Most template-based fashion stores load slowly on mobile and dilute a premium brand feel with generic UI patterns and unoptimized imagery.',
    solution: 'We designed and built a fictional Next.js storefront concept with a dynamic lookbook view and a streamlined checkout flow, tuned to hit sub-second Largest Contentful Paint on mobile.',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    conceptNote: 'Built as a portfolio piece, not a paid engagement — every metric above is pulled directly from Lighthouse against the live demo build.',
    imageColor: 'from-purple-900/40 to-indigo-900/40'
  },
  {
    id: 'apex-cloud',
    slug: 'apex-cloud-systems',
    client: 'Apex Cloud Systems — Concept Brand',
    isConcept: true,
    category: 'SaaS',
    title: 'Concept Build: A Cleaner Onboarding Flow for a Cloud Analytics Dashboard',
    highlightResult: 'Lighthouse 95/100',
    metrics: [
      { value: '95', label: 'Lighthouse Performance' },
      { value: '3', label: 'Onboarding Steps (from 7)' },
      { value: '410KB', label: 'Total Page Weight' }
    ],
    summary: 'A concept redesign imagining how a complex SaaS analytics dashboard could simplify a confusing free-trial onboarding flow into something a first-time user actually finishes.',
    problem: 'Dense, jargon-heavy dashboards with unresponsive charts commonly cause high drop-off during self-serve trial onboarding.',
    solution: 'We designed a streamlined dashboard concept with interactive onboarding tooltips and real-time charts, cutting a hypothetical 7-step setup down to 3.',
    techStack: ['React', 'TypeScript', 'Recharts'],
    conceptNote: 'A design and engineering exercise, not a live client product — no real trial or conversion data exists for this concept.',
    imageColor: 'from-blue-900/40 to-indigo-900/40'
  },
  {
    id: 'vanguard-health',
    slug: 'vanguard-health',
    client: 'Vanguard Health — Concept Brand',
    isConcept: true,
    category: 'Healthcare',
    title: 'Concept Build: Local SEO Foundations for a Multi-Location Clinic',
    highlightResult: 'Lighthouse 96/100',
    metrics: [
      { value: '96', label: 'Lighthouse Performance' },
      { value: '100', label: 'Lighthouse SEO Score' },
      { value: '0', label: 'Duplicate-Content Pages' }
    ],
    summary: 'A concept rebuild showing how a healthcare provider running an aging WordPress site could fix the technical SEO fundamentals that usually cap local search visibility.',
    problem: 'Legacy healthcare sites often carry slow Core Web Vitals, duplicate content across location pages, and no local schema markup.',
    solution: 'We rebuilt the concept on Next.js with per-location landing pages, structured LocalBusiness schema, and clean canonical tags.',
    techStack: ['Next.js', 'Schema.org', 'Technical SEO'],
    conceptNote: 'A technical SEO demonstration, not a client campaign — there is no real traffic or ranking data behind this build.',
    imageColor: 'from-amber-900/40 to-rose-900/40'
  }
];
