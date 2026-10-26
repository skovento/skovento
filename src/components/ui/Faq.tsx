import { Icon } from '@/components/ui/Icon';
import type { Faq } from '@/types/content';

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/60">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium [&::-webkit-details-marker]:hidden sm:px-6">
            <span>{f.q}</span>
            <Icon name="ChevronDown" className="shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-muted sm:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
