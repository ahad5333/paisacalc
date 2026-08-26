import { SALARY_STRUCTURE_FY_2026_27 } from "@/lib/rules";
import type { CalcResult } from "./types";
import { calculateIncomeTax, type AgeCategory } from "./income-tax";

export type InHandSalaryInputs = {
  annualCtc: number;
  ageCategory: AgeCategory;
  professionalTaxMonthly: number;
  additionalOldRegimeDeductions: number;
};

export type InHandSalaryValue = {
  basic: number;
  employerPf: number;
  gratuity: number;
  grossSalary: number; // CTC − employer PF − gratuity; what actually shows on the payslip
  employeePf: number;
  professionalTaxAnnual: number;
  newRegimeTax: number;
  oldRegimeTax: number;
  betterRegime: "new" | "old" | "equal";
  inHandAnnual: number;
  inHandMonthly: number;
};

// Reuses calculateIncomeTax (lib/calc/income-tax.ts) rather than
// reimplementing slab/rebate/surcharge logic — ticket C3-01's explicit
// instruction, and the reason this file has no tax-rate literals of its own.
export function calculateInHandSalary(inputs: InHandSalaryInputs): CalcResult<InHandSalaryValue> {
  const { annualCtc, ageCategory, professionalTaxMonthly, additionalOldRegimeDeductions } = inputs;
  const rules = SALARY_STRUCTURE_FY_2026_27;

  const basic = annualCtc * rules.basicPercentOfCtc;
  const employerPf = basic * rules.epfRate;
  const gratuity = (basic * rules.gratuityDaysPerYear) / (rules.gratuityDivisor * 12);
  const grossSalary = Math.max(0, annualCtc - employerPf - gratuity);
  const employeePf = employerPf; // matching contribution

  const professionalTaxAnnual = Math.max(0, professionalTaxMonthly) * 12;

  // Section 16(iii): professional tax is deductible from salary only under
  // the old regime, capped at whichever is lower of tax paid or the
  // statutory cap. Employee PF and any additional deductions fall under the
  // old regime's combined 80C-style limit — calculateIncomeTax takes a
  // single "otherDeductions" figure, so both caps are applied here before
  // handing it off.
  const section80CDeductions = Math.min(employeePf + Math.max(0, additionalOldRegimeDeductions), 150000);
  const section16Deduction = Math.min(professionalTaxAnnual, rules.professionalTaxSection16Cap);
  const oldRegimeDeductions = section80CDeductions + section16Deduction;

  const taxResult = calculateIncomeTax({
    annualIncome: grossSalary,
    ageCategory,
    otherDeductions: oldRegimeDeductions,
  });

  const { newRegime, oldRegime } = taxResult.value;
  const betterRegime =
    newRegime.totalTax < oldRegime.totalTax
      ? "new"
      : oldRegime.totalTax < newRegime.totalTax
        ? "old"
        : "equal";
  const chosenTax = betterRegime === "old" ? oldRegime.totalTax : newRegime.totalTax;

  // New regime doesn't allow the professional-tax deduction, but the tax
  // itself is already computed with the right (regime-specific) taxable
  // base by calculateIncomeTax — professional tax still leaves the
  // employee's pocket either way, so it's subtracted from cash in hand here
  // regardless of which regime is chosen.
  // Clamped at zero: a degenerate near-zero CTC input shouldn't be able to
  // push in-hand pay negative (e.g. professional tax alone on a ₹0 CTC).
  const inHandAnnual = Math.max(0, grossSalary - employeePf - professionalTaxAnnual - chosenTax);
  const inHandMonthly = inHandAnnual / 12;

  return {
    value: {
      basic: Math.round(basic),
      employerPf: Math.round(employerPf),
      gratuity: Math.round(gratuity),
      grossSalary: Math.round(grossSalary),
      employeePf: Math.round(employeePf),
      professionalTaxAnnual: Math.round(professionalTaxAnnual),
      newRegimeTax: newRegime.totalTax,
      oldRegimeTax: oldRegime.totalTax,
      betterRegime,
      inHandAnnual: Math.round(inHandAnnual),
      inHandMonthly: Math.round(inHandMonthly),
    },
    steps: [
      { label: "Basic salary", formula: `${Math.round(rules.basicPercentOfCtc * 100)}% of CTC`, value: basic },
      { label: "Employer PF", formula: "12% of basic", value: employerPf },
      { label: "Gratuity provision", formula: "basic × 15 ÷ (26 × 12)", value: gratuity },
      { label: "Gross salary (payslip)", formula: "CTC − employer PF − gratuity", value: grossSalary },
      { label: "Better regime tax", formula: `min(new ${newRegime.totalTax}, old ${oldRegime.totalTax})`, value: chosenTax },
      {
        label: "In-hand per month",
        formula: "(gross − employee PF − professional tax − tax) ÷ 12",
        value: inHandMonthly,
      },
    ],
    assumptions: [
      "Basic salary assumed at 50% of CTC — the minimum required under the Code on Wages (effective 21 Nov 2025)",
      "Employer and employee PF each assumed at 12% of full basic, matching common private-sector CTC structuring (the statutory minimum mandatory contribution is capped at 12% of ₹15,000 basic)",
      "Gratuity provisioned from year one as part of CTC, though only payable after 5 years of continuous service",
      "Professional tax varies by state; adjust the input for your state, or set it to zero where none applies",
      "Whichever regime gives the lower tax is used for the in-hand figure — see the comparison table for both",
    ],
    rulesVersion: taxResult.rulesVersion,
  };
}
