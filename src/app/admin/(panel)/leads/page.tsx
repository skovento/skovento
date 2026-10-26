import { requireAdmin } from '@/lib/cms/auth';
import { listDocs } from '@/lib/cms/store';
import { LeadsTable } from '@/components/admin/LeadsTable';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  await requireAdmin();
  const leads = await listDocs('leads');
  const rows = leads.map((l) => {
    const r = l as Record<string, unknown>;
    return {
      id: l.id, name: String(r.name ?? ''), email: String(r.email ?? ''), phone: String(r.phone ?? ''), company: String(r.company ?? ''),
      service: String(r.service ?? ''), status: String(r.status ?? 'new'), priority: String(r.priority ?? 'normal'),
      assignedTo: String(r.assignedTo ?? ''), followUpDate: String(r.followUpDate ?? ''), createdAt: String(r.createdAt ?? ''),
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Leads (CRM)</h1>
          <p className="mt-1 text-sm text-muted">Every enquiry from the website. Open one to change status, assign it, set a follow-up and add notes.</p>
        </div>
        <a href="/api/admin/leads/export" className="btn btn-ghost !min-h-10 !text-sm">Export CSV</a>
      </div>
      <LeadsTable rows={rows} />
    </div>
  );
}
