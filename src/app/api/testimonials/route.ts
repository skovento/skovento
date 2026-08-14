import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { testimonialSchema, fieldErrors } from '@/lib/validation';
import { rateLimit, clientKey } from '@/lib/rate-limit';

/**
 * POST /api/testimonials — client-submitted reviews.
 *
 * Emailed directly to studio contact.
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

    await notifyAdmin({
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      companyName: data.companyName,
      companyUrl: data.companyUrl,
      rating: data.rating,
      quote: data.quote,
      projectContext: data.projectContext,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[testimonials] Failed to record submission:', error);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again.' },
      { status: 500 }
    );
  }
}

async function notifyAdmin(review: {
  authorName: string;
  authorEmail: string;
  companyName?: string;
  companyUrl?: string;
  rating: number;
  quote: string;
  projectContext?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !to || !from) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: review.authorEmail,
      subject: `New review submitted — ${review.authorName}`,
      text: [
        `New client review from ${review.authorName}${review.companyName ? ` (${review.companyName})` : ''}:`,
        '',
        `Rating: ${review.rating}/5 stars`,
        review.projectContext ? `Project: ${review.projectContext}` : null,
        review.companyUrl ? `Website: ${review.companyUrl}` : null,
        `Email:   ${review.authorEmail}`,
        '',
        'Review Quote:',
        review.quote,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  } catch (error) {
    console.error('[testimonials] Resend notification failed:', error);
  }
}

