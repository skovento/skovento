'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Inbox, Star, LogOut, RefreshCw, Mail, Phone, Building2,
  Clock, AlertTriangle, Check, X, Radio, MessageSquare,
} from 'lucide-react';
import { useRealtime } from './useRealtime';
import type { RealtimeEvent } from '@/lib/realtime';

/* Serialized-over-the-wire shapes: Dates arrive as ISO strings. */
type InquiryRow = {
  id: string; createdAt: string; name: string; email: string;
  phone: string | null; company: string | null; service: string | null;
  message: string | null; source: string; status: string; priority: string;
  readAt: string | null; adminNotes: string | null;
};

type TestimonialRow = {
  id: string; createdAt: string; authorName: string; authorEmail: string;
  authorRole: string | null; companyName: string | null; companyUrl: string | null;
  rating: number; quote: string; projectContext: string | null;
  status: string; consentToPublish: boolean;
};

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST', 'SPAM'] as const;

const STATUS_STYLE: Record<string, string> = {
  NEW: 'bg-[#C24FBE]/18 text-[#E9A8E6] border-[#C24FBE]/35',
  CONTACTED: 'bg-[#4FD1FF]/14 text-[#9BE2FF] border-[#4FD1FF]/30',
  QUALIFIED: 'bg-[#7C8CFF]/14 text-[#B6BFFF] border-[#7C8CFF]/30',
  PROPOSAL_SENT: 'bg-[#E0A32E]/14 text-[#F5D08A] border-[#E0A32E]/30',
  WON: 'bg-[#3ECF8E]/14 text-[#8FE9C2] border-[#3ECF8E]/30',
  LOST: 'bg-white/6 text-white/45 border-white/12',
  SPAM: 'bg-[#E2725B]/12 text-[#FFB4A2] border-[#E2725B]/28',
};

export function AdminDashboard({
  initialInquiries, initialTestimonials, dbError,
}: {
  initialInquiries: InquiryRow[];
  initialTestimonials: TestimonialRow[];
  dbError: string | null;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<'inquiries' | 'reviews'>('inquiries');
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [filter, setFilter] = useState<string>('ALL');
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const [a, b] = await Promise.all([
        fetch('/api/admin/inquiries').then((r) => r.json()),
        fetch('/api/admin/testimonials').then((r) => r.json()),
      ]);
      if (a.inquiries) setInquiries(a.inquiries);
      if (b.testimonials) setTestimonials(b.testimonials);
    } finally {
      setRefreshing(false);
    }
  }, []);

  /* Live updates. A new enquiry refetches and raises a toast — for a studio
     chasing its first clients, response speed is the whole game. */
  const { connected } = useRealtime(
    useCallback(
      (event: RealtimeEvent) => {
        if (event.type === 'inquiry:new') {
          setToast(`New enquiry from ${event.name}`);
          void refresh();
          setTimeout(() => setToast(null), 6000);
        }
        if (event.type === 'testimonial:new') {
          setToast(`${event.authorName} left a review — awaiting approval`);
          void refresh();
          setTimeout(() => setToast(null), 6000);
        }
        if (event.type === 'inquiry:updated') void refresh();
      },
      [refresh]
    )
  );

  const visible = useMemo(
    () => (filter === 'ALL' ? inquiries : inquiries.filter((i) => i.status === filter)),
    [inquiries, filter]
  );

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: inquiries.length,
      unread: inquiries.filter((i) => !i.readAt).length,
      new: inquiries.filter((i) => i.status === 'NEW').length,
      today: inquiries.filter((i) => now - new Date(i.createdAt).getTime() < 864e5).length,
      pendingReviews: testimonials.filter((t) => t.status === 'PENDING').length,
    };
  }, [inquiries, testimonials]);

  async function updateInquiry(id: string, patch: Record<string, unknown>) {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...(patch as Partial<InquiryRow>) } : i))
    );
    await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...patch }),
    });
  }

  async function moderate(id: string, status: 'APPROVED' | 'REJECTED') {
    const res = await fetch('/api/admin/testimonials', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setToast(json.error ?? 'Could not update that review.');
      setTimeout(() => setToast(null), 7000);
      return;
    }
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    // The public homepage is server-rendered, so it needs a revalidate to pick
    // up a newly approved review.
    router.refresh();
  }

  async function signOut() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="glass-panel mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <h1 className="font-sans text-xl font-extrabold">Skovento Admin</h1>
          <p className="mt-1 flex items-center gap-2 text-xs text-white/50">
            <Radio className={`h-3 w-3 ${connected ? 'text-[#3ECF8E] animate-live-dot' : 'text-white/30'}`} />
            {connected ? 'Live — new enquiries appear automatically' : 'Reconnecting…'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="tap-target flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/[0.1]"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={signOut}
            className="tap-target flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[#E2725B]/40 hover:text-[#FFB4A2]"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      {dbError && (
        <div className="glass-panel mb-6 flex items-start gap-3 rounded-2xl border-[#E0A32E]/30 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E0A32E]" />
          <div className="text-sm">
            <p className="font-bold text-[#F5D08A]">Database not reachable</p>
            <p className="mt-1 text-white/60">
              Most likely the migration hasn&apos;t run yet. From the project root:
            </p>
            <code className="mt-2 block rounded-lg bg-black/40 px-3 py-2 font-mono text-xs text-white/70">
              npx prisma generate &amp;&amp; npx prisma migrate dev --name init
            </code>
            <p className="mt-2 font-mono text-[11px] text-white/35">{dbError}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total enquiries" value={stats.total} icon={<Inbox className="h-4 w-4" />} />
        <Stat label="Unread" value={stats.unread} icon={<Mail className="h-4 w-4" />} accent={stats.unread > 0} />
        <Stat label="Last 24 hours" value={stats.today} icon={<Clock className="h-4 w-4" />} />
        <Stat label="Reviews to approve" value={stats.pendingReviews} icon={<Star className="h-4 w-4" />} accent={stats.pendingReviews > 0} />
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-2">
        <TabButton active={tab === 'inquiries'} onClick={() => setTab('inquiries')} count={stats.new}>
          <Inbox className="h-4 w-4" /> Enquiries
        </TabButton>
        <TabButton active={tab === 'reviews'} onClick={() => setTab('reviews')} count={stats.pendingReviews}>
          <Star className="h-4 w-4" /> Reviews
        </TabButton>
      </div>

      {tab === 'inquiries' ? (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <Chip active={filter === 'ALL'} onClick={() => setFilter('ALL')}>All</Chip>
            {STATUSES.map((s) => (
              <Chip key={s} active={filter === s} onClick={() => setFilter(s)}>
                {s.replace('_', ' ')}
              </Chip>
            ))}
          </div>

          {visible.length === 0 ? (
            <Empty
              icon={<Inbox className="h-7 w-7" />}
              title={filter === 'ALL' ? 'No enquiries yet' : `Nothing marked ${filter.replace('_', ' ').toLowerCase()}`}
              body={
                filter === 'ALL'
                  ? 'When someone submits the contact form or books a consultation, it will appear here instantly.'
                  : 'Try a different filter.'
              }
            />
          ) : (
            <div className="space-y-3">
              {visible.map((i) => (
                <InquiryCard key={i.id} inquiry={i} onUpdate={updateInquiry} />
              ))}
            </div>
          )}
        </>
      ) : testimonials.length === 0 ? (
        <Empty
          icon={<Star className="h-7 w-7" />}
          title="No reviews yet"
          body="Send a client the link below after a project. Nothing appears on the public site until you approve it here."
          link="/share-your-experience"
        />
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <ReviewCard key={t.id} testimonial={t} onModerate={moderate} />
          ))}
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="glass-panel fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl"
        >
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#3ECF8E] animate-live-dot" />
          {toast}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Stat({ label, value, icon, accent }: { label: string; value: number; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`glass-panel rounded-2xl p-4 ${accent && value > 0 ? 'border-[#C24FBE]/40' : ''}`}>
      <div className="flex items-center gap-2 text-white/45">
        {icon}
        <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className={`mt-2 font-sans text-3xl font-extrabold ${accent && value > 0 ? 'text-[#E9A8E6]' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}

function TabButton({ active, onClick, count, children }: { active: boolean; onClick: () => void; count: number; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`tap-target flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
        active ? 'bg-gradient-to-r from-[#8A2B88] to-[#C24FBE] text-white shadow-lg' : 'border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08]'
      }`}
    >
      {children}
      {count > 0 && (
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${active ? 'bg-white/25' : 'bg-[#C24FBE]/25 text-[#E9A8E6]'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
        active ? 'bg-white/15 text-white' : 'bg-white/[0.04] text-white/45 hover:bg-white/[0.08]'
      }`}
    >
      {children}
    </button>
  );
}

function Empty({ icon, title, body, link }: { icon: React.ReactNode; title: string; body: string; link?: string }) {
  return (
    <div className="glass-panel flex flex-col items-center rounded-2xl px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/40">
        {icon}
      </div>
      <h3 className="font-sans text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-white/50">{body}</p>
      {link && (
        <code className="mt-4 rounded-lg bg-black/40 px-3 py-2 font-mono text-xs text-[#E9A8E6]">
          skovento.com{link}
        </code>
      )}
    </div>
  );
}

function InquiryCard({ inquiry: i, onUpdate }: { inquiry: InquiryRow; onUpdate: (id: string, patch: Record<string, unknown>) => void }) {
  const [open, setOpen] = useState(false);
  const unread = !i.readAt;

  function toggle() {
    setOpen((v) => !v);
    if (unread) onUpdate(i.id, { markRead: true });
  }

  return (
    <div className={`glass-row rounded-2xl ${unread ? 'border-l-2 border-l-[#C24FBE]' : ''}`}>
      <button onClick={toggle} className="flex w-full items-start justify-between gap-4 p-5 text-left">
        <div className="min-w-0 flex-grow">
          <div className="flex flex-wrap items-center gap-2">
            {unread && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C24FBE]" />}
            <span className="font-sans text-base font-bold">{i.name}</span>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${STATUS_STYLE[i.status] ?? STATUS_STYLE.LOST}`}>
              {i.status.replace('_', ' ')}
            </span>
            {i.priority === 'HIGH' && (
              <span className="rounded-full border border-[#E2725B]/30 bg-[#E2725B]/12 px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#FFB4A2]">
                High
              </span>
            )}
          </div>
          <p className="mt-1.5 truncate text-sm text-white/55">
            {i.email}
            {i.service ? ` · ${i.service}` : ''}
          </p>
        </div>
        <time className="flex-shrink-0 text-xs text-white/35" dateTime={i.createdAt}>
          {relativeTime(i.createdAt)}
        </time>
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/8 px-5 pb-5 pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Detail icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={i.email} href={`mailto:${i.email}`} />
            {i.phone && <Detail icon={<Phone className="h-3.5 w-3.5" />} label="Phone" value={i.phone} href={`tel:${i.phone}`} />}
            {i.company && <Detail icon={<Building2 className="h-3.5 w-3.5" />} label="Company" value={i.company} />}
            <Detail icon={<Clock className="h-3.5 w-3.5" />} label="Received" value={new Date(i.createdAt).toLocaleString('en-IN')} />
          </div>

          {i.message && (
            <div className="rounded-xl bg-black/25 p-4">
              <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/35">
                <MessageSquare className="h-3 w-3" /> Message
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/75">{i.message}</p>
            </div>
          )}

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/35">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdate(i.id, { status: s })}
                  className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                    i.status === s ? STATUS_STYLE[s] : 'border-white/10 bg-white/[0.03] text-white/40 hover:bg-white/[0.07]'
                  }`}
                >
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={`mailto:${i.email}?subject=${encodeURIComponent('Re: your enquiry to Skovento')}`}
              className="tap-target flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8A2B88] to-[#C24FBE] px-4 py-2.5 text-sm font-bold transition-all hover:brightness-110"
            >
              <Mail className="h-4 w-4" /> Reply by email
            </a>
            {i.phone && (
              <a
                href={`https://wa.me/${i.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target flex items-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2.5 text-sm font-bold text-[#7BE8A6] transition-colors hover:bg-[#25D366]/18"
              >
                <Phone className="h-4 w-4" /> WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ testimonial: t, onModerate }: { testimonial: TestimonialRow; onModerate: (id: string, s: 'APPROVED' | 'REJECTED') => void }) {
  const pending = t.status === 'PENDING';
  return (
    <div className={`glass-row rounded-2xl p-5 ${pending ? 'border-l-2 border-l-[#E0A32E]' : ''}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-base font-bold">{t.authorName}</span>
          {t.companyName && <span className="text-sm text-white/45">· {t.companyName}</span>}
          <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="h-3.5 w-3.5" strokeWidth={2} style={{ fill: n <= t.rating ? '#E0A32E' : 'transparent', color: n <= t.rating ? '#E0A32E' : '#ffffff33' }} />
            ))}
          </span>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
          t.status === 'APPROVED' ? 'border-[#3ECF8E]/30 bg-[#3ECF8E]/12 text-[#8FE9C2]'
          : t.status === 'REJECTED' ? 'border-white/12 bg-white/5 text-white/40'
          : 'border-[#E0A32E]/30 bg-[#E0A32E]/12 text-[#F5D08A]'
        }`}>
          {t.status === 'APPROVED' ? 'Live on site' : t.status === 'REJECTED' ? 'Rejected' : 'Awaiting approval'}
        </span>
      </div>

      <blockquote className="rounded-xl bg-black/25 p-4 text-sm leading-relaxed text-white/78">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <p className="mt-3 text-xs text-white/35">
        {t.authorEmail} · {new Date(t.createdAt).toLocaleDateString('en-IN')}
        {!t.consentToPublish && (
          <span className="ml-2 font-bold text-[#FFB4A2]">· no publication consent — cannot be approved</span>
        )}
      </p>

      {t.status !== 'APPROVED' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onModerate(t.id, 'APPROVED')}
            disabled={!t.consentToPublish}
            className="tap-target flex items-center gap-2 rounded-xl bg-[#3ECF8E]/18 px-4 py-2.5 text-sm font-bold text-[#8FE9C2] transition-colors hover:bg-[#3ECF8E]/28 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Check className="h-4 w-4" /> Publish
          </button>
          {t.status !== 'REJECTED' && (
            <button
              onClick={() => onModerate(t.id, 'REJECTED')}
              className="tap-target flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-white/50 transition-colors hover:border-[#E2725B]/35 hover:text-[#FFB4A2]"
            >
              <X className="h-4 w-4" /> Reject
            </button>
          )}
        </div>
      )}
      {t.status === 'APPROVED' && (
        <button
          onClick={() => onModerate(t.id, 'REJECTED')}
          className="mt-4 text-xs font-bold text-white/35 underline underline-offset-2 hover:text-[#FFB4A2]"
        >
          Remove from site
        </button>
      )}
    </div>
  );
}

function Detail({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <p className="mb-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/35">
        {icon} {label}
      </p>
      <p className="truncate text-sm text-white/78">{value}</p>
    </>
  );
  return href ? (
    <a href={href} className="rounded-xl bg-black/20 p-3 transition-colors hover:bg-black/35">{inner}</a>
  ) : (
    <div className="rounded-xl bg-black/20 p-3">{inner}</div>
  );
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
