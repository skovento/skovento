import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/db';
import { inquirySchema, fieldErrors } from '@/lib/validation';
import { rateLimit, clientKey, hashIp } from '@/lib/rate-limit';
import { publish } from '@/lib/realtime';
import { siteConfig } from '@/lib/site-config';

/**
 * POST /api/contact — consultation requests and contact-form submissions.
 *
 * WHAT CHANGED AND WHY IT MATTERED:
 * The previous version of this file did exactly one thing with a submission:
 *
 *     console.log('Received Skovento Lead:', { name, email, ... });
 *
 * It then returned success. Nothing was stored, nothing was emailed. Every
 * enquiry the site received went to a log stream and was discarded, while the
 * visitor saw a confirmation message. For a studio actively trying to land its
 * first client, that was the most expensive bug on the site.
 *
 * Now: validated, persisted, emailed, and pushed to the admin panel live.
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
    // A bot filled the hidden field. Return 200 so it believes it succeeded and
    // doesn't retry with another strategy — but store nothing.
    if (data.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // --- 4. Persist -------------------------------------------------------
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        message: data.message || null,
        source: data.source || 'website',
        pagePath: data.pagePath || null,
        userAgent: request.headers.get('user-agent')?.slice(0, 400) ?? null,
        // Hashed, never the raw IP — see rate-limit.ts for the reasoning.
        ipHash: hashIp(request),
        referrer: request.headers.get('referer')?.slice(0, 400) ?? null,
      },
      select: { id: true, name: true, createdAt: true },
    });

    // --- 5. Push to any open admin panel ----------------------------------
    publish({
      type: 'inquiry:new',
      id: inquiry.id,
      name: inquiry.name,
      createdAt: inquiry.createdAt.toISOString(),
    });

    // --- 6. Email notification --------------------------------------------
    // After the DB write, and deliberately non-fatal. If Resend is down or
    // misconfigured, the lead is already safely stored. Losing a notification
    // is recoverable; losing the lead is not.
    void sendNotification({
      id: inquiry.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
    });

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 200 });
  } catch (error) {
    console.error('[contact] Failed to record inquiry:', error);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please email us directly.' },
      { status: 500 }
    );
  }
}

async function sendNotification(lead: {
  id: string;
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
      '[contact] Lead stored, but no email sent: RESEND_API_KEY, NOTIFICATION_EMAIL or FROM_EMAIL is missing.'
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      // Reply-To means hitting reply in your inbox goes straight to the lead,
      // which removes a step from the fastest-response path.
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
        '',
        `Open in admin: ${siteConfig.url}/admin/inquiries`,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  } catch (error) {
    console.error('[contact] Resend notification failed:', error);
  }
}
