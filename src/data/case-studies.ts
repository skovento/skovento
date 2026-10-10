export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: 'Websites' | 'Business Systems' | 'Product Concepts';
  projectType: 'Visual Concept' | 'Interactive Prototype' | 'Functional Application';
  businessType: string;
  overview: string;
  problem: string;
  objective: string;
  solution: string;
  features: string[];
  userExperience: string;
  techStack: string[];
  implementationDetails: string;
  limitations: string;
  liveDemo?: string;
  sourceCode?: string;
  conceptNote: string;
  imageColor: string;
}

/**
 * SKOVENTO DEMONSTRATIONS POLICY:
 * Every project is an independently designed Concept Project by Skovento.
 * We do not claim fictional client relationships, invented customer testimonials,
 * or fabricated financial metrics.
 */
export const caseStudiesData: CaseStudy[] = [
  {
    id: 'local-services',
    slug: 'local-services-website',
    title: 'Local Services Business Website',
    category: 'Websites',
    projectType: 'Interactive Prototype',
    businessType: 'Local Trades & Professional Services',
    overview:
      'A streamlined web presence designed for local service businesses to display core offerings, establish local search credibility, and route prospective inquiries directly into email and WhatsApp.',
    problem:
      'Local service businesses frequently rely on fragmented social media pages or outdated websites that fail on mobile devices, do not state service areas clearly, and make contacting the business cumbersome.',
    objective:
      'Design and build a mobile-first digital presence with sub-second page loads, structured service packages, direct click-to-call / WhatsApp access, and Schema.org local business indexing.',
    solution:
      'A server-rendered Next.js website featuring a clear service breakdown, localized geographic coverage signals, accessible inquiry forms with validation, and an interactive FAQ section.',
    features: [
      'Categorised service breakdown with transparent scope details',
      'One-tap WhatsApp & phone consultation routing',
      'LocalBusiness Schema.org structured data integration',
      'Embedded Google Maps location and service boundary display',
      'Lightweight inquiry form with server-side validation and spam prevention',
      'Fully responsive touch layout optimized for 360px to 4K displays',
    ],
    userExperience:
      'Mobile visitors immediately see the primary service offerings, geographic coverage, and direct communication buttons within the first screen view without needing to dig through nested menus.',
    techStack: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Resend API'],
    implementationDetails:
      'Built using React Server Components for zero unnecessary JavaScript hydration. Assets and fonts are locally hosted to eliminate third-party render-blocking requests.',
    limitations:
      'This demonstration uses simulated enquiry routing unless configured with real production email credentials. Does not include an automated online booking calendar.',
    liveDemo: 'https://skovento.com/work/local-services-website',
    conceptNote:
      'Design Concept — Created independently by Skovento to demonstrate modern local service web architecture.',
    imageColor: 'from-[#4F46E5]/40 to-[#16203D]/70',
  },
  {
    id: 'industrial-catalogue',
    slug: 'industrial-b2b-catalogue',
    title: 'Industrial B2B Product Catalogue',
    category: 'Websites',
    projectType: 'Interactive Prototype',
    businessType: 'B2B Manufacturers & Industrial Suppliers',
    overview:
      'A structured digital product catalogue that allows industrial suppliers and component manufacturers to showcase technical product lines and receive structured Request for Quote (RFQ) inquiries.',
    problem:
      'Manufacturers often distribute static 100-page PDF catalogues. B2B buyers struggle to search specifications on mobile devices, and sales teams receive vague email inquiries lacking necessary part numbers.',
    objective:
      'Replace cumbersome static files with a fast, searchable digital catalogue featuring itemized technical specifications, multi-item quote requests, and spec sheet downloads.',
    solution:
      'An organized digital catalogue with multi-facet category filters, technical dimension tables, a lightweight RFQ cart allowing buyers to select multiple part numbers, and an inquiry submission engine.',
    features: [
      'Faceted product specification filters (dimensions, materials, tolerances)',
      'Multi-item RFQ (Request for Quote) inquiry basket',
      'Downloadable PDF technical spec sheet gate with lead capture',
      'Product categorization structured for commercial technical SEO',
      'Responsive data tables designed for tablet and mobile field review',
    ],
    userExperience:
      'Engineers and procurement specialists can locate specific part numbers in seconds using real-time search, compare technical parameters, and submit an RFQ with custom quantities.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
    implementationDetails:
      'Product specifications are represented in static TypeScript data structures ready for database or headless CMS hydration. Table components feature horizontal overflow scrolling on mobile.',
    limitations:
      'Demonstration currently demonstrates front-end filtering and RFQ submission flow; live ERP inventory synchronization requires direct enterprise API integration.',
    liveDemo: 'https://skovento.com/work/industrial-b2b-catalogue',
    conceptNote:
      'Design Concept — Demonstrates how B2B manufacturing companies can modernize product discovery without requiring full consumer e-commerce overhead.',
    imageColor: 'from-[#1E293B]/70 to-[#334155]/70',
  },
  {
    id: 'booking-system',
    slug: 'service-booking-system',
    title: 'Service Booking & Reservation Workflow',
    category: 'Websites',
    projectType: 'Functional Application',
    businessType: 'Consultancies, Salons & Appointment Businesses',
    overview:
      'A customer-facing booking and enquiry experience that enables clients to view service packages, select available time windows, and submit appointment requests with automated notifications.',
    problem:
      'Service providers lose prospective clients when bookings require back-and-forth phone calls or manual messaging during busy operational hours.',
    objective:
      'Create an intuitive multi-step booking request flow that captures client details, preferred dates, and specific requirements in a structured, friction-free interface.',
    solution:
      'A dedicated booking interface that guides users through service selection, date preferences, and contact details, with instant email confirmations sent to both provider and client.',
    features: [
      'Multi-step guided booking wizard with live progress indicator',
      'Service package selection with pricing and duration indications',
      'Date and preferred time window selection interface',
      'Automated confirmation email dispatch via transactional email API',
      'Provider review dashboard mock view for managing booking statuses',
    ],
    userExperience:
      'Clients complete booking requests in under 90 seconds on their phones. Input fields are formatted with clear inline validation and accessible touch targets.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Resend', 'Zod'],
    implementationDetails:
      'State is managed with client-side React hooks for immediate feedback, while form submissions are validated server-side using Zod schemas to guarantee input safety.',
    limitations:
      'Payment processing for upfront deposits is designed as an optional add-on; standard demonstration focuses on appointment request collection.',
    liveDemo: 'https://skovento.com/work/service-booking-system',
    conceptNote:
      'Design Concept — A functional demonstration of structured service booking workflows.',
    imageColor: 'from-[#4F46E5]/40 to-[#7C3AED]/50',
  },
  {
    id: 'business-dashboard',
    slug: 'business-management-dashboard',
    title: 'Business Management Dashboard',
    category: 'Business Systems',
    projectType: 'Functional Application',
    businessType: 'Growing SMEs & Internal Operations',
    overview:
      'A custom internal operations dashboard designed to help business owners track customer records, task statuses, and key operational metrics in a single unified interface.',
    problem:
      'Growing businesses frequently outgrow basic spreadsheets, resulting in lost customer history, desynchronized task lists, and no unified daily operational visibility.',
    objective:
      'Build a lightweight, responsive management tool that centralizes customer records, internal task pipelines, and daily activity logs without the cost or complexity of enterprise suites.',
    solution:
      'A custom web application with authenticated navigation, searchable customer tables, Kanban-style status tracking, and key metric summary cards.',
    features: [
      'Role-based layout with secure authentication structure',
      'Customer record table with instant search and status filtering',
      'Interactive pipeline view for active projects or order fulfillment',
      'Summary metrics for pending tasks, completed projects, and response times',
      'Responsive drawer interface for updating customer notes on mobile',
    ],
    userExperience:
      'High-contrast, distraction-free data density inspired by modern engineering tools like Linear. Fast keyboard shortcuts and sub-100ms UI interactions.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL Schema'],
    implementationDetails:
      'Component-driven architecture with modular data tables and reusable status badges. Styled with restrained neutral surfaces and accessible contrast.',
    limitations:
      'Demonstration runs with seeded local data in demo mode; production deployment connects to dedicated PostgreSQL database with row-level security.',
    liveDemo: 'https://skovento.com/work/business-management-dashboard',
    conceptNote:
      'Design Concept — Demonstrates custom internal tool development for growing businesses.',
    imageColor: 'from-[#0F172A]/70 to-[#1E3A5F]/70',
  },
  {
    id: 'receivables-tool',
    slug: 'receivables-management-tool',
    title: 'Receivables Management Product Concept',
    category: 'Product Concepts',
    projectType: 'Functional Application',
    businessType: 'Finance, B2B Accounts & Billing Teams',
    overview:
      'A focused web software concept engineered to help finance managers track outstanding customer invoices, calculate ageing brackets, and automate reminder workflows.',
    problem:
      'Delayed invoice collections and manual follow-ups strain business cash flow. Teams lack automated ageing visibility (0-30, 31-60, 60+ days) and forget structured follow-up schedules.',
    objective:
      'Demonstrate a focused SaaS-style utility for invoice ageing analysis, automated follow-up communication logging, and receivables health tracking.',
    solution:
      'A dashboard featuring an ageing summary breakdown, invoice status management (Paid, Overdue, Disputed), customer communication log, and CSV statement exports.',
    features: [
      'Visual receivables ageing analysis (Current, 30+, 60+, 90+ days)',
      'Invoice status tracking with payment reconciliation logging',
      'Automated email reminder template triggers',
      'Customer communication timeline log for collections tracking',
      'One-click CSV data export for accounting reconciliation',
    ],
    userExperience:
      'Finance teams get instant clarity on outstanding capital with clear visual color-coded ageing indicators and rapid filter toggles.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL / Prisma', 'Lucide Icons'],
    implementationDetails:
      'Mathematical ageing calculations computed server-side to guarantee precision. Data visualizations use clean SVG-based progress elements for minimal bundle weight.',
    limitations:
      'Demonstration concept illustrating user experience and data structure; bank feed automation requires direct Open Banking or payment aggregator APIs.',
    liveDemo: 'https://skovento.com/work/receivables-management-tool',
    conceptNote:
      'Product Concept — An independent software product concept illustrating targeted business workflow design.',
    imageColor: 'from-[#065F46]/50 to-[#0F172A]/70',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
