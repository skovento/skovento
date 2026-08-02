import { z } from 'zod';

/**
 * Input validation for every public form.
 *
 * Server-side validation is not a duplicate of the client-side checks — it's
 * the only one that counts. Anyone can POST directly to these endpoints with
 * curl, so the browser's `required` attributes are a convenience for users,
 * not a control.
 */

/** Trim and collapse whitespace before length checks so " a " isn't "valid". */
const cleanString = (min: number, max: number) =>
  z
    .string()
    .transform((s) => s.trim().replace(/\s+/g, ' '))
    .pipe(z.string().min(min).max(max));

export const inquirySchema = z.object({
  name: cleanString(2, 120),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  service: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().max(5000).optional().or(z.literal('')),
  source: z.string().trim().max(60).default('website'),
  pagePath: z.string().trim().max(300).optional().or(z.literal('')),

  /**
   * Honeypot. A field hidden from humans via CSS but visible to naive bots,
   * which fill in every input they find. Any value here means it's a bot.
   * Cheap, invisible to real users, and no CAPTCHA to solve — which matters
   * because CAPTCHAs measurably cost you real enquiries.
   */
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const testimonialSchema = z.object({
  authorName: cleanString(2, 120),
  authorEmail: z.string().trim().toLowerCase().email().max(200),
  authorRole: z.string().trim().max(120).optional().or(z.literal('')),
  companyName: z.string().trim().max(160).optional().or(z.literal('')),
  companyUrl: z
    .string()
    .trim()
    .max(300)
    .url()
    .optional()
    .or(z.literal('')),

  rating: z.coerce.number().int().min(1).max(5),

  /**
   * A 40-character floor is deliberate. One-line reviews ("Great work!") read
   * as filler and do nothing for trust — the point of this page is to collect
   * something specific enough to be believable.
   */
  quote: cleanString(40, 2000),
  projectContext: z.string().trim().max(500).optional().or(z.literal('')),

  /**
   * Explicit publication consent. A review submitted is not a review licensed
   * for public display — and the person's name and company go on a public page,
   * which makes this personal data. Recorded consent is both the decent
   * approach and the defensible one under India's DPDP Act 2023.
   */
  consentToPublish: z.literal(true, {
    message: 'We need your permission before we can publish this.',
  }),

  inviteToken: z.string().trim().max(120).optional().or(z.literal('')),
  website: z.string().max(0).optional(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

/** Turn a ZodError into a field -> message map the form can render inline. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
