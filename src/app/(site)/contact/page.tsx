import { getContactPage, getSettings } from '@/lib/content';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { locationLabel, pageMetadata, whatsappHref } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { ContactForm } from '@/components/forms/ContactForm';

export async function generateMetadata() {
  const [settings, c] = await Promise.all([getSettings(), getContactPage()]);
  return pageMetadata({ title: 'Contact Us', description: c.intro, path: '/contact', settings });
}

export default async function ContactPage() {
  const [settings, c] = await Promise.all([getSettings(), getContactPage()]);
  const ct = settings.contact;
  const wa = whatsappHref(settings);
  const location = [ct.addressLine, locationLabel(settings)].filter(Boolean).join(', ');
  const rows = [
    ct.email && { icon: 'Mail', label: 'Email', value: ct.email, href: `mailto:${ct.email}` },
    ct.phone && { icon: 'Phone', label: 'Phone', value: ct.phone, href: `tel:${ct.phone.replace(/\s/g, '')}` },
    wa && { icon: 'MessageCircle', label: 'WhatsApp', value: 'Chat on WhatsApp', href: wa },
    location && { icon: 'MapPin', label: 'Location', value: location, href: '' },
    ct.hours && { icon: 'Clock', label: 'Working hours', value: ct.hours, href: '' },
  ].filter(Boolean) as { icon: string; label: string; value: string; href: string }[];

  return (
    <>
      <PageHero eyebrow="Contact us" title={c.headline} text={c.intro} crumbs={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm serviceOptions={c.serviceOptions} budgetOptions={c.budgetOptions} />
          <aside className="space-y-4 self-start">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3"><span className="font-mono text-accent-2">01</span>We review your enquiry and reply within one business day.</li>
                <li className="flex gap-3"><span className="font-mono text-accent-2">02</span>A short discovery call to understand goals and constraints.</li>
                <li className="flex gap-3"><span className="font-mono text-accent-2">03</span>You receive a clear scope, timeline and estimate.</li>
              </ol>
            </div>
            {rows.length > 0 && (
              <div className="card space-y-4 p-6">
                {rows.map((r) => (
                  <div key={r.label} className="flex gap-3 text-sm">
                    <Icon name={r.icon} size={18} className="mt-0.5 shrink-0 text-accent-2" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-faint">{r.label}</p>
                      {r.href ? <a href={r.href} className="text-muted hover:text-fg">{r.value}</a> : <p className="text-muted">{r.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </Section>
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact' }])} />
    </>
  );
}
