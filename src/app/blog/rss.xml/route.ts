import { getBlogs, getSettings } from '@/lib/content';
import { absoluteUrl, isIndexable } from '@/lib/site';

export const dynamic = 'force-static';
export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS feed of published blog posts. Empty while the site is hidden from search engines. */
export async function GET() {
  const s = await getSettings();
  const posts = isIndexable(s) ? await getBlogs() : [];
  const items = posts
    .map((b) => `<item><title>${esc(b.title)}</title><link>${absoluteUrl(s, `/blog/${b.slug}`)}</link><guid isPermaLink="true">${absoluteUrl(s, `/blog/${b.slug}`)}</guid><pubDate>${new Date(b.publishedAt).toUTCString()}</pubDate><description>${esc(b.excerpt)}</description></item>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(s.siteName)} Blog</title><link>${absoluteUrl(s, '/blog')}</link><description>${esc(s.description)}</description><language>en-IN</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
