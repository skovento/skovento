# Skovento CMS (Strapi 5)

Admin panel for the whole website. See `../docs/ADMIN-AND-GOLIVE.md` for the full guide.

```bash
npm install
npm run develop      # http://localhost:1337/admin
```

- Content types live in `src/api/*`, reusable blocks in `src/components/*`.
- On the first start, `src/index.ts` imports starter content from `../content/*.json` (only when the CMS is empty) and creates the `website-leads` API token (saved to `.tmp/website-leads-token.txt`).
- Secrets are read from `.env` (never commit it). Use PostgreSQL in production via `DATABASE_CLIENT=postgres` + `DATABASE_URL`.
