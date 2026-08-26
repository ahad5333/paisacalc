import { INCOME_TAX_FY_2026_27 } from "@/lib/rules";
import type { TaxSlab } from "@/lib/rules";
import type { CalcResult } from "./types";

export type AgeCategory = "general" | "senior" | "superSenior";

export type IncomeTaxInputs = {
  annualIncome: number;
  ageCategory: AgeCategory;
  otherDeductions: number; // old regime only — 80C/80D/HRA/home loan interest etc, combined
};

export type RegimeResult = {
  regime: "new" | "old";
  taxableIncome: number;
  baseTax: number;
  surcharge: number;
  cess: number;
  rebateApplied: number;
  totalTax: number;
};

export type IncomeTaxValue = {
  newRegime: RegimeResult;
  oldRegime: RegimeResult;
  cheaperRegime: "new" | "old" | "equal";
  savings: number;
};

function computeSlabTax(income: number, slabs: readonly TaxSlab[]): number {
  let tax = 0;
  let lastCap = 0;
  for (const slab of slabs) {
    const cap = slab.upTo ?? Infinity;
    if (income > lastCap) {
      tax += (Math.min(income, cap) - lastCap) * slab.rate;
    }
    lastCap = cap;
  }
  return tax;
}

type SurchargeThreshold = { above: number; rate: number };

function surchargeRateFor(income: number, thresholds: readonly SurchargeThreshold[]): number {
  let rate = 0;
  for (const t of thresholds) {
    if (income > t.above) rate = t.rate;
  }
  return rate;
}

// Marginal relief, applied recursively at every surcharge threshold: total
// tax + surcharge can never rise by more than income does past the
// threshold it just crossed. Terminates because each recursive call uses a
// strictly smaller income, eventually landing below the lowest threshold
// (surchargeRateFor returns 0, no further recursion).
function taxWithSurchargeRelief(
  taxableIncome: number,
  computeBaseTax: (income: number) => number,
  thresholds: readonly SurchargeThreshold[],
): { baseTax: number; surcharge: number; totalBeforeCess: number } {
  const baseTax = computeBaseTax(taxableIncome);
  const rate = surchargeRateFor(taxableIncome, thresholds);
  if (rate === 0) {
    return { baseTax, surcharge: 0, totalBeforeCess: baseTax };
  }

  const uncapped = baseTax * (1 + rate);
  const applicable = [...thresholds].reverse().find((t) => taxableIncome > t.above)!;
  const atThreshold = taxWithSurchargeRelief(applicable.above, computeBaseTax, thresholds);
  const capped = atThreshold.totalBeforeCess + (taxableIncome - applicable.above);

  const totalBeforeCess = Math.min(uncapped, capped);
  return { baseTax, surcharge: totalBeforeCess - baseTax, totalBeforeCess };
}

function computeRegime(
  regime: "new" | "old",
  taxableIncome: number,
  slabs: readonly TaxSlab[],
  rebateMaxTaxableIncome: number,
  cessRate: number,
  surchargeThresholds: readonly SurchargeThreshold[],
): RegimeResult {
  const { baseTax, surcharge, totalBeforeCess } = taxWithSurchargeRelief(
    taxableIncome,
    (income) => computeSlabTax(income, slabs),
    surchargeThresholds,
  );
  const cess = totalBeforeCess * cessRate;
  const uncappedTotal = totalBeforeCess + cess;

  let totalTax = uncappedTotal;
  let rebateApplied = 0;

  // Section 87A rebate + marginal relief — verified against four published
  // FY 2026-27 examples (tests/income-tax.test.ts): the cap compares the
  // full tax+cess total against the excess income over the threshold, not
  // base tax alone. Safe to apply unconditionally above the threshold: at
  // any income well past it, the excess-income figure so far outstrips
  // actual tax that the cap never binds — matching the official ₹12,750
  // "exhaustion point" example exactly.
  if (taxableIncome <= rebateMaxTaxableIncome) {
    rebateApplied = uncappedTotal;
    totalTax = 0;
  } else {
    const excess = taxableIncome - rebateMaxTaxableIncome;
    if (uncappedTotal > excess) {
      rebateApplied = uncappedTotal - excess;
      totalTax = excess;
    }
  }

  return {
    regime,
    taxableIncome: Math.round(taxableIncome),
    baseTax: Math.round(baseTax),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    rebateApplied: Math.round(rebateApplied),
    totalTax: Math.round(totalTax),
  };
}

const AGE_SLABS: Record<AgeCategory, readonly TaxSlab[]> = {
  general: INCOME_TAX_FY_2026_27.oldRegime.slabsGeneral,
  senior: INCOME_TAX_FY_2026_27.oldRegime.slabsSenior,
  superSenior: INCOME_TAX_FY_2026_27.oldRegime.slabsSuperSenior,
};

export function calculateIncomeTax(inputs: IncomeTaxInputs): CalcResult<IncomeTaxValue> {
  const { annualIncome, ageCategory, otherDeductions } = inputs;
  const rules = INCOME_TAX_FY_2026_27;

  const newTaxableIncome = Math.max(0, annualIncome - rules.newRegime.standardDeduction);
  const oldTaxableIncome = Math.max(
    0,
    annualIncome - rules.oldRegime.standardDeduction - Math.max(0, otherDeductions),
  );

  const newSurchargeThresholds = rules.surcharge.thresholds; // capped at 25% (last entry repeats 25%)
  const oldSurchargeThresholds = rules.surcharge.thresholds.map((t, i, arr) =>
    i === arr.length - 1 ? { above: t.above, rate: rules.surcharge.oldRegimeTopRate } : t,
  );

  const newRegime = computeRegime(
    "new",
    newTaxableIncome,
    rules.newRegime.slabs,
    rules.newRegime.rebate87A.maxTaxableIncome,
    rules.cessRate,
    newSurchargeThresholds,
  );

  const oldRegime = computeRegime(
    "old",
    oldTaxableIncome,
    AGE_SLABS[ageCategory],
    rules.oldRegime.rebate87A.maxTaxableIncome,
    rules.cessRate,
    oldSurchargeThresholds,
  );

  const diff = oldRegime.totalTax - newRegime.totalTax;
  const cheaperRegime = diff > 0 ? "new" : diff < 0 ? "old" : "equal";

  return {
    value: {
      newRegime,
      oldRegime,
      cheaperRegime,
      savings: Math.abs(diff),
    },
    steps: [
      {
        label: "New regime taxable income",
        formula: `${annualIncome} − ${rules.newRegime.standardDeduction} (standard deduction)`,
        value: newTaxableIncome,
      },
      { label: "New regime tax before cess", formula: "slab tax + surcharge", value: newRegime.baseTax + newRegime.surcharge },
      { label: "New regime tax payable", formula: "+ 4% cess, − Section 87A rebate/relief", value: newRegime.totalTax },
      {
        label: "Old regime taxable income",
        formula: `${annualIncome} − ${rules.oldRegime.standardDeduction} − ${otherDeductions} (deductions)`,
        value: oldTaxableIncome,
      },
      { label: "Old regime tax before cess", formula: "slab tax + surcharge", value: oldRegime.baseTax + oldRegime.surcharge },
      { label: "Old regime tax payable", formula: "+ 4% cess, − Section 87A rebate/relief", value: oldRegime.totalTax },
    ],
    assumptions: [
      "Salaried/pensioner standard deduction applied automatically to both regimes",
      "Old regime deductions (80C, 80D, HRA, home loan interest, etc.) entered as a single combined figure",
      "New regime does not offer age-based exemption; old regime slabs vary by age category",
      "Health & Education Cess at 4% on tax plus surcharge",
      "Section 87A rebate and surcharge marginal relief both applied where eligible",
      "Does not model capital gains, which are taxed separately from slab income",
    ],
    rulesVersion: rules.label,
  };
}
