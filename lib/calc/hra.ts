import { HRA_FY_2026_27 } from "@/lib/rules";
import type { CalcResult } from "./types";

export type HraInputs = {
  basicAnnual: number; // basic + DA, annual
  hraReceivedAnnual: number;
  rentPaidAnnual: number;
  isMetro: boolean;
};

export type HraLimitName = "actualHra" | "salaryPercent" | "rentMinusSalary";

export type HraValue = {
  limitActualHra: number;
  limitSalaryPercent: number;
  limitRentMinusSalary: number;
  exemption: number;
  taxableHra: number;
  bindingLimit: HraLimitName;
};

const LIMIT_LABELS: Record<HraLimitName, string> = {
  actualHra: "Actual HRA received",
  salaryPercent: "50%/40% of salary",
  rentMinusSalary: "Rent paid minus 10% of salary",
};

// Section 10(13A), Rule 279 of the Income-tax Rules 2026 — exemption is the
// LOWEST of three limits, never negotiated up. Old regime only; the new
// regime exempts none of it. See lib/rules/fy-2026-27.ts for the metro city
// list and rates, and their sourcing.
export function calculateHraExemption(inputs: HraInputs): CalcResult<HraValue> {
  const { basicAnnual, hraReceivedAnnual, rentPaidAnnual, isMetro } = inputs;
  const rules = HRA_FY_2026_27;

  const limitActualHra = Math.max(0, hraReceivedAnnual);
  const limitSalaryPercent = basicAnnual * (isMetro ? rules.metroRate : rules.nonMetroRate);
  const limitRentMinusSalary = Math.max(
    0,
    rentPaidAnnual - basicAnnual * rules.rentMinusSalaryPercent,
  );

  const limits: Record<HraLimitName, number> = {
    actualHra: limitActualHra,
    salaryPercent: limitSalaryPercent,
    rentMinusSalary: limitRentMinusSalary,
  };

  const bindingLimit = (Object.keys(limits) as HraLimitName[]).reduce((lowest, key) =>
    limits[key] < limits[lowest] ? key : lowest,
  );
  const exemption = limits[bindingLimit];
  const taxableHra = Math.max(0, hraReceivedAnnual - exemption);

  return {
    value: {
      limitActualHra: Math.round(limitActualHra),
      limitSalaryPercent: Math.round(limitSalaryPercent),
      limitRentMinusSalary: Math.round(limitRentMinusSalary),
      exemption: Math.round(exemption),
      taxableHra: Math.round(taxableHra),
      bindingLimit,
    },
    steps: [
      { label: "Actual HRA received", formula: "as entered", value: limitActualHra },
      {
        label: `${isMetro ? "50%" : "40%"} of salary`,
        formula: `${isMetro ? "50%" : "40%"} × (basic + DA)`,
        value: limitSalaryPercent,
      },
      {
        label: "Rent paid − 10% of salary",
        formula: "rent paid − 10% × (basic + DA)",
        value: limitRentMinusSalary,
      },
      {
        label: "Exemption",
        formula: `lowest of the three — ${LIMIT_LABELS[bindingLimit]}`,
        value: exemption,
      },
      { label: "Taxable HRA", formula: "HRA received − exemption", value: taxableHra },
    ],
    assumptions: [
      "Old regime only — the new regime doesn't exempt any part of HRA received",
      "Salary means basic + dearness allowance only, not HRA or other allowances",
      "Metro rate (50%) applies to Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, and Ahmedabad; every other city uses 40%",
      "Assumes rent is paid and HRA is received for the full year at a constant rate — pro-rate manually for a job or house change mid-year",
    ],
    rulesVersion: "FY 2026-27",
  };
}
