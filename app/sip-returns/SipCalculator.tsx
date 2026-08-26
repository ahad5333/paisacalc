"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  NumericInput,
  ResultDisplay,
  DerivationPanel,
  CalcChart,
  DetailTable,
  CalculatorPage,
} from "@/components/calculator";
import { calculateSipReturns } from "@/lib/calc/sip";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { amount: 10000, returnRate: 12, years: 20, stepUp: 10 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function SipCalculator({ content }: { content: ReactNode }) {
  const [amount, setAmount] = useState(() => initialParam("amount", DEFAULTS.amount));
  const [returnRate, setReturnRate] = useState(() => initialParam("r", DEFAULTS.returnRate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [stepUp, setStepUp] = useState(() => initialParam("step", DEFAULTS.stepUp));

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("amount", String(amount));
    params.set("r", String(returnRate));
    params.set("y", String(years));
    params.set("step", String(stepUp));
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [amount, returnRate, years, stepUp]);

  const result = calculateSipReturns({
    monthlyAmount: amount,
    annualReturnPercent: returnRate,
    years,
    stepUpPercent: stepUp,
  });
  const { totalInvested, finalValue, wealthGained, yearly } = result.value;

  return (
    <CalculatorPage
      title="SIP returns calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="30% center"
      description="Project the future value of a monthly SIP, with an optional yearly step-up, and see the invested-vs-growth split."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Monthly investment"
            value={amount}
            onChange={setAmount}
            min={500}
            max={500000}
            step={500}
            slider
            helpText="How much you invest each month, at the start of the month."
          />
          <NumericInput
            label="Expected annual return"
            value={returnRate}
            onChange={setReturnRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            slider
            helpText="An assumption, not a guarantee — equity mutual funds have historically returned 10-14% a year over long periods, with real year-to-year swings."
          />
          <NumericInput
            label="Investment duration"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="years"
            slider
            helpText="How long you keep investing before withdrawing."
          />
          <NumericInput
            label="Annual step-up"
            value={stepUp}
            onChange={setStepUp}
            min={0}
            max={30}
            step={1}
            suffix="%"
            slider
            helpText="Increase your monthly SIP by this percentage every year — set to 0 for a regular, fixed SIP."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(finalValue)}
          caption={`projected value · ${formatCurrency(wealthGained)} gained on ${formatCurrency(totalInvested)} invested`}
        />
      }
      chart={
        <CalcChart
          variant="line"
          data={yearly.map((y) => ({ year: `Y${y.year}`, value: y.value }))}
          xKey="year"
          yKey="value"
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption={`Year-by-year growth (${yearly.length} years)`}
          columns={[
            { key: "year", label: "Year" },
            { key: "invested", label: "Invested", align: "right" },
            { key: "value", label: "Value", align: "right" },
            { key: "gain", label: "Gain", align: "right" },
          ]}
          rows={yearly.map((y) => ({
            year: y.year,
            invested: formatCurrency(y.invested),
            value: formatCurrency(y.value),
            gain: formatCurrency(y.value - y.invested),
          }))}
        />
      }
      content={content}
    />
  );
}
