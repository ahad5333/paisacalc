"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateSampleSize } from "@/lib/calc/sample-size";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const CONFIDENCE_OPTIONS: { value: "90" | "95" | "99"; label: string }[] = [
  { value: "90", label: "90%" },
  { value: "95", label: "95%" },
  { value: "99", label: "99%" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function SampleSizeCalculator({ content }: { content: ReactNode }) {
  const [confidenceStr, setConfidenceStr] = useState<"90" | "95" | "99">("95");
  const [marginOfErrorPct, setMarginOfErrorPct] = useState(() => initialParam("e", 5));
  const [proportionPct, setProportionPct] = useState(() => initialParam("p", 50));
  const [populationSize, setPopulationSize] = useState(() => initialParam("n", 0));

  useEffect(() => {
    replaceUrlParams({ e: marginOfErrorPct, p: proportionPct, n: populationSize });
  }, [marginOfErrorPct, proportionPct, populationSize]);

  const confidenceLevel = Number(confidenceStr) as 90 | 95 | 99;
  const result = calculateSampleSize({ confidenceLevel, marginOfErrorPct, proportionPct, populationSize });
  const { sampleSize } = result.value;

  return (
    <CalculatorPage
      title="Sample size calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The minimum survey sample size needed for a given confidence level and margin of error."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Confidence level" value={confidenceStr} onChange={setConfidenceStr} options={CONFIDENCE_OPTIONS} />
          <NumericInput label="Margin of error" value={marginOfErrorPct} onChange={setMarginOfErrorPct} min={0.5} max={20} step={0.5} suffix="%" slider />
          <NumericInput
            label="Estimated proportion"
            value={proportionPct}
            onChange={setProportionPct}
            min={1}
            max={99}
            step={1}
            suffix="%"
            slider
            helpText="Use 50% if unsure — it's the most conservative assumption and gives the largest required sample."
          />
          <NumericInput
            label="Population size"
            value={populationSize}
            onChange={setPopulationSize}
            min={0}
            step={100}
            helpText="Leave at 0 if the population is very large or unknown."
          />
        </>
      }
      result={<ResultDisplay value={`${sampleSize}`} caption="Minimum required sample size" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
