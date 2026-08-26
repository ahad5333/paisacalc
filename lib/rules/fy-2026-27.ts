// Rule values only — no logic. Every value here must cite its official source
// (Income Tax Department, RBI, or the relevant Act) in a comment beside it.
// Do not add a value from memory or from another calculator site (PRD §7.3, ticket S-02).

export type TaxSlab = { upTo: number | null; rate: number };

// Union Budget 2026 made no changes to income tax slabs or rates — the
// structure introduced in Union Budget 2025 (effective FY 2025-26) carries
// forward unchanged into FY 2026-27. Verified independently against five
// sources before use here: Income Tax Department calculator listing
// (incometax.gov.in/iec/foportal/income-tax-calculator), ClearTax
// (cleartax.in/c/income-tax-slab-rates), and cross-confirmed via Bajaj
// Finserv, Axis Max Life, and Business Standard reporting on Budget 2026.
// One source (a CAclubindia article) stated a conflicting slab structure
// above ₹16L and was rejected after five other sources disagreed with it.
export const INCOME_TAX_FY_2026_27 = {
  label: "FY 2026-27",

  newRegime: {
    // ₹0–4L: nil, ₹4–8L: 5%, ₹8–12L: 10%, ₹12–16L: 15%, ₹16–20L: 20%,
    // ₹20–24L: 25%, above ₹24L: 30%. Same for every age group — the new
    // regime does not offer a higher exemption for senior citizens.
    slabs: [
      { upTo: 400000, rate: 0 },
      { upTo: 800000, rate: 0.05 },
      { upTo: 1200000, rate: 0.1 },
      { upTo: 1600000, rate: 0.15 },
      { upTo: 2000000, rate: 0.2 },
      { upTo: 2400000, rate: 0.25 },
      { upTo: null, rate: 0.3 },
    ] as TaxSlab[],
    standardDeduction: 75000, // salaried/pensioners, Section 16(ia)
    rebate87A: {
      maxTaxableIncome: 1200000, // full rebate ceiling
      maxRebate: 60000, // Finance Act 2025, effective FY 2025-26 onward
    },
  },

  oldRegime: {
    // General (under 60). Senior (60–80) and super senior (80+) get a
    // higher nil band; both still move to 20%/30% at the same ₹5L/₹10L
    // points as the general slab.
    slabsGeneral: [
      { upTo: 250000, rate: 0 },
      { upTo: 500000, rate: 0.05 },
      { upTo: 1000000, rate: 0.2 },
      { upTo: null, rate: 0.3 },
    ] as TaxSlab[],
    slabsSenior: [
      { upTo: 300000, rate: 0 },
      { upTo: 500000, rate: 0.05 },
      { upTo: 1000000, rate: 0.2 },
      { upTo: null, rate: 0.3 },
    ] as TaxSlab[],
    slabsSuperSenior: [
      { upTo: 500000, rate: 0 },
      { upTo: 1000000, rate: 0.2 },
      { upTo: null, rate: 0.3 },
    ] as TaxSlab[],
    standardDeduction: 50000, // salaried/pensioners, Section 16(ia)
    rebate87A: {
      maxTaxableIncome: 500000,
      maxRebate: 12500, // unchanged for several years
    },
    section80CLimit: 150000, // for the content page's explanatory reference only
  },

  // Health & Education Cess — 4% of (tax + surcharge), unchanged since
  // FY 2018-19, same rate both regimes.
  cessRate: 0.04,

  // Surcharge on tax (before cess), both regimes at the same thresholds
  // except the top slab: new regime caps surcharge at 25% (no 37% band).
  // Marginal relief applies at every threshold — see lib/calc/income-tax.ts.
  surcharge: {
    thresholds: [
      { above: 5000000, rate: 0.1 },
      { above: 10000000, rate: 0.15 },
      { above: 20000000, rate: 0.25 },
      { above: 50000000, rate: 0.25 }, // new regime: capped at 25% above ₹5Cr too
    ],
    oldRegimeTopRate: 0.37, // old regime only: 37% above ₹5Cr, not capped at 25%
  },
} as const;

// Salary-structure rules for the CTC-to-in-hand calculator. Verified against
// SalaryBox, Zoho Payroll, and Vittarthi (EPF), HROne/ICICI Direct (gratuity),
// ClearTax and government labour.gov.in FAQ PDF (Code on Wages basic-pay
// floor), and independently cross-checked: a ₹12L CTC run through this exact
// model landed within ₹1/month of a published third-party worked example
// (salaryinhand.in) before being trusted.
export const SALARY_STRUCTURE_FY_2026_27 = {
  // The Code on Wages, effective 21 Nov 2025, requires "wages" (basic + DA)
  // to be at least 50% of total remuneration (CTC) — supersedes the older
  // informal ~40% convention many calculators still use.
  // labour.gov.in FAQ on Labour Codes (16 Mar 2026 revision)
  basicPercentOfCtc: 0.5,

  // 12% of basic, both employer and employee (matching). Statutory minimum
  // mandatory contribution is capped at 12% of ₹15,000 basic (₹1,800/month),
  // unchanged since Sept 2014 — but this calculator models the common
  // private-sector CTC-structuring practice of applying 12% to the full
  // (uncapped) basic, which is what most CTC breakup letters show.
  epfRate: 0.12,
  epfStatutoryWageCeiling: 15000, // monthly — informational only, not applied by default

  // (15 days' wages ÷ 26 working days) per year of service, on basic+DA —
  // Payment of Gratuity Act, 1972, Section 4(2). Annualised against yearly
  // basic: 15/26/12 ≈ 4.81%. Payable only after 5 years' continuous service;
  // provisioned as part of CTC from year one regardless.
  gratuityDivisor: 26,
  gratuityDaysPerYear: 15,

  // Deductible from salary only under the old regime (Section 16(iii)),
  // capped at whichever is lower of tax paid or this figure. State-levied,
  // not uniform — ₹2,500/year is the constitutional maximum any state may
  // charge (Article 276); several states (Karnataka, Maharashtra) sit at or
  // near it, some states (Delhi) charge none. Used as an adjustable default.
  professionalTaxSection16Cap: 2500,
  professionalTaxDefaultMonthly: 200,
} as const;

// HRA exemption, Section 10(13A) read with Rule 279 of the Income-tax Rules,
// 2026 (replacing the old Rule 2A of the 1961 Rules), in force from 1 April
// 2026 as part of the Income-tax Act, 2025. Old regime only — the new
// regime does not exempt any part of HRA received.
//
// The one genuinely new fact here: the 50%-of-salary metro list expanded
// from the four-city list every calculator has used for two decades (Delhi,
// Mumbai, Kolkata, Chennai) to eight cities for FY 2026-27, adding
// Bengaluru, Hyderabad, Pune, and Ahmedabad. Verified across six independent
// sources including Business Today's reporting on the Income-tax Rules,
// 2026 before trusting it — this is exactly the kind of rule change that's
// easy to get wrong from memory (PRD §7.3). FY 2025-26 returns still use the
// old four-city list; this site is FY 2026-27 only (PRD §13), so that
// distinction doesn't otherwise surface here.
export const HRA_FY_2026_27 = {
  metroRate: 0.5,
  nonMetroRate: 0.4,
  rentMinusSalaryPercent: 0.1,
  metroCities: [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ] as const,
} as const;

// Capital gains — the most rule-volatile calculator on this site. The
// Finance (No. 2) Act, 2024 (23 July 2024) rewrote this area: it removed
// indexation for most assets, moved LTCG to a uniform 12.5%, and raised
// STCG on equity to 20% with the LTCG equity exemption raised to ₹1.25L.
// Verified for FY 2026-27 specifically (not just "post-2024") against
// Bajaj Finserv, ClearTax, TaxGarden, and Business Standard's report of the
// CBDT's CII notification — Budget 2026 made no further change to any of
// these figures.
export const CAPITAL_GAINS_FY_2026_27 = {
  equity: {
    longTermHoldingMonths: 12, // >12 months to qualify as long-term
    stcgRate: 0.2,
    ltcgRate: 0.125,
    ltcgExemption: 125000, // per financial year
  },
  property: {
    longTermHoldingMonths: 24, // >24 months to qualify as long-term
    // STCG on property is not a flat rate — it's added to total income and
    // taxed at the applicable slab (reuse lib/calc/income-tax.ts for that;
    // this calculator states the gain and points there rather than
    // guessing a rate).
    ltcgRateWithIndexation: 0.2,
    ltcgRateWithoutIndexation: 0.125,
    // Grandfathering: property purchased before the 23 July 2024 cutover
    // gets to choose whichever of the two rates above is cheaper; property
    // purchased on/after that date only gets 12.5% without indexation.
    // Modelled at financial-year granularity (see the calculator's own
    // assumptions for the FY 2024-25 edge case this simplifies).
    indexationCutoverFinancialYear: "2024-25",
  },
  // Cost Inflation Index, base year 2001-02 = 100. CBDT-notified, one value
  // per financial year — cross-checked against a second independent source
  // for the base year (100), FY 2010-11 (167), and FY 2020-21 (301) before
  // trusting the full table below.
  costInflationIndex: {
    "2001-02": 100,
    "2002-03": 105,
    "2003-04": 109,
    "2004-05": 113,
    "2005-06": 117,
    "2006-07": 122,
    "2007-08": 129,
    "2008-09": 137,
    "2009-10": 148,
    "2010-11": 167,
    "2011-12": 184,
    "2012-13": 200,
    "2013-14": 220,
    "2014-15": 240,
    "2015-16": 254,
    "2016-17": 264,
    "2017-18": 272,
    "2018-19": 280,
    "2019-20": 289,
    "2020-21": 301,
    "2021-22": 317,
    "2022-23": 331,
    "2023-24": 348,
    "2024-25": 363,
    "2025-26": 376,
    "2026-27": 384,
  } as Record<string, number>,
  currentFinancialYear: "2026-27", // this site's sale-year assumption throughout
} as const;

// Gratuity — Payment of Gratuity Act, 1972, Section 4, and Section 10(10)
// of the Income Tax Act for the exemption ceiling. Same 15/26 formula
// already used and sourced for the in-hand-salary calculator's CTC
// provisioning (SALARY_STRUCTURE_FY_2026_27); this adds the exemption
// ceiling and eligibility rule specifically. Verified against ClearTax,
// TaxGarden, and Taxmann's coverage of the CBDT's ₹10L→₹20L increase
// before trusting the current figure.
export const GRATUITY_FY_2026_27 = {
  minYearsOfService: 5, // waived entirely on death or permanent disablement
  divisorCovered: 26, // organisations covered under the Act (10+ employees)
  divisorNotCovered: 30, // organisations not covered
  daysPerYear: 15,
  // Lifetime ceiling across all employers, not per employer or per job —
  // unchanged since the CBDT's 2019 increase from ₹10L to ₹20L.
  exemptionCeiling: 2000000,
} as const;
