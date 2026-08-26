import type { CalcResult } from "./types";

export type TipInputs = {
  billAmount: number;
  tipPct: number;
  numPeople: number;
};

export type TipValue = {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
};

export function calculateTip(inputs: TipInputs): CalcResult<TipValue> {
  const { billAmount, tipPct, numPeople } = inputs;
  const tipAmount = Math.round(billAmount * (tipPct / 100) * 100) / 100;
  const totalAmount = Math.round((billAmount + tipAmount) * 100) / 100;
  const perPerson = Math.round((totalAmount / numPeople) * 100) / 100;

  return {
    value: { tipAmount, totalAmount, perPerson },
    steps: [
      { label: "Tip amount", formula: `bill × ${tipPct}%`, value: tipAmount },
      { label: "Total bill", formula: "bill + tip", value: totalAmount },
      { label: "Per person", formula: `total ÷ ${numPeople}`, value: perPerson },
    ],
    assumptions: ["Splits the total evenly across everyone — for splitting by what each person actually ordered, add up individual items separately before tipping"],
    rulesVersion: "Standard tip calculation",
  };
}
