/**
 * Homepage FAQ — shared between the visible accordion and the FAQPage JSON-LD.
 *
 * Extracted out of FAQSection.tsx so the schema is generated from exactly the
 * same source as the rendered text. Google requires that the question and the
 * full answer are visible to users on the page; keeping one source guarantees
 * they can never diverge.
 *
 * ANSWER-WRITING RULES (these are what get a page cited by AI engines):
 *
 * 1. 40–60 words. Long enough to stand alone, short enough to be extracted whole.
 * 2. Self-contained. The answer must make sense with zero surrounding context —
 *    an LLM will quote it in isolation.
 * 3. Lead with the direct answer, then qualify. Never build up to it.
 * 4. Statistics over adjectives. "under 2.5 seconds" beats "fast". Adding
 *    concrete statistics is the single highest-impact GEO technique measured.
 * 5. Name entities. Next.js, Three.js, Core Web Vitals, Google Search Console.
 *    Entities are how a model knows what you are, not just what you claim.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const homepageFaqs: Faq[] = [
  {
    question: 'What is a 3D animated website?',
    answer:
      'A 3D animated website uses WebGL and libraries such as Three.js and GSAP to render depth, motion and scroll-driven interaction directly in the browser, with no plugin or app required. Skovento builds these on Next.js so the underlying content stays fully server-rendered, fast, and readable by search engines.',
  },
  {
    question: 'How much does a custom website cost?',
    answer:
      'Cost depends on page count, custom design work and integrations. Skovento scopes every project individually and sends a written proposal with a fixed price and a fixed delivery date before any work starts, so there are no hourly surprises. Every proposal states the delivery date and the performance standard in writing.',
  },
  {
    question: 'You have no client work yet — why should I hire you?',
    answer:
      "Because we'd rather say that than invent case studies. Skovento was founded in July 2026. Instead of testimonials you cannot verify, we offer a founding-client discount, a written performance guarantee, published process, and a full refund if we miss the agreed delivery date. All of that is checkable.",
  },
  {
    question: 'How long does a website project take to launch?',
    answer:
      'A five-page website takes seven working days from kickoff to launch. A ten-page custom build with scroll animation takes about fourteen working days, and a full custom 3D build takes twenty-five to thirty. Timelines assume content and images are ready at kickoff; if we miss the agreed date, you do not pay.',
  },
  {
    question: 'Will my website be fast on Indian mobile networks?',
    answer:
      'Yes, and it is written into the contract. Every Skovento site targets a Largest Contentful Paint under 2.5 seconds on 4G, Cumulative Layout Shift under 0.1, total page weight under 800KB, and a Lighthouse mobile performance score of 90 or above. You can verify all four in Google PageSpeed Insights.',
  },
  {
    question: 'Will my new website rank on Google?',
    answer:
      'Every Skovento site ships with server-rendered HTML, schema.org structured data, an XML sitemap, canonical tags and Google Search Console verification from day one. That gives Google everything it needs to index the site properly. Ranking then depends on content and competition, which is what our SEO work addresses.',
  },
  {
    question: 'Will ChatGPT and other AI engines be able to read my website?',
    answer:
      'Only if the site is server-rendered. GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript — they read the raw HTML and move on, so content loaded client-side is invisible to them. Skovento server-renders every page and publishes an llms.txt file, which is why our own site is readable by all of them.',
  },
  {
    question: 'Do you redesign existing websites?',
    answer:
      'Yes. A redesign typically starts with a technical audit covering Core Web Vitals, mobile usability, crawlability and conversion structure. We then rebuild on Next.js, keeping your existing URLs and adding redirects where they change, so the search rankings you already have are carried across rather than lost.',
  },
  {
    question: 'Do you provide ongoing maintenance and support?',
    answer:
      'Yes. Care plans cover hosting, daily backups, security patching, uptime monitoring and a monthly allowance of content edits. Growth retainers add SEO, Google Ads and Meta Ads management with transparent monthly reporting. Both are optional — you own your site and its credentials outright either way.',
  },
  {
    question: 'Can you manage my Google Ads and Meta campaigns?',
    answer:
      'Yes. We run Google Ads, Meta Ads and local SEO campaigns, including keyword and audience research, ad copywriting, landing page builds, and conversion tracking through Google Analytics 4 and the Meta Pixel. Ad spend is billed directly to your own account and is separate from the management fee.',
  },
];
