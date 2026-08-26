import type { CalcResult } from "./types";

export type WeightForceInputs = {
  massKg: number;
};

const GRAVITY: Record<string, number> = {
  Earth: 9.807,
  Moon: 1.62,
  Mars: 3.71,
  Jupiter: 24.79,
};

export type WeightForceValue = {
  weightEarthN: number;
  weightMoonN: number;
  weightMarsN: number;
  weightJupiterN: number;
};

// Mass (kg) is how much matter something has, and stays constant
// anywhere. Weight is the force gravity exerts on that mass (in
// newtons), and changes with local gravity — the same 70kg person weighs
// very differently on the Moon than on Jupiter.
export function calculateWeightForce(inputs: WeightForceInputs): CalcResult<WeightForceValue> {
  const { massKg } = inputs;
  const round = (n: number) => Math.round(n * 100) / 100;

  const weightEarthN = round(massKg * GRAVITY.Earth);
  const weightMoonN = round(massKg * GRAVITY.Moon);
  const weightMarsN = round(massKg * GRAVITY.Mars);
  const weightJupiterN = round(massKg * GRAVITY.Jupiter);

  return {
    value: { weightEarthN, weightMoonN, weightMarsN, weightJupiterN },
    steps: [
      { label: "Weight on Earth", formula: `${massKg}kg × 9.807 m/s²`, value: `${weightEarthN} N` },
      { label: "Weight on the Moon", formula: `${massKg}kg × 1.62 m/s²`, value: `${weightMoonN} N` },
      { label: "Weight on Mars", formula: `${massKg}kg × 3.71 m/s²`, value: `${weightMarsN} N` },
    ],
    assumptions: ["Mass stays the same everywhere; weight is the force of gravity on that mass, which varies by location — this is the physics definition of weight (in newtons), not everyday \"how much I weigh\" (which usually means mass in kg)"],
    rulesVersion: "Standard weight = mass × gravitational acceleration",
  };
}
