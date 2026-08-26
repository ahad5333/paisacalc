// Rule values only — no logic. Every value here must cite its official
// source, same discipline as fy-2026-27.ts (PRD §7.3, ticket S-02).

// GST slabs post the "GST 2.0" rate rationalisation approved at the 56th
// GST Council meeting, effective 22 September 2025 — the 12% and 28%
// slabs were removed; most 12%-slab goods moved to 5%, most 28%-slab goods
// moved to 18%, and a new 40% slab was created for luxury/sin goods.
// Verified against two independent sources (BankBazaar's GST rates page
// and ClearTax's GST rates page, both accessed 18 Aug 2026) before use —
// this specifically supersedes the pre-reform 5/12/18/28% structure still
// widely repeated in older articles and in most LLM training data.
export const GST_RATES_2026 = {
  label: "Post GST 2.0 (effective 22 Sep 2025)",
  slabs: [
    { rate: 0, label: "0% — Exempt (fresh produce, dairy, medicines, education)" },
    { rate: 3, label: "3% — Gold, silver, precious stones" },
    { rate: 5, label: "5% — Daily essentials, processed food, agricultural equipment" },
    { rate: 18, label: "18% — Standard rate (most goods & services)" },
    { rate: 40, label: "40% — Luxury & sin goods (high-end vehicles, tobacco, betting)" },
  ],
};

// PPF (Public Provident Fund) — rate is reviewed and notified by the
// Ministry of Finance every quarter; it has held at 7.1% since 1 April
// 2020 (unchanged for Q2 FY 2026-27, notified 30 June 2026). Contribution
// limits and lock-in period are fixed by the PPF Scheme rules. Verified
// against two independent sources (ClearTax's PPF page and the
// Upstox/Zeebiz quarterly-rate reporting) before use, both accessed
// 18 Aug 2026.
export const PPF_RULES_2026 = {
  label: "PPF, Q2 FY 2026-27",
  annualRatePercent: 7.1,
  minAnnualContribution: 500,
  maxAnnualContribution: 150000,
  lockInYears: 15, // extendable after maturity in blocks of 5 years
};
