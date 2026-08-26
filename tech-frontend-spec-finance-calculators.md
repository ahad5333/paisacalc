# Technical & Frontend Specification
## Indian Personal Finance Calculator Site — v1

**Companion to:** PRD-finance-calculators.md
**Status:** Draft for review
**Date:** August 2026

Combines the technical architecture, the frontend spec, and the security section. The site has no backend, no accounts, and no user data — security is a short section here rather than a separate document.

---

## Addendum — 3D-forward direction (supersedes B1 and A6 below)

**Decision (Aug 2026):** the site moves to a full 3D/animated presentation, site-wide, including calculator pages — a deliberate reversal of the "quiet ledger" direction this document originally specified. Recorded here so the conflict with the sections below is visible rather than silently edited away.

- **Design direction (B1):** the "reference is a well-set statement or ledger" framing no longer holds. The site now targets an advanced, animated, WebGL-driven look, built on React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) plus GSAP + Lenis for scroll-linked motion.
- **Performance budget (A6):** the 150KB/page JS ceiling is no longer achievable with a persistent 3D scene and is explicitly waived for the 3D layer. Working budget is Tier 2 from the reference repo library: **under 600KB gzipped**, LCP under 2.5s on 4G, 30fps floor on mid-range mobile. Lighthouse ≥90 mobile is no longer a hard gate.
- **What this costs:** the PRD's SEO strategy (§ SEO spec) is built entirely on organic ranking, and Core Web Vitals are a direct ranking input — this is called out explicitly in PRD §11 risks and SEO spec §9. A heavier, slower site is a known, accepted tradeoff of this decision, not an oversight. The E-E-A-T "quiet, not selling" trust argument (SEO spec §7, tech spec B1) is also weakened by a more product-like, animated presentation. Both risks stand as open going into build.
- **Calculator usability still holds:** derivation panel, inputs, and results must stay legible and operable — the 3D layer is atmosphere (background scene, scroll-linked camera, lighting/postprocessing) around the functional UI, not a replacement for it. `prefers-reduced-motion` and a no-3D fallback are still required (B6 still applies).

**Two build-breaking issues found shipping the first 3D-forward page (home-loan-emi), both must be respected by every calculator added in Epic 4:**

1. **Static-export RSC path mismatch (Next.js 16, confirmed upstream bug, [vercel/next.js#85374](https://github.com/vercel/next.js/issues/85374)).** On Windows builds, `next build` with `output: "export"` writes segment-cache RSC payloads as nested directories (`out/home-loan-emi/__next.home-loan-emi/__PAGE__.txt`) but the client router requests the flattened dot-separated filename (`__next.home-loan-emi.__PAGE__.txt`). Left unfixed, every client-side `<Link>` navigation 404s on this payload and falls back to a full reload after ~10s. Fixed with a `postbuild` script (`scripts/fix-static-export-segment-cache.mjs`) that flattens the mismatched files after every build. Don't remove this script without confirming upstream has actually fixed the bug for the Next.js version in use.
2. **`MeshTransmissionMaterial` starves client-side navigation.** The original `FloatingField` used drei's `MeshTransmissionMaterial` (per-frame offscreen buffer render + readback for glass refraction) on 14 simultaneously animated shapes. In testing this was expensive enough to starve the main thread and prevent Next's router from completing a route transition at all — not a visual bug, a broken-click bug. Replaced with `meshPhysicalMaterial` (clearcoat, no transmission), which keeps a glossy premium look at a fraction of the per-frame cost. **Do not reintroduce `MeshTransmissionMaterial`, or any other material requiring per-frame readback, on animated/multi-instance geometry** without re-testing that internal navigation still completes in well under a second.

---

# Part A — Technical Architecture

## A1. Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router), static export | Static generation, file-based routing, good MDX story for the content pages |
| Language | TypeScript, strict mode | Calculation logic must not tolerate implicit `any` — a silent coercion is a wrong tax number |
| Styling | Tailwind + CSS custom properties for the token layer | Fast, and tokens keep the calculators visually identical without duplicating config |
| Charts | **Recharts** (confirmed) | Known quantity, React-native API. See A6 for the JS budget constraint it creates |
| Content | MDX | Explanatory content lives beside the calculator, editable without touching component code |
| Analytics | **Plausible** (recommended) | No cookies, so no consent banner, so no layout shift and no CLS penalty. GA4 would force a banner on every page and cost you ranking signal for data you won't act on |
| Hosting | Vercel or Cloudflare Pages, free tier | Static output means the free tier holds at any realistic traffic level |
| Testing | Vitest | Calculation logic only; no component testing in v1 |

**Domain still undecided.** This does not block the build — it blocks only the canonical URL and sitemap config in the SEO spec. Decide before the first page is indexed, not before the first commit. Moving an indexed site costs months of ranking recovery.

## A2. Repository structure

```
/app
  /(calculators)
    /home-loan-emi/page.tsx
    /income-tax/page.tsx
    ...
  /about, /changelog, /disclaimer
/lib
  /calc
    emi.ts            # pure functions, no React
    income-tax.ts
    hra.ts
    ...
    index.ts
  /rules
    fy-2026-27.ts     # every rate, slab, limit, threshold
    index.ts          # resolves the active FY
  /url-state.ts       # input <-> query string
/components
  /calculator         # shared shell, inputs, result, chart, table
  /content            # MDX renderers, FAQ, callouts
/content
  /home-loan-emi.mdx
  ...
/tests
  emi.test.ts         # worked examples from official sources
```

## A3. The three-layer rule

This is the architectural constraint that everything else follows from:

1. **`/lib/rules`** holds values only. Slabs, rates, limits, cess, thresholds. No logic. Keyed by financial year.
2. **`/lib/calc`** holds pure functions. Takes inputs and a rules object, returns a result object. No React, no DOM, no imports from `/components`.
3. **`/components`** holds rendering. No arithmetic beyond formatting.

Why it matters: the annual Budget update becomes an edit to one file in `/lib/rules`. If rates leak into components, every February becomes a code hunt across twenty pages, and you will miss one.

**Every calculation function returns its own derivation:**

```ts
type CalcResult<T> = {
  value: T;
  steps: DerivationStep[];   // label, formula, computed value
  assumptions: string[];
  rulesVersion: string;      // "FY 2026-27"
};
```

The "show your working" requirement from PRD §7.1 is not a UI feature bolted on later — it is part of the return type, so a calculator physically cannot ship without it.

## A4. URL state

Inputs serialise to the query string so results are shareable and bookmarkable:

```
/home-loan-emi?p=4000000&r=8.5&t=20
```

Short keys, parsed defensively, invalid values fall back to defaults rather than throwing. This also gives you free long-tail landing pages later — pre-filled links like "EMI for 40 lakh home loan" become their own indexable entry points in v2.

## A5. Testing requirements

- Every function in `/lib/calc` has tests covering **at least five worked examples from official sources** (Income Tax Department illustrations, RBI or bank published amortisation schedules), plus boundary cases: zero, negative, slab edges, maximum realistic values.
- CI fails on any test failure, any TypeScript error, or a Lighthouse mobile performance score below 90.
- No calculator merges without its rule sources cited in a comment block above the rules config.

## A6. Performance budget

| Metric | Limit |
|---|---|
| JS per calculator page, gzipped | 150KB |
| Lighthouse performance (mobile) | ≥ 90 |
| CLS | < 0.05, including ad slots |
| LCP | < 2.0s on 4G |

**Recharts is the main risk against this budget.** It pulls a chunk of D3. Two mitigations, applied from the first calculator:

- Import from specific paths, never `import { X } from 'recharts'` barrel-style.
- Dynamically import the chart component with a fixed-height placeholder, so the chart is not in the initial bundle and its arrival causes no layout shift.

If the first calculator breaches 150KB after both mitigations, swap that one chart to hand-written SVG rather than accepting the breach. A slow page does not rank, and this site has no distribution other than ranking.

## A7. Ad integration

- Ad slots are reserved containers with **fixed height from first paint**, present in the DOM from launch, serving nothing until a network is approved. Reserving space later, after ranking is established, is how sites lose it.
- Ad scripts load lazily, after the calculator is interactive, never render-blocking.
- Slot positions are fixed in the layout spec (B5) and may not be added ad hoc.

---

# Part B — Frontend Specification

## B1. Design direction

The subject is money arithmetic that people don't trust — either because a bank calculator gave them a number with no working, or because their employer's payslip doesn't match their own maths. **The page's single job is to make the user believe the number.**

That points away from the fintech look — gradient cards, rounded pill buttons, cheerful illustration. Reassurance in this category comes from looking like a document that shows its work, not like a product trying to sell something. The reference is a well-set statement or ledger: precise, dense where it needs to be, quiet.

**The signature element: the derivation panel.** Below every result, the actual computation is laid out line by line with the user's own numbers substituted in — the way a worked example appears in a textbook, with the arithmetic visible rather than the conclusion asserted. Every competitor hides this. It is the entire reason to use the site, so it gets the design attention, and everything around it stays disciplined.

**Tokens:**

```
--ink:        #16181D   /* text, chart baseline */
--paper:      #FBFAF7   /* page */
--rule:       #DDD9D0   /* hairlines, table borders */
--figure:     #1F5F4E   /* the result number, positive values */
--deduction:  #A6482F   /* tax, interest, outflow */
--muted:      #6B6E75   /* labels, assumptions, captions */
```

Two data colours only: what you keep, and what you lose. Every chart in the site uses that one distinction, so the meaning is learned once and holds across all eight calculators.

**Type:**

- Numerals and all figures: a tabular-figure face — **IBM Plex Mono** or **Source Code Pro**. Non-negotiable. Digits must not shift width as values change live, and monospace figures read as computed rather than marketed.
- Body and headings: **Source Serif 4**. A serif for the explanatory content signals reference material rather than product copy, and it holds up in the 1,000+ word sections that carry the SEO weight.
- Labels, inputs, captions: **Inter**.

Type scale: 13 / 15 / 17 / 21 / 28 / 42. The result figure is the only thing at 42.

## B2. Page template

Every calculator page uses the same structure. Deviation is a bug, not a design choice — the shared shell is what makes calculators 3 through 8 fast to build.

```
┌──────────────────────────────────────┐
│ header — wordmark, calculator index  │
├──────────────────────────────────────┤
│ H1 + one-line description            │
│ "Computed under FY 2026-27 rules"    │
│ last verified: date                  │
├──────────────────────────────────────┤
│ INPUTS                               │
│  label        [ 40,00,000 ]          │
│  label        [ 8.5 ]  %             │
├──────────────────────────────────────┤
│ RESULT                               │
│   ₹34,713          ← 42px, --figure  │
│   per month                          │
│                                      │
│   [ chart — breakdown ]              │
├──────────────────────────────────────┤
│ DERIVATION  ← the signature          │
│   1. Monthly rate = 8.5 ÷ 12 = 0.708%│
│   2. ...                             │
│   Assumptions: ...                   │
├──────────────────────────────────────┤
│ DETAIL TABLE (collapsed on mobile)   │
├──────────────────────────────────────┤
│ [ ad slot ]                          │
├──────────────────────────────────────┤
│ EXPLANATORY CONTENT (900–1500 words) │
│ worked example · FAQ · related tools │
├──────────────────────────────────────┤
│ footer — disclaimer, report an error │
└──────────────────────────────────────┘
```

## B3. Input behaviour

- Live recalculation on every change. No submit button anywhere on the site.
- `inputMode="decimal"` on all numeric fields — the mobile keypad is the single biggest usability win here.
- Indian digit grouping in display (40,00,000), plain digits while editing.
- A slider paired with each numeric field where the range is bounded; the field stays authoritative and typeable.
- Constrain at the input. Clamp to a valid range rather than showing an error after the fact.
- Never render `NaN`, `Infinity`, or a silent zero. An empty or invalid field shows a dash in the result and a one-line note stating which input is needed.
- Every field has a `?` affordance opening a one-sentence plain-language definition. "Basic salary" means something specific and most users guess wrong.

## B4. Result and chart behaviour

- The result figure animates only its digits, never its container size — the fixed-width numeral face is what makes this possible.
- One chart per calculator, chosen for the tool: donut for composition (tax breakdown, salary split), stacked bar over time for amortisation, line for growth projections.
- Charts use `--figure` and `--deduction` only.
- Every chart has a text equivalent immediately below or in the detail table. The chart is never the only route to a value — that covers both accessibility and the no-JS case.
- Fixed aspect ratio containers so the lazy chart import causes no layout shift.

## B5. Ad slot positions

Exactly three, fixed:

1. Between the detail table and the explanatory content
2. Mid-content, after roughly 500 words, at a natural section break
3. Footer, above the disclaimer

**Never** above the inputs, and never between the inputs and the result. That region is the product.

## B6. Quality floor

- Responsive from 360px. The calculator is usable without horizontal scroll or zoom.
- Visible keyboard focus on every interactive element; full keyboard operation.
- `prefers-reduced-motion` respected — digit animation and chart transitions disabled.
- Contrast: all text meets WCAG AA against `--paper`.
- Explanatory content and page structure render without JavaScript.
- Labels are real `<label>` elements bound to inputs; results announced via a polite live region.

## B7. Copy rules

- Sentence case throughout. No exclamation marks.
- Name things as the user names them: "Basic salary", not "basicSalaryComponent".
- Assumptions are stated plainly and completely, never softened: "Assumes cess at 4% and no surcharge."
- The disclaimer is direct: informational tool, not tax or investment advice, verify with a qualified professional before acting on it.
- No urgency, no "maximise your savings", no product pitch. The site's asset is being trusted; the moment it sounds like it's selling, it becomes every other calculator.

---

# Part C — Security & Access

No accounts, no backend, no database, no PII collected or stored. The surface is small and stays small.

| Requirement | Implementation |
|---|---|
| Transport | HTTPS enforced, HSTS enabled |
| CSP | Strict policy; explicit allowlist for the ad network and analytics, nothing else. No `unsafe-eval` |
| Headers | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` |
| Dependencies | Dependabot enabled; no dependency added without a bundle-size and maintenance check |
| Input handling | All input client-side and numeric. Parsed and clamped, never `eval`, never injected into the DOM as HTML |
| Third-party scripts | Only the ad network and analytics. Every addition is a deliberate decision, not a convenience |
| Secrets | None in the client. There is no server, so there is nothing to leak — keep it that way by not adding a backend for convenience features |
| Analytics | Plausible: no cookies, no personal data, therefore no consent banner required |

**The rule that keeps this section short:** if a v2 feature requires storing user data, it needs its own security review before it is built. Saved calculations and email capture are the two likely candidates, and both would change this document materially.

---

## Open items

1. **Domain** — still undecided. Blocks the SEO spec's canonical URLs and sitemap, not the build.
2. **Analytics** — Plausible recommended above and assumed throughout; it is a paid service (~$9/mo). Self-hosted Umami is the free alternative if you'd rather not add a fixed cost before revenue.
3. **Font licensing** — all three faces named are open-source, self-hosted, no licensing cost. Confirm you're happy self-hosting rather than using a CDN, which is the better call for both performance and privacy.
