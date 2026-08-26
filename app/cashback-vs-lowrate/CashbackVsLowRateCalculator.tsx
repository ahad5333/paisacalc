"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateCashbackVsLowRate } from "@/lib/calc/cashback-vs-lowrate";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { price: 1000000, cashback: 50000, regularRate: 10, lowRate: 5, years: 5 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CashbackVsLowRateCalculator({ content }: { content: ReactNode }) {
  const [carPrice, setCarPrice] = useState(() => initialParam("p", DEFAULTS.price));
  const [cashbackAmount, setCashbackAmount] = useState(() => initialParam("c", DEFAULTS.cashback));
  const [regularRatePercent, setRegularRatePercent] = useState(() => initialParam("rr", DEFAULTS.regularRate));
  const [lowRatePercent, setLowRatePercent] = useState(() => initialParam("lr", DEFAULTS.lowRate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ p: carPrice, c: cashbackAmount, rr: regularRatePercent, lr: lowRatePercent, y: tenureYears });
  }, [carPrice, cashbackAmount, regularRatePercent, lowRatePercent, tenureYears]);

  const result = calculateCashbackVsLowRate({ carPrice, cashbackAmount, regularRatePercent, lowRatePercent, tenureYears });
  const { savings, better } = result.value;

  return (
    <CalculatorPage
      title="Cash back vs. low interest calculator"
      heroImage="/images/hero-highway.webp"
      heroObjectPosition="center 35%"
      description="Which actually costs less on a car loan — taking the cash rebate at the regular rate, or skipping it for a promotional low rate on the full price."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Car price" value={carPrice} onChange={setCarPrice} min={200000} max={5000000} step={50000} slider />
          <NumericInput
            label="Cash rebate offered"
            value={cashbackAmount}
            onChange={setCashbackAmount}
            min={0}
            max={500000}
            step={5000}
            slider
          />
          <NumericInput
            label="Regular rate (with rebate)"
            value={regularRatePercent}
            onChange={setRegularRatePercent}
            min={5}
            max={16}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput
            label="Promotional rate (no rebate)"
            value={lowRatePercent}
            onChange={setLowRatePercent}
            min={0}
            max={16}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput
            label="Loan tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={7}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(Math.abs(savings))}
          caption={`${better === "cashback" ? "Taking the cash rebate" : "The promotional low rate"} costs less overall`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
