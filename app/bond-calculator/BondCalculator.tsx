"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBond } from "@/lib/calc/bond";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { face: 100000, coupon: 7, ytm: 8, years: 10, frequency: 2 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BondCalculator({ content }: { content: ReactNode }) {
  const [faceValue, setFaceValue] = useState(() => initialParam("f", DEFAULTS.face));
  const [couponRatePercent, setCouponRatePercent] = useState(() => initialParam("c", DEFAULTS.coupon));
  const [yieldToMaturityPercent, setYieldToMaturityPercent] = useState(() => initialParam("y", DEFAULTS.ytm));
  const [yearsToMaturity, setYearsToMaturity] = useState(() => initialParam("n", DEFAULTS.years));
  const [paymentsPerYear, setPaymentsPerYear] = useState(() => initialParam("pf", DEFAULTS.frequency));

  useEffect(() => {
    replaceUrlParams({ f: faceValue, c: couponRatePercent, y: yieldToMaturityPercent, n: yearsToMaturity, pf: paymentsPerYear });
  }, [faceValue, couponRatePercent, yieldToMaturityPercent, yearsToMaturity, paymentsPerYear]);

  const result = calculateBond({ faceValue, couponRatePercent, yieldToMaturityPercent, yearsToMaturity, paymentsPerYear });
  const { bondPrice, premiumOrDiscount } = result.value;

  return (
    <CalculatorPage
      title="Bond calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="center 50%"
      description="What a bond is actually worth today, given its face value, coupon rate, and the market's current yield — priced as coupons plus face value, both discounted at the yield."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Face value" value={faceValue} onChange={setFaceValue} min={1000} max={10000000} step={1000} slider />
          <NumericInput
            label="Coupon rate"
            value={couponRatePercent}
            onChange={setCouponRatePercent}
            min={0}
            max={15}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput
            label="Yield to maturity (market rate)"
            value={yieldToMaturityPercent}
            onChange={setYieldToMaturityPercent}
            min={0}
            max={15}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput
            label="Years to maturity"
            value={yearsToMaturity}
            onChange={setYearsToMaturity}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Coupon payments per year"
            value={paymentsPerYear}
            onChange={setPaymentsPerYear}
            min={1}
            max={12}
            step={1}
            suffix="times/year"
            slider
            helpText="2 = semi-annual, the most common convention for Indian bonds."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(bondPrice)}
          caption={`Bond price — a ${premiumOrDiscount >= 0 ? "premium of" : "discount of"} ${formatCurrency(Math.abs(premiumOrDiscount))} to face value`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
