/**
 * Core domain types for Skovento.
 */

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  source?: string;
  pagePath?: string;
  website?: string; // honeypot
}

export interface ReviewSubmissionPayload {
  authorName: string;
  authorEmail: string;
  authorRole?: string;
  companyName?: string;
  companyUrl?: string;
  rating: number;
  quote: string;
  projectContext?: string;
  consentToPublish: boolean;
  website?: string; // honeypot
}
