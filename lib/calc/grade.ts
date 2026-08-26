import type { CalcResult } from "./types";

export type Assignment = { score: number; weightPct: number };
export type GradeInputs = { assignments: Assignment[] };
export type GradeValue = { weightedAveragePct: number; letterGrade: string; totalWeight: number };

function toLetterGrade(pct: number): string {
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 60) return "D";
  return "F";
}

export function calculateGrade(inputs: GradeInputs): CalcResult<GradeValue> {
  const { assignments } = inputs;
  const totalWeight = Math.round(assignments.reduce((sum, a) => sum + a.weightPct, 0) * 100) / 100;
  const weightedSum = assignments.reduce((sum, a) => sum + a.score * a.weightPct, 0);
  const weightedAveragePct = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
  const letterGrade = toLetterGrade(weightedAveragePct);

  return {
    value: { weightedAveragePct, letterGrade, totalWeight },
    steps: [
      { label: "Weighted average", formula: "Σ(score × weight) ÷ Σ weight", value: `${weightedAveragePct}%` },
      { label: "Letter grade", formula: "", value: letterGrade },
    ],
    assumptions: [
      totalWeight !== 100
        ? `Weights sum to ${totalWeight}%, not 100% — the average is still computed correctly relative to the weights entered, but double-check your weights add up to what your course syllabus specifies`
        : "Weights sum to 100%, as expected",
      "Letter grade cutoffs follow a common convention (93+ = A, 90+ = A-, etc.) — your institution's actual scale may differ",
    ],
    rulesVersion: "Standard weighted-average grading",
  };
}
