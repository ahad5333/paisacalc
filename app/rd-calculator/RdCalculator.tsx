"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  NumericInput,
  ResultDisplay,
  DerivationPanel,
  CalcChart,
  CalculatorPage,
} from "@/components/calculator";
import { calculateRdMaturity } from "@/lib/calc/deposits";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { r: 5000, rate: 7, m: 12 };

// Client-only — reads window.location.search directly, safe because
// there's no server-rendered output for it to mismatch against.
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RdCalculator({ content }: { content: ReactNode }) {
  const [monthlyDeposit, setMonthlyDeposit] = useState(() => initialParam("r", DEFAULTS.r));
  const [rate, setRate] = useState(() => initialParam("rate", DEFAULTS.rate));
  const [months, setMonths] = useState(() => initialParam("m", DEFAULTS.m));

  useEffect(() => {
    replaceUrlParams({ r: monthlyDeposit, rate, m: months });
  }, [monthlyDeposit, rate, months]);

  // The IBA formula assumes a whole number of quarters — guard against a
  // non-multiple-of-3 value reaching it. The slider only ever produces
  // multiples of 3, but the numeric field's text input doesn't enforce
  // that when typed directly.
  const tenureMonths = Math.max(3, Math.round(months / 3) * 3);
  const result = calculateRdMaturity({
    monthlyDeposit,
    annualRatePercent: rate,
    months: tenureMonths,
  });

  return (
    <CalculatorPage
      title="RD calculator"
      heroImage="/images/hero-rupee.webp"
      heroObjectPosition="80% center"
      description="Recurring deposit maturity value with quarterly compounding — the formula worked out using your own numbers."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Monthly deposit"
            value={monthlyDeposit}
            onChange={setMonthlyDeposit}
            min={500}
            max={100000}
            step={500}
            slider
            helpText="The fixed amount you deposit every month."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={3}
            max={10}
            step={0.05}
            suffix="%"
            slider
            helpText="The annual interest rate quoted by the bank, before compounding."
          />
          <NumericInput
            label="Tenure"
            value={months}
            onChange={setMonths}
            min={6}
            max={120}
            step={3}
            suffix="months"
            slider
            helpText="How many months you'll keep depositing — always a multiple of 3, since interest compounds quarterly."
          />
        </>
      }
      result={
        <ResultDisplay value={formatCurrency(result.value.maturityAmount)} caption="maturity value" />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Deposited", value: result.value.totalDeposited },
            { name: "Interest earned", value: result.value.interestEarned },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
