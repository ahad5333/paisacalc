import type { CalcResult } from "./types";

export type ElectricityCostInputs = {
  watts: number;
  hoursPerDay: number;
  costPerKwh: number;
};

export type ElectricityCostValue = {
  kwhPerDay: number;
  costPerDay: number;
  costPerMonth: number;
  costPerYear: number;
};

export function calculateElectricityCost(inputs: ElectricityCostInputs): CalcResult<ElectricityCostValue> {
  const { watts, hoursPerDay, costPerKwh } = inputs;
  const kwhPerDay = Math.round(((watts * hoursPerDay) / 1000) * 10000) / 10000;
  const costPerDay = Math.round(kwhPerDay * costPerKwh * 100) / 100;
  const costPerMonth = Math.round(costPerDay * 30 * 100) / 100;
  const costPerYear = Math.round(costPerDay * 365 * 100) / 100;

  return {
    value: { kwhPerDay, costPerDay, costPerMonth, costPerYear },
    steps: [
      { label: "Energy used per day", formula: `${watts}W × ${hoursPerDay}h ÷ 1000`, value: `${kwhPerDay} kWh` },
      { label: "Cost per day", formula: `${kwhPerDay} kWh × cost/kWh`, value: costPerDay },
      { label: "Cost per month", formula: "daily cost × 30", value: costPerMonth },
    ],
    assumptions: ["Assumes the appliance runs at a constant wattage for the entered hours every day — actual usage (and cost) varies with how the appliance is actually used"],
    rulesVersion: "Standard energy cost calculation",
  };
}
