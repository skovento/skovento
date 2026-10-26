import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24', className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow?: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return (
    <div className={cn('mb-10 max-w-3xl sm:mb-14', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">{eyebrow}</p>}
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{text}</p>}
    </div>
  );
}
