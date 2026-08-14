export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  isConcept: true;
  category: 'Websites' | 'E-commerce' | 'SaaS' | 'Web Apps' | 'Local Business';
  industry: 'Fashion' | 'Restaurants' | 'Travel' | 'Real Estate' | 'SaaS';
  title: string;
  highlightResult: string;
  metrics: { value: string; label: string }[];
  summary: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  conceptNote: string;
  imageColor: string;
}

/**
 * SKOVENTO PORTFOLIO POLICY:
 * 100% Honest & Transparent.
 * Every item in this portfolio is an independently designed Concept Project by Skovento
 * to demonstrate our capability, UI standards, and performance engineering.
 * We do NOT claim fictional client relationships or invented revenue figures.
 */
export const caseStudiesData: CaseStudy[] = [
  {
    id: 'aura-luxe',
    slug: 'aura-luxe-fashion',
    client: 'Aura Luxe Fashion (Skovento Concept)',
    isConcept: true,
    category: 'E-commerce',
    industry: 'Fashion',
    title: 'A Sub-Second Luxury Fashion Showroom & WhatsApp Ordering Concept',
    highlightResult: 'Sub-1s Mobile Load',
    metrics: [
      { value: '98/100', label: 'Lighthouse Performance' },
      { value: '0.8s', label: 'Largest Contentful Paint' },
      { value: '1-Tap', label: 'WhatsApp Inquiry Routing' },
    ],
    summary:
      'A self-initiated concept demonstrating how a boutique fashion brand can bridge Instagram discovery with a fast, mobile-first web catalogue and 1-tap WhatsApp checkout.',
    problem:
      'Fashion stores relying solely on Instagram DMs lose potential buyers who want a structured catalogue, size charts, and instant price confirmation without waiting for DM replies.',
    solution:
      'We engineered a lightweight Next.js storefront concept featuring visual lookbooks, filterable categories, store locator, and direct WhatsApp enquiry buttons on every product.',
    keyFeatures: [
      'Visual Collection Grid',
      'Instant WhatsApp Purchase Inquiry',
      'Mobile-Optimized Touch Navigation',
      'Google Maps Store Location Embed',
      'Sub-Second Page Load Optimization',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    conceptNote:
      'Concept Project — Independently designed by Skovento to demonstrate mobile e-commerce UX and performance optimization.',
    imageColor: 'from-[#8A2B88]/40 to-[#16203D]/60',
  },
  {
    id: 'spice-table',
    slug: 'spice-table-restaurant',
    client: 'Spice Table Bistro (Skovento Concept)',
    isConcept: true,
    category: 'Local Business',
    industry: 'Restaurants',
    title: 'Digital Menu, Table Reservation & Local SEO Concept for Hospitality',
    highlightResult: '100/100 SEO Score',
    metrics: [
      { value: '100/100', label: 'Lighthouse SEO Score' },
      { value: '<0.9s', label: 'First Contentful Paint' },
      { value: '2-Click', label: 'Reservation Flow' },
    ],
    summary:
      'A concept built to showcase how local restaurants and cafés can replace slow PDF menus with a lightning-fast web menu optimized for local Google search.',
    problem:
      'Diners searching for food options on mobile encounter PDF menus that are painful to zoom, outdated in pricing, and lack direct table booking.',
    solution:
      'We designed a responsive digital menu concept with dietary filters, embedded Google Maps local schema, customer reviews, and a 2-step reservation request form.',
    keyFeatures: [
      'Interactive Fast-Loading Digital Menu',
      'Dietary & Chef Special Filters',
      '1-Tap Table Reservation Requests',
      'LocalBusiness Schema.org Integration',
      'Click-to-Call & WhatsApp Contact',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Schema.org', 'TypeScript'],
    conceptNote:
      'Concept Project — Independently created by Skovento to demonstrate local business web design and Local SEO schema integration.',
    imageColor: 'from-[#C88770]/40 to-[#16203D]/60',
  },
  {
    id: 'horizon-travels',
    slug: 'horizon-travels',
    client: 'Horizon Travels & Fleet (Skovento Concept)',
    isConcept: true,
    category: 'Websites',
    industry: 'Travel',
    title: 'Fleet Catalogue & Custom Itinerary Booking Portal Concept',
    highlightResult: 'Interactive Booking Flow',
    metrics: [
      { value: '96/100', label: 'Lighthouse Performance' },
      { value: '3-Step', label: 'Quotation Request Flow' },
      { value: '100%', label: 'Mobile Responsive' },
    ],
    summary:
      'A concept travel portal built to demonstrate how tour operators and car rental businesses can present fleet vehicles and itineraries cleanly.',
    problem:
      'Travel agencies lose leads when prospective travelers cannot easily compare vehicle options, view clear inclusions/exclusions, or request instant quotes.',
    solution:
      'We created a travel catalogue concept featuring vehicle specs, tour day-by-day breakdowns, transparent pricing guidelines, and a streamlined quotation form.',
    keyFeatures: [
      'Vehicle & Package Fleet Grid',
      'Interactive Tour Itinerary Cards',
      'Multi-Step Quote Request Tool',
      'WhatsApp Trip Consultation CTA',
      'Customer Feedback Showcase',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Lucide React'],
    conceptNote:
      'Concept Project — Designed by Skovento as an example of a high-converting travel & fleet booking architecture.',
    imageColor: 'from-[#16203D]/60 to-[#8A2B88]/40',
  },
  {
    id: 'prime-realty',
    slug: 'prime-realty',
    client: 'Prime Realty & Estates (Skovento Concept)',
    isConcept: true,
    category: 'Websites',
    industry: 'Real Estate',
    title: 'Luxury Property Showcase & High-Intent Lead Capture Concept',
    highlightResult: 'High-Intent Lead Routing',
    metrics: [
      { value: '97/100', label: 'Lighthouse Performance' },
      { value: 'Floorplan', label: 'Interactive Viewer' },
      { value: 'Brochure', label: 'Instant Download Gate' },
    ],
    summary:
      'A concept property landing page demonstrating how real estate developers and agents can capture qualified buyers with rich visual storytelling.',
    problem:
      'Standard real estate listings often hide key floorplans and location contexts behind generic forms, causing prospective buyers to bounce.',
    solution:
      'We designed a property showcase concept featuring interactive floorplan toggles, amenity highlights, neighborhood context, and instant brochure downloads.',
    keyFeatures: [
      'High-Resolution Property Gallery',
      'Interactive Floorplan & Spec Viewer',
      'Brochure & Pricing Download Gate',
      'Site Visit Schedule Assistant',
      'Location & Amenity Context Grid',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    conceptNote:
      'Concept Project — Created independently by Skovento to illustrate high-end real estate web architecture.',
    imageColor: 'from-[#16203D]/60 to-[#C88770]/40',
  },
  {
    id: 'apex-cloud',
    slug: 'apex-cloud-systems',
    client: 'Apex Analytics Dashboard (Skovento Concept)',
    isConcept: true,
    category: 'SaaS',
    industry: 'SaaS',
    title: 'Custom Analytics Web Application & Admin Panel Concept',
    highlightResult: 'Custom Dashboard UI',
    metrics: [
      { value: '95/100', label: 'Lighthouse Performance' },
      { value: '3-Step', label: 'Simplified Trial Flow' },
      { value: '<400KB', label: 'Bundle Size' },
    ],
    summary:
      'A custom web application concept demonstrating how complex business data and workflows can be simplified into a clean, modern SaaS dashboard.',
    problem:
      'Enterprise and SaaS tools often suffer from cluttered interfaces, slow loading tables, and confusing navigation that hinder daily productivity.',
    solution:
      'We engineered a modular admin dashboard concept with real-time chart visualizations, role-based navigation, and interactive data filtering.',
    keyFeatures: [
      'Interactive Data Visualization Charts',
      'Modular Sidebar & Role Navigation',
      'Fast Search & Filterable Data Tables',
      'Responsive Mobile & Tablet View',
      'Clean Component Architecture',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    conceptNote:
      'Concept Project — An engineering and design exercise by Skovento showcasing custom web application capabilities.',
    imageColor: 'from-[#8A2B88]/30 to-[#16203D]/70',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
