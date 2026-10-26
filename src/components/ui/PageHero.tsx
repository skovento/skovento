import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Section';

export function PageHero({ eyebrow, title, text, crumbs, children }: {
  eyebrow?: string; title: string; text?: string; crumbs?: { name: string; href?: string }[]; children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-faint">
            {crumbs.map((c, i) => (
              <span key={c.name} className="flex items-center gap-2">
                {c.href ? <Link href={c.href} className="hover:text-fg">{c.name}</Link> : <span className="text-muted">{c.name}</span>}
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>}
        {children}
      </Container>
    </header>
  );
}
