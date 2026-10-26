import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import type { Settings } from '@/types/content';

export function CtaBand({ settings, title = 'Have a project in mind?', text = 'Tell us what you are trying to build. We will come back with clear next steps, usually within one business day.' }: { settings: Settings; title?: string; text?: string }) {
  return (
    <Section className="pt-0 sm:pt-0">
      <div className="card bg-glow relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={settings.cta.primaryHref} className="btn btn-primary">{settings.cta.primaryLabel}<Icon name="ArrowRight" size={18} /></Link>
          <Link href={settings.cta.secondaryHref} className="btn btn-ghost">{settings.cta.secondaryLabel}</Link>
        </div>
      </div>
    </Section>
  );
}
