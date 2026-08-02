/**
 * Domain types, declared locally rather than imported from '@prisma/client'.
 *
 * Why: Prisma's generated types only exist after `prisma generate` has run.
 * Importing enums from '@prisma/client' means the project cannot typecheck on a
 * fresh clone until someone remembers to generate — which turns a five-second
 * setup step into a wall of confusing "has no exported member" errors.
 *
 * These unions mirror the enums in prisma/schema.prisma exactly. If you change
 * one, change the other. The pairing is small enough that keeping them in sync
 * by hand is cheaper than the coupling.
 */

export const INQUIRY_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL_SENT',
  'WON',
  'LOST',
  'SPAM',
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const PRIORITIES = ['LOW', 'NORMAL', 'HIGH'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const TESTIMONIAL_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const;
export type TestimonialStatus = (typeof TESTIMONIAL_STATUSES)[number];

/** Runtime guards — these double as validation at API boundaries. */
export const isInquiryStatus = (v: unknown): v is InquiryStatus =>
  typeof v === 'string' && (INQUIRY_STATUSES as readonly string[]).includes(v);

export const isPriority = (v: unknown): v is Priority =>
  typeof v === 'string' && (PRIORITIES as readonly string[]).includes(v);

export const isTestimonialStatus = (v: unknown): v is TestimonialStatus =>
  typeof v === 'string' && (TESTIMONIAL_STATUSES as readonly string[]).includes(v);

/** Shape of an Inquiry as serialized to the client (Dates become ISO strings). */
export interface InquiryDTO {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  source: string;
  status: string;
  priority: string;
  readAt: string | null;
  adminNotes: string | null;
}

/** Shape of a Testimonial as serialized to the client. */
export interface TestimonialDTO {
  id: string;
  createdAt: string;
  authorName: string;
  authorEmail: string;
  authorRole: string | null;
  companyName: string | null;
  companyUrl: string | null;
  rating: number;
  quote: string;
  projectContext: string | null;
  status: string;
  consentToPublish: boolean;
}
