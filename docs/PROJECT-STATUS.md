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
| Lighthouse **desktop** (home, about) | Performance **100** · Accessibility **100** · Best Practices **100** |
| Lighthouse **mobile** (simulated slow 4G + 4x slower CPU) | Performance **90–96** (home 95–96, inner pages 92–96) · Accessibility **100** · Best Practices **100**; CLS 0, TBT 50–150 ms, FCP 1.2 s, LCP 2.7–2.9 s |
| SEO score | **100** on every page tested when indexing is ON (home, service page, desktop). Hal **69** kemke site noindex chhe (`is-crawlable` ek j fail) |
| SEO audit (58 pages) | 0 issues: unique title (<=60) ane description (110-160), exactly one h1, canonical, og:image, alt text; JSON-LD valid (Organization, WebSite, BreadcrumbList, Service, FAQPage, Article) |
| Horizontal overflow @375 / 768 / 1280 | None (checked 19 routes) |
| Admin: wrong password / brute force | 401; 8 attempts pachhi 429 |
| Admin API without/tampered cookie | 401 |
| Cross-site write (wrong Origin) | 403 |
| Stored XSS in contact form → admin | Escaped (not executed) |
| Path traversal in API id | 404 |
| CSV export formula injection | Guarded |
| Security headers | nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP, CSP (frame-ancestors/base-uri/object-src/form-action), HSTS (prod), admin `no-store` |

Mobile 100 kem nathi: real LCP ~0.3 s chhe (Lighthouse pote measure kare chhe), pan Lighthouse ni *simulated* slow-phone model ma Next.js/React runtime JS (~160 KB gz) ni download + CPU time LCP ma ~1.5 s umere chhe. Eni upar kam karyu: framer-motion hataavyu, hero ane scroll animation CSS-only, system body font (sirf headings Bricolage), unused libs/icons hataavya, background prefetch band, CSS/JS minimal. Have 100 mate fakt "no-JS static HTML" architecture j bake rahe chhe (React hydration vagar) — te bahu motu change chhe. Google PageSpeed (live, Vercel CDN) ma ghani vaar numbers local karta saara aave chhe.

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
- [ ] Media upload (hal image mate `/images/...` file ke URL; admin ma file upload nathi)
- [ ] Rate limit hal in-memory (serverless ma instance-wise); Upstash/Redis mate upgrade
- [ ] Multiple admin users / password reset / audit log (hal single admin)
- [x] Logo FINAL: Icon E5 (S + check-mark V) + Bricolage Grotesque, hand-built vector. Files `public/brand/`, sources + Canva links vault ma (`assets/brand/BRAND-INDEX.md`)
- [ ] Automated tests (Playwright): contact form, admin login, CRUD
- [ ] Uptime + error monitoring (Sentry / Vercel Analytics)
- [ ] Mobile speed: further JS reduction (hero animation lighter)

### Cleanup
- [ ] Junu `cms/` folder (Strapi, Windows lock ne karane delete na thayu) — manually delete
- [ ] Backup `D:\Projects\skovento-legacy-backup` — jyare jarur na hoy tyare delete
- [ ] `public/final*`, `skovento_macro_*`, `skovento-transparent.png` juna images — hal vaparata nathi

## 5a-1. Images (stock photos)
- 13 Pexels photos (free commercial license): 9 industries, About, 3 blog covers — `public/images/`, credits `docs/IMAGE-CREDITS.md`.
- next/image: AVIF/WebP, correct sizes, lazy-load, fixed aspect (CLS 0). Detail-page hero photos phone par chhupayela (LCP mate); desktop par dekhay.
- Admin ma Image URL + alt text fields (Industries, Projects, Case Studies, Blog, About).

## 5a. First-visit logo intro (loader)
- Component: `src/components/brand/SiteLoader.tsx` (+ `LoaderDismiss.tsx`, CSS `#sk-loader` in `globals.css`, paths `src/lib/brand-paths.ts`).
- Logo draw animation (~2.5 s): S → check-mark V → wordmark → fade. Pure CSS, server-rendered (no flash).
- Sirf **first visit** (localStorage `sk_seen`). Skip: click / key / Skip button. Off for returning visitors, `prefers-reduced-motion`, crawlers, Lighthouse, headless.
- Test karva: `/?loader=1` (flag reset kari fari batave). Band karva: `(site)/layout.tsx` ma `<SiteLoader />` hataavo.

## 5b. Important data vault (project ni bahar)
`D:\Projects\project-vault\skovento\important\` — repository info, env copies + changelog, legal checklist, data inventory, licenses, brand assets, source snapshot zip. Template: `D:\Projects\project-vault\_template`.

## 6. Aavti kale problem details mate

Neeche add karo:
- Projects: title, industry, services, summary, tech, real/sample
- Industries: final list + challenges/solutions
- Koi bug / UI problem: page URL + screenshot + device/width
