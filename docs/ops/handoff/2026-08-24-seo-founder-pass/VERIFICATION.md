# SEO founder pass verification

Verified locally on 2026-08-24 from `feat/seo-founder-pass`.

## Automated gates

- `npm test`: 3 passed, 0 failed
- `npm run typecheck`: passed
- `SKIP_ENV_VALIDATION=1 npm run lint`: passed with no warnings or errors
- `SKIP_ENV_VALIDATION=1 npm run build`: passed on Next.js 15.5.23
- Stealth grep across `src`, `public`, `docs`, `tests`, and `.next`: zero forbidden-term matches
- Rendered canonical, Open Graph, Twitter, and ProfilePage JSON-LD checks: passed
- Runtime smoke check: `/`, generated images, manifest, sitemap, robots, favicon, and `/claude-code` returned 200; `/skills` returned a permanent redirect to `/claude-code`

## Lighthouse

| Profile | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 98 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

The raw Lighthouse JSON and five-image visual trace are in this directory.

## Dependency audit

`npm audit fix` applied compatible updates, including Next.js 15.5.23 and tRPC 11.18.0. The audit fell from 22 vulnerabilities, including 2 critical, to 10 vulnerabilities with no critical findings. The remaining 5 moderate and 5 high findings require major-version upgrades to Drizzle, Vercel Blob, or Next.js and remain outside this focused change.

## Environment boundary

The local clone has no `DATABASE_URL`. Builds and local verification used `SKIP_ENV_VALIDATION=1`; no credential was invented or copied into the repository.
