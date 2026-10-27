// Usage:  node --env-file=.env.local scripts/mail-test.mjs
// Sends one test email with your SMTP_* settings, so you can verify them before going live.
import nodemailer from 'nodemailer';

const e = (k) => (process.env[k] ?? '').trim();
for (const k of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']) {
  if (!e(k)) { console.error(`Missing ${k} in your environment.`); process.exit(1); }
}
const port = Number(e('SMTP_PORT')) || 587;
const secure = e('SMTP_SECURE') ? e('SMTP_SECURE').toLowerCase() === 'true' : port === 465;
const t = nodemailer.createTransport({ host: e('SMTP_HOST'), port, secure, requireTLS: !secure, auth: { user: e('SMTP_USER'), pass: process.env.SMTP_PASS }, connectionTimeout: 10000, socketTimeout: 15000 });
const to = e('NOTIFICATION_EMAIL') || e('SMTP_USER');
try {
  await t.verify();
  console.log(`Login OK (${e('SMTP_HOST')}:${port}, secure=${secure}).`);
  const info = await t.sendMail({ from: e('SMTP_FROM') || e('SMTP_USER'), to, subject: 'Skovento SMTP test', text: 'If you can read this, enquiry emails will work.' });
  console.log('Sent to', to, '-', info.response);
} catch (err) {
  console.error('FAILED:', err.message);
  process.exit(1);
}
