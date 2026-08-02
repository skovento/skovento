import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { assertAdmin } from '@/lib/admin-guard';
import { isTestimonialStatus, type TestimonialStatus } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/admin/testimonials — the moderation queue. */
export async function GET(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  const testimonials = await prisma.testimonial.findMany({
    where: isTestimonialStatus(status) ? { status } : undefined,
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    take: 200,
  });

  return NextResponse.json(
    { testimonials },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

/** PATCH /api/admin/testimonials — approve, reject, reorder, annotate. */
export async function PATCH(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : null;
  if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 });

  const data: {
    status?: TestimonialStatus;
    displayOrder?: number;
    adminNotes?: string;
  } = {};

  if (isTestimonialStatus(body.status)) data.status = body.status;
  if (Number.isInteger(body.displayOrder)) data.displayOrder = body.displayOrder;
  if (typeof body.adminNotes === 'string') {
    data.adminNotes = body.adminNotes.slice(0, 2000);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 });
  }

  // Guard: a review can only be approved if the person actually consented to
  // publication. Without this, one careless click puts someone's name and
  // company on a public page without permission.
  if (data.status === 'APPROVED') {
    const existing = await prisma.testimonial.findUnique({
      where: { id },
      select: { consentToPublish: true },
    });
    if (!existing?.consentToPublish) {
      return NextResponse.json(
        {
          error:
            'This review cannot be published: the author did not give consent. Ask them to resubmit with the consent box ticked.',
        },
        { status: 422 }
      );
    }
  }

  const testimonial = await prisma.testimonial.update({ where: { id }, data });

  return NextResponse.json(
    { testimonial },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
