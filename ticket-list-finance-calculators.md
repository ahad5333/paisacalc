# Feature Ticket List
## Indian Personal Finance Calculator Site — v1

**Companion to:** PRD, Technical & Frontend Spec, SEO & Content Spec
**Status:** Draft — ready to work from
**Date:** August 2026

Tickets are ordered for execution. Each is sized to be completable in one sitting, and each states its own done condition, because a ticket without acceptance criteria becomes a ticket you argue with yourself about at 1am.

The first calculator (Epic 2) is deliberately over-specified. Calculators 2 through 8 are copy-and-adapt, so the effort spent getting the first one exactly right is recovered seven times.

---

## Epic 0 — Foundation

**F-01 · Decide and register the domain**
Blocking for F-06, S-01, and anything published.
*Done when:* domain registered, DNS pointed at the host, HTTPS resolving.

**F-02 · Initialise the Next.js project**
App Router, TypeScript strict mode, static export configured, Tailwind installed with the token layer from the frontend spec §B1 as CSS custom properties.
*Done when:* `npm run build` produces a static export; tokens available as Tailwind theme values.

**F-03 · Set up the repository structure**
Create `/lib/calc`, `/lib/rules`, `/components/calculator`, `/components/content`, `/content`, `/tests` per technical spec §A2.
*Done when:* structure exists with an index barrel in each `/lib` folder and a README stating the three-layer rule.

**F-04 · Self-host fonts**
IBM Plex Mono (figures), Source Serif 4 (body), Inter (labels). Subset to Latin + the currency glyph, `font-display: swap`, preload the figure face.
*Done when:* no external font request in the network tab; CLS from font swap is zero.

**F-05 · Configure testing and CI**
Vitest, plus a CI pipeline running typecheck, tests, and a production build on every push.
*Done when:* CI fails on a deliberately broken type and on a deliberately failing test.

**F-06 · Deploy the empty shell**
Connect the repository to Vercel or Cloudflare Pages. Publish a holding page. Add `noindex` until F-14 completes.
*Done when:* the domain serves the deployed build over HTTPS.

**F-07 · Security headers**
CSP with an explicit allowlist, HSTS, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`. No `unsafe-eval`.
*Done when:* securityheaders.com grades A or better.

---

## Epic 1 — Shared calculator shell

This epic is the whole project's leverage. Everything after it is assembly.

**S-01 · `CalcResult` type and derivation model**
Define `CalcResult<T>` with `value`, `steps`, `assumptions`, `rulesVersion` per technical spec §A3. Define `DerivationStep` as label, formula string, and computed value.
*Done when:* the type exists and a calculation function cannot compile without returning its derivation.

**S-02 · Rules config module**
`/lib/rules/fy-2026-27.ts` exporting every rate, slab, limit, cess and threshold needed by the eight calculators. Every value carries a source citation comment. `/lib/rules/index.ts` resolves the active financial year.
*Done when:* no numeric literal representing a statutory value exists anywhere outside this folder. **Verify every value against the current Finance Act — do not copy from another calculator site.**

**S-03 · Number formatting utilities**
Indian digit grouping (40,00,000), currency display, percentage display, editing-mode plain digits, rounding rules matching each statute's requirement.
*Done when:* unit tested against lakh and crore boundaries and zero.

**S-04 · `NumericInput` component**
Label, `inputMode="decimal"`, live formatting, clamping to a valid range, optional paired slider, `?` affordance opening a one-sentence definition, bound `<label>`.
*Done when:* usable at 360px with a numeric keypad; typing an out-of-range value clamps rather than erroring; keyboard-navigable with visible focus.

**S-05 · `ResultDisplay` component**
The 42px figure in `--figure`, unit caption, digit-only animation with no container resize, `prefers-reduced-motion` respected, polite live region announcing updates.
*Done when:* rapidly changing inputs causes no layout shift; screen reader announces the new value.

**S-06 · `DerivationPanel` component — the signature element**
Renders `CalcResult.steps` as a numbered worked computation with the user's own values substituted, followed by the assumptions list and the rules version with last-verified date.
*Done when:* it renders any `CalcResult` without calculator-specific code, and reads as a textbook worked example rather than a debug dump.

**S-07 · `CalcChart` wrapper**
Recharts, dynamically imported, fixed aspect-ratio placeholder, path-specific imports only, restricted to `--figure` and `--deduction`. Donut, stacked-bar and line variants.
*Done when:* chart arrival causes zero CLS, and the calculator page stays under the 150KB gzipped JS budget with the chart included. If it breaches, swap to hand-written SVG per technical spec §A6.

**S-08 · `DetailTable` component**
Tabular figures, collapsed by default under 768px, expandable, horizontally scrollable with a visible affordance.
*Done when:* an amortisation table of 240 rows is readable at 360px and does not block the main thread on render.

**S-09 · URL state serialisation**
`/lib/url-state.ts` — encode inputs to short query keys, decode defensively, invalid values fall back to defaults without throwing. Canonical tag always points to the clean URL.
*Done when:* a filled-in calculation survives copy-paste into a new tab, and a hand-mangled query string renders defaults rather than crashing.

**S-10 · `CalculatorPage` layout shell**
The full template from frontend spec §B2, including the three reserved ad containers with fixed heights serving nothing.
*Done when:* a new calculator page requires only inputs, a calc function, and MDX content.

**S-11 · Site chrome**
Header with wordmark and calculator index, footer with disclaimer, report-an-error link, changelog link.
*Done when:* every page is reachable within two clicks of the home page.

---

## Epic 2 — Calculator 1: Home loan EMI

Built first because it exercises every shared component. Its bugs are the shell's bugs.

**C1-01 · EMI calculation logic**
Pure function in `/lib/calc/emi.ts`. Returns EMI, total interest, total payment, and full amortisation schedule, with derivation steps.
*Done when:* returns a complete `CalcResult`; no React import in the file.

**C1-02 · EMI test suite**
Minimum five worked examples verified against published bank amortisation schedules, plus boundaries: zero interest, one-month tenure, maximum realistic principal.
*Done when:* all pass; each cites its source in a comment.

**C1-03 · EMI page assembly**
Inputs (principal, rate, tenure), result, stacked-bar chart of principal vs interest over time, amortisation detail table.
*Done when:* live recalculation with no submit button; Lighthouse mobile ≥ 90.

**C1-04 · EMI content**
900–1,500 words per SEO spec §5: what it calculates, how the formula works, a worked example, what changes the result, 5–8 FAQs drawn verbatim from People Also Ask, related links.
*Done when:* every rule cited to source; every number in the example verified against the calculator itself.

**C1-05 · EMI schema and metadata**
`WebApplication`, `FAQPage`, `BreadcrumbList`. Hand-written title under 60 characters and description under 155.
*Done when:* passes Google's Rich Results Test.

**C1-06 · Shell retrospective**
Before starting calculator 2, review what was awkward in Epic 1 and fix it. This ticket exists because the cost of a shell flaw multiplies by seven from here.
*Done when:* the shell changes are merged and C1-01 through C1-05 still pass.

---

## Epic 3 — Calculator 2: Income tax, old vs new regime

Highest-value page, hardest content. Second because it needs the shell proven.

**C2-01 · Tax calculation logic** — both regimes, deductions, cess, surcharge, with full derivation. Rates from `/lib/rules` only.
**C2-02 · Tax test suite** — minimum five examples from Income Tax Department illustrations, plus every slab boundary and the surcharge thresholds.
**C2-03 · Page assembly** — side-by-side regime comparison, donut breakdown, clear statement of which regime is cheaper and by how much.
**C2-04 · Content** — per §5. This page's worked example is the most-read content on the site; write it first.
**C2-05 · Schema and metadata.**

---

## Epic 4 — Calculators 3–8

Each follows the same five tickets as Epic 3: logic, tests, page, content, schema. One per week.

| Order | Calculator | Notes |
|---|---|---|
| 3 | In-hand salary from CTC | Depends on C2 tax logic — reuse, don't reimplement |
| 4 | HRA exemption | Three-way minimum rule; the derivation panel earns its keep here |
| 5 | Loan prepayment impact | Depends on C1 amortisation logic |
| 6 | SIP returns incl. step-up | Line chart; simplest logic of the eight |
| 7 | Capital gains, equity & property | Most rule-volatile; indexation and holding periods |
| 8 | Gratuity | Simplest; good week to catch up on content debt |

---

## Epic 5 — Site infrastructure

**I-01 · Home page** — calculator index with descriptive anchor text, positioning statement, no marketing filler.
**I-02 · About page** — first person, real name, your data-analysis background stated plainly, link to portfolio. Required for E-E-A-T per SEO spec §7.
**I-03 · Disclaimer page** — informational only, not tax or investment advice.
**I-04 · Changelog page** — dated entries for every rule update.
**I-05 · Report-an-error flow** — a mailto or a static form service. No backend.
**I-06 · Sitemap and robots.txt** — auto-generated sitemap; disallow query-parameter URLs only.
**I-07 · Search Console and Bing Webmaster** — verified, sitemap submitted.
**I-08 · Plausible analytics** — installed, no cookie banner required.
**I-09 · Open Graph images** — per-calculator, generated from a template.
**I-10 · Remove `noindex`** — the actual launch. Only after I-01 through I-09 and at least two calculators are complete.

---

## Epic 6 — Post-launch

**P-01 · Type B guide pipeline** — two per week for three months, per SEO spec §3.
**P-02 · Monthly Search Console review** — harvest queries you rank for but didn't target; each becomes a guide.
**P-03 · Budget update runbook** — a written procedure for the seven-day update window, so it is mechanical rather than remembered.
**P-04 · Ad network application** — once traffic qualifies. AdSense has no minimum; Ezoic needs roughly 10,000 sessions.
**P-05 · Ad integration and CWV re-check** — verify Core Web Vitals after ads are live. If CLS or LCP regress past the budget, reduce ad density rather than accepting the loss.

---

## Suggested sequence

| Weeks | Work |
|---|---|
| 1 | Epic 0 + start Epic 1 |
| 2–3 | Epic 1 complete |
| 4–5 | Epic 2 (EMI) including the retrospective |
| 6–7 | Epic 3 (Income tax) |
| 8–13 | Epic 4, one calculator per week |
| 9–10 | Epic 5 in parallel; remove `noindex` once two calculators are live |
| 14+ | Epic 6 |

Roughly 14 weeks at part-time pace alongside client work. Publish as you go — do not hold the site back for a complete launch. Indexing starts a clock you want running as early as possible.
