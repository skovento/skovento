import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-config';

/**
 * robots.txt
 *
 * The previous file (served by Cloudflare) contained only the content-signals
 * explanatory preamble — no User-agent, no Allow/Disallow, and no Sitemap line.
 * Nothing was blocked, but nothing was guided either.
 *
 * AI crawlers are explicitly allowed. That is a deliberate business decision:
 * Skovento wants to be *found* by ChatGPT, Claude, Perplexity and Gemini, and
 * blocking Google-Extended / GPTBot / Applebot-Extended would remove the site
 * from the training and grounding data those engines draw on. A publisher
 * protecting content value might choose otherwise; an agency that wants to be
 * cited should not.
 *
 * Admin and API routes are disallowed — they have no search value and shouldn't
 * consume crawl budget.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin', '/admin/'];

  const aiCrawlers = [
    'GPTBot',          // OpenAI — training + grounding
    'OAI-SearchBot',   // ChatGPT Search index
    'ChatGPT-User',    // Live fetch when a user asks ChatGPT to visit a page
    'ClaudeBot',       // Anthropic
    'Claude-Web',
    'anthropic-ai',
    'PerplexityBot',   // Perplexity index
    'Perplexity-User',
    'Google-Extended',   // Gemini grounding / AI Overviews training
    'Applebot-Extended', // Apple Intelligence
    'cohere-ai',
    'Bytespider',
    'Amazonbot',
    'meta-externalagent',
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: 'Googlebot', allow: '/', disallow },
      { userAgent: 'Bingbot', allow: '/', disallow },
      { userAgent: aiCrawlers, allow: '/', disallow },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/\/$/, ''),
  };
}
