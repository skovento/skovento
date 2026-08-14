import { staticTestimonials, type StaticTestimonial } from '@/data/testimonials';

export type PublicTestimonial = StaticTestimonial;

export async function getApprovedTestimonials(
  take = 12
): Promise<PublicTestimonial[]> {
  return staticTestimonials.slice(0, take);
}

export async function hasApprovedTestimonials(): Promise<boolean> {
  const list = await getApprovedTestimonials(1);
  return list.length > 0;
}

