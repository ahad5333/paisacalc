import type { CalcResult } from "./types";

export type LetterGrade = "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "F";

const GRADE_POINTS: Record<LetterGrade, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, F: 0.0,
};

export type Course = { grade: LetterGrade; credits: number };
export type GpaInputs = { courses: Course[] };
export type GpaValue = { gpa: number; totalCredits: number; totalQualityPoints: number };

// Standard US college GPA — each course's grade points (on a 4.0 scale)
// are weighted by its credit hours, so a 4-credit course counts twice as
// much toward the GPA as a 2-credit one.
export function calculateGpa(inputs: GpaInputs): CalcResult<GpaValue> {
  const { courses } = inputs;
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalQualityPoints = Math.round(courses.reduce((sum, c) => sum + GRADE_POINTS[c.grade] * c.credits, 0) * 1000) / 1000;
  const gpa = totalCredits > 0 ? Math.round((totalQualityPoints / totalCredits) * 1000) / 1000 : 0;

  return {
    value: { gpa, totalCredits, totalQualityPoints },
    steps: [
      { label: "Total quality points", formula: "Σ(grade points × credits)", value: totalQualityPoints },
      { label: "Total credits", formula: "Σ credits", value: totalCredits },
      { label: "GPA", formula: "quality points ÷ credits", value: gpa },
    ],
    assumptions: ["Uses the standard 4.0 scale with common +/- grade points — some institutions use slightly different point values for +/- grades"],
    rulesVersion: "Standard 4.0-scale GPA",
  };
}
