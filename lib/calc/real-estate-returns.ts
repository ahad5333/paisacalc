import type { CalcResult } from "./types";

export type RealEstateReturnsInputs = {
  purchasePrice: number;
  buyingCostPercent: number;
  sellingCostPercent: number;
  appreciationPercent: number;
  holdingYears: number;
};

export type RealEstateReturnsValue = {
  totalBuyCost: number;
  saleValue: number;
  netSaleProceeds: number;
  netProfit: number;
  absoluteReturnPercent: number;
  annualizedReturnPercent: number;
};

// A pure buy-and-later-sell appreciation play — not rental income, which is
// its own calculator (lib/calc/rental-property.ts). Buying cost bundles
// stamp duty, registration, and buyer-side brokerage into one percentage:
// stamp duty alone runs roughly 3-10% of property value depending on the
// state (India has no single national rate — each state sets its own), so
// this is deliberately a user-adjustable input, not a hardcoded rule, and
// carries no /lib/rules dependency. Annualised return is a standard CAGR
// on total cash outlay (purchase price + buying costs) against net sale
// proceeds after selling costs.
export function calculateRealEstateReturns(inputs: RealEstateReturnsInputs): CalcResult<RealEstateReturnsValue> {
  const { purchasePrice, buyingCostPercent, sellingCostPercent, appreciationPercent, holdingYears } = inputs;

  const totalBuyCost = Math.round(purchasePrice * (1 + buyingCostPercent / 100));
  const saleValue = Math.round(purchasePrice * Math.pow(1 + appreciationPercent / 100, holdingYears));
  const netSaleProceeds = Math.round(saleValue * (1 - sellingCostPercent / 100));
  const netProfit = netSaleProceeds - totalBuyCost;
  const absoluteReturnPercent = Math.round((netProfit / totalBuyCost) * 1000) / 10;
  const annualizedReturnPercent =
    Math.round((Math.pow(netSaleProceeds / totalBuyCost, 1 / holdingYears) - 1) * 1000) / 10;

  return {
    value: {
      totalBuyCost,
      saleValue,
      netSaleProceeds,
      netProfit,
      absoluteReturnPercent,
      annualizedReturnPercent,
    },
    steps: [
      {
        label: "Total buying cost",
        formula: `${purchasePrice} × (1 + ${buyingCostPercent}%)`,
        value: totalBuyCost,
      },
      {
        label: "Sale value after N years",
        formula: `${purchasePrice} × (1+appreciation)ᴺ`,
        value: saleValue,
      },
      {
        label: "Net proceeds after selling costs",
        formula: `${saleValue} × (1 − ${sellingCostPercent}%)`,
        value: netSaleProceeds,
      },
      { label: "Net profit", formula: "Net proceeds − Total buying cost", value: netProfit },
      { label: "Annualised return (CAGR)", formula: "(Net proceeds ÷ Total cost)^(1/years) − 1", value: annualizedReturnPercent },
    ],
    assumptions: [
      "Buying cost (stamp duty, registration, buyer-side brokerage) is entered as a single percentage — actual stamp duty varies by state, roughly 3-10% of property value, so check your state's current rate rather than relying on a default",
      "Appreciation is a straight-line annual rate held constant for the full holding period — real property values rarely move this smoothly",
      "Ignores home loan interest if the purchase was financed, maintenance costs during the holding period, and capital gains tax on the profit",
      "Selling costs (brokerage, etc.) are deducted from the sale value, not added to the buying side",
    ],
    rulesVersion: "Buy-and-sell CAGR (assumption-based)",
  };
}
