import { GRATUITY_FY_2026_27 } from "@/lib/rules";
import type { CalcResult } from "./types";

export type GratuityInputs = {
  monthlySalary: number; // last-drawn basic + DA (covered), or average of last 10 months (not covered)
  yearsOfService: number;
  coveredUnderAct: boolean;
};

export type GratuityValue = {
  isEligible: boolean;
  computedGratuity: number;
  gratuityPayable: number; // computed, capped at the statutory ceiling
  taxExempt: number;
  taxableGratuity: number;
};

// Payment of Gratuity Act, 1972, Section 4 for the formula and eligibility;
// Income Tax Act Section 10(10) for the exemption ceiling. Same 15/26
// formula already sourced for lib/calc/in-hand-salary.ts's CTC
// provisioning — this is the calculator that formula was always heading
// toward, not a second derivation of it.
export function calculateGratuity(inputs: GratuityInputs): CalcResult<GratuityValue> {
  const { monthlySalary, yearsOfService, coveredUnderAct } = inputs;
  const rules = GRATUITY_FY_2026_27;

  const isEligible = yearsOfService >= rules.minYearsOfService;
  const divisor = coveredUnderAct ? rules.divisorCovered : rules.divisorNotCovered;
  const computedGratuity = (monthlySalary * rules.daysPerYear * yearsOfService) / divisor;
  const gratuityPayable = isEligible ? Math.min(computedGratuity, rules.exemptionCeiling) : 0;

  // The exemption itself is, separately, the least of: gratuity actually
  // received, the formula amount, and the ceiling. This calculator assumes
  // the employee receives exactly the statutory formula amount (capped) —
  // by far the common case — so gratuityPayable and taxExempt coincide;
  // seeing them as two fields (rather than folding taxExempt away) keeps
  // the derivation honest about which number is which.
  const taxExempt = Math.min(gratuityPayable, computedGratuity, rules.exemptionCeiling);
  const taxableGratuity = Math.max(0, gratuityPayable - taxExempt);

  return {
    value: {
      isEligible,
      computedGratuity: Math.round(computedGratuity),
      gratuityPayable: Math.round(gratuityPayable),
      taxExempt: Math.round(taxExempt),
      taxableGratuity: Math.round(taxableGratuity),
    },
    steps: [
      {
        label: "Computed gratuity",
        formula: `salary × ${rules.daysPerYear} × ${yearsOfService} years ÷ ${divisor}`,
        value: Math.round(computedGratuity),
      },
      {
        label: "Gratuity payable",
        formula: isEligible
          ? `min(computed, ₹${rules.exemptionCeiling.toLocaleString("en-IN")} ceiling)`
          : `0 — fewer than ${rules.minYearsOfService} years of service`,
        value: Math.round(gratuityPayable),
      },
      { label: "Tax-exempt amount", formula: "min(payable, computed, ceiling)", value: Math.round(taxExempt) },
    ],
    assumptions: [
      coveredUnderAct
        ? "Employer is covered under the Payment of Gratuity Act (10 or more employees) — the common case"
        : "Employer is not covered under the Act — using the 30-day divisor and average salary in place of last-drawn salary",
      `${rules.minYearsOfService} years of continuous service is required, waived entirely if employment ends due to death or permanent disablement`,
      `₹${rules.exemptionCeiling.toLocaleString("en-IN")} is a lifetime ceiling across every employer you've ever worked for, not a per-employer or per-year limit`,
      "Assumes you receive exactly the statutory formula amount — an employer paying more voluntarily (ex-gratia) would make the extra amount fully taxable",
    ],
    rulesVersion: "FY 2026-27",
  };
}
