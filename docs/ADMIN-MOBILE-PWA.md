# Admin app (phone / laptop) ane enquiry alerts

Admin panel have "app" tarike install thay che ane navi enquiry aave tyare phone par notification aave che. Aa **fakt admin mate** che: public website par koi install button nathi, ane install option admin login pachi j dekhay che.

## Kem kaam kare che
1. `/admin` ma login karo (mobile ke laptop).
2. Dashboard upar **"Use this admin like an app"** card dekhase.
   - **Install app** (Android Chrome / Windows-Mac Chrome / Edge): tap karo → phone ma app icon, laptop ma alag window.
   - **iPhone**: Safari ma Share → *Add to Home Screen*, pachi Home Screen vali app kholo ane *Enable alerts* dabavo (iOS 16.4+ joiye).
3. **Enable alerts** dabavo → permission Allow → *Send test* thi check karo.
4. Have website par navi enquiry aave → admin na badha alerts-enabled devices ma notification: "New enquiry — <naam>". Tap karo to Leads khule.

Internet-based j che (offline cache nathi). Login 30 divas sudhi yaad rahe che.

## Production ma karvanu (Vercel env)
| Variable | Value |
|---|---|
| `ADMIN_EMAIL` | tamaro admin email |
| `ADMIN_PASSWORD_HASH` | `npm run admin:hash -- "lamba password"` no output (`ADMIN_PASSWORD` khali) |
| `ADMIN_SESSION_SECRET` | `openssl rand -hex 32` |
| `CMS_DATABASE_URL` | Postgres URL (vagar admin save / leads / push subscriptions save nahi thay) |
| `NEXT_PUBLIC_SITE_URL` | `https://skovento.com` |
| `VAPID_PUBLIC_KEY` | `npm run vapid:generate` thi |
| `VAPID_PRIVATE_KEY` | `npm run vapid:generate` thi (secret) |
| `VAPID_SUBJECT` | `mailto:tamaro-email` |
| `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `FROM_EMAIL` | optional (email alert) |
| `FORCE_NOINDEX` | go-live sudhi `true`, pachi hatavo |

`npm run vapid:generate` ek j vaar chalavo; keys badli nakhsho to juna devices ma "Enable alerts" fari karvu padse.

## Troubleshooting
- Card ma "Alerts need VAPID keys" → VAPID env set karo ane redeploy.
- Notification na aave → phone Settings ma Chrome/app na notifications Allow; battery saver band; *Turn off* pachi *Enable alerts* fari.
- Install button na dekhay → pehla admin ma login hovu joiye; HTTPS (production) joiye; app pehla thi installed hoy to button nahi dekhay.
