"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDepreciation } from "@/lib/calc/depreciation";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { cost: 1000000, wdvRate: 15, slmLife: 15, salvage: 5, years: 5 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DepreciationCalculator({ content }: { content: ReactNode }) {
  const [assetCost, setAssetCost] = useState(() => initialParam("c", DEFAULTS.cost));
  const [wdvRatePercent, setWdvRatePercent] = useState(() => initialParam("w", DEFAULTS.wdvRate));
  const [slmUsefulLifeYears, setSlmUsefulLifeYears] = useState(() => initialParam("l", DEFAULTS.slmLife));
  const [salvageValuePercent, setSalvageValuePercent] = useState(() => initialParam("s", DEFAULTS.salvage));
  const [yearsElapsed, setYearsElapsed] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ c: assetCost, w: wdvRatePercent, l: slmUsefulLifeYears, s: salvageValuePercent, y: yearsElapsed });
  }, [assetCost, wdvRatePercent, slmUsefulLifeYears, salvageValuePercent, yearsElapsed]);

  const result = calculateDepreciation({ assetCost, wdvRatePercent, slmUsefulLifeYears, salvageValuePercent, yearsElapsed });
  const { slmBookValue, wdvBookValue } = result.value;

  return (
    <CalculatorPage
      title="Depreciation calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 50%"
      description="WDV (Income Tax Act) vs. SLM (Companies Act) — India runs two different depreciation methods side by side, and they can show very different book values for the same asset."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Asset cost" value={assetCost} onChange={setAssetCost} min={10000} max={20000000} step={10000} slider />
          <NumericInput
            label="WDV rate (tax depreciation)"
            value={wdvRatePercent}
            onChange={setWdvRatePercent}
            min={5}
            max={40}
            step={5}
            suffix="%"
            slider
            helpText="Common Income Tax Act block rates: 15% plant & machinery, 10% furniture, 40% computers."
          />
          <NumericInput
            label="SLM useful life"
            value={slmUsefulLifeYears}
            onChange={setSlmUsefulLifeYears}
            min={3}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Salvage value"
            value={salvageValuePercent}
            onChange={setSalvageValuePercent}
            min={0}
            max={20}
            step={1}
            suffix="%"
            slider
          />
          <NumericInput
            label="Years elapsed"
            value={yearsElapsed}
            onChange={setYearsElapsed}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(wdvBookValue)}
          caption={`WDV book value — SLM book value would be ${formatCurrency(slmBookValue)} at the same point`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
