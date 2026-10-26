'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface Row { id: string; name: string; email: string; phone: string; company: string; service: string; status: string; priority: string; assignedTo: string; followUpDate: string; createdAt: string }

const STATUSES = ['all', 'new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost', 'spam'];
const tone: Record<string, string> = {
  new: 'border-accent text-accent', contacted: 'text-fg', qualified: 'border-accent-2 text-accent-2', proposal_sent: 'border-violet text-violet',
  won: 'border-ok text-ok', lost: 'text-faint', spam: 'text-faint line-through',
};

export function LeadsTable({ rows }: { rows: Row[] }) {
  const [status, setStatus] = useState('all');
  const [q, setQ] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => (status === 'all' || r.status === status) && (!needle || [r.name, r.email, r.company, r.service, r.phone].some((v) => v.toLowerCase().includes(needle))));
  }, [rows, status, q]);

  const count = (s: string) => (s === 'all' ? rows.length : rows.filter((r) => r.status === s).length);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button key={s} type="button" role="tab" aria-selected={status === s} onClick={() => setStatus(s)} className={`chip !text-[13px] capitalize ${status === s ? '!border-accent !bg-accent/15 !text-fg' : ''}`}>
              {s.replace('_', ' ')} <span className="text-faint">{count(s)}</span>
            </button>
          ))}
        </div>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, company…" aria-label="Search leads" className="ad-input sm:max-w-xs" />
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-muted">{rows.length === 0 ? 'No enquiries yet. They appear here when someone submits the contact form.' : 'No leads match this filter.'}</p>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((r) => {
              const overdue = r.followUpDate && r.followUpDate < today && !['won', 'lost', 'spam'].includes(r.status);
              return (
                <li key={r.id}>
                  <Link href={`/admin/content/leads/${r.id}`} className="grid gap-2 px-5 py-4 transition-colors hover:bg-raised/60 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center">
                    <span className="min-w-0">
                      <span className="flex items-center gap-2"><span className="truncate font-medium">{r.name}</span>{r.priority === 'high' && <span className="ad-badge !border-[#ff8a8a]/50 text-[#ff9b9b]">high</span>}</span>
                      <span className="block truncate text-xs text-faint">{[r.company, r.email].filter(Boolean).join(' · ')}</span>
                    </span>
                    <span className="min-w-0 text-sm text-muted">
                      <span className="block truncate">{r.service || '—'}</span>
                      <span className={`block truncate text-xs ${overdue ? 'text-[#ff9b9b]' : 'text-faint'}`}>
                        {r.followUpDate ? `Follow-up ${r.followUpDate}${overdue ? ' (overdue)' : ''}` : new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {r.assignedTo ? ` · ${r.assignedTo}` : ''}
                      </span>
                    </span>
                    <span className={`ad-badge justify-self-start sm:justify-self-end ${tone[r.status] ?? ''}`}>{r.status.replace('_', ' ')}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
