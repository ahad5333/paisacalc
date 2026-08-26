import type { CalcResult } from "./types";

export type MileageReimbursementInputs = {
  miles: number;
  ratePerMile: number;
};

export function calculateMileageReimbursement(inputs: MileageReimbursementInputs): CalcResult<{ reimbursement: number }> {
  const { miles, ratePerMile } = inputs;
  const reimbursement = Math.round(miles * ratePerMile * 100) / 100;

  return {
    value: { reimbursement },
    steps: [{ label: "Reimbursement", formula: `${miles} miles × rate/mile`, value: reimbursement }],
    assumptions: ["The standard mileage rate is meant to cover fuel, maintenance, depreciation, and insurance combined — check your employer's or tax authority's current published rate rather than assuming a fixed figure"],
    rulesVersion: "Standard mileage reimbursement",
  };
}
