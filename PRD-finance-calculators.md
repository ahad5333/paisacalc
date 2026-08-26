# Product Requirements Document
## Indian Personal Finance Calculator Site — v1

**Owner:** Ahad
**Status:** Draft for review
**Date:** August 2026

---

## 1. Problem

People searching for Indian personal-finance answers ("how much tax under new regime", "EMI for 40 lakh home loan", "SIP returns for 10 years") land on pages that fall into two groups:

- **Bank and fintech calculators** — accurate but stripped down. A single number, no breakdown, no explanation of the rule behind it, and heavy upsell into the host's own products.
- **Content farms** — thin explanatory text wrapped around a generic calculator widget, often out of date after the latest Budget.

Neither answers the actual question, which is usually not "what is the number" but "why is it that number, and what changes it".

## 2. Product

A focused set of Indian personal-finance calculators where each tool returns a **computed result, a visual breakdown, and a plain-language explanation of the rule applied** — with the underlying assumptions shown, not hidden.

The differentiator is transparency and explanation quality, not calculator count.

## 3. Goals

| Goal | Metric | Target |
|---|---|---|
| Organic discovery | Monthly organic sessions | 25,000 by month 9; 100,000 by month 18 |
| Content quality signal | Avg. time on page | > 90 seconds |
| Tool usefulness | Calculator interaction rate | > 60% of page sessions |
| Revenue | Monthly ad revenue | Ad network approval by month 6; ₹25,000–60,000/mo at 100K sessions |
| Cost discipline | Monthly infra cost | Under ₹1,000 at any traffic level in v1 |

## 4. Non-goals (v1)

Explicitly out of scope, to protect the timeline:

- User accounts, login, saved calculations
- Any backend service or database
- Mobile apps
- Paid tier or premium features
- Personalised advice, recommendations, or product comparison
- Multi-language support (English only in v1)

## 5. Target users

**Primary — the salaried filer.** Age 25–45, urban India, filing their own return or checking their employer's computation. Peaks Jan–Jul. Searches in English, often on mobile, often from a work break. Wants to verify a number someone else calculated.

**Secondary — the loan evaluator.** Considering or servicing a home/car loan. Searches year-round. Higher intent, higher advertiser value. Wants to test scenarios: what if I prepay, what if the tenure changes.

**Tertiary — the new investor.** Running SIP and goal projections. Youngest segment, highest share rate, lowest ad value.

## 6. v1 scope

Ship **eight calculators**, not twenty. Eight is enough to establish topical authority in one cluster while keeping the quality bar high on each; twenty shallow tools rank worse than eight good ones and take three times as long to write content for.

### Launch set

| # | Calculator | Why it's in v1 |
|---|---|---|
| 1 | Income tax — old vs new regime comparison | Highest volume, highest intent, best explanation opportunity |
| 2 | In-hand salary from CTC | Extremely high volume, poorly served by existing tools |
| 3 | Home loan EMI + amortisation schedule | Highest advertiser value of the set |
| 4 | Loan prepayment impact | Natural follow-on from #3; almost no good free version exists |
| 5 | HRA exemption | High volume, genuinely confusing rule, strong explanation angle |
| 6 | SIP returns (incl. step-up) | High volume, high share rate |
| 7 | Capital gains — equity & property | Complex, high value, rule changes often |
| 8 | Gratuity | Low competition, easy win, completes the salaried cluster |

**Sequencing:** build #3 first. It is the most mechanically complex (amortisation table, chart, schedule export) and will establish every shared component the other seven reuse. Build #1 second, as it is the highest-value page and the hardest content to write. The remaining six follow at roughly one per week.

### Deferred to v2

PPF/EPF, NPS, RD/FD, GST, TDS, rent-vs-buy, retirement corpus, EMI-vs-SIP comparison. Each is added only after all eight launch tools have complete content and are indexed.

## 7. Functional requirements

### 7.1 Every calculator must

- **Compute entirely client-side.** No network call in the calculation path.
- **Update live** as inputs change, with no submit button.
- **Show its working.** Every result page includes a step-by-step derivation of how the number was reached, using the user's own inputs.
- **State its assumptions explicitly** — surcharge treatment, cess, rounding rule, which financial year's rules are applied.
- **Name the applicable rule version** on screen (e.g. "Computed under FY 2026-27 rules") with a last-verified date.
- **Handle invalid input gracefully** — no crash, no NaN, no silent zero. Constrain at the input where possible.
- **Preserve state in the URL** so a filled-in calculation can be shared or bookmarked.
- **Be fully usable on a 360px viewport**, with numeric keypads on numeric fields.

### 7.2 Output requirements

Every calculator returns three layers, in this order:

1. **The headline number**, large and unambiguous.
2. **A visual breakdown** — stacked bar, donut, or line chart depending on the tool. This is a primary requirement, not decoration; it is the main visual differentiator against bank calculators.
3. **A tabular detail view**, collapsed by default on mobile, expandable.

### 7.3 Accuracy requirements

- Every calculator's logic must be covered by unit tests against **at least five worked examples** taken from official sources (Income Tax Department illustrations, RBI/bank published schedules).
- Tax and statutory rules must be verified against the current Finance Act before launch and re-verified within seven days of any Budget announcement. **No rule values are to be hard-coded from memory or copied from another site** — every rate, limit, and threshold traces to a cited official source.
- Rule values live in a single versioned config module per financial year, never inline in component code, so an annual update is a config change rather than a code hunt.

### 7.4 Correction and trust requirements

- A visible "report an error" path on every calculator.
- A changelog page recording every rule update with its date.
- A clear disclaimer: informational tool, not tax or investment advice, verify with a qualified professional before acting.

## 8. Content requirements

The tool is what gets shared. **The content is what gets ranked.** Content is not a phase-two activity; a calculator does not ship without it.

Each calculator page requires:

- 900–1,500 words of explanatory content below the tool
- A worked example with real numbers, walked through end to end
- An FAQ block of 5–8 questions drawn from actual search queries
- Internal links to at least two related calculators
- Citations to the official source for every rule stated

Content targets long-tail intent, not the head term. The page competes for "how is HRA exemption calculated when I live with my parents", not for "HRA calculator".

## 9. Monetization requirements

- Ad slots defined in the layout from day one, but **served empty until traffic justifies applying** to a network. Do not launch with ads on a zero-traffic site.
- Maximum three ad units per page. No interstitials, no auto-playing video, no layout shift from ad loads — Core Web Vitals are a ranking input and this site's entire distribution is organic.
- No ad unit may appear above the calculator inputs or between the inputs and the result.
- Affiliate placements are permitted only where contextually honest and clearly labelled, and never inside the result area.

## 10. Technical constraints

- Static generation; no server-rendered request path in v1.
- Deployable to a free or near-free static host at any traffic level.
- Lighthouse performance ≥ 90 on mobile for every page, measured pre-launch and enforced in CI.
- Total JS per calculator page under 150KB gzipped, charting library included.
- Works without JavaScript to the extent of displaying the explanatory content and page structure.

## 11. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| SEO takes 12–18 months to compound | Revenue arrives far later than expected | Treat as a long-horizon asset; do not reduce client work to fund it |
| Incorrect tax computation published | Trust and legal exposure | Test-covered logic, cited sources, visible correction path, clear disclaimer |
| Budget changes rules mid-year | Every page becomes stale at once | Versioned per-FY config; update as a single change, publish changelog |
| Ad blockers on finance-savvy audience | Revenue below model | Model conservatively; treat affiliate as the second leg |
| Established competitors outrank on head terms | No traffic on the biggest keywords | Compete on long-tail and explanation depth, not head terms |

## 12. Milestones

| Phase | Deliverable | Duration |
|---|---|---|
| 0 | Specs complete (this doc, technical + frontend spec, SEO spec, ticket list) | 1 week |
| 1 | Home loan EMI calculator, complete with content, live | 2 weeks |
| 2 | Income tax comparison calculator, live | 2 weeks |
| 3 | Remaining six calculators, one per week | 6 weeks |
| 4 | Content depth pass, internal linking, schema markup | 2 weeks |
| 5 | Ad network application once traffic threshold is met | Month 6+ |

## 13. Open questions

1. **Domain and brand** — is this a standalone brand, or hosted under an existing property?
2. **Financial year coverage** — does v1 support only the current FY, or also the prior FY for people filing late returns? (Recommendation: current FY only in v1; prior-year support is a v2 config addition.)
3. **Chart library** — Recharts is the default assumption given the React stack. Confirm before the technical spec is written, as it affects the JS budget.
4. **Analytics** — a privacy-light option (Plausible, Umami) versus GA4. Affects the consent banner requirement, which affects layout.

---

*Assumptions made in this draft, flag anything you'd change: launch with 8 calculators rather than 5 or 20; India-only and English-only; no accounts or backend in v1; static hosting.*
