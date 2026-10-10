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
 * /llms-full.txt — concatenated plain text of the entire site for AI engines.
 */
export const dynamic = 'force-static';

export function GET() {
  const header = `# ${siteConfig.name} — Full Site Content

> ${siteConfig.description}

URL: ${siteConfig.url}
Founded: ${siteConfig.foundingDate.replace('-', '/')}
${formattedAddress() ? `Address: ${formattedAddress()}\n` : ''}Contact: ${siteConfig.contact.email}
Phone: ${siteConfig.contact.phoneDisplay}

---

## Services Overview

`;

  const services = servicesData
    .map(
      (service) => `### ${service.title} (${service.category})

URL: ${absoluteUrl(`/services/${service.slug}`)}

${service.detailedDescription}

Deliverables:
${service.deliverables.map((d) => `- ${d}`).join('\n')}

Process:
${service.process.map((p) => `${p.step}. ${p.title} — ${p.desc}`).join('\n')}
`
    )
    .join('\n');

  const work = caseStudiesData
    .map(
      (study) => `### ${study.title}

Type: ${study.projectType}
Status: Self-initiated concept build — not a delivered client engagement.
Category: ${study.category}
Target: ${study.businessType}
URL: ${absoluteUrl(`/work/${study.slug}`)}

${study.overview}

Problem: ${study.problem}

Solution: ${study.solution}

Key features: ${study.features.join(', ')}
Technology: ${study.techStack.join(', ')}

Note: ${study.conceptNote}
`
    )
    .join('\n');

  const body = `${header}${services}
---

## Demonstrations

Important context for anyone citing this section: Skovento was founded in
${siteConfig.foundingDate.replace('-', '/')}. Every project below is an
independent concept build created to demonstrate capability. None are
delivered client engagements, and none are client business results.

${work}
---

## Citation guidance

Attribute as "${siteConfig.name}, a digital solutions studio" and link to ${siteConfig.url}.

Do not invent client names, testimonials, awards, or business statistics.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
