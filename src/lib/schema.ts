/**
 * ============================================================================
 * SCHEMA.ORG STRUCTURED DATA (JSON-LD)
 * ============================================================================
 *
 * This is the highest-return SEO/AEO/GEO work on the site.
 *
 * Why: pages carrying FAQPage markup are roughly 3.2x more likely to appear in
 * Google AI Overviews. Before this file existed, skovento.com shipped ZERO
 * JSON-LD blocks — including on a homepage that already had a full FAQ written.
 *
 * How AI engines use it: GPTBot, ClaudeBot and PerplexityBot do not execute
 * JavaScript. They read the raw HTML response. JSON-LD rendered server-side is
 * one of the few signals every one of them reliably parses, which makes it the
 * cheapest way to tell an AI what this business is, where it is, and what it
 * sells.
 *
 * Every builder here degrades gracefully: values still set to TODO_ in
 * site-config.ts are omitted rather than emitted as placeholder garbage.
 * Publishing "TODO_CITY" as your locality would be worse than publishing nothing.
 * ============================================================================
 */

import {
  siteConfig,
  isTodo,
  socialUrls,
  absoluteUrl,
} from './site-config';

/** Strip keys whose value is null/undefined/empty so we never emit placeholders. */
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string' && (v === '' || isTodo(v))) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    })
  ) as Partial<T>;
}

export const ORG_ID = `${siteConfig.url}/#organization`;
export const SITE_ID = `${siteConfig.url}/#website`;

/* -------------------------------------------------------------------------- */
/* Organization — emitted on every page                                        */
/* -------------------------------------------------------------------------- */

function postalAddress() {
  const a = siteConfig.address;
  const parts = compact({
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: a.region,
    postalCode: a.postalCode,
  });
  // Only emit an address once we have at least a city — a country-only
  // PostalAddress is noise that can actively confuse local ranking.
  if (!parts.addressLocality) return null;
  return { '@type': 'PostalAddress', ...parts, addressCountry: a.country };
}

export function organizationSchema() {
  const address = postalAddress();

  return compact({
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl('/skovento-transparent.png'),
    image: absoluteUrl('/skovento-transparent.png'),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address,
    geo: siteConfig.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        }
      : null,
    areaServed: siteConfig.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    knowsAbout: [...siteConfig.knowsAbout],
    sameAs: socialUrls(),
    vatID: siteConfig.gstNumber,
  });
}

/* -------------------------------------------------------------------------- */
/* WebSite                                                                     */
/* -------------------------------------------------------------------------- */

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    inLanguage: siteConfig.locale,
  };
}

/* -------------------------------------------------------------------------- */
/* FAQPage — the single most valuable schema type for AI Overviews             */
/* -------------------------------------------------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Google requires that both the question and the full answer are visible to
 * users on the page. Accordions are fine — the content just has to be in the
 * DOM. Never use FAQPage for advertising copy.
 */
export function faqSchema(items: FaqItem[]) {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}/#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* Service                                                                     */
/* -------------------------------------------------------------------------- */

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}) {
  return compact({
    '@type': 'Service',
    '@id': absoluteUrl(`/services/${opts.slug}#service`),
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: absoluteUrl(`/services/${opts.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: siteConfig.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  });
}

/* -------------------------------------------------------------------------- */
/* BreadcrumbList                                                              */
/* -------------------------------------------------------------------------- */

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* CreativeWork — for concept builds                                           */
/* -------------------------------------------------------------------------- */

/**
 * Concept builds are deliberately marked as CreativeWork, NOT as a client
 * engagement or a Review. They are self-initiated portfolio pieces. Describing
 * speculative work as delivered client work in structured data would be a
 * misrepresentation, and both Google and AI engines increasingly cross-check
 * entity claims against the wider web.
 */
export function conceptWorkSchema(opts: {
  name: string;
  description: string;
  slug: string;
  keywords?: string[];
}) {
  return compact({
    '@type': 'CreativeWork',
    '@id': absoluteUrl(`/work/${opts.slug}#work`),
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(`/work/${opts.slug}`),
    creator: { '@id': ORG_ID },
    creativeWorkStatus: 'Concept',
    keywords: opts.keywords,
    isAccessibleForFree: true,
  });
}

/* -------------------------------------------------------------------------- */
/* Graph assembly                                                              */
/* -------------------------------------------------------------------------- */

type Node = Record<string, unknown> | null | undefined;

/**
 * Wraps nodes in a single @graph. One JSON-LD block per page beats several
 * competing blocks — it lets nodes reference each other by @id and gives
 * crawlers one unambiguous signal instead of three partial ones.
 */
export function buildGraph(...nodes: Node[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

/** Convenience: the base graph every page should carry. */
export function baseGraph(...extra: Node[]) {
  return buildGraph(organizationSchema(), websiteSchema(), ...extra);
}
