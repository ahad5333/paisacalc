import type { CalcResult } from "./types";

export type DiceRollerInputs = {
  numDice: number;
  sides: number;
};

export function rollDice(inputs: DiceRollerInputs, rng: () => number = Math.random): CalcResult<{ rolls: number[]; total: number }> {
  const { numDice, sides } = inputs;
  const rolls: number[] = [];
  for (let i = 0; i < numDice; i++) rolls.push(Math.floor(rng() * sides) + 1);
  const total = rolls.reduce((a, b) => a + b, 0);

  return {
    value: { rolls, total },
    steps: [{ label: `${numDice} × d${sides}`, formula: "", value: `${rolls.join(", ")} = ${total}` }],
    assumptions: ["Each die is rolled independently with an equal chance of landing on any side"],
    rulesVersion: "Uniform random dice roll",
  };
}
