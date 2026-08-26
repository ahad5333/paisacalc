"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  NumericInput,
  ResultDisplay,
  DerivationPanel,
  CalcChart,
  CalculatorPage,
} from "@/components/calculator";
import { calculateFdMaturity } from "@/lib/calc/deposits";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { p: 100000, r: 7, t: 1 };

// Client-only — reads window.location.search directly, safe because
// there's no server-rendered output for it to mismatch against (same
// pattern as every other calculator on the site).
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function FdCalculator({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [years, setYears] = useState(() => initialParam("t", DEFAULTS.t));

  useEffect(() => {
    replaceUrlParams({ p: principal, r: rate, t: years });
  }, [principal, rate, years]);

  const result = calculateFdMaturity({ principal, annualRatePercent: rate, years });

  return (
    <CalculatorPage
      title="FD calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="center 45%"
      description="Fixed deposit maturity value with quarterly compounding — the formula worked out using your own numbers."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Deposit amount"
            value={principal}
            onChange={setPrincipal}
            min={5000}
            max={5000000}
            step={5000}
            slider
            helpText="The lump sum you're depositing into the fixed deposit."
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
            value={years}
            onChange={setYears}
            min={1}
            max={10}
            step={1}
            suffix="years"
            slider
            helpText="How long the deposit stays locked in."
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
            { name: "Deposited", value: principal },
            { name: "Interest earned", value: result.value.interestEarned },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
