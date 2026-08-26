import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type LeanBodyMassInputs = {
  sex: Sex;
  heightCm: number;
  weightKg: number;
};

export type LeanBodyMassValue = {
  leanMassKg: number;
  fatMassKg: number;
  leanMassPercent: number;
};

// The Boer formula (1984) — validated against actual body-composition
// measurements more consistently than the older James or Hume formulas,
// which is why it's the one most commonly recommended today. Unlike the
// body fat calculator (which needs tape measurements), this only needs
// height and weight — a coarser estimate in exchange for needing nothing
// but a scale.
export function calculateLeanBodyMass(inputs: LeanBodyMassInputs): CalcResult<LeanBodyMassValue> {
  const { sex, heightCm, weightKg } = inputs;

  const leanMassKg =
    sex === "male"
      ? Math.round((0.407 * weightKg + 0.267 * heightCm - 19.2) * 10) / 10
      : Math.round((0.252 * weightKg + 0.473 * heightCm - 48.3) * 10) / 10;

  const fatMassKg = Math.round((weightKg - leanMassKg) * 10) / 10;
  const leanMassPercent = Math.round((leanMassKg / weightKg) * 1000) / 10;

  return {
    value: { leanMassKg, fatMassKg, leanMassPercent },
    steps: [
      {
        label: "Lean body mass (Boer formula)",
        formula:
          sex === "male"
            ? "0.407×weight + 0.267×height − 19.2"
            : "0.252×weight + 0.473×height − 48.3",
        value: leanMassKg,
      },
      { label: "Fat mass", formula: `${weightKg} − ${leanMassKg}`, value: fatMassKg },
    ],
    assumptions: [
      "The Boer formula (1984) estimates lean mass from height and weight alone — no tape measurements, which makes it coarser than the body fat calculator's circumference method",
      "Lean mass includes muscle, bone, organs, and water — not muscle alone",
      "Not calibrated for people with unusually high muscle mass (e.g. bodybuilders) or very low body fat, where it tends to be less accurate",
    ],
    rulesVersion: "Boer formula (1984)",
  };
}
