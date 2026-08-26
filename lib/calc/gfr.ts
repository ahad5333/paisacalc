import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type GfrInputs = {
  sex: Sex;
  age: number;
  serumCreatinineMgDl: number;
};

export type GfrCategory = "G1" | "G2" | "G3a" | "G3b" | "G4" | "G5";

export type GfrValue = {
  egfr: number;
  category: GfrCategory;
  categoryLabel: string;
};

const KAPPA: Record<Sex, number> = { female: 0.7, male: 0.9 };
const ALPHA: Record<Sex, number> = { female: -0.241, male: -0.302 };

function categorize(egfr: number): { category: GfrCategory; categoryLabel: string } {
  if (egfr >= 90) return { category: "G1", categoryLabel: "Normal or high" };
  if (egfr >= 60) return { category: "G2", categoryLabel: "Mildly decreased" };
  if (egfr >= 45) return { category: "G3a", categoryLabel: "Mildly to moderately decreased" };
  if (egfr >= 30) return { category: "G3b", categoryLabel: "Moderately to severely decreased" };
  if (egfr >= 15) return { category: "G4", categoryLabel: "Severely decreased" };
  return { category: "G5", categoryLabel: "Kidney failure" };
}

// CKD-EPI 2021 creatinine equation (Inker et al., NEJM 2021) — the current
// clinical standard, which replaced the 2009 CKD-EPI equation specifically
// to remove a race coefficient that the original version applied; this
// race-free version is now the recommended equation across major
// nephrology guidelines. Staging follows KDIGO's eGFR categories (G1-G5).
export function calculateGfr(inputs: GfrInputs): CalcResult<GfrValue> {
  const { sex, age, serumCreatinineMgDl: scr } = inputs;
  const kappa = KAPPA[sex];
  const alpha = ALPHA[sex];
  const minRatio = Math.min(scr / kappa, 1);
  const maxRatio = Math.max(scr / kappa, 1);

  let egfr = 142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.2) * Math.pow(0.9938, age);
  if (sex === "female") egfr *= 1.012;
  egfr = Math.round(egfr * 10) / 10;

  const { category, categoryLabel } = categorize(egfr);

  return {
    value: { egfr, category, categoryLabel },
    steps: [
      { label: "Estimated GFR", formula: "CKD-EPI 2021 (Scr, age, sex)", value: egfr },
      { label: "KDIGO stage", formula: `${category} — ${categoryLabel}`, value: `${category} (${categoryLabel})` },
    ],
    assumptions: [
      "Uses the CKD-EPI 2021 equation, the current clinical standard, which removed the earlier version's race coefficient",
      "A single creatinine reading can be affected by hydration, recent muscle exertion, diet, and muscle mass — CKD is only diagnosed from abnormal eGFR persisting for 3 months or more, not a single test",
      "This is not a diagnosis — any result outside the normal range should be discussed with a doctor, who will consider it alongside other tests like urine albumin",
    ],
    rulesVersion: "CKD-EPI 2021 creatinine equation, KDIGO staging",
  };
}
