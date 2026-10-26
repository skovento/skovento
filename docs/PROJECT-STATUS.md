# Skovento — Project Status & Pending Tasks

Aa file ma: shu bani gayu chhe, test results, environment variables, ane **pending / blocked tasks**. Kale problem details aave tyare aa file update karo.

## 1. Stack

- Next.js 16 (App Router) + React 19 + Tailwind v4 + Framer Motion (lazy loaded)
- **Custom admin CMS** (koi Strapi / WordPress nathi): `src/lib/cms/*`, admin UI `src/app/admin`, APIs `src/app/api/admin`
- Storage: local = `.data/cms.json`; production = Postgres (`CMS_DATABASE_URL`, tables auto-create)
- Starter content: `content/*.json` (admin ma save karyā pachhi DB no data vaparay chhe)

## 2. Pages (public)

Home · Technologies · Services (category → service) · Industries (+detail) · Projects (+detail) · Case Studies (+detail) · Blog (+post) · About · Contact · Privacy · Terms · 404

## 3. Test results (production build, local)

| Check | Result |
|---|---|
| `tsc --noEmit`, `next build` | Pass (65 pages) |
| `npm audit --omit=dev` | **0 vulnerabilities** (Next 16.4.3, zod 4.6.7) |
| Lighthouse desktop (home) | Perf **100** · A11y **100** · Best Practices **100** |
| Lighthouse mobile (simulated slow 4G + 4× CPU) | Perf **81–93** · A11y **100** · BP **100** (home ≈ 86–89; LCP ≈ 3.1–3.7 s, FCP ≈ 1.0 s, TBT ≈ 110–220 ms, CLS ≈ 0) |
| SEO score 63–69 | **Intentional** — `is-crawlable` fail kyarke site noindex chhe. Indexing ON karta ~100 thase |
| Horizontal overflow @375 / 768 / 1280 | None (checked 19 routes) |
| Admin: wrong password / brute force | 401; 8 attempts pachhi 429 |
| Admin API without/tampered cookie | 401 |
| Cross-site write (wrong Origin) | 403 |
| Stored XSS in contact form → admin | Escaped (not executed) |
| Path traversal in API id | 404 |
| CSV export formula injection | Guarded |
| Security headers | nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP, CSP (frame-ancestors/base-uri/object-src/form-action), HSTS (prod), admin `no-store` |

Mobile speed: bottleneck React/Next runtime JS (~70 KB gz) simulated 4× slow CPU par. Real phones ma ghanu fast chhe. Vadhu sudharo joiye to: hero terminal animation hataavvi, fonts ghatadvana, ke Vercel ma ISR/CDN cache verify karvu.

## 4. Environment variables

`.env.example` juo (commit thay chhe). Real values `.env.local` (local) / hosting dashboard (production) ma — **kyarey git ma nahi**.

| Variable | Required | Notes |
|---|---|---|
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD_HASH` | Yes (prod) | `npm run admin:hash -- "password"` |
| `ADMIN_PASSWORD` | Local only | Production ma khali rakho |
| `ADMIN_SESSION_SECRET` | Yes | 32+ random chars (`openssl rand -hex 32`); rate-limit salt pan |
| `CMS_DATABASE_URL` | **Yes (prod)** | Postgres URL. Vagar admin save Vercel par nahi chale |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | e.g. `https://skovento.com` (canonical/sitemap) |
| `FORCE_NOINDEX` | Optional | `true` = noindex always (staging / pre-launch) |
| `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `FROM_EMAIL` | Optional | New enquiry email alert |

Juna `.env` ma je haju padya chhe (Supabase `DATABASE_URL`/`DIRECT_URL`, `ADMIN_SECRET_KEY`, `STRAPI_*`) — **have vaparata nathi**; Vercel/`.env` mathi kadhi nakho.

## 5. Pending / Blocked tasks

### Tamari decision pachhi (blocked)
- [ ] Contact email / phone / WhatsApp / address (Settings → Contact) — identity decision
- [ ] Registered company name + footer (Settings → legal entity)
- [ ] Industries final list (9 placeholder chhe)
- [ ] Real Projects ane Case Studies (hal `Sample` label vala dummy)
- [ ] Real Blog posts (3 starter; guidance `docs/CONTENT-STRATEGY.md`)
- [ ] About page ma real company facts (team size, working model)
- [ ] Privacy / Terms — lawyer / CA review (DPDP Act); employment contract ma moonlighting clause check

### Deploy / go-live
- [ ] Vercel env vars set (section 4) + `CMS_DATABASE_URL`
- [ ] Production ma admin login + test enquiry → Leads ma aave chhe e verify
- [ ] Settings ma GTM / GA4 / Search Console token nakho (juna hardcoded IDs hataavya chhe)
- [ ] Go-live: Allow indexing ON → `FORCE_NOINDEX` remove → Search Console ma sitemap submit
- [ ] Domain DNS / redirects (www → non-www)

### Technical improvements (optional / later)
- [ ] Media upload (hal cover image mate sirf URL)
- [ ] Rate limit hal in-memory (serverless ma instance-wise); Upstash/Redis mate upgrade
- [ ] Multiple admin users / password reset / audit log (hal single admin)
- [x] Logo: simple hand-built vector S + node mark (no raster / Canva dependency). Old detailed logo vault ma archive
- [ ] Automated tests (Playwright): contact form, admin login, CRUD
- [ ] Uptime + error monitoring (Sentry / Vercel Analytics)
- [ ] Mobile speed: further JS reduction (hero animation lighter)

### Cleanup
- [ ] Junu `cms/` folder (Strapi, Windows lock ne karane delete na thayu) — manually delete
- [ ] Backup `D:\Projects\skovento-legacy-backup` — jyare jarur na hoy tyare delete
- [ ] `public/final*`, `skovento_macro_*`, `skovento-transparent.png` juna images — hal vaparata nathi

## 5b. Important data vault (project ni bahar)
`D:\Projects\project-vault\skovento\important\` — repository info, env copies + changelog, legal checklist, data inventory, licenses, brand assets, source snapshot zip. Template: `D:\Projects\project-vault\_template`.

## 6. Aavti kale problem details mate

Neeche add karo:
- Projects: title, industry, services, summary, tech, real/sample
- Industries: final list + challenges/solutions
- Koi bug / UI problem: page URL + screenshot + device/width
