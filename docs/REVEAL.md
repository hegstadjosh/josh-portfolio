# Launch-day reveal

Replace the placeholders below with the coordinated launch values. Keep this file placeholder-only until launch so the pre-launch repository passes the stealth grep.

## Site edits

1. In `src/app/site.ts`, replace the category-only description with:

   `Joshua Hegstad is a co-founder of <COMPANY_NAME> and studies computer science at Columbia University.`

2. In `src/app/page.tsx`, change the hero category line to `<COMPANY_NAME>` and add `<TAGLINE>` below it.
3. Replace the sentence under "What I'm building" with `I'm a co-founder of <COMPANY_NAME>.`
4. Replace the existing reveal TODO with a link to `<COMPANY_ORIGIN>`.
5. Keep the sitemap routes unchanged.

## Structured data edits

1. Give `mainEntity.worksFor` these fields: `name`, `url`, and `sameAs` using the launch values.
2. Add an `Organization` node with `@id` set to `<COMPANY_ORIGIN>/#organization`.
3. Point the Person's `worksFor.@id` at that Organization node.
4. Give the Organization a reciprocal `founder` reference to `https://www.joshhegstad.org/#person`.
5. Keep the Person's existing GitHub and LinkedIn `sameAs` values.

## Five-minute release check

1. Run `npm test`, `npm run typecheck`, and `SKIP_ENV_VALIDATION=1 npm run build`.
2. Search the build for all four launch values and confirm they appear only in the intended metadata, homepage, and structured-data locations.
3. Merge the feature branch into `main`, push, and watch the Vercel deployment.
4. Fetch the live `<head>` and JSON-LD. Confirm the company name, origin, social description, and reciprocal founder links.
5. Request indexing again for the homepage in Google Search Console.
6. Create Wikidata and Crunchbase person/company entries only after the launch post provides public citations.
