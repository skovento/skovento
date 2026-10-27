import { NextResponse } from 'next/server';
import { inquirySchema, fieldErrors, type InquiryInput } from '@/lib/validation';
import { rateLimit, clientKey } from '@/lib/rate-limit';
import { saveDoc } from '@/lib/cms/store';
import { sendEnquiryEmail } from '@/lib/mail';

/**
 * POST /api/contact — enquiry form.
 * Saves the lead into the admin panel's CRM and optionally emails a notification (SMTP, see src/lib/mail.ts).
 * The request only succeeds if at least one of the two worked, so no lead is silently lost.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function saveLead(d: InquiryInput): Promise<boolean> {
  try {
    await saveDoc('leads', {
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      name: d.name, email: d.email, phone: d.phone || '', company: d.company || '', service: d.service || '',
      budgetRange: d.budgetRange || '', preferredContact: d.preferredContact || '', message: d.message || '',
      source: d.source, pagePath: d.pagePath || '', status: 'new', priority: 'normal',
      assignedTo: '', followUpDate: '', dealValue: null, notes: '', createdAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[contact] could not store lead:', (err as Error).message);
    return false;
  }
}

const sendNotification = (d: InquiryInput) => sendEnquiryEmail(d);

export async function POST(request: Request) {
  // Refuse oversized bodies before reading them (the form never needs more than a few KB)
  if (Number(request.headers.get('content-length') ?? 0) > 50_000) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }
  const limit = rateLimit(clientKey(request, 'contact'), { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many submissions. Please try again shortly.' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the highlighted fields.', fields: fieldErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot filled: pretend success, store nothing
  if (data.website) return NextResponse.json({ success: true });

  const [saved, emailed] = await Promise.all([saveLead(data), sendNotification(data)]);
  if (!saved && !emailed) {
    console.error('[contact] No destination accepted the lead (check CMS_DATABASE_URL / storage or Resend).');
    return NextResponse.json({ error: 'We could not record your enquiry right now. Please try again shortly.' }, { status: 503 });
  }
  return NextResponse.json({ success: true });
}
