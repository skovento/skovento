import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { inquirySchema, fieldErrors } from '@/lib/validation';
import { rateLimit, clientKey } from '@/lib/rate-limit';
import { siteConfig } from '@/lib/site-config';

/**
 * POST /api/contact — consultation requests and contact-form submissions.
 *
 * Validated and emailed directly to studio contact.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // --- 1. Rate limit ----------------------------------------------------
    const limit = rateLimit(clientKey(request, 'contact'), {
      limit: 5,
      windowMs: 10 * 60 * 1000,
    });

    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again shortly.' },
        {
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfterSeconds) },
        }
      );
    }

    // --- 2. Validate ------------------------------------------------------
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please check the form.', fields: fieldErrors(parsed.error) },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // --- 3. Honeypot ------------------------------------------------------
    if (data.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // --- 4. Email notification --------------------------------------------
    await sendNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[contact] Failed to process inquiry:', error);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please email us directly.' },
      { status: 500 }
    );
  }
}

async function sendNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      '[contact] No email sent: RESEND_API_KEY, NOTIFICATION_EMAIL or FROM_EMAIL is missing.'
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `New enquiry — ${lead.name}${lead.service ? ` (${lead.service})` : ''}`,
      text: [
        `New enquiry via ${siteConfig.url}`,
        '',
        `Name:    ${lead.name}`,
        `Email:   ${lead.email}`,
        lead.phone ? `Phone:   ${lead.phone}` : null,
        lead.company ? `Company: ${lead.company}` : null,
        lead.service ? `Service: ${lead.service}` : null,
        '',
        'Message:',
        lead.message || '(none)',
      ]
        .filter(Boolean)
        .join('\n'),
    });
  } catch (error) {
    console.error('[contact] Resend notification failed:', error);
  }
}

