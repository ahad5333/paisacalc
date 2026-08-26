import type { CalcResult } from "./types";

export type CollegeCostInputs = {
  currentAnnualCost: number;
  yearsUntilEnrollment: number;
  educationInflationPercent: number;
  courseDurationYears: number;
};

export type CollegeCostValue = {
  costAtEnrollment: number;
  totalCostOverCourse: number;
};

// Education cost inflation in India has historically run well above
// general CPI inflation — commonly cited estimates put it at 10-12% a
// year for professional courses, meaningfully higher than the 5-6%
// headline inflation figure the inflation calculator uses by default.
// Projects today's annual cost forward to what it'll actually cost by
// enrollment, then holds that same inflated rate rising through each
// year of the course itself (year 1 of the course costs the enrollment
// year's rate, year 2 costs one more year of inflation on top, and so on).
export function calculateCollegeCost(inputs: CollegeCostInputs): CalcResult<CollegeCostValue> {
  const { currentAnnualCost, yearsUntilEnrollment, educationInflationPercent, courseDurationYears } = inputs;
  const growthFactor = 1 + educationInflationPercent / 100;

  const costAtEnrollment = Math.round(currentAnnualCost * Math.pow(growthFactor, yearsUntilEnrollment));

  let totalCostOverCourse = 0;
  for (let year = 0; year < courseDurationYears; year++) {
    totalCostOverCourse += Math.round(currentAnnualCost * Math.pow(growthFactor, yearsUntilEnrollment + year));
  }

  return {
    value: { costAtEnrollment, totalCostOverCourse },
    steps: [
      {
        label: "Annual cost in the enrollment year",
        formula: `${currentAnnualCost} × (1+inflation)^${yearsUntilEnrollment}`,
        value: costAtEnrollment,
      },
      {
        label: `Total cost across all ${courseDurationYears} years of the course`,
        formula: "each year's cost inflated further from the last",
        value: totalCostOverCourse,
      },
    ],
    assumptions: [
      "Education cost inflation is commonly estimated at 10-12% a year for professional courses in India, well above general CPI inflation — this is a planning assumption you set, not a fixed government figure",
      "Each year of the course itself is assumed to cost more than the last, at the same inflation rate, rather than being locked in at the enrollment year's price",
      "Doesn't include one-time costs like admission or donation fees some institutions charge separately from tuition",
    ],
    rulesVersion: "Education cost projection (assumption-based)",
  };
}
