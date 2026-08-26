"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateAnnuityPayout } from "@/lib/calc/annuity-payout";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { lumpSum: 2000000, rate: 6, years: 20 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function AnnuityPayoutCalculator({ content }: { content: ReactNode }) {
  const [lumpSum, setLumpSum] = useState(() => initialParam("l", DEFAULTS.lumpSum));
  const [annualRatePercent, setAnnualRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [payoutYears, setPayoutYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ l: lumpSum, r: annualRatePercent, y: payoutYears });
  }, [lumpSum, annualRatePercent, payoutYears]);

  const result = calculateAnnuityPayout({ lumpSum, annualRatePercent, payoutYears });
  const { monthlyPayout } = result.value;

  return (
    <CalculatorPage
      title="Annuity payout calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 40%"
      description="How much a lump sum — an NPS annuity purchase, a retirement corpus — can pay out every month over a chosen period, while the balance keeps earning a return."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Lump sum" value={lumpSum} onChange={setLumpSum} min={100000} max={20000000} step={50000} slider />
          <NumericInput
            label="Return during payout"
            value={annualRatePercent}
            onChange={setAnnualRatePercent}
            min={0}
            max={12}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput
            label="Payout period"
            value={payoutYears}
            onChange={setPayoutYears}
            min={1}
            max={35}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(monthlyPayout)} caption="Monthly payout that fully depletes the lump sum over this period" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
