import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/db';
import { testimonialSchema, fieldErrors } from '@/lib/validation';
import { rateLimit, clientKey } from '@/lib/rate-limit';
import { publish } from '@/lib/realtime';
import { siteConfig } from '@/lib/site-config';

/**
 * POST /api/testimonials — client-submitted reviews.
 *
 * Every submission lands as PENDING and is invisible on the public site until
 * an admin approves it. There is deliberately no way for this endpoint to
 * create an APPROVED record — not via a request field, not via a query param.
 * If it could, anyone who found the URL could publish arbitrary text to the
 * homepage under a fake company name, which is precisely the failure this
 * whole flow exists to avoid.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const limit = rateLimit(clientKey(request, 'testimonial'), {
      limit: 3,
      windowMs: 30 * 60 * 1000,
    });

    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please check the form.', fields: fieldErrors(parsed.error) },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot — respond as if successful, store nothing.
    if (data.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // One review per invite token. Without this, a shared link could be used
    // to flood the moderation queue.
    if (data.inviteToken) {
      const existing = await prisma.testimonial.findUnique({
        where: { inviteToken: data.inviteToken },
        select: { id: true },
      });
      if (existing) {
        return NextResponse.json(
          { error: 'A review has already been submitted using this link. Thank you!' },
          { status: 409 }
        );
      }
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorRole: data.authorRole || null,
        companyName: data.companyName || null,
        companyUrl: data.companyUrl || null,
        rating: data.rating,
        quote: data.quote,
        projectContext: data.projectContext || null,
        consentToPublish: data.consentToPublish,
        inviteToken: data.inviteToken || null,
        // Status is intentionally NOT settable from the request. Prisma's
        // default (PENDING) applies and cannot be overridden by the client.
      },
      select: { id: true, authorName: true, createdAt: true },
    });

    publish({
      type: 'testimonial:new',
      id: testimonial.id,
      authorName: testimonial.authorName,
      createdAt: testimonial.createdAt.toISOString(),
    });

    void notifyAdmin(data.authorName, data.companyName, data.rating);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[testimonials] Failed to record submission:', error);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again.' },
      { status: 500 }
    );
  }
}

async function notifyAdmin(
  authorName: string,
  companyName: string | undefined,
  rating: number
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !to || !from) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `New review awaiting approval — ${authorName}`,
      text: [
        `${authorName}${companyName ? ` (${companyName})` : ''} left a ${rating}-star review.`,
        '',
        'It is NOT public yet. Approve or reject it here:',
        `${siteConfig.url}/admin/testimonials`,
      ].join('\n'),
    });
  } catch (error) {
    console.error('[testimonials] Resend notification failed:', error);
  }
}
