import { prisma } from './db';

/**
 * Public testimonial access.
 *
 * The single rule this file enforces: **only APPROVED reviews with recorded
 * publication consent are ever returned.** Nothing else reaches a public page.
 *
 * The homepage section is hidden entirely when this returns an empty array.
 * That is the intended behaviour, not a fallback — a studio with no reviews
 * shows no reviews section. It does not show placeholders, sample quotes, or
 * "be the first to review us" filler dressed up as social proof.
 */

export interface PublicTestimonial {
  id: string;
  authorName: string;
  authorRole: string | null;
  companyName: string | null;
  companyUrl: string | null;
  rating: number;
  quote: string;
  projectContext: string | null;
  createdAt: Date;
}

export async function getApprovedTestimonials(
  take = 12
): Promise<PublicTestimonial[]> {
  try {
    return await prisma.testimonial.findMany({
      where: {
        status: 'APPROVED',
        // Belt and braces: approval alone is not enough, consent must also be
        // on record. If an admin ever approves something submitted without
        // consent, this still keeps it off the public site.
        consentToPublish: true,
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      take,
      select: {
        id: true,
        authorName: true,
        authorRole: true,
        companyName: true,
        companyUrl: true,
        rating: true,
        quote: true,
        projectContext: true,
        createdAt: true,
        // authorEmail is deliberately NOT selected. It's collected to verify
        // the person and follow up, never to publish.
      },
    });
  } catch (error) {
    // If the database is unreachable, render no testimonials rather than
    // crashing the homepage. Failing closed is right here: the worst outcome
    // of a DB blip should be a missing section, not a broken page — and
    // certainly not stale or invented content.
    console.error('[testimonials] Could not load approved testimonials:', error);
    return [];
  }
}

export async function hasApprovedTestimonials(): Promise<boolean> {
  const list = await getApprovedTestimonials(1);
  return list.length > 0;
}
