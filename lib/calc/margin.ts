import type { CalcResult } from "./types";

export type MarginInputs = {
  costPrice: number;
  sellingPrice: number;
};

export type MarginValue = {
  profit: number;
  marginPercent: number;
  markupPercent: number;
};

// Margin and markup are the same profit amount expressed as a percentage
// of two different bases — margin against the selling price, markup
// against the cost price — and mixing them up is one of the most common
// small-business pricing mistakes: a 50% markup is only a 33.3% margin,
// not 50%.
export function calculateMargin(inputs: MarginInputs): CalcResult<MarginValue> {
  const { costPrice, sellingPrice } = inputs;

  const profit = sellingPrice - costPrice;
  const marginPercent = sellingPrice > 0 ? Math.round((profit / sellingPrice) * 10000) / 100 : 0;
  const markupPercent = costPrice > 0 ? Math.round((profit / costPrice) * 10000) / 100 : 0;

  return {
    value: { profit, marginPercent, markupPercent },
    steps: [
      { label: "Profit", formula: `${sellingPrice} − ${costPrice}`, value: profit },
      { label: "Margin (profit ÷ selling price)", formula: `${profit} ÷ ${sellingPrice} × 100`, value: marginPercent },
      { label: "Markup (profit ÷ cost price)", formula: `${profit} ÷ ${costPrice} × 100`, value: markupPercent },
    ],
    assumptions: [
      "Margin and markup are always different numbers unless cost is zero — margin is always the smaller of the two for a profitable sale",
      "Doesn't account for any other costs (overhead, shipping, payment processing fees) beyond the direct cost price entered",
    ],
    rulesVersion: "Margin and markup (definitional)",
  };
}
