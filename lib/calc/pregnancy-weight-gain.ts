import type { CalcResult } from "./types";

export type WeightGainCategory = "underweight" | "normal" | "overweight" | "obese";

export type PregnancyWeightGainInputs = {
  prePregnancyHeightCm: number;
  prePregnancyWeightKg: number;
  currentWeek: number;
  twins: boolean;
};

export type PregnancyWeightGainValue = {
  prePregnancyBmi: number;
  category: WeightGainCategory;
  totalGainLowKg: number;
  totalGainHighKg: number;
  recommendedAtWeekLowKg: number;
  recommendedAtWeekHighKg: number;
};

const SINGLETON_RANGES: Record<WeightGainCategory, [number, number]> = {
  underweight: [12.5, 18],
  normal: [11.5, 16],
  overweight: [7, 11.5],
  obese: [5, 9],
};

// IOM has no separate underweight-twins guideline (insufficient data at
// publication) — the normal-weight twin range is used as the closest
// documented proxy, flagged explicitly in the assumptions below rather
// than silently substituted.
const TWIN_RANGES: Record<WeightGainCategory, [number, number]> = {
  underweight: [16.8, 24.5],
  normal: [16.8, 24.5],
  overweight: [14.1, 22.7],
  obese: [11.3, 19.1],
};

function categorize(bmi: number): WeightGainCategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

// IOM (Institute of Medicine, 2009) pregnancy weight gain guidelines —
// deliberately categorised on the standard 18.5/25/30 BMI cutoffs the
// guideline itself was validated against, not the lower Asian cutoffs
// this site's own BMI calculator otherwise uses: the recommended gain
// ranges below are only meaningful relative to the boundaries IOM defined
// them with. Gain is modelled as roughly flat through the first
// trimester (a fixed 1.5kg allowance), then a linear ramp from week 13 to
// week 40 toward the category's total range — a reasonable approximation
// of the real gain curve, not a week-by-week clinical table.
export function calculatePregnancyWeightGain(inputs: PregnancyWeightGainInputs): CalcResult<PregnancyWeightGainValue> {
  const { prePregnancyHeightCm, prePregnancyWeightKg, currentWeek, twins } = inputs;
  const heightM = prePregnancyHeightCm / 100;
  const prePregnancyBmi = Math.round((prePregnancyWeightKg / (heightM * heightM)) * 10) / 10;
  const category = categorize(prePregnancyBmi);
  const [totalGainLowKg, totalGainHighKg] = (twins ? TWIN_RANGES : SINGLETON_RANGES)[category];

  const FIRST_TRIMESTER_ALLOWANCE_KG = 1.5;
  function projectedAtWeek(totalKg: number): number {
    if (currentWeek <= 13) {
      return Math.round(FIRST_TRIMESTER_ALLOWANCE_KG * (currentWeek / 13) * 10) / 10;
    }
    const rampFraction = Math.min(1, (currentWeek - 13) / 27);
    return Math.round((FIRST_TRIMESTER_ALLOWANCE_KG + (totalKg - FIRST_TRIMESTER_ALLOWANCE_KG) * rampFraction) * 10) / 10;
  }

  const recommendedAtWeekLowKg = projectedAtWeek(totalGainLowKg);
  const recommendedAtWeekHighKg = projectedAtWeek(totalGainHighKg);

  return {
    value: { prePregnancyBmi, category, totalGainLowKg, totalGainHighKg, recommendedAtWeekLowKg, recommendedAtWeekHighKg },
    steps: [
      { label: "Pre-pregnancy BMI", formula: "weight ÷ height²", value: prePregnancyBmi },
      { label: "Total recommended gain (low)", formula: "IOM range for your BMI category", value: totalGainLowKg },
      { label: "Total recommended gain (high)", formula: "IOM range for your BMI category", value: totalGainHighKg },
      { label: `Recommended gain by week ${currentWeek}`, formula: "flat first trimester, then linear to term", value: `${recommendedAtWeekLowKg}–${recommendedAtWeekHighKg} kg` },
    ],
    assumptions: [
      "Uses the IOM (2009) guideline's own standard BMI cutoffs (18.5 / 25 / 30) to categorise pre-pregnancy weight — not the lower Asian cutoffs this site's BMI calculator otherwise uses, since the gain ranges below were validated against the standard boundaries specifically",
      twins && category === "underweight"
        ? "IOM has no published underweight-twins range — the normal-weight twin range is shown as the closest documented proxy"
        : "Twin pregnancies use IOM's separate, higher twin-specific gain ranges",
      "The by-week figure is a linear approximation (flat first trimester, then a straight ramp to term) — not a week-by-week clinical growth chart",
      "These are population guidelines, not individual medical advice — always follow your own doctor's guidance over a general calculator",
    ],
    rulesVersion: "IOM (Institute of Medicine) 2009 pregnancy weight gain guidelines",
  };
}
