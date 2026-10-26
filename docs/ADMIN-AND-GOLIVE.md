# Admin panel ane Go-Live guide

## Chalavvu (local)

```bash
# Terminal 1 — Admin panel / CMS (http://localhost:1337/admin)
cd cms && npm run develop

# Terminal 2 — Website (http://localhost:3000)
npm run dev
```

Pehli var CMS khule tyare **admin account banavo** (email + password). Starter content automatic import thai jay chhe.

Website ne CMS sathe jodva `.env.local` ma:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<cms/.tmp/website-leads-token.txt ni andar no token>
```

## Admin ma shu shu manage thay

| Jagya | Kaam |
|---|---|
| Site Settings | Brand, contact, social, nav, **tracking (GTM / GA4 / Search Console / Pixel / Clarity)**, **Allow indexing** |
| Home Page / About Page / Contact Page | Badho text |
| Service Category + Service | Category → sub-service, deliverables, FAQs |
| Industry, Technology Group | Industries ane tech stack |
| Project, Case Study | Sample ke real work (Is sample toggle) |
| Blog Post | Draft / Publish, SEO title + description |
| Legal Page | Privacy ane Terms |
| **Lead / Enquiry** | CRM: status, priority, assigned to, follow-up date, deal value, notes |

## Crawl / SEO (abhi band)

- Default: **Allow indexing = OFF** → badhu `noindex, nofollow`, `robots.txt` = `Disallow: /`, sitemap khali.
- Extra kill-switch: hosting env ma `FORCE_NOINDEX=true` → CMS ma ON hoy to pan header thi noindex rahe.
- Go-live vakhte: pehla Site Settings → Contact / legal entity bharo → pachhi **Allow indexing ON** (ane `FORCE_NOINDEX` hatavo).
- Tracking IDs (GTM, GA4…) admin ma nakho — tya sudhi kai load nathi thatu.

## Privacy

- Site ma koi person nu naam nathi (About ma pan nahi). Footer ma "legal entity name" optional chhe — khali hoy to brand name j dekhase.
- Contact details (email / phone / address) khali chhe — jyare decide karo tyare Site Settings ma bharo.
- Git history ma commit author tamaru naam chhe — public repo na banavo; je git ma jaay chhe te private rakho.
