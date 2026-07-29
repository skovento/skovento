export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  category: 'Web Development' | 'E-commerce' | 'SaaS' | 'Healthcare';
  title: string;
  highlightResult: string;
  metrics: { value: string; label: string }[];
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  quote: { text: string; author: string; role: string };
  imageColor: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'aura-luxe',
    slug: 'aura-luxe-fashion',
    client: 'Aura Luxe Fashion',
    category: 'E-commerce',
    title: 'Launching a Luxury Fashion Brand Generating $50K in Q1',
    highlightResult: '$50K Revenue in Q1',
    metrics: [
      { value: '$50K', label: 'First Quarter Revenue' },
      { value: '3.4%', label: 'Store Conversion Rate' },
      { value: '42%', label: 'Repeat Customer Rate' }
    ],
    summary: 'Aura Luxe needed a bespoke, mobile-first e-commerce store built to reflect luxury positioning while delivering lightning-fast sub-second page loads.',
    problem: 'The brand relied on generic templates that loaded slowly, causing high cart abandonment on mobile devices and failing to convey a premium aesthetic.',
    solution: 'We engineered a custom Next.js storefront integrated with Shopify engine, introducing dynamic lookbook view, one-click checkout, and automated SMS abandonment flows.',
    techStack: ['Next.js', 'Shopify API', 'Tailwind CSS', 'Klaviyo', 'Framer Motion'],
    quote: {
      text: 'Skovento delivered a store that looks straight out of Vogue and converts like clockwork.',
      author: 'Sophia Vance',
      role: 'Founder & Creative Director'
    },
    imageColor: 'from-purple-900/40 to-indigo-900/40'
  },
  {
    id: 'apex-cloud',
    slug: 'apex-cloud-systems',
    client: 'Apex Cloud Systems',
    category: 'SaaS',
    title: 'Redesigning SaaS Web App for a 3x Increase in Trial Conversions',
    highlightResult: '3x Conversion Rate Growth',
    metrics: [
      { value: '3x', label: 'Trial-to-Paid Conversion' },
      { value: '-45%', label: 'Bounce Rate Reduction' },
      { value: '12m', label: 'Avg Session Duration' }
    ],
    summary: 'Apex Cloud provides enterprise cloud analytics, but their complex interface left visitors confused during the 14-day free trial period.',
    problem: 'High drop-off rates on dashboard onboarding due to unintuitive layout navigation and non-responsive graphs.',
    solution: 'We completely overhauled the UI/UX design system, creating a streamlined dashboard with interactive onboarding tooltips, real-time data charts, and dark/light luxury modes.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Recharts'],
    quote: {
      text: 'Our conversion rate tripled within two months. Skovento understands both software engineering and user psychology.',
      author: 'David Sterling',
      role: 'VP of Product'
    },
    imageColor: 'from-blue-900/40 to-indigo-900/40'
  },
  {
    id: 'vanguard-health',
    slug: 'vanguard-health',
    client: 'Vanguard Health',
    category: 'Healthcare',
    title: 'Scaling Organic Lead Volume by +180% in 6 Months with Technical SEO',
    highlightResult: '+180% Organic Search Leads',
    metrics: [
      { value: '+180%', label: 'Organic Traffic Boost' },
      { value: 'Top 3', label: 'Google Ranks for 24 Keywords' },
      { value: '4.9★', label: 'Client Trust Score' }
    ],
    summary: 'Vanguard Health wanted to dominate local and regional search results for specialized medical consultations.',
    problem: 'Their legacy WordPress website suffered from slow Core Web Vitals, duplicate content issues, and zero local schema tags.',
    solution: 'We executed a full technical SEO overhaul, re-engineered the site on Next.js, and built 15+ location-specific landing pages with structured schema markup.',
    techStack: ['Next.js', 'Technical SEO', 'Schema.org', 'Google Ads', 'Vercel'],
    quote: {
      text: 'Skovento turned our website into our #1 lead channel. The ROI has been incredible.',
      author: 'Dr. Robert Lawson',
      role: 'Chief Medical Officer'
    },
    imageColor: 'from-amber-900/40 to-rose-900/40'
  }
];
