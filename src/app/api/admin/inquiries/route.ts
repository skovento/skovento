import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { assertAdmin } from '@/lib/admin-guard';
import { publish } from '@/lib/realtime';
import {
  INQUIRY_STATUSES,
  isInquiryStatus,
  isPriority,
  type InquiryStatus,
  type Priority,
} from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/admin/inquiries — list, optionally filtered by status. */
export async function GET(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const take = Math.min(Number(searchParams.get('take') ?? 100) || 100, 200);

  const inquiries = await prisma.inquiry.findMany({
    where: isInquiryStatus(status) ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
    take,
  });

  return NextResponse.json(
    { inquiries },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

/** PATCH /api/admin/inquiries — update status, priority or notes. */
export async function PATCH(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : null;
  if (!id) {
    return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
  }

  // Whitelist the fields that can be written. Spreading `body` straight into
  // Prisma would let a crafted request rewrite createdAt, email, or anything
  // else on the record.
  const data: {
    status?: InquiryStatus;
    priority?: Priority;
    adminNotes?: string;
    readAt?: Date;
    respondedAt?: Date;
  } = {};

  if (isInquiryStatus(body.status)) {
    data.status = body.status;
    // Moving off NEW implies you've actually made contact — stamp it so the
    // response-time figure in the dashboard means something.
    if (body.status !== 'NEW') data.respondedAt = new Date();
  }
  if (isPriority(body.priority)) data.priority = body.priority;
  if (typeof body.adminNotes === 'string') {
    data.adminNotes = body.adminNotes.slice(0, 5000);
  }
  if (body.markRead === true) data.readAt = new Date();

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.update({ where: { id }, data });

  // Tell other open admin tabs so they don't show stale state.
  publish({ type: 'inquiry:updated', id });

  return NextResponse.json({ inquiry }, { headers: { 'Cache-Control': 'no-store' } });
}
