import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type BodyFatInputs = {
  sex: Sex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm: number; // only used for female
};

export type BodyFatCategory = "essential" | "athletic" | "fitness" | "average" | "obese";

export type BodyFatValue = {
  bodyFatPercent: number;
  category: BodyFatCategory;
};

const CM_TO_INCH = 1 / 2.54;

// The US Navy circumference method (Hodgdon & Beckett, 1984) — tape
// measurements rather than calipers or a scan, which is why it's the
// formula used for military body-composition standards and the most
// common "just a tape measure" body fat estimate. The published
// constants (86.010, 70.041, etc.) are calibrated for INCHES, not
// centimetres, so measurements taken in cm are converted internally
// before the formula runs — this site takes cm everywhere else for
// consistency, not because the formula wants it.
export function calculateBodyFat(inputs: BodyFatInputs): CalcResult<BodyFatValue> {
  const { sex, heightCm, neckCm, waistCm, hipCm } = inputs;
  const heightIn = heightCm * CM_TO_INCH;
  const neckIn = neckCm * CM_TO_INCH;
  const waistIn = waistCm * CM_TO_INCH;
  const hipIn = hipCm * CM_TO_INCH;

  const rawPercent =
    sex === "male"
      ? 86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76
      : 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;

  const bodyFatPercent = Math.round(rawPercent * 10) / 10;

  // Category bands differ by sex — the American Council on Exercise's
  // widely cited ranges, not a single universal scale.
  const maleBounds = { essential: 5, athletic: 13, fitness: 17, average: 24 };
  const femaleBounds = { essential: 13, athletic: 20, fitness: 24, average: 31 };
  const b = sex === "male" ? maleBounds : femaleBounds;
  const category: BodyFatCategory =
    bodyFatPercent < b.essential
      ? "essential"
      : bodyFatPercent < b.athletic
        ? "athletic"
        : bodyFatPercent < b.fitness
          ? "fitness"
          : bodyFatPercent < b.average
            ? "average"
            : "obese";

  return {
    value: { bodyFatPercent, category },
    steps:
      sex === "male"
        ? [
            { label: "Body fat % (US Navy method)", formula: "86.010×log(waist−neck) − 70.041×log(height) + 36.76", value: bodyFatPercent },
          ]
        : [
            {
              label: "Body fat % (US Navy method)",
              formula: "163.205×log(waist+hip−neck) − 97.684×log(height) − 78.387",
              value: bodyFatPercent,
            },
          ],
    assumptions: [
      "The US Navy circumference method estimates body fat from tape measurements — it's an estimate, not as accurate as a DEXA scan or hydrostatic weighing",
      "Category bands (essential / athletic / fitness / average / obese) follow the American Council on Exercise's widely cited ranges and differ by sex",
      "Measurements should be taken at the narrowest point of the waist and directly under the larynx for the neck, per the standard protocol — inconsistent measurement technique is the biggest source of error in this method",
    ],
    rulesVersion: "US Navy circumference method (Hodgdon & Beckett, 1984)",
  };
}
