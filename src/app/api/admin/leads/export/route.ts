import { guardApi } from '@/lib/cms/auth';
import { listDocs } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

const COLS = ['createdAt', 'name', 'email', 'phone', 'company', 'service', 'budgetRange', 'status', 'priority', 'assignedTo', 'followUpDate', 'dealValue', 'source', 'pagePath', 'message', 'notes'];

// Guard against spreadsheet formula injection and quote fields properly
const cell = (v: unknown) => {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(request: Request) {
  const denied = await guardApi(request);
  if (denied) return denied;
  const leads = await listDocs('leads');
  const rows = [COLS.join(','), ...leads.map((l) => COLS.map((c) => cell((l as Record<string, unknown>)[c])).join(','))];
  return new Response(rows.join('\r\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"` },
  });
}
