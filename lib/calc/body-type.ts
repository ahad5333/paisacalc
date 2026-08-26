import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type Somatotype = "ectomorph" | "mesomorph" | "endomorph";

export type BodyTypeInputs = {
  sex: Sex;
  heightCm: number;
  wristCircumferenceCm: number;
};

export type BodyTypeValue = {
  ratio: number;
  somatotype: Somatotype;
  label: string;
};

const LABELS: Record<Somatotype, string> = {
  ectomorph: "Ectomorph — small/narrow frame",
  mesomorph: "Mesomorph — medium frame",
  endomorph: "Endomorph — large frame",
};

function classify(sex: Sex, ratio: number): Somatotype {
  if (sex === "male") {
    if (ratio > 10.4) return "ectomorph";
    if (ratio >= 9.6) return "mesomorph";
    return "endomorph";
  }
  if (ratio > 11.0) return "ectomorph";
  if (ratio >= 10.1) return "mesomorph";
  return "endomorph";
}

// Uses height-to-wrist-circumference ratio as a simple proxy for
// skeletal frame size, a heuristic common in fitness literature — wrist
// circumference barely changes with fat gain or muscle building, making
// it a reasonable stand-in for frame size specifically, separate from
// current body composition.
export function calculateBodyType(inputs: BodyTypeInputs): CalcResult<BodyTypeValue> {
  const { sex, heightCm, wristCircumferenceCm } = inputs;
  const ratio = Math.round((heightCm / wristCircumferenceCm) * 100) / 100;
  const somatotype = classify(sex, ratio);

  return {
    value: { ratio, somatotype, label: LABELS[somatotype] },
    steps: [{ label: "Height-to-wrist ratio", formula: "height ÷ wrist circumference", value: ratio }],
    assumptions: [
      "Uses a height-to-wrist-circumference ratio as a proxy for skeletal frame size — a heuristic from fitness literature, not a clinically validated anthropometric classification",
      "Somatotype describes a general frame-size tendency, not a fixed destiny — training and nutrition still meaningfully change body composition within any frame size",
      "Different sources use slightly different ratio cutoffs for each category; treat this as a rough guide rather than a precise classification",
    ],
    rulesVersion: "Height-to-wrist ratio frame-size heuristic",
  };
}
