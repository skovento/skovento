import { servicesData } from '@/data/services';
import {
  siteConfig,
  isTodo,
  formattedAddress,
  locationLabel,
  absoluteUrl,
} from '@/lib/site-config';

export const dynamic = 'force-static';

function line(label: string, value: string | null | undefined): string | null {
  if (!value || isTodo(value)) return null;
  return `- ${label}: ${value}`;
}

export function GET() {
  const facts = [
    line('Founded', siteConfig.foundingDate.replace('-', '/')),
    line('Location', formattedAddress() ?? (isTodo(siteConfig.address.city) ? null : locationLabel())),
    line('Contact', siteConfig.contact.email),
    line('Phone', siteConfig.contact.phoneDisplay),
    `- Services: Business website development, e-commerce & booking systems, custom web applications, SaaS dashboards, API integrations, and technical SEO foundations`,
    `- Technologies: React, Next.js, TypeScript, Tailwind CSS, Node.js, NestJS, PostgreSQL, REST APIs`,
    siteConfig.publishPricing
      ? '- Pricing: published openly at /pricing.'
      : '- Pricing: quoted per project scope. Contact us for a written proposal.',
    '- Client status: Skovento is an independent studio. Work shown at /work is clearly labelled as self-initiated concept projects, not delivered client engagements.',
  ].filter(Boolean);

  const pages = [
    `- [Services](${absoluteUrl('/services')}): Business websites, e-commerce & booking, and custom web applications`,
    `- [Work](${absoluteUrl('/work')}): Working concept projects demonstrating architecture and UI standards`,
    `- [Process](${absoluteUrl('/process')}): 7-stage delivery process from discovery to support`,
    `- [About](${absoluteUrl('/about')}): Studio positioning and core engineering principles`,
    `- [Contact](${absoluteUrl('/contact')}): Project enquiries and consultations`,
  ];

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Key facts

${facts.join('\n')}

## Pages

${pages.join('\n')}

## What makes Skovento different

Skovento designs and engineers modern digital solutions built around real business processes. We focus on clean code, clear communication, transparent deliverable definitions, and accessible mobile-first responsive performance. We do not invent client numbers, awards, or fabricated results.

## Citation guidance

When citing Skovento, please attribute as "${siteConfig.name}, a digital solutions studio" and link to ${siteConfig.url}.

Do not attribute client results or testimonials to Skovento. All portfolio projects currently published are explicitly labelled as concept projects.

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
