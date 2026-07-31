export interface Service {
  id: string;
  slug: string;
  category: 'development' | 'marketing';
  title: string;
  shortDescription: string;
  detailedDescription: string;
  icon: string;
  badge: string;
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
  proof: { headline: string; stat: string; desc: string };
  faqs: { question: string; answer: string }[];
}

export const servicesData: Service[] = [
  {
    id: 'web-dev',
    slug: 'website-development',
    category: 'development',
    title: 'Website Development',
    badge: 'Core Service',
    shortDescription: 'Custom, responsive websites built for lightning speed, technical SEO, and maximum conversion rate.',
    detailedDescription: 'We build high-performance, bespoke websites engineered on modern frameworks like Next.js and React. Every site is designed around user behavior, lightning-fast load times, and structured SEO architecture to turn visitors into long-term clients.',
    icon: 'Code2',
    deliverables: [
      'Custom Responsive Next.js / React Web Architecture',
      'Core Web Vitals Optimization (100/100 Target Performance)',
      'Technical SEO Structure & Schema.org Integration',
      'Dynamic Content Management System (CMS)',
      'Security Hardening & SSL Setup',
      'Analytics & Conversion Tracking Setup'
    ],
    process: [
      { step: '01', title: 'Architecture Planning', desc: 'Wireframing, sitemap mapping, and technical stack selection tailored to your goals.' },
      { step: '02', title: 'UI/UX Design', desc: 'Crafting pixel-perfect interactive mockups with custom brand design tokens.' },
      { step: '03', title: 'Clean Engineering', desc: 'Developing semantic, modular code with animation triggers and responsive breakpoints.' },
      { step: '04', title: 'Deployment & QA', desc: 'Rigorous cross-device testing, speed audits, and zero-downtime launch.' }
    ],
    proof: {
      headline: 'Vanguard Health Digital Overhaul',
      stat: '+180%',
      desc: 'Increase in organic lead volume within 6 months post-launch.'
    },
    faqs: [
      { question: 'How long does a custom website build take?', answer: 'Typical custom website projects take between 2 to 4 weeks depending on scope and custom feature requirements.' },
      { question: 'Will my website be mobile-responsive?', answer: '100% yes. We build mobile-first designs optimized for every device size and touch interaction.' },
      { question: 'Do you provide website hosting setup?', answer: 'Yes, we handle complete server deployment on edge networks like Vercel or AWS with free SSL certificates.' }
    ]
  },
  {
    id: 'e-comm',
    slug: 'ecommerce-development',
    category: 'development',
    title: 'E-commerce Development',
    badge: 'Revenue Engine',
    shortDescription: 'High-converting online stores built on Shopify, WooCommerce, or headless custom platforms.',
    detailedDescription: 'Empower your online business with a frictionless shopping experience. From streamlined checkout flows to inventory sync and payment gateway integration, we build online stores engineered to scale.',
    icon: 'ShoppingBag',
    deliverables: [
      'Custom Shopify, WooCommerce, or Headless Storefront',
      'Frictionless One-Page Checkout Flow',
      'Payment Gateway Setup (Stripe, PayPal, Apple Pay)',
      'Product Filtering & Smart Search System',
      'Inventory & ERP Systems Integration',
      'Cart Abandonment Recovery Automation'
    ],
    process: [
      { step: '01', title: 'Store Strategy', desc: 'Catalog mapping, payment gateway selection, and checkout optimization roadmap.' },
      { step: '02', title: 'Storefront Design', desc: 'High-converting UI designed to showcase products and drive add-to-cart actions.' },
      { step: '03', title: 'Backend Integration', desc: 'Integrating shipping calculators, tax automation, and inventory feeds.' },
      { step: '04', title: 'Launch & Test', desc: 'End-to-end transaction testing across payment options before official opening.' }
    ],
    proof: {
      headline: 'Aura Luxe Fashion Launch',
      stat: '$50K',
      desc: 'Generated in gross revenue during the first 90 days after store launch.'
    },
    faqs: [
      { question: 'Which e-commerce platform do you recommend?', answer: 'We recommend Shopify for easy store management, or custom Next.js headless e-commerce for ultra-custom enterprise experiences.' },
      { question: 'Can you migrate my existing store without losing SEO ranks?', answer: 'Yes, we perform 1:1 URL redirects and canonical mapping to protect and boost your existing Google rankings.' }
    ]
  },
  {
    id: 'web-apps',
    slug: 'web-application-development',
    category: 'development',
    title: 'Web Application Development',
    badge: 'Custom Software',
    shortDescription: 'Custom web apps, customer portals, and internal dashboards tailored to complex business logic.',
    detailedDescription: 'Transform complex workflows into intuitive digital software. We build scalable Web SaaS applications, customer portals, and internal management tools with robust API integration.',
    icon: 'Cpu',
    deliverables: [
      'Full-Stack React / Next.js & Node.js Application',
      'Secure User Authentication & Role-Based Access Control',
      'REST & GraphQL API Development & Integration',
      'Interactive Analytics & Real-Time Dashboards',
      'Database Architecture (PostgreSQL / Firebase / MongoDB)',
      'Automated Data Backup & Security Protocols'
    ],
    process: [
      { step: '01', title: 'System Blueprint', desc: 'Data modeling, user flow diagrams, and API contract specifications.' },
      { step: '02', title: 'Frontend & Backend Build', desc: 'Developing component libraries and robust database controllers.' },
      { step: '03', title: 'Security Audit', desc: 'Testing authentication tokens, data validation, and load capacities.' },
      { step: '04', title: 'CI/CD Deployment', desc: 'Setting up automated cloud build pipelines for smooth iterative updates.' }
    ],
    proof: {
      headline: 'Apex Cloud SaaS Dashboard',
      stat: '3x',
      desc: 'Increase in free-to-paid trial conversion rates within 60 days.'
    },
    faqs: [
      { question: 'Do you build native mobile apps too?', answer: 'We build Progressive Web Apps (PWAs) that run seamlessly across web, iOS, and Android without requiring separate app store downloads.' }
    ]
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux-design',
    category: 'development',
    title: 'UI/UX Design',
    badge: 'User Experience',
    shortDescription: 'Intuitive, modern interfaces designed around real user behavior and brand identity.',
    detailedDescription: 'User experience is at the heart of conversions. We craft visually stunning wireframes, design systems, and interactive prototypes tested against real user behavior metrics.',
    icon: 'Palette',
    deliverables: [
      'Comprehensive UX Research & Competitor Benchmark',
      'User Persona Mapping & Journey Architecture',
      'Low & High-Fidelity Interactive Figma Wireframes',
      'Design System & Typography Token Documentation',
      'Usability Micro-Interactions & Animation Specs',
      'Developer Handoff Package & Asset Exports'
    ],
    process: [
      { step: '01', title: 'User Research', desc: 'Understanding your user demographics, pain points, and friction spots.' },
      { step: '02', title: 'Wireframing', desc: 'Structuring layout hierarchies for effortless screen navigation.' },
      { step: '03', title: 'Visual UI Design', desc: 'Applying color palettes, gradients, and micro-interactions.' },
      { step: '04', title: 'Prototype Testing', desc: 'Validating clickable prototypes before sending to development.' }
    ],
    proof: {
      headline: 'FinTech Portal Redesign',
      stat: '-40%',
      desc: 'Reduction in user onboarding drop-off after UI/UX simplification.'
    },
    faqs: [
      { question: 'Will I receive editable Figma files?', answer: 'Yes, you receive full ownership of clean, organized Figma design files and component libraries.' }
    ]
  },
  {
    id: 'maint',
    slug: 'website-maintenance-support',
    category: 'development',
    title: 'Website Maintenance & Support',
    badge: 'Peace of Mind',
    shortDescription: 'Ongoing updates, security patches, performance monitoring, and 24/7 technical support.',
    detailedDescription: 'Keep your website secure, fast, and up-to-date without lifting a finger. Our dedicated maintenance team monitors uptime, applies security updates, and provides regular performance boosts.',
    icon: 'ShieldCheck',
    deliverables: [
      '24/7 Automated Uptime & Performance Monitoring',
      'Weekly Security Patching & Vulnerability Scans',
      'Cloud Backups (Daily & Weekly Retention)',
      'Content Updates & Landing Page Additions',
      'Core Web Vitals Speed Refinements',
      'Priority Bug Fix SLA (Sub-2-Hour Response)'
    ],
    process: [
      { step: '01', title: 'System Audit', desc: 'Scanning your existing site for security gaps, outdated plugins, and speed bottlenecks.' },
      { step: '02', title: 'Backup Setup', desc: 'Configuring automated offsite cloud backups.' },
      { step: '03', title: 'Active Monitoring', desc: 'Real-time telemetry alerting our team to any downtime instantly.' },
      { step: '04', title: 'Monthly Reports', desc: 'Delivering detailed performance and security update logs.' }
    ],
    proof: {
      headline: 'Enterprise Client Uptime',
      stat: '99.99%',
      desc: 'Guaranteed uptime maintained across all managed client websites.'
    },
    faqs: [
      { question: 'Can I request quick content edits under maintenance?', answer: 'Yes! Maintenance retainer packages include dedicated developer hours every month for content updates.' }
    ]
  },
  {
    id: 'seo',
    slug: 'search-engine-optimization',
    category: 'marketing',
    title: 'Search Engine Optimization (SEO)',
    badge: 'Organic Growth',
    shortDescription: 'On-page, technical, and local SEO strategies to dominate search results and drive organic traffic.',
    detailedDescription: 'Rank higher where your customers are actively searching. We implement comprehensive technical SEO, content optimization, authority backlink building, and local Google Business Profile strategies.',
    icon: 'Search',
    deliverables: [
      'Deep Keyword Research & Competitor Gap Analysis',
      'Technical SEO Audit & Schema Markup Implementation',
      'On-Page Optimization (Titles, Meta, H1s, Internal Links)',
      'Local SEO & Google Business Profile Domination',
      'High-Authority Content Strategy & Backlink Acquisition',
      'Monthly Ranking & Organic Conversion Analytics Reports'
    ],
    process: [
      { step: '01', title: 'SEO Audit', desc: 'Analyzing indexing errors, page speed, keyword ranks, and backlink profile.' },
      { step: '02', title: 'Technical Cleanup', desc: 'Fixing canonicals, sitemaps, schema errors, and site architecture.' },
      { step: '03', title: 'Content Engine', desc: 'Publishing optimized articles targeting high-intent commercial keywords.' },
      { step: '04', title: 'Authority Building', desc: 'Acquiring relevant industry backlinks to boost domain authority.' }
    ],
    proof: {
      headline: 'Legal Firm Organic Expansion',
      stat: '+310%',
      desc: 'Growth in inbound high-value organic client consultation requests.'
    },
    faqs: [
      { question: 'How long until we see SEO results?', answer: 'Initial technical indexing improvements occur within weeks; significant keyword rank jumps typically compound in 3 to 6 months.' }
    ]
  },
  {
    id: 'ppc',
    slug: 'pay-per-click-advertising',
    category: 'marketing',
    title: 'Pay-Per-Click Advertising (PPC)',
    badge: 'Immediate Leads',
    shortDescription: 'ROI-driven Google Ads, Bing Ads, and paid search campaigns built for maximum return on ad spend.',
    detailedDescription: 'Capture high-intent buyers instantly. We build, manage, and optimize data-backed Google Ads and search campaigns designed to generate measurable revenue.',
    icon: 'Target',
    deliverables: [
      'Google Ads & Paid Search Campaign Setup',
      'Negative Keyword Filtering & Match Type Strategy',
      'High-Converting Ad Copywriting & Extension Creation',
      'Dedicated Landing Page Conversion Optimization',
      'Conversion Tracking & Google Analytics 4 Setup',
      'A/B Split Testing & Weekly Bid Adjustments'
    ],
    process: [
      { step: '01', title: 'Search Intent Analysis', desc: 'Identifying buyer-intent keywords with profitable cost-per-click metrics.' },
      { step: '02', title: 'Campaign Setup', desc: 'Structuring tightly themed ad groups with compelling ad copy.' },
      { step: '03', title: 'Conversion Tracking', desc: 'Wiring call tracking and lead form conversion signals.' },
      { step: '04', title: 'Daily Optimization', desc: 'Pruning negative terms and bidding for peak ROAS.' }
    ],
    proof: {
      headline: 'B2B SaaS PPC Campaign',
      stat: '4.8x',
      desc: 'Average Return On Ad Spend (ROAS) achieved across active accounts.'
    },
    faqs: [
      { question: 'What is the minimum ad spend required?', answer: 'Ad spend is flexible and scales with your market competitiveness — we\'ll recommend the right level for your goals during our strategy call.' }
    ]
  },
  {
    id: 'social-media',
    slug: 'social-media-marketing',
    category: 'marketing',
    title: 'Social Media Marketing',
    badge: 'Brand Presence',
    shortDescription: 'Creative content, community building, and targeted paid social ads across Instagram, Meta, & LinkedIn.',
    detailedDescription: 'Turn social feeds into brand growth engines. We craft visually stunning social content, run targeted Facebook/Instagram ad funnels, and build engaged brand communities.',
    icon: 'Share2',
    deliverables: [
      'Multi-Platform Social Strategy (Meta, LinkedIn, X)',
      'Custom Graphic & Motion Video Content Creation',
      'Targeted Paid Social Ad Campaign Management',
      'Audience Engagement & Community Management',
      'Influencer Collaboration & UGC Sourcing',
      'Monthly Impression, Reach, and Lead Reports'
    ],
    process: [
      { step: '01', title: 'Brand Storyteller Brief', desc: 'Defining brand voice, visual aesthetics, and content pillars.' },
      { step: '02', title: 'Content Calendar', desc: 'Designing monthly post calendars with reels, carousels, and graphics.' },
      { step: '03', title: 'Paid Funnels', desc: 'Deploying retargeting ads to catch warm social visitors.' },
      { step: '04', title: 'Performance Review', desc: 'Double down on high-performing creative formats.' }
    ],
    proof: {
      headline: 'Lifestyle Brand Social Growth',
      stat: '1.2M+',
      desc: 'Total social impressions generated within 90 days.'
    },
    faqs: [
      { question: 'Do you create custom graphics and videos?', answer: 'Yes, our in-house design team produces original graphics, short-form video reels, and brand carousels.' }
    ]
  },
  {
    id: 'content-mktg',
    slug: 'content-marketing',
    category: 'marketing',
    title: 'Content Marketing',
    badge: 'Thought Leadership',
    shortDescription: 'Authority-building blog posts, articles, and whitepapers that attract and convert ideal buyers.',
    detailedDescription: 'Establish your brand as the undisputed authority in your niche. We write compelling, SEO-rich long-form articles, whitepapers, and guides that answer customer questions and build trust.',
    icon: 'FileText',
    deliverables: [
      'Content Strategy & Editorial Calendar Roadmap',
      'SEO-Optimized Blog Posts & In-Depth Articles',
      'Lead Magnet Whitepapers & E-books',
      'Copywriting for Landing Pages & Case Studies',
      'Content Syndication & Social Snippets Creation',
      'Performance Tracking (Time on Page, Shares, Leads)'
    ],
    process: [
      { step: '01', title: 'Audience Interest Audit', desc: 'Researching what questions your ideal buyers search before purchasing.' },
      { step: '02', title: 'Expert Writing', desc: 'Crafting well-researched, engaging articles with clear action steps.' },
      { step: '03', title: 'On-Page Formatting', desc: 'Formatting with custom illustrations, quotes, and callout boxes.' },
      { step: '04', title: 'Distribution', desc: 'Sharing content across email lists and social channels.' }
    ],
    proof: {
      headline: 'Tech Blog Organic Authority',
      stat: '45K',
      desc: 'Monthly organic blog readers acquired in 8 months.'
    },
    faqs: [
      { question: 'Who writes the content?', answer: 'Our content is authored by experienced industry writers with native proficiency and subject-matter expertise.' }
    ]
  },
  {
    id: 'email-mktg',
    slug: 'email-marketing',
    category: 'marketing',
    title: 'Email Marketing',
    badge: 'Automated Revenue',
    shortDescription: 'Automated email flows and promotional broadcasts that nurture leads into loyal repeat customers.',
    detailedDescription: 'Email marketing generates the highest ROI of any digital channel. We build automated welcome sequences, abandoned cart flows, and promotional newsletters in Klaviyo or Mailchimp.',
    icon: 'Mail',
    deliverables: [
      'Klaviyo / Mailchimp Setup & Customer Segmentation',
      'Automated Welcome & Lead Magnet Nurture Flows',
      'E-commerce Cart & Browse Abandonment Sequences',
      'Custom HTML Email Template Design',
      'Weekly / Monthly Campaign Broadcast Execution',
      'A/B Subject Line & Open Rate Optimization'
    ],
    process: [
      { step: '01', title: 'Flow Mapping', desc: 'Designing automated customer journeys based on trigger behaviors.' },
      { step: '02', title: 'Template Design', desc: 'Creating mobile-optimized, beautiful branded email layouts.' },
      { step: '03', title: 'Copywriting', desc: 'Writing high-converting subject lines and persuasive copy.' },
      { step: '04', title: 'Deliverability Check', desc: 'Ensuring SPF/DKIM verification so emails land in the primary inbox.' }
    ],
    proof: {
      headline: 'E-commerce Automation Revenue',
      stat: '34%',
      desc: 'Of total store revenue generated solely through automated email flows.'
    },
    faqs: [
      { question: 'Can you migrate our list from another platform?', answer: 'Yes, we handle list cleaning, tag migration, and deliverability warm-up safely.' }
    ]
  },
  {
    id: 'branding',
    slug: 'branding-graphic-design',
    category: 'marketing',
    title: 'Branding & Graphic Design',
    badge: 'Visual System',
    shortDescription: 'Memorable brand identities, logos, style guides, and collateral that command premium positioning.',
    detailedDescription: 'Stand out from competitors with a cohesive, world-class brand identity. We craft logos, color palettes, typography systems, and brand guidelines that make an unforgettable impression.',
    icon: 'Sparkles',
    deliverables: [
      'Primary & Secondary Logo Design Architecture',
      'Brand Color Palette & Gradient System Definition',
      'Typography Hierarchy & Font Pairing Guidelines',
      'Comprehensive Brand Guidelines Book (PDF & Digital)',
      'Social Media Assets, Banners & Email Headers',
      'Business Cards, Print Packaging & Signage Collateral'
    ],
    process: [
      { step: '01', title: 'Brand Discovery', desc: 'Uncovering your brand values, target audience perception, and positioning.' },
      { step: '02', title: 'Concept Exploration', desc: 'Presenting 3 distinct visual brand directions with real mockups.' },
      { step: '03', title: 'Refinement', desc: 'Finetuning vector curves, color codes, and print specifications.' },
      { step: '04', title: 'Brand Book Handoff', desc: 'Delivering full SVG, PNG, EPS vector packages and guidelines.' }
    ],
    proof: {
      headline: 'Corporate Brand Transformation',
      stat: '100%',
      desc: 'Positive client feedback and instant brand recognition upgrade.'
    },
    faqs: [
      { question: 'What vector formats do I receive?', answer: 'You receive vector SVG, EPS, AI master files alongside PNG, JPG, and web-ready formats.' }
    ]
  },
  {
    id: 'cro',
    slug: 'conversion-rate-optimization',
    category: 'marketing',
    title: 'Conversion Rate Optimization (CRO)',
    badge: 'Growth Multiplier',
    shortDescription: 'Data-backed A/B testing and funnel optimization to turn existing traffic into more sales.',
    detailedDescription: 'Stop wasting ad dollars on non-converting traffic. We analyze heatmaps, user session recordings, and conversion funnels to systematically remove friction and double lead volume.',
    icon: 'TrendingUp',
    deliverables: [
      'Conversion Funnel & Heatmap User Behavior Audit',
      'A/B Split Testing Hypothesis & Test Strategy',
      'Landing Page UX Redesign & Micro-Copy Overhaul',
      'Checkout & Lead Form Friction Removal',
      'Google Tag Manager & Event Trigger Tracking',
      'Monthly Lift & Statistical Significance Reports'
    ],
    process: [
      { step: '01', title: 'Data Audit', desc: 'Analyzing Google Analytics, Hotjar heatmaps, and funnel drop-off points.' },
      { step: '02', title: 'Hypothesis Formulation', desc: 'Identifying low-hanging fruit test opportunities.' },
      { step: '03', title: 'Test Execution', desc: 'Deploying split tests with platforms like VWO or Optimizely.' },
      { step: '04', title: 'Scale Winners', desc: 'Permanently implementing high-converting design variations.' }
    ],
    proof: {
      headline: 'SaaS Checkout Funnel Optimization',
      stat: '+62%',
      desc: 'Increase in checkout completion rate after CRO redesign.'
    },
    faqs: [
      { question: 'Do I need high website traffic for CRO?', answer: 'CRO works best for sites receiving at least 5,000 monthly visitors to achieve fast statistical significance.' }
    ]
  }
];
