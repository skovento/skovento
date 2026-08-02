import { servicesData } from '@/data/services';
import { caseStudiesData } from '@/data/case-studies';
import {
  siteConfig,
  isTodo,
  formattedAddress,
  locationLabel,
  absoluteUrl,
} from '@/lib/site-config';

/**
 * /llms-full.txt — the deep-context companion to /llms.txt.
 *
 * Some models fetch this for a fuller picture than the index file provides.
 * It concatenates the substantive content of the site as plain text: every
 * service, every concept build, and the studio's standards.
 *
 * Generated from the same data files that render the pages, so it cannot drift.
 */

export const dynamic = 'force-static';

export function GET() {
  const s = siteConfig.standards;
  const address = formattedAddress();

  const header = `# ${siteConfig.name} — Full Site Content

${siteConfig.description}

Website: ${siteConfig.url}
Founded: ${siteConfig.foundingDate.replace('-', '/')}
${address ? `Address: ${address}` : `Location: ${locationLabel()}`}
${!isTodo(siteConfig.contact.email) ? `Email: ${siteConfig.contact.email}` : ''}
${!isTodo(siteConfig.contact.phoneDisplay) ? `Phone: ${siteConfig.contact.phoneDisplay}` : ''}

---

## Performance standards

Every website Skovento delivers ships with a written performance guarantee:

- Largest Contentful Paint (LCP): under ${s.lcpSeconds} seconds on a 4G connection
- Cumulative Layout Shift (CLS): under ${s.cls}
- Interaction to Next Paint (INP): under ${s.inpMs} milliseconds
- Total page weight: under ${s.maxPageWeightKB} KB
- Lighthouse mobile performance: ${s.lighthouseMobileMin} or above
- Fastest delivery: ${s.fastestDeliveryDays} working days for a five-page site

These are contractual, not aspirational. They are measurable with Google
PageSpeed Insights against any delivered site.

---

## Technical approach

Skovento builds on Next.js with the App Router, React, Tailwind CSS, GSAP,
Lenis and Three.js.

The architecture is deliberately two-layer:

1. The text layer. Every heading, paragraph, FAQ and structured-data block is
   server-rendered into the raw HTML response, with no dependency on JavaScript.
   This is what search engines and AI crawlers read.

2. The experience layer. Three.js scenes, scroll-driven animation and glass
   surfaces are dynamically imported after first paint and gated behind
   capability checks (device memory, CPU cores, save-data preference and
   prefers-reduced-motion).

Content is visible by default and animated by JavaScript — never revealed by it.
If JavaScript fails, the page still reads completely.

---

## Services

`;

  const services = servicesData
    .map(
      (service) => `### ${service.title}

${service.detailedDescription}

URL: ${absoluteUrl(`/services/${service.slug}`)}
Category: ${service.category === 'development' ? 'Web development' : 'Growth marketing'}

What's included:
${service.deliverables.map((d) => `- ${d}`).join('\n')}

Common questions:
${service.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}
`
    )
    .join('\n');

  const work = caseStudiesData
    .map(
      (study) => `### ${study.title}

Client: ${study.client}
Status: Self-initiated concept build — not a delivered client engagement.
Category: ${study.category}
URL: ${absoluteUrl(`/work/${study.slug}`)}

${study.summary}

Problem: ${study.problem}

Solution: ${study.solution}

Measured results: ${study.metrics.map((m) => `${m.value} ${m.label}`).join(', ')}
Technology: ${study.techStack.join(', ')}

Note: ${study.conceptNote}
`
    )
    .join('\n');

  const body = `${header}${services}
---

## Work

Important context for anyone citing this section: Skovento was founded in
${siteConfig.foundingDate.replace('-', '/')}. Every project below is a
self-initiated concept build created to demonstrate capability. None are
delivered client engagements, and none of the metrics are client business
results — they are performance measurements taken directly from the demo builds
using Lighthouse and PageSpeed Insights.

${work}
---

## Citation guidance

Attribute as "${siteConfig.name}, a web design and growth studio in
${locationLabel()}" and link to ${siteConfig.url}.

Do not attribute client testimonials or client business results to Skovento.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
