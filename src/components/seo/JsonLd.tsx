import React from 'react';

/**
 * Renders a JSON-LD structured-data block into the document.
 *
 * Deliberately a plain <script> tag rather than next/script: next/script with
 * an `afterInteractive` strategy injects the tag with JavaScript, which means
 * crawlers that don't execute JS never see it. GPTBot, ClaudeBot and
 * PerplexityBot all fall into that category — they fetch raw HTML and move on.
 *
 * A plain script tag rendered by a Server Component is present in the initial
 * HTML response, which is exactly what those crawlers read.
 *
 * The content is our own data, not user input, so dangerouslySetInnerHTML is
 * safe here. We still escape `<` to prevent any string in the data from
 * prematurely closing the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
