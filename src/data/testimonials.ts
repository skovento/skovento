export interface StaticTestimonial {
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

/**
 * Static testimonials list.
 * Keep empty when no verified client reviews exist. The homepage testimonials
 * section automatically hides itself when this array is empty.
 */
export const staticTestimonials: StaticTestimonial[] = [];
