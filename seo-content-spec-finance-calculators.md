# SEO & Content Specification
## Indian Personal Finance Calculator Site — v1

**Companion to:** PRD-finance-calculators.md, tech-frontend-spec-finance-calculators.md
**Status:** Draft for review
**Date:** August 2026

This is the document that determines whether the site earns anything. The code is not the hard part — eight calculators is a few weeks of work. Ranking them is twelve to eighteen months of deliberate content work, and every structural decision here is expensive to change after indexing.

---

## 1. The strategic position

You cannot outrank ClearTax, Groww, HDFC or BankBazaar on head terms like "income tax calculator". They have domain authority you will not accumulate in eighteen months, and they are the answer Google already trusts for those queries.

You can beat them on **specific situational queries**, because their pages are generic by design. A bank's EMI calculator page cannot afford to write 1,200 words about what happens when you prepay in year three versus year eight — it exists to route you into a loan application. Yours can.

So: **do not target the head term as the page's job.** Target the cluster of situations around it. The head term is a bonus you may pick up in year two once the cluster ranks.

## 2. URL structure

```
/                                   home — calculator index
/home-loan-emi/                     calculator page
/home-loan-emi/prepayment/          related deep page (v2)
/income-tax/
/guides/hra-exemption-explained/    supporting content
/changelog/
/about/  /disclaimer/  /contact/
```

Rules, all of them expensive to reverse:

- Lowercase, hyphenated, no dates, no `.html`, no query params in the canonical.
- **Trailing slash consistent site-wide.** Pick one now; a later switch means a full redirect map.
- No `/calculator/` or `/tools/` prefix segment. `/home-loan-emi/` is shorter and puts the keyword closer to the root.
- Never change a live URL. If a page must move, 301 it permanently and log it in the changelog.
- Query-string states (`?p=4000000&r=8.5`) must carry `<link rel="canonical">` pointing to the clean URL, or you will index thousands of duplicate parameter pages.

**Domain note:** still undecided, and this is now the blocking item. A subdomain of your portfolio inherits nothing useful and mixes an ad-funded property with your professional identity. A standalone domain is the right call — pick something short and category-obvious, and register it before the first page is published.

## 3. Page types

**Type A — Calculator page.** The tool plus 900–1,500 words. Targets the primary cluster. Eight of these in v1.

**Type B — Guide page.** Pure content, no tool, targeting a question too specific to justify its own calculator ("can I claim HRA if I pay rent to my parents"). These are cheap to write, rank faster than calculator pages, and exist mainly to pass internal links to Type A. Add them from month 3 once the calculators are live.

**Type C — Utility.** Changelog, about, disclaimer, contact. No ranking job. They exist because a finance site without a visible correction path, a named author, and a clear disclaimer reads as low-trust — to readers and to quality raters alike.

## 4. Keyword strategy

**Do not skip the research step.** I can tell you the shape; I cannot tell you the volumes. Before writing each page, pull actual data — Google Keyword Planner, Search Console once you have impressions, and the "People also ask" and autocomplete results for your head term. Autocomplete is free and unusually good for this category because these are questions people type in full.

For each calculator, build a cluster:

| Layer | What it is | Where it goes |
|---|---|---|
| Head | "home loan emi calculator" | H1 and title. Assume you don't rank for 18 months |
| Situational | "emi for 40 lakh home loan for 20 years" | H2 sections and worked examples |
| Mechanical | "how is home loan emi calculated formula" | The derivation section — you already have this content for free |
| Decision | "should i prepay home loan or invest" | FAQ block, or its own Type B guide |
| Edge case | "emi calculation when interest rate changes mid tenure" | FAQ. Lowest volume, highest conversion to trust |

The mechanical layer is your unfair advantage. The derivation panel is already on the page as a product feature — it also happens to be exactly the content that answers "how is X calculated", which almost no competitor page answers properly because they are hiding the formula.

## 5. Content requirements per calculator page

Below the tool, in this order:

1. **What this calculates** — 100 words, plain language, no preamble. Answers the query in the first two sentences so the page is useful to someone who bounces immediately.
2. **How the calculation works** — 250–400 words. The formula, explained, with each term defined. Cites the official source.
3. **A worked example** — real numbers, walked end to end, matching a scenario from the situational keyword layer. This is the most-read section; write it first, not last.
4. **What changes the result** — 200–300 words on the levers. This is where the situational long-tail lives.
5. **FAQ** — 5–8 questions taken verbatim from "People also ask" and autocomplete, each answered in 40–80 words. Verbatim matters: match the phrasing people actually type.
6. **Related calculators** — 2–3 contextual internal links with descriptive anchor text, never "click here".

**Writing standards.** Answer the question in the first paragraph — no "In today's fast-paced financial world". Every rule stated links to its official source. Every number in an example is checked against the calculator itself. Write for someone anxious about money, not for a keyword tool.

**On AI-assisted drafting:** use it for structure and first drafts, then verify every factual claim against the primary source yourself and rewrite in your own voice. The failure mode isn't detection — it's that unverified AI text about tax rules is confidently wrong at a rate that will eventually cost you the site.

## 6. Schema markup

Every calculator page:

- `WebApplication` or `SoftwareApplication` for the tool itself
- `FAQPage` for the FAQ block — check current eligibility before relying on it for rich results, as Google has narrowed which sites qualify
- `BreadcrumbList`
- `Article` with `author`, `datePublished`, `dateModified` on guide pages

`dateModified` must reflect real updates. Bumping it without changing content is a pattern Google detects and discounts.

## 7. E-E-A-T requirements

Financial calculators fall squarely in Your Money or Your Life territory, where Google applies its strictest quality standards. A site that looks anonymous will not rank here regardless of content quality.

Minimum:

- A real named author with a real bio and a link to your professional profile. Not "Team [SiteName]".
- An about page explaining who built this and why, in the first person.
- Citations to official sources (Income Tax Department, RBI, the relevant Act) on every rule stated.
- A visible last-verified date and a public changelog.
- A working contact route and error-report path.
- A clear disclaimer that this is informational, not advice.

Your data-analysis background is a legitimate credential for this. Say so plainly on the about page — it is the difference between an anonymous calculator farm and a site built by someone who works with numbers professionally.

## 8. Internal linking

- Home page links to all eight calculators with descriptive anchors.
- Every calculator links to 2–3 related calculators, contextually, inside the content rather than in a footer block.
- Every Type B guide links to its parent calculator with the calculator's target phrase as anchor text.
- No orphan pages. Every page reachable within two clicks of the home page.
- Vary anchor text naturally. Twenty pages linking with the identical phrase reads as manipulation.

## 9. Technical SEO checklist

- One H1 per page, containing the primary phrase.
- Title under 60 characters, description under 155, both hand-written per page — never templated.
- XML sitemap, auto-generated, submitted to Search Console.
- `robots.txt` disallowing nothing except query-parameter URLs.
- Canonical on every page, absolute URL.
- Open Graph and Twitter card tags with a per-calculator image.
- Core Web Vitals within the budget in the technical spec — this is a ranking input and your ad slots are the main threat to it.
- Search Console and Bing Webmaster Tools connected from day one, before publishing.

## 10. Publishing and update policy

**Cadence.** One calculator per week during the build, each shipping complete with its content. Never publish a calculator with placeholder or thin content — a page indexed as thin carries that assessment for months after you fix it.

**After launch:** two Type B guides per week for the first three months. Guides rank faster and pass authority inward.

**The Budget rule.** Within seven days of any Budget or Finance Act change: update `/lib/rules`, verify every affected calculator against the new provisions, update the affected content, bump `dateModified`, publish a changelog entry. This window is your single largest traffic opportunity of the year, and being three weeks late means the established sites capture all of it.

## 11. Off-site distribution

You will have near-zero organic traffic for roughly six months. Distribution during that window is manual and unglamorous:

- Answer questions on r/IndiaInvestments, r/personalfinanceindia, and Quora where your tool genuinely resolves the question. Answer the question fully in the comment first, link second. A link-only reply gets removed and damages the domain.
- Share the derivation feature specifically, not the calculator generally — "here's the actual formula with your numbers" is a reason to click; "I made a calculator" is not.
- Expect no backlinks in year one that you did not earn by being useful. Do not buy links; in YMYL this is the fastest route to a manual action.

## 12. Measurement

| Metric | Where | Review |
|---|---|---|
| Impressions and average position | Search Console | Weekly |
| Queries you rank for but haven't targeted | Search Console | Monthly — this is your best source of new page ideas |
| Pages indexed vs submitted | Search Console | Monthly |
| Sessions, time on page, entry pages | Plausible | Weekly |
| Core Web Vitals field data | Search Console | Monthly |

**The month-three signal:** impressions should be rising even if clicks are near zero. Rising impressions with flat position means Google is testing you and the content is working. Flat impressions after three months of consistent publishing means the targeting is wrong, not the timeline — go back to keyword research before writing more.

---

## Open items

1. **Domain** — now blocking. Nothing else in this document can be finalised without it.
2. **Trailing slash convention** — pick one before the first page publishes.
3. **Author identity** — confirm you're comfortable publishing under your own name with a link to your portfolio. E-E-A-T effectively requires it in this category.
