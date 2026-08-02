/**
 * ============================================================================
 * SKOVENTO — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * ⚠️  PRIYANKA: THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *
 * Every `TODO_` value below is a placeholder. Replace them and the whole site
 * updates at once — schema.org markup, llms.txt, sitemap, footer NAP,
 * WhatsApp links, click-to-call, Open Graph, and every AI-crawler signal.
 *
 * Search this file for "TODO_" to find everything that still needs a real value.
 *
 * Why it matters: schema.org, llms.txt and your footer must all state the SAME
 * name, address and phone number. Inconsistent NAP is the single most common
 * reason a local business fails to rank locally and fails to get named by
 * ChatGPT / Perplexity / Google AI Overviews.
 * ============================================================================
 */

/** True once every TODO_ below has been replaced. Used to hide half-filled data. */
export const CONFIG_COMPLETE = false;

export const siteConfig = {
  // ---------------------------------------------------------------- identity
  name: 'Skovento',
  legalName: 'Skovento',
  tagline: 'Beyond Limits. Elevated Journeys.',
  url: 'https://skovento.com',
  locale: 'en-IN',
  /** Format: YYYY-MM. Used by schema.org foundingDate and llms.txt. */
  foundingDate: '2026-07',

  /**
   * The one-paragraph description of the business. This exact text is what an
   * AI model is most likely to quote when asked "what is Skovento?".
   * Keep it factual, entity-dense, and under ~60 words.
   */
  description:
    'Skovento is a web design and digital growth studio in Ahmedabad, Gujarat. We build 3D scroll-animated, high-performance websites using Next.js, React, GSAP and Three.js, and run SEO and paid acquisition campaigns for D2C brands, cafes, clinics and local businesses across India.',

  // ----------------------------------------------------------------- contact
  // These were already live in the codebase (src/lib/contact.ts, Footer,
  // /contact, /privacy, /terms) — consolidated here so there is one source of
  // truth instead of the same number hard-coded in six files.
  contact: {
    /** Must be an inbox you actually monitor — it's published in schema.org. */
    email: 'connect@skovento.com',

    /** E.164 format. Used for schema.org telephone and `tel:` links. */
    phone: '+919104450552',

    /** Human-readable version shown in the UI. */
    phoneDisplay: '+91 91044 50552',

    /** Digits only, country code included, no '+' or spaces. For wa.me links. */
    whatsapp: '919104450552',

    /** Pre-filled first message when someone taps the WhatsApp button. */
    whatsappMessage: "Hi Skovento — I'd like to talk about a website for my business.",
  },

  // ---------------------------------------------------------------- location
  address: {
    /**
     * TODO_STREET — street line, e.g. '3rd Floor, Iscon Emporio, Satellite'.
     * Optional: schema.org accepts a city-level address without it, and the
     * city is what actually drives local ranking. Add it when you have a
     * public office address you're happy to publish.
     */
    street: 'TODO_STREET',
    city: 'Ahmedabad',
    region: 'Gujarat',
    /** TODO_PIN — 6-digit PIN code, e.g. '380015'. */
    postalCode: 'TODO_PIN',
    country: 'IN',
    countryName: 'India',
  },

  /**
   * TODO_GEO — latitude/longitude of your office.
   * Google Maps → right-click your location → click the coordinates to copy,
   * then replace `null` with { latitude: 23.0225, longitude: 72.5714 }.
   * Leave null if you work remotely and have no public office.
   */
  geo: null as { latitude: number; longitude: number } | null,

  /**
   * Cities and regions you actively sell into. Feeds schema.org areaServed.
   * Ahmedabad first: specific-then-broad is how local intent gets matched.
   */
  areaServed: ['Ahmedabad', 'Gujarat', 'India'] as string[],

  /** TODO_GST — 15-character GSTIN, or null if not registered yet. */
  gstNumber: null as string | null,

  // ----------------------------------------------------------------- socials
  /**
   * Feeds schema.org `sameAs`, which is how search and AI engines link your
   * website to your social profiles and treat them as one entity.
   * Delete any line you don't have yet — an empty string is worse than absence.
   */
  socials: {
    instagram: 'TODO_INSTAGRAM_URL',
    x: 'TODO_X_URL',
    linkedin: 'TODO_LINKEDIN_URL',
    youtube: 'TODO_YOUTUBE_URL',
  },

  // ------------------------------------------------------------------- brand
  brand: {
    magenta: '#8A2B88',
    magentaLift: '#C24FBE',
    indigo: '#1E2E6B',
    gold: '#C88770',
    ink: '#16203D',
    body: '#424965',
    surface: '#FAF8F5',
  },

  // ---------------------------------------------------- verifiable standards
  /**
   * Everything here must be TRUE and CHECKABLE. These are the numbers an AI
   * engine can quote and a prospect can verify — which is exactly why they
   * convert better than adjectives like "fast" or "affordable".
   */
  standards: {
    lcpSeconds: 2.5,
    cls: 0.1,
    inpMs: 200,
    lighthouseMobileMin: 90,
    maxPageWeightKB: 800,
    fastestDeliveryDays: 7,
  },

  /** Technologies we actually use. Feeds schema.org knowsAbout + entity density. */
  knowsAbout: [
    'Web Design',
    'Next.js Development',
    'React',
    'Three.js',
    'WebGL',
    'GSAP',
    'Core Web Vitals',
    'Technical SEO',
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'Google Ads',
    'Meta Ads',
    'Shopify Development',
    'WooCommerce',
    'Conversion Rate Optimization',
    'UI/UX Design',
  ],

  /**
   * Pricing is intentionally NOT published on the site right now.
   * Flip this to true and the /pricing page, PricingSection and Offer schema
   * all switch on together.
   */
  publishPricing: false,
} as const;

// ============================================================================
// Derived helpers — don't edit below unless you're changing behaviour
// ============================================================================

/** True when a config value is still a placeholder. */
export const isTodo = (v: string | null | undefined): boolean =>
  !v || v.startsWith('TODO_');

/**
 * Postal address as one line, built from whatever parts are filled in.
 *
 * Degrades gracefully rather than all-or-nothing: "Ahmedabad, Gujarat, India"
 * is a perfectly good NAP string and is what drives local ranking. Waiting for
 * a street line before publishing any location would be the worse trade.
 * Returns null only if we don't even have a city.
 */
export const formattedAddress = (): string | null => {
  const a = siteConfig.address;
  if (isTodo(a.city)) return null;
  const parts = [a.street, a.city, a.region, a.postalCode].filter((p) => !isTodo(p));
  return [...parts, a.countryName].join(', ');
};

/** Ready-to-use wa.me link, or null while the number is a placeholder. */
export const whatsappHref = (): string | null => {
  const { whatsapp, whatsappMessage } = siteConfig.contact;
  if (isTodo(whatsapp)) return null;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
};

/** Ready-to-use tel: link, or null while the number is a placeholder. */
export const telHref = (): string | null =>
  isTodo(siteConfig.contact.phone) ? null : `tel:${siteConfig.contact.phone}`;

/** Ready-to-use mailto: link, or null while the address is a placeholder. */
export const mailtoHref = (): string | null =>
  isTodo(siteConfig.contact.email) ? null : `mailto:${siteConfig.contact.email}`;

/** Only the social URLs that have been filled in. Feeds schema.org sameAs. */
export const socialUrls = (): string[] =>
  Object.values(siteConfig.socials).filter((u) => !isTodo(u));

/** The city name, or a neutral fallback so copy never renders "TODO_CITY". */
export const cityName = (): string =>
  isTodo(siteConfig.address.city) ? 'India' : siteConfig.address.city;

/** "Ahmedabad, India" — or just "India" until the city is filled in. */
export const locationLabel = (): string =>
  isTodo(siteConfig.address.city)
    ? siteConfig.address.countryName
    : `${siteConfig.address.city}, ${siteConfig.address.countryName}`;

/** Absolute URL builder — schema.org and sitemaps both require absolute URLs. */
export const absoluteUrl = (path = '/'): string =>
  new URL(path, siteConfig.url).toString();
