"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePaybackPeriod } from "@/lib/calc/payback-period";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { cost: 500000, inflow: 150000 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PaybackPeriodCalculator({ content }: { content: ReactNode }) {
  const [initialCost, setInitialCost] = useState(() => initialParam("c", DEFAULTS.cost));
  const [annualCashInflow, setAnnualCashInflow] = useState(() => initialParam("i", DEFAULTS.inflow));

  useEffect(() => {
    replaceUrlParams({ c: initialCost, i: annualCashInflow });
  }, [initialCost, annualCashInflow]);

  const result = calculatePaybackPeriod({ initialCost, annualCashInflow });
  const { paybackYears, paybackMonths } = result.value;

  return (
    <CalculatorPage
      title="Payback period calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 50%"
      description="How long until an investment pays for itself, from a uniform annual cash inflow — the simplest capital-budgeting question there is."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Initial cost"
            value={initialCost}
            onChange={setInitialCost}
            min={10000}
            max={10000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Annual cash inflow"
            value={annualCashInflow}
            onChange={setAnnualCashInflow}
            min={1000}
            max={5000000}
            step={5000}
            slider
          />
        </>
      }
      result={<ResultDisplay value={`${paybackYears}y ${paybackMonths}m`} caption="Time to pay back the initial cost" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
