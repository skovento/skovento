import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { Resend } from 'resend';

/**
 * Enquiry notification email.
 *
 * Preferred: any SMTP mailbox (Gmail, Hostinger, Zoho, Brevo, your own server...).
 *   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_SECURE (true for 465), SMTP_USER, SMTP_PASS
 *   SMTP_FROM            optional, e.g.  Skovento Website <hello@skovento.com>  (defaults to SMTP_USER)
 *   NOTIFICATION_EMAIL   who receives the alert (comma-separated allowed; defaults to SMTP_USER)
 *
 * Fallback: Resend (RESEND_API_KEY + NOTIFICATION_EMAIL + FROM_EMAIL), as before.
 * If neither is configured nothing is sent; the lead is still saved in the admin panel.
 */

export interface EnquiryMail {
  name: string; email: string; phone?: string; company?: string;
  service?: string; budgetRange?: string; message?: string;
}

const env = (k: string) => (process.env[k] ?? '').trim();
/** Header values must never contain line breaks (header injection). */
const oneLine = (s: string | undefined, max = 120) => (s ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export const smtpConfigured = () => !!(env('SMTP_HOST') && env('SMTP_USER') && env('SMTP_PASS'));

const g = globalThis as unknown as { __skMailer?: Transporter };

function transporter(): Transporter {
  if (g.__skMailer) return g.__skMailer;
  const port = Number(env('SMTP_PORT')) || 587;
  const secure = env('SMTP_SECURE') ? env('SMTP_SECURE').toLowerCase() === 'true' : port === 465;
  g.__skMailer = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port,
    secure,                 // true = TLS from the start (465); false = STARTTLS upgrade (587)
    requireTLS: !secure,    // never send the password over a plain connection
    auth: { user: env('SMTP_USER'), pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return g.__skMailer;
}

function content(d: EnquiryMail) {
  const subject = `New enquiry — ${oneLine(d.name, 60)}${d.service ? ` (${oneLine(d.service, 50)})` : ''}`;
  const text = [
    `Name:    ${oneLine(d.name, 200)}`,
    `Email:   ${oneLine(d.email, 200)}`,
    d.phone ? `Phone:   ${oneLine(d.phone, 60)}` : null,
    d.company ? `Company: ${oneLine(d.company, 200)}` : null,
    d.service ? `Service: ${oneLine(d.service, 200)}` : null,
    d.budgetRange ? `Budget:  ${oneLine(d.budgetRange, 100)}` : null,
    '',
    d.message || '(no message)',
    '',
    '— Sent by the Skovento website. Manage it in the admin panel: /admin/leads',
  ].filter((l): l is string => l !== null).join('\n');
  return { subject, text };
}

/** Returns true when a provider accepted the message. Never throws. */
export async function sendEnquiryEmail(d: EnquiryMail): Promise<boolean> {
  const { subject, text } = content(d);
  const replyTo = oneLine(d.email, 200);

  if (smtpConfigured()) {
    try {
      await transporter().sendMail({
        from: env('SMTP_FROM') || env('SMTP_USER'),
        to: env('NOTIFICATION_EMAIL') || env('SMTP_USER'),
        replyTo, subject, text,
      });
      return true;
    } catch (err) {
      console.error('[mail] SMTP send failed:', (err as Error).message);
      return false;
    }
  }

  const { RESEND_API_KEY: key, NOTIFICATION_EMAIL: to, FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return false;
  try {
    const { error } = await new Resend(key).emails.send({ from, to, replyTo, subject, text });
    return !error;
  } catch (err) {
    console.error('[mail] Resend failed:', (err as Error).message);
    return false;
  }
}
