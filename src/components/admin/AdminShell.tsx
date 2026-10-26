'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export interface NavGroup { title: string; items: { label: string; href: string; badge?: number }[] }

export function AdminShell({ groups, email, siteName, children }: { groups: NavGroup[]; email: string; siteName: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  const nav = (
    <nav aria-label="Admin" className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Link href="/admin" className="font-display text-lg font-bold" onClick={() => setOpen(false)}>{siteName} <span className="text-accent-2">admin</span></Link>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-2 px-2 font-mono text-[11px] uppercase tracking-widest text-faint">{g.title}</p>
            <ul className="space-y-0.5">
              {g.items.map((i) => {
                const active = i.href === '/admin' ? pathname === '/admin' : pathname === i.href || pathname.startsWith(`${i.href}/`);
                return (
                  <li key={i.href}>
                    <Link href={i.href} onClick={() => setOpen(false)} className={cn('flex min-h-10 items-center justify-between rounded-lg px-3 text-sm transition-colors', active ? 'bg-accent/15 font-semibold text-fg' : 'text-muted hover:bg-raised hover:text-fg')}>
                      {i.label}
                      {!!i.badge && <span className="rounded-full bg-accent px-2 text-xs font-bold text-base">{i.badge}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line p-4 text-sm">
        <p className="truncate text-muted" title={email}>{email}</p>
        <div className="mt-3 flex gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="chip hover:text-fg">View site ↗</a>
          <button type="button" onClick={logout} className="chip hover:text-fg">Sign out</button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-base">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-surface lg:block">{nav}</aside>

      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-base/90 px-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="font-display font-bold">{siteName} <span className="text-accent-2">admin</span></Link>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line">
          <Icon name={open ? 'X' : 'Menu'} />
        </button>
      </div>
      {open && <div className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-surface lg:hidden">{nav}</div>}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">{children}</div>
      </main>
    </div>
  );
}
