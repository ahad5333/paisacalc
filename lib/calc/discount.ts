import type { CalcResult } from "./types";

export type DiscountInputs = {
  originalPrice: number;
  discountPercent: number;
};

export type DiscountValue = {
  discountAmount: number;
  finalPrice: number;
};

export function calculateDiscount(inputs: DiscountInputs): CalcResult<DiscountValue> {
  const { originalPrice, discountPercent } = inputs;

  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = originalPrice - discountAmount;

  return {
    value: { discountAmount, finalPrice },
    steps: [
      { label: "Discount amount", formula: `${originalPrice} × ${discountPercent}%`, value: discountAmount },
      { label: "Final price", formula: `${originalPrice} − ${discountAmount}`, value: finalPrice },
    ],
    assumptions: ["A single flat discount applied once — doesn't model stacked or successive discounts"],
    rulesVersion: "Simple percentage discount",
  };
}
