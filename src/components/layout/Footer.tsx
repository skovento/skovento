import Link from 'next/link';
import { getServiceCategories } from '@/lib/content';
import { Container } from '@/components/ui/Section';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import { locationLabel, socialLinks, whatsappHref } from '@/lib/site';
import type { Settings } from '@/types/content';

const company: [string, string][] = [
  ['Technologies', '/technologies'],
  ['Industries', '/industries'],
  ['Projects', '/projects'],
  ['Case Studies', '/case-studies'],
  ['Blog', '/blog'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export async function Footer({ settings }: { settings: Settings }) {
  const cats = await getServiceCategories();
  const c = settings.contact;
  const socials = socialLinks(settings);
  const wa = whatsappHref(settings);
  const location = locationLabel(settings);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/50">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label={`${settings.siteName} home`}>
            <Logo name={settings.siteName} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{settings.footerTagline}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="chip hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Services">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">Services</h3>
          <ul className="text-sm">
            {cats.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/services#${cat.slug}`} className="inline-block py-2 text-muted hover:text-fg">
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">Company</h3>
          <ul className="text-sm">
            {company.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="inline-block py-2 text-muted hover:text-fg">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">Contact</h3>
          <ul className="space-y-1 text-sm text-muted">
            {c.email && (
              <li className="flex gap-2">
                <Icon name="Mail" size={16} className="mt-0.5 shrink-0 text-accent-2" />
                <a href={`mailto:${c.email}`} className="inline-block py-1.5 hover:text-fg">{c.email}</a>
              </li>
            )}
            {c.phone && (
              <li className="flex gap-2">
                <Icon name="Phone" size={16} className="mt-0.5 shrink-0 text-accent-2" />
                <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="inline-block py-1.5 hover:text-fg">{c.phone}</a>
              </li>
            )}
            {wa && (
              <li className="flex gap-2">
                <Icon name="MessageCircle" size={16} className="mt-0.5 shrink-0 text-accent-2" />
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-fg">WhatsApp</a>
              </li>
            )}
            {(location || c.addressLine) && (
              <li className="flex gap-2">
                <Icon name="MapPin" size={16} className="mt-0.5 shrink-0 text-accent-2" />
                <span>{[c.addressLine, location].filter(Boolean).join(', ')}</span>
              </li>
            )}
            {c.hours && (
              <li className="flex gap-2">
                <Icon name="Clock" size={16} className="mt-0.5 shrink-0 text-accent-2" />
                <span>{c.hours}</span>
              </li>
            )}
            <li>
              <Link href="/contact" className="inline-flex min-h-10 items-center gap-1 font-medium text-accent hover:text-accent-2">
                Send an enquiry <Icon name="ArrowRight" size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>© {year} {settings.legalEntityName || settings.siteName}. All rights reserved.</p>
          <p className="flex gap-5 sm:gap-6">
            <Link href="/privacy" className="inline-block py-3 hover:text-fg">Privacy Policy</Link>
            <Link href="/terms" className="inline-block py-3 hover:text-fg">Terms</Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
