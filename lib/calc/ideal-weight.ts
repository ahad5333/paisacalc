import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type IdealWeightInputs = {
  sex: Sex;
  heightCm: number;
};

export type IdealWeightValue = {
  hamwi: number;
  devine: number;
  robinson: number;
  miller: number;
  average: number;
};

const CM_TO_INCH = 1 / 2.54;
const KG_PER_LB = 0.453592;

// Four different formulas, all published between 1964 and 1983, each
// with a different base weight and per-inch increment above 5 feet —
// there's no single agreed "ideal weight" formula, which is exactly why
// this shows all four instead of picking one. Hamwi (1964) is the
// oldest and most quoted, and is the one expressed in POUNDS in the
// original literature; Devine (1974, still what hospital pharmacists
// use for weight-based drug dosing), Robinson (1983), and Miller (1983)
// are all natively expressed directly in KILOGRAMS with an inches-over-
// five-feet increment — a common hybrid unit convention in clinical
// dosing formulas. Mixing up which formulas need a lb→kg conversion and
// which don't is a common implementation mistake this deliberately
// avoids.
export function calculateIdealWeight(inputs: IdealWeightInputs): CalcResult<IdealWeightValue> {
  const { sex, heightCm } = inputs;
  const heightIn = heightCm * CM_TO_INCH;
  const inchesOver5Feet = Math.max(0, heightIn - 60);

  function fromPounds(baseLb: number, perInchLb: number): number {
    const lb = baseLb + perInchLb * inchesOver5Feet;
    return Math.round(lb * KG_PER_LB * 10) / 10;
  }

  function fromKg(baseKg: number, perInchKg: number): number {
    return Math.round((baseKg + perInchKg * inchesOver5Feet) * 10) / 10;
  }

  const hamwi = sex === "male" ? fromPounds(106, 6) : fromPounds(100, 5);
  const devine = sex === "male" ? fromKg(50, 2.3) : fromKg(45.5, 2.3);
  const robinson = sex === "male" ? fromKg(52, 1.9) : fromKg(49, 1.7);
  const miller = sex === "male" ? fromKg(56.2, 1.41) : fromKg(53.1, 1.36);

  const average = Math.round(((hamwi + devine + robinson + miller) / 4) * 10) / 10;

  return {
    value: { hamwi, devine, robinson, miller, average },
    steps: [
      { label: "Hamwi (1964)", formula: "base + per-inch increment above 5 feet", value: hamwi },
      { label: "Devine (1974)", formula: "base + per-inch increment above 5 feet", value: devine },
      { label: "Robinson (1983)", formula: "base + per-inch increment above 5 feet", value: robinson },
      { label: "Miller (1983)", formula: "base + per-inch increment above 5 feet", value: miller },
      { label: "Average of all four", formula: "(Hamwi + Devine + Robinson + Miller) ÷ 4", value: average },
    ],
    assumptions: [
      "There's no single agreed formula for \"ideal weight\" — these four are all in clinical use and disagree with each other, sometimes by several kilograms",
      "Devine is what hospital pharmacists most commonly use for weight-based drug dosing, if you're looking for the clinically-referenced one specifically",
      "None of these account for build, muscle mass, or frame size — a heavily muscled person may reasonably weigh more than any of these formulas suggest",
      "All four formulas were derived from Western population data decades ago, not calibrated against an Indian population",
    ],
    rulesVersion: "Hamwi / Devine / Robinson / Miller formulas",
  };
}
