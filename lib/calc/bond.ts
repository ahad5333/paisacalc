import type { CalcResult } from "./types";

export type BondInputs = {
  faceValue: number;
  couponRatePercent: number;
  yieldToMaturityPercent: number;
  yearsToMaturity: number;
  paymentsPerYear: number;
};

export type BondValue = {
  couponPerPeriod: number;
  presentValueOfCoupons: number;
  presentValueOfFaceValue: number;
  bondPrice: number;
  premiumOrDiscount: number;
};

// Standard bond pricing: the coupon stream is an ordinary annuity, the
// face value is a single lump sum returned at maturity — both discounted
// at the market yield (YTM), not the coupon rate itself. When YTM equals
// the coupon rate the bond prices at exactly face value (par); above it,
// at a discount; below it, at a premium — the inverse relationship
// between yield and price that catches most first-time bond buyers off
// guard. India's retail bond market (RBI Retail Direct for G-Secs,
// corporate bonds via exchanges) increasingly makes this a real retail
// calculation, not just an institutional one.
export function calculateBond(inputs: BondInputs): CalcResult<BondValue> {
  const { faceValue, couponRatePercent, yieldToMaturityPercent, yearsToMaturity, paymentsPerYear } = inputs;

  const couponPerPeriod = Math.round((faceValue * couponRatePercent) / 100 / paymentsPerYear);
  const periodicYield = yieldToMaturityPercent / 100 / paymentsPerYear;
  const totalPeriods = Math.round(yearsToMaturity * paymentsPerYear);

  const presentValueOfCoupons =
    periodicYield === 0
      ? couponPerPeriod * totalPeriods
      : Math.round((couponPerPeriod * (1 - Math.pow(1 + periodicYield, -totalPeriods))) / periodicYield);
  const presentValueOfFaceValue = Math.round(faceValue / Math.pow(1 + periodicYield, totalPeriods));
  const bondPrice = presentValueOfCoupons + presentValueOfFaceValue;
  const premiumOrDiscount = bondPrice - faceValue;

  return {
    value: {
      couponPerPeriod,
      presentValueOfCoupons,
      presentValueOfFaceValue,
      bondPrice,
      premiumOrDiscount,
    },
    steps: [
      { label: "Coupon per period", formula: `${faceValue} × ${couponRatePercent}% ÷ ${paymentsPerYear}`, value: couponPerPeriod },
      { label: "Present value of all coupons", formula: "coupon annuity discounted at the yield", value: presentValueOfCoupons },
      { label: "Present value of face value at maturity", formula: `${faceValue} ÷ (1+yield)ⁿ`, value: presentValueOfFaceValue },
      { label: "Bond price", formula: "PV of coupons + PV of face value", value: bondPrice },
      { label: "Premium (+) or discount (−) to face value", formula: "Bond price − Face value", value: premiumOrDiscount },
    ],
    assumptions: [
      "Priced at issue or a coupon date — no accrued interest since the last coupon is added",
      "The yield to maturity is held constant for the whole remaining term, which is what's being solved for in reverse of a real market price",
      "When yield equals the coupon rate the bond prices at exactly face value; above it, the bond is worth less than face value (a discount); below it, more (a premium)",
      "Ignores credit risk, callability, and any tax treatment on coupon income",
    ],
    rulesVersion: "Standard bond pricing (PV of coupons + PV of face value)",
  };
}
