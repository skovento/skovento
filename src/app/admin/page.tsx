import { requireAdmin } from '@/lib/admin-guard';
import { prisma } from '@/lib/db';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

/**
 * /admin — the dashboard.
 *
 * requireAdmin() is the first statement, and it is the real security boundary.
 * middleware.ts only checks that a cookie exists (the Edge runtime has no
 * node:crypto to verify a signature with), so a forged cookie would pass
 * middleware and be caught here.
 */
export default async function AdminPage() {
  await requireAdmin('/admin');

  // Left untyped on purpose: the concrete Prisma model types only exist
  // after `prisma generate`, and the dashboard consumes the serialized DTOs.
  let inquiries: unknown[] = [];
  let testimonials: unknown[] = [];
  let dbError: string | null = null;

  try {
    [inquiries, testimonials] = await Promise.all([
      prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
      prisma.testimonial.findMany({
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        take: 100,
      }),
    ]);
  } catch (error) {
    // Most likely cause on first run: migrations haven't been applied yet.
    // Say so plainly instead of throwing a 500 with no explanation.
    console.error('[admin] Database query failed:', error);
    dbError =
      error instanceof Error ? error.message : 'Could not reach the database.';
  }

  return (
    <AdminDashboard
      initialInquiries={JSON.parse(JSON.stringify(inquiries))}
      initialTestimonials={JSON.parse(JSON.stringify(testimonials))}
      dbError={dbError}
    />
  );
}
