"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateIrr } from "@/lib/calc/irr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { investment: 500000, y1: 100000, y2: 120000, y3: 140000, y4: 160000, y5: 300000 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function IrrCalculator({ content }: { content: ReactNode }) {
  const [initialInvestment, setInitialInvestment] = useState(() => initialParam("i", DEFAULTS.investment));
  const [cashFlowYear1, setCashFlowYear1] = useState(() => initialParam("y1", DEFAULTS.y1));
  const [cashFlowYear2, setCashFlowYear2] = useState(() => initialParam("y2", DEFAULTS.y2));
  const [cashFlowYear3, setCashFlowYear3] = useState(() => initialParam("y3", DEFAULTS.y3));
  const [cashFlowYear4, setCashFlowYear4] = useState(() => initialParam("y4", DEFAULTS.y4));
  const [cashFlowYear5, setCashFlowYear5] = useState(() => initialParam("y5", DEFAULTS.y5));

  useEffect(() => {
    replaceUrlParams({
      i: initialInvestment,
      y1: cashFlowYear1,
      y2: cashFlowYear2,
      y3: cashFlowYear3,
      y4: cashFlowYear4,
      y5: cashFlowYear5,
    });
  }, [initialInvestment, cashFlowYear1, cashFlowYear2, cashFlowYear3, cashFlowYear4, cashFlowYear5]);

  const result = calculateIrr({ initialInvestment, cashFlowYear1, cashFlowYear2, cashFlowYear3, cashFlowYear4, cashFlowYear5 });
  const { irrPercent } = result.value;

  return (
    <CalculatorPage
      title="IRR calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="center 55%"
      description="The internal rate of return on an investment with uneven cash flows — a growing rental income, a lump sum at exit, or any 5-year series that doesn't fit a simple compounding formula."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Initial investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            min={10000}
            max={10000000}
            step={10000}
            slider
          />
          <NumericInput label="Year 1 cash flow" value={cashFlowYear1} onChange={setCashFlowYear1} min={0} max={5000000} step={10000} slider />
          <NumericInput label="Year 2 cash flow" value={cashFlowYear2} onChange={setCashFlowYear2} min={0} max={5000000} step={10000} slider />
          <NumericInput label="Year 3 cash flow" value={cashFlowYear3} onChange={setCashFlowYear3} min={0} max={5000000} step={10000} slider />
          <NumericInput label="Year 4 cash flow" value={cashFlowYear4} onChange={setCashFlowYear4} min={0} max={5000000} step={10000} slider />
          <NumericInput
            label="Year 5 cash flow"
            value={cashFlowYear5}
            onChange={setCashFlowYear5}
            min={0}
            max={5000000}
            step={10000}
            slider
            helpText="Include any lump-sum exit or resale value here too."
          />
        </>
      }
      result={<ResultDisplay value={formatPercent(irrPercent, 2)} caption="Internal rate of return across all 5 years' cash flows" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
