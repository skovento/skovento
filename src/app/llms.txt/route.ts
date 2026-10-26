import { getAllServices, getIndustries, getSettings } from '@/lib/content';
import { absoluteUrl, isIndexable } from '@/lib/site';

export const dynamic = 'force-static';
export const revalidate = 3600;

/** /llms.txt — a plain-text map of the site for AI assistants. Only served once indexing is switched on. */
export async function GET() {
  const s = await getSettings();
  if (!isIndexable(s)) return new Response('Not found', { status: 404 });
  const [services, industries] = await Promise.all([getAllServices(), getIndustries()]);
  const lines = [
    `# ${s.siteName}`,
    '',
    `> ${s.description}`,
    '',
    '## Services',
    ...services.map((x) => `- [${x.title}](${absoluteUrl(s, `/services/${x.categorySlug}/${x.slug}`)}): ${x.summary}`),
    '',
    '## Industries',
    ...industries.map((i) => `- [${i.title}](${absoluteUrl(s, `/industries/${i.slug}`)}): ${i.summary}`),
    '',
    '## More',
    `- [About](${absoluteUrl(s, '/about')})`,
    `- [Blog](${absoluteUrl(s, '/blog')})`,
    `- [Contact](${absoluteUrl(s, '/contact')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
