'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import type { NavLink } from '@/types/content';
import { cn } from '@/lib/utils';

interface Props {
  name: string;
  nav: NavLink[];
  categories: { slug: string; title: string; summary: string; iconNode: ReactNode }[];
  ctaLabel: string;
  ctaHref: string;
}

export function NavbarClient({ name, nav, categories, ctaLabel, ctaHref }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled || open ? 'border-b border-line bg-base/85 backdrop-blur-xl' : 'bg-transparent')}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link prefetch={false} href="/" aria-label={`${name} home`} onClick={() => setOpen(false)}>
          <Logo name={name} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((l) =>
            l.href === '/services' ? (
              <div key={l.href} className="group relative">
                <Link prefetch={false} href={l.href} className={cn('flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg', active(l.href) && 'text-fg')}>
                  {l.label}
                  <ChevronDown size={14} aria-hidden="true" className="transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="menu-panel grid grid-cols-2 gap-1 p-3">
                    {categories.map((c) => (
                      <Link prefetch={false} key={c.slug} href={`/services#${c.slug}`} className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-raised">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-base text-accent-2">
                          {c.iconNode}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{c.title}</span>
                          <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">{c.summary}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link prefetch={false} key={l.href} href={l.href} className={cn('whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg', active(l.href) && 'text-fg')}>
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          {/* wrapper hides it on phones: the unlayered .btn rule would override a `hidden` class on the link itself */}
          <div className="hidden sm:block">
            <Link prefetch={false} href={ctaHref} className="btn btn-primary !min-h-10 !px-4 !text-sm">
              {ctaLabel}
            </Link>
          </div>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-fg lg:hidden">
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-base px-4 pb-8 pt-4 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((l) => (
              <Link prefetch={false} key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn('flex min-h-12 items-center justify-between border-b border-line text-lg font-medium text-muted', active(l.href) && 'text-fg')}>
                {l.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link prefetch={false} href={ctaHref} onClick={() => setOpen(false)} className="btn btn-primary mt-6 w-full">
            {ctaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
