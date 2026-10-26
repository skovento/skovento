import type { Settings } from '@/types/content';
import { absoluteUrl, socialLinks } from '@/lib/site';

/** Organization + WebSite graph. Only includes facts that were filled in via the admin panel. */
export function baseGraph(s: Settings) {
  const sameAs = socialLinks(s).map((l) => l.href);
  const hasAddress = s.contact.city || s.contact.addressLine;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absoluteUrl(s, '/#organization'),
        name: s.legalEntityName || s.siteName,
        url: absoluteUrl(s, '/'),
        logo: absoluteUrl(s, '/brand/logo-light.png'),
        description: s.description,
        ...(s.contact.email ? { email: s.contact.email } : {}),
        ...(s.contact.phone ? { telephone: s.contact.phone } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        ...(hasAddress
          ? {
              address: {
                '@type': 'PostalAddress',
                ...(s.contact.addressLine ? { streetAddress: s.contact.addressLine } : {}),
                ...(s.contact.city ? { addressLocality: s.contact.city } : {}),
                ...(s.contact.region ? { addressRegion: s.contact.region } : {}),
                addressCountry: s.contact.country,
              },
            }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl(s, '/#website'),
        url: absoluteUrl(s, '/'),
        name: s.siteName,
        publisher: { '@id': absoluteUrl(s, '/#organization') },
      },
    ],
  };
}

export const breadcrumbs = (s: Settings, trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: absoluteUrl(s, t.path) })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
