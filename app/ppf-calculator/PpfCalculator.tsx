"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculatePpfMaturity } from "@/lib/calc/ppf";
import { PPF_RULES_2026 } from "@/lib/rules";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { p: 150000, r: PPF_RULES_2026.annualRatePercent, t: PPF_RULES_2026.lockInYears };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PpfCalculator({ content }: { content: ReactNode }) {
  const [annualInvestment, setAnnualInvestment] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [years, setYears] = useState(() => initialParam("t", DEFAULTS.t));

  useEffect(() => {
    replaceUrlParams({ p: annualInvestment, r: rate, t: years });
  }, [annualInvestment, rate, years]);

  const result = calculatePpfMaturity({ annualInvestment, annualRatePercent: rate, years });

  return (
    <CalculatorPage
      title="PPF calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="30% 40%"
      description="Public Provident Fund maturity value over its 15-year lock-in, with the government's current interest rate."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Annual investment"
            value={annualInvestment}
            onChange={setAnnualInvestment}
            min={PPF_RULES_2026.minAnnualContribution}
            max={PPF_RULES_2026.maxAnnualContribution}
            step={5000}
            slider
            helpText={`Deposited at the start of each year. Government limits: ₹${PPF_RULES_2026.minAnnualContribution.toLocaleString("en-IN")} minimum, ₹${PPF_RULES_2026.maxAnnualContribution.toLocaleString("en-IN")} maximum per year.`}
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={5}
            max={10}
            step={0.1}
            suffix="%"
            slider
            helpText={`The government-notified rate, reviewed every quarter — currently ${PPF_RULES_2026.annualRatePercent}%, unchanged since April 2020.`}
          />
          <NumericInput
            label="Tenure"
            value={years}
            onChange={setYears}
            min={PPF_RULES_2026.lockInYears}
            max={30}
            step={5}
            suffix="years"
            slider
            helpText="The standard lock-in is 15 years, extendable after maturity in blocks of 5."
          />
        </>
      }
      result={
        <ResultDisplay value={formatCurrency(result.value.maturityAmount)} caption="maturity value, tax-free" />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Invested", value: result.value.totalInvested },
            { name: "Interest earned", value: result.value.interestEarned },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
