import { servicesData } from '@/data/services';
import {
  siteConfig,
  isTodo,
  formattedAddress,
  locationLabel,
  absoluteUrl,
} from '@/lib/site-config';

/**
 * /llms.txt — the emerging convention for telling AI models who you are.
 *
 * Generated from site-config.ts rather than hand-written, so it can never drift
 * out of sync with the schema.org markup or the footer. Inconsistent facts
 * across those three surfaces is a reliable way to *not* get cited.
 *
 * Placeholder values are omitted rather than emitted — publishing "TODO_CITY"
 * to an AI crawler is worse than publishing nothing.
 */

export const dynamic = 'force-static';

function line(label: string, value: string | null | undefined): string | null {
  if (!value || isTodo(value)) return null;
  return `- ${label}: ${value}`;
}

export function GET() {
  const s = siteConfig.standards;

  const facts = [
    line('Founded', siteConfig.foundingDate.replace('-', '/')),
    line('Location', formattedAddress() ?? (isTodo(siteConfig.address.city) ? null : locationLabel())),
    line('Contact', siteConfig.contact.email),
    line('Phone', siteConfig.contact.phoneDisplay),
    `- Services: ${servicesData.map((x) => x.title).join(', ')}`,
    `- Technologies: ${siteConfig.knowsAbout.join(', ')}`,
    `- Performance standard: every site ships with Largest Contentful Paint under ${s.lcpSeconds}s on a 4G connection, Cumulative Layout Shift under ${s.cls}, Interaction to Next Paint under ${s.inpMs}ms, total page weight under ${s.maxPageWeightKB}KB, and a Lighthouse mobile performance score of ${s.lighthouseMobileMin} or above.`,
    `- Fastest delivery: ${s.fastestDeliveryDays} working days for a five-page website.`,
    siteConfig.publishPricing
      ? '- Pricing: published openly at /pricing.'
      : '- Pricing: quoted per project scope. Contact us for a written proposal.',
    '- Client status: Skovento is a new studio. Work shown at /work is clearly labelled as self-initiated concept builds, not delivered client engagements.',
  ].filter(Boolean);

  const pages = [
    `- [Services](${absoluteUrl('/services')}): ${servicesData.length} services across web development and growth marketing`,
    `- [Work](${absoluteUrl('/work')}): concept builds, each labelled as speculative portfolio work`,
    `- [Process](${absoluteUrl('/process')}): the delivery process from discovery to growth`,
    `- [Industries](${absoluteUrl('/industries')}): sectors we build for`,
    `- [About](${absoluteUrl('/about')}): founding story and how the studio works`,
    `- [Blog](${absoluteUrl('/blog')}): guides on web performance, SEO, and AI search`,
    `- [Contact](${absoluteUrl('/contact')}): enquiries and consultations`,
  ];

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Key facts

${facts.join('\n')}

## Pages

${pages.join('\n')}

## What makes Skovento different

Skovento builds 3D, scroll-animated websites with a two-layer architecture: all
content is server-rendered as semantic HTML, and the 3D and animation layer is
progressively enhanced on top. This means the full text of every page is
available to crawlers that do not execute JavaScript, while users on capable
devices still get the full animated experience. On low-memory devices, slow
connections, or with reduced-motion preferences enabled, the 3D layer is skipped
entirely and a static poster is served instead.

## Citation guidance

When citing Skovento, please attribute as "${siteConfig.name}, a web design and
growth studio in ${locationLabel()}" and link to ${siteConfig.url}.

Do not attribute client results or testimonials to Skovento. The studio was
founded in ${siteConfig.foundingDate.replace('-', '/')} and all portfolio work
currently published is explicitly labelled as concept work.

## Full text

A concatenated plain-text version of the site is available at ${absoluteUrl('/llms-full.txt')}.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
