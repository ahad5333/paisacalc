"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateNpsCorpus } from "@/lib/calc/nps";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { p: 5000, r: 10, y: 25 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function NpsCalculator({ content }: { content: ReactNode }) {
  const [monthlyContribution, setMonthlyContribution] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.y));

  useEffect(() => {
    replaceUrlParams({ p: monthlyContribution, r: rate, y: years });
  }, [monthlyContribution, rate, years]);

  const result = calculateNpsCorpus({ monthlyContribution, annualReturnPercent: rate, years });

  return (
    <CalculatorPage
      title="NPS calculator"
      heroImage="/images/hero-skyline.webp"
      heroObjectPosition="center 40%"
      description="Project your National Pension System corpus at retirement, and how much of it you can take as a lump sum under the current exit rules."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Monthly contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            min={500}
            max={100000}
            step={500}
            slider
            helpText="Your own contribution each month — employer contributions, if any, would grow the corpus further."
          />
          <NumericInput
            label="Expected annual return"
            value={rate}
            onChange={setRate}
            min={5}
            max={14}
            step={0.5}
            suffix="%"
            slider
            helpText="NPS returns are market-linked, not fixed — this is an assumption you're testing, not a guaranteed rate."
          />
          <NumericInput
            label="Years to retirement"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="years"
            slider
            helpText="How many years until you plan to exit NPS, typically at age 60."
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(result.value.corpus)} caption="projected corpus at retirement" />}
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Contributed", value: result.value.totalInvested },
            { name: "Growth", value: result.value.wealthGained },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
