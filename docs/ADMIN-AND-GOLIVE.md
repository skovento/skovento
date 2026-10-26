# Admin panel ane Go-Live guide

Admin panel Next.js ni andar j chhe (koi external CMS nathi). Address: **`/admin`**.

## Local ma chalavvu

```bash
npm install
npm run dev          # http://localhost:3000   |   admin: http://localhost:3000/admin
```

`.env.local` ma `ADMIN_EMAIL` + `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` hovu joiye (juo `.env.example`).
Local data `.data/cms.json` ma save thay chhe (git ma jatu nathi).

## Admin ma shu shu manage thay

| Jagya | Kaam |
|---|---|
| Dashboard | New leads, indexing status, tracking status |
| **Leads (CRM)** | Status, priority, assigned to, follow-up date, deal value, notes, search/filter, CSV export |
| Home / About / Contact / Legal | Pages no badho text |
| Service Categories + Services | Category → sub-service, deliverables, FAQs |
| Industries, Technology Groups | Industries ane tech stack |
| Projects, Case Studies | Real ke sample work (`Sample` toggle) |
| Blog Posts | Draft/Publish, markdown preview |
| **Site Settings** | Brand, contact, social, menu, **SEO & indexing**, **GTM / GA4 / Search Console / Pixel / Clarity** |

Navu field / navo content type: `src/lib/cms/schema.ts` ma add karo → admin form automatic banse.
Navo content public site par batavva: `src/lib/content.ts` ma read karo.

## Crawl / SEO (abhi band)

- Default: **Allow indexing = OFF** → badhe `noindex, nofollow`, `robots.txt` = `Disallow: /`, sitemap khali.
- Extra kill-switch: env `FORCE_NOINDEX=true` → admin ma ON hoy to pan noindex rahe.
- Go-live: Settings ma contact/legal bharo → **Allow indexing ON** → `FORCE_NOINDEX` hatavo → Search Console ma sitemap submit.
- `/admin` hamesha noindex + no-store.

## Production (Vercel)

1. Env vars set karo (list: `PROJECT-STATUS.md` → Environment variables).
2. **`CMS_DATABASE_URL` jaruri chhe.** Vercel par disk read-only chhe; vagar database admin ma save nahi thay.
3. Password hash: `npm run admin:hash -- "tamaro lamb password"` → output `ADMIN_PASSWORD_HASH` ma muko (ADMIN_PASSWORD khali rakho).
4. Deploy → `/admin` ma login → Settings check → test enquiry moklo → Leads ma dekhay chhe e confirm.

## Privacy

- Site ma koi person nu naam nathi. Footer ma legal entity name optional (khali = brand name).
- Email / phone / address khali chhe; Settings ma bharo tyare j dekhase.
- Git commit author tamaru naam chhe; repo private rakho.
