# Enquiry email alerts via SMTP

Website na contact form ma navi enquiry aave tyare (1) admin ma Leads ma save thay che, ane (2) `NOTIFICATION_EMAIL` par email jay che. Email SMTP thi jay che (`src/lib/mail.ts`). Email na jay to pan lead save thay j che.

## Setup (1 vaar, laptop par)
```
npm install nodemailer
npm install -D @types/nodemailer
```
(`package.json` ane `package-lock.json` banne update thase; banne commit karo, nahi to Vercel build fail thase.)

## Env variables
| Name | Value |
|---|---|
| `SMTP_HOST` | provider no host (niche table) |
| `SMTP_PORT` | `465` (SSL) ke `587` (STARTTLS) |
| `SMTP_SECURE` | `true` jo port 465; `false` jo port 587 |
| `SMTP_USER` | mailbox no full email |
| `SMTP_PASS` | mailbox password / app password |
| `SMTP_FROM` | optional: `Skovento Website <hello@skovento.com>` (khali = `SMTP_USER`) |
| `NOTIFICATION_EMAIL` | alert kone malvo joiye (comma thi ghana email chale; khali = `SMTP_USER`) |

| Provider | Host | Port / Secure | Password |
|---|---|---|---|
| Gmail | `smtp.gmail.com` | 465 / true | **App Password** (Google account ma 2-Step Verification ON karine banavo; normal password nahi chale) |
| Hostinger email | `smtp.hostinger.com` | 465 / true | mailbox no password |
| Zoho | `smtp.zoho.in` (ke `.com`) | 465 / true | app password |
| Brevo | `smtp-relay.brevo.com` | 587 / false | SMTP key |

Port 25 Vercel par band hoy che; 465 ke 587 j vaparo. Jo `SMTP_HOST/USER/PASS` set nathi, to juno Resend (`RESEND_API_KEY`, `FROM_EMAIL`) vaparay che.

## Pehla test karo (laptop)
`.env.local` ma `SMTP_*` bharo, pachi:
```
node --env-file=.env.local scripts/mail-test.mjs
```
"Login OK" ane "Sent to ..." aave to settings sahi che. Pachi Vercel ma same env add karo ane redeploy.

## Dhyan
- `SMTP_PASS` kyarey GitHub ma commit nahi karvo.
- Gmail mate `SMTP_FROM` tamaro j Gmail address rakho (bija address ne Gmail badli nakhe che).
- Spam ma jay to `SMTP_FROM` tamara domain no rakho ane domain ma SPF/DKIM set karo.
