"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDownPayment } from "@/lib/calc/down-payment";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { price: 6000000, down: 20, rate: 8.5, years: 20, savings: 30000 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DownPaymentCalculator({ content }: { content: ReactNode }) {
  const [homePrice, setHomePrice] = useState(() => initialParam("p", DEFAULTS.price));
  const [downPaymentPercent, setDownPaymentPercent] = useState(() => initialParam("d", DEFAULTS.down));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [monthlySavingsCapacity, setMonthlySavingsCapacity] = useState(() => initialParam("s", DEFAULTS.savings));

  useEffect(() => {
    replaceUrlParams({ p: homePrice, d: downPaymentPercent, r: ratePercent, y: tenureYears, s: monthlySavingsCapacity });
  }, [homePrice, downPaymentPercent, ratePercent, tenureYears, monthlySavingsCapacity]);

  const result = calculateDownPayment({ homePrice, downPaymentPercent, ratePercent, tenureYears, monthlySavingsCapacity });
  const { downPaymentAmount, monthsToSaveDownPayment } = result.value;
  const years = Math.floor(monthsToSaveDownPayment / 12);
  const months = monthsToSaveDownPayment % 12;

  return (
    <CalculatorPage
      title="Down payment calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="35% 65%"
      description="How much down payment a target home price needs, and how long it takes to save it at your own monthly rate."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Target home price"
            value={homePrice}
            onChange={setHomePrice}
            min={1000000}
            max={50000000}
            step={100000}
            slider
          />
          <NumericInput
            label="Down payment"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={10}
            max={50}
            step={5}
            suffix="%"
            slider
          />
          <NumericInput
            label="Loan interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={6}
            max={12}
            step={0.05}
            suffix="%"
            slider
          />
          <NumericInput
            label="Loan tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={5}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Monthly savings capacity"
            value={monthlySavingsCapacity}
            onChange={setMonthlySavingsCapacity}
            min={1000}
            max={500000}
            step={1000}
            slider
            helpText="How much you can set aside each month toward the down payment."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(downPaymentAmount)}
          caption={`Down payment needed — about ${years > 0 ? `${years}y ` : ""}${months}m to save it at your own rate`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
