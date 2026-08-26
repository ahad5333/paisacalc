# paisacalc.in

Indian personal-finance calculators that show their working — computed result, visual breakdown, and a line-by-line derivation, not just a number.

Specs, in reading order:

- [`PRD-finance-calculators.md`](./PRD-finance-calculators.md) — product scope, goals, non-goals
- [`tech-frontend-spec-finance-calculators.md`](./tech-frontend-spec-finance-calculators.md) — architecture, design system, security
- [`seo-content-spec-finance-calculators.md`](./seo-content-spec-finance-calculators.md) — URL structure, content requirements, E-E-A-T
- [`ticket-list-finance-calculators.md`](./ticket-list-finance-calculators.md) — execution-ordered backlog

See [`lib/README.md`](./lib/README.md) for the three-layer rule that `/lib/rules`, `/lib/calc`, and `/components` follow.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run test
npm run build       # static export to /out
```

## Deploying

Static export (`output: "export"` in `next.config.ts`) — deployable to Vercel or Cloudflare Pages on the free tier. Security headers live at the host layer, not in `next.config.ts` (unsupported for static export):

- Cloudflare Pages reads [`public/_headers`](./public/_headers) (copied into `out/` at build time).
- Vercel reads [`vercel.json`](./vercel.json).

Domain: **paisacalc.in**.
