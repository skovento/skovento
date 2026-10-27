import { NextResponse } from 'next/server';
import { guardApi } from '@/lib/cms/auth';
import { listDocs } from '@/lib/cms/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Read by the service worker when a push arrives: what to show in the notification. Needs the admin cookie. */
export async function GET(request: Request) {
  const denied = await guardApi(request);
  if (denied) return denied;
  const leads = (await listDocs('leads')).filter((l) => l.status === 'new').sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const top = leads[0];
  if (!top) return NextResponse.json({ count: 0, title: 'Skovento admin', body: 'No new enquiries.', url: '/admin/leads' });
  const detail = [top.service, top.company].filter((x) => typeof x === 'string' && x).join(' · ') || String(top.message ?? '').slice(0, 90);
  return NextResponse.json({
    count: leads.length,
    title: `New enquiry — ${String(top.name ?? 'Someone').slice(0, 60)}`,
    body: `${detail}${leads.length > 1 ? `  (+${leads.length - 1} more new)` : ''}`.trim() || 'Open the admin to view.',
    url: '/admin/leads',
  });
}
