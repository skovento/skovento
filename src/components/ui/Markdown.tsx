import type { ReactNode } from 'react';

/** Minimal, safe markdown renderer (headings, lists, bold, links). No raw HTML is ever injected. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]*\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      out.push(<strong key={k++} className="font-semibold text-fg">{tok.slice(2, -2)}</strong>);
    } else {
      const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok) as RegExpExecArray;
      out.push(<a key={k++} href={href} className="text-accent underline underline-offset-2 hover:text-accent-2">{label}</a>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, '\n').split(/\n{2,}/);
  return (
    <div className="prose-dark">
      {blocks.map((block, i) => {
        const lines = block.split('\n').filter(Boolean);
        if (!lines.length) return null;
        if (lines[0].startsWith('## ') || lines[0].startsWith('### ')) {
          const [head, ...rest] = lines;
          const level = head.startsWith('### ') ? 3 : 2;
          const text = head.replace(/^#{2,3}\s+/, '');
          const Tag = level === 3 ? 'h3' : 'h2';
          return (
            <div key={i}>
              <Tag>{text}</Tag>
              {rest.length > 0 && <Markdown source={rest.join('\n')} />}
            </div>
          );
        }
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^[-*]\s+/, ''))}</li>)}</ul>;
        }
        return <p key={i}>{inline(lines.join(' '))}</p>;
      })}
    </div>
  );
}
