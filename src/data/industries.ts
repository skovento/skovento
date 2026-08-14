export interface Industry {
  id: string;
  slug: string;
  name: string;
  title?: string;
  description?: string;
  tagline: string;
  iconName: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  conceptProjectSlug: string;
  conceptProjectTitle: string;
  heroImageGradient: string;
  whatsappPitch: string;
}

export type IndustryData = Industry;

export const industriesData: Industry[] = [
  {
    id: 'fashion',
    slug: 'fashion',
    name: 'Fashion & Apparel',
    title: 'Fashion & Apparel Digital Showroom & WhatsApp Ordering',
    description: 'We build fast, mobile-first digital showrooms for boutique brands, clothing labels, and fashion stores to showcase new arrivals, size guides, and accept direct orders on WhatsApp.',
    tagline: 'Digital Showroom, Collections & Direct WhatsApp Enquiries',
    iconName: 'ShoppingBag',
    problem:
      'Customers discover the brand through Instagram or word of mouth, but there is no central place to view current collections, size guides, store location, or place direct WhatsApp orders.',
    solution:
      'A sleek, mobile-first digital showroom with curated collections, lookbooks, store location map, and instant 1-tap WhatsApp order/enquiry routing.',
    keyFeatures: [
      'Interactive Digital Lookbook',
      'Instant WhatsApp Inquiry Buttons',
      'Filterable Product Categories',
      'Mobile-First Touch Architecture',
      'Google Maps & Store Hours',
      'SEO Foundation for Local Search',
    ],
    conceptProjectSlug: 'aura-luxe-fashion',
    conceptProjectTitle: 'Aura Luxe Fashion (Concept Project)',
    heroImageGradient: 'from-[#8A2B88]/20 to-[#16203D]/40',
    whatsappPitch:
      'Hi Skovento team, I run a fashion business and want to see how a digital showroom can help us get more direct orders.',
  },
  {
    id: 'restaurants',
    slug: 'restaurants',
    name: 'Restaurants & Cafés',
    title: 'Restaurants & Cafés Digital Menu & Google Discovery',
    description: 'Help diners discover your restaurant on Google Maps, browse your interactive digital menu with dietary tags, and reserve tables with 1 tap.',
    tagline: 'Digital Menu, Reservation Flow & Local Google Discovery',
    iconName: 'Utensils',
    problem:
      'Diners search for local places on Google and Instagram, but menu PDFs load slowly on mobile, prices are outdated, and table reservations require calling busy staff.',
    solution:
      'A fast, interactive digital menu with dietary tags, Google Business Schema integration for local Search & Maps ranking, and a direct reservation request form.',
    keyFeatures: [
      'Interactive Digital Menu',
      'One-Tap Table Reservation Requests',
      'Google Maps Local Business Schema',
      'Instagram Story & Post Embeds',
      'Customer Reviews Showcase',
      'Sub-1-Second Mobile Load Speed',
    ],
    conceptProjectSlug: 'spice-table-restaurant',
    conceptProjectTitle: 'Spice Table Bistro (Concept Project)',
    heroImageGradient: 'from-[#C88770]/20 to-[#16203D]/40',
    whatsappPitch:
      'Hi Skovento team, I own a restaurant/café and want to improve our digital menu and Google visibility.',
  },
  {
    id: 'salons',
    slug: 'salons',
    name: 'Salons & Beauty Studios',
    title: 'Salons & Beauty Studios Digital Rate Card & Booking',
    description: 'Transform your beauty studio presence with clear service pricing, before & after transformations, and effortless 1-tap WhatsApp booking.',
    tagline: 'Service Menu, Stylist Profiles & Direct Booking Flow',
    iconName: 'Sparkles',
    problem:
      'Clients constantly ask for price lists over Instagram DM, while appointment scheduling is managed manually on paper or WhatsApp messages.',
    solution:
      'A premium beauty studio website featuring a categorized service menu with transparent pricing, before/after gallery, and 1-tap appointment booking.',
    keyFeatures: [
      'Categorized Service Rate Card',
      'Before & After Transformation Gallery',
      'Stylist & Specialist Profiles',
      'WhatsApp Appointment Booking',
      'Google Review Badge Integration',
      'Local Salon SEO Optimization',
    ],
    conceptProjectSlug: 'aura-luxe-fashion',
    conceptProjectTitle: 'Velvet Beauty Studio (Concept Project)',
    heroImageGradient: 'from-[#8A2B88]/20 to-[#C88770]/20',
    whatsappPitch:
      'Hi Skovento team, I run a salon/beauty studio and need a service menu and booking system.',
  },
  {
    id: 'travel',
    slug: 'travel',
    name: 'Travel & Car Rental',
    title: 'Travel & Car Rental Fleet Catalogue & Package Quotes',
    description: 'Present tour packages, vehicle fleet options, and itinerary breakdowns to travelers with structured quotation request funnels.',
    tagline: 'Fleet Catalogue, Tour Packages & Quotation Requests',
    iconName: 'Compass',
    problem:
      'Travelers require transparent vehicle catalogues, tour itineraries, pricing, and fast response times before booking, but static PDFs fail to convert.',
    solution:
      'A structured travel portal showcasing vehicle fleets, itinerary highlights, customer reviews, and a quick multi-step quotation request tool.',
    keyFeatures: [
      'Vehicle & Package Fleet Catalogue',
      'Custom Itinerary Highlights',
      'Multi-Step Quote Request Tool',
      'WhatsApp Travel Assistant',
      'Trust Badges & Safety Certifications',
      'Multi-City Search Engine Ready',
    ],
    conceptProjectSlug: 'horizon-travels',
    conceptProjectTitle: 'Horizon Travel & Rentals (Concept Project)',
    heroImageGradient: 'from-[#16203D]/30 to-[#8A2B88]/20',
    whatsappPitch:
      'Hi Skovento team, I operate a travel/rental agency and want a professional fleet & tour booking site.',
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    name: 'Real Estate & Builders',
    title: 'Real Estate & Property Showcase Landing Pages',
    description: 'High-converting project showcases featuring interactive floorplan galleries, virtual tour teasers, and high-intent brochure lead capture.',
    tagline: 'Property Showcase, Floorplans & High-Intent Lead Capture',
    iconName: 'Building',
    problem:
      'High-value property buyers need detailed floorplans, amenity highlights, site location maps, and fast agent contact options.',
    solution:
      'A luxury real estate project showcase website featuring interactive floorplan galleries, virtual walkthrough teasers, and high-intent brochure download forms.',
    keyFeatures: [
      'Property & Project Feature Cards',
      'Interactive Floorplan Viewer',
      'Brochure & Price List Download Gate',
      'Site Visit Booking Assistant',
      'High-Intent CRM Lead Routing',
      'Google Maps Location Context',
    ],
    conceptProjectSlug: 'prime-realty',
    conceptProjectTitle: 'Prime Realty & Estates (Concept Project)',
    heroImageGradient: 'from-[#16203D]/40 to-[#C88770]/30',
    whatsappPitch:
      'Hi Skovento team, I work in real estate and want a high-converting property showcase landing page.',
  },
  {
    id: 'professional-services',
    slug: 'professional-services',
    name: 'Professional Services',
    title: 'Professional Services Authority & Lead Generation',
    description: 'High-trust web platforms for law firms, accounting practices, consultants, and agencies to demonstrate domain authority and capture consultations.',
    tagline: 'Authority Building, Service Clarity & Consultation Requests',
    iconName: 'Briefcase',
    problem:
      'Law firms, accountants, architects, and consultants struggle to build online trust with prospective clients who demand proof of expertise.',
    solution:
      'A clean, authoritative corporate site highlighting core advisory areas, team credentials, client workflow steps, and consultation booking.',
    keyFeatures: [
      'Practice Area Breakdown',
      'Team Credentials & Specializations',
      'Methodology & Process Roadmap',
      'Consultation Booking System',
      'SEO Content & Insights Publishing',
      'Enterprise-Grade Security Standards',
    ],
    conceptProjectSlug: 'apex-cloud-systems',
    conceptProjectTitle: 'Apex Professional Services (Concept Project)',
    heroImageGradient: 'from-[#16203D]/50 to-[#8A2B88]/30',
    whatsappPitch:
      'Hi Skovento team, I run a professional service firm and want to build a high-trust digital presence.',
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industriesData.find((ind) => ind.slug === slug);
}
