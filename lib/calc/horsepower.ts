import type { CalcResult } from "./types";

export type HorsepowerInputs = {
  torqueLbFt: number;
  rpm: number;
};

// The standard automotive relationship between torque and horsepower —
// 5252 is not an arbitrary constant but the RPM at which torque (lb-ft)
// and horsepower numbers always cross on a dyno chart, a consequence of
// the unit conversion between the two.
export function calculateHorsepower(inputs: HorsepowerInputs): CalcResult<{ horsepower: number }> {
  const { torqueLbFt, rpm } = inputs;
  const horsepower = Math.round(((torqueLbFt * rpm) / 5252) * 100) / 100;

  return {
    value: { horsepower },
    steps: [{ label: "Horsepower", formula: `(${torqueLbFt} lb-ft × ${rpm} RPM) ÷ 5252`, value: horsepower }],
    assumptions: ["5252 RPM is the point where torque (lb-ft) and horsepower numbers are always numerically equal — a fixed consequence of the units, not a tuning parameter"],
    rulesVersion: "Standard torque-to-horsepower formula",
  };
}
