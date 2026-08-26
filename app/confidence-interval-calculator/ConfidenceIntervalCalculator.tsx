"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateConfidenceInterval } from "@/lib/calc/confidence-interval";
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

export function ConfidenceIntervalCalculator({ content }: { content: ReactNode }) {
  const [sampleMean, setSampleMean] = useState(() => initialParam("m", 50));
  const [sampleStdDev, setSampleStdDev] = useState(() => initialParam("s", 10));
  const [sampleSize, setSampleSize] = useState(() => initialParam("n", 100));
  const [confidenceStr, setConfidenceStr] = useState<"90" | "95" | "99">("95");

  useEffect(() => {
    replaceUrlParams({ m: sampleMean, s: sampleStdDev, n: sampleSize });
  }, [sampleMean, sampleStdDev, sampleSize]);

  const confidenceLevel = Number(confidenceStr) as 90 | 95 | 99;
  const result = calculateConfidenceInterval({ sampleMean, sampleStdDev, sampleSize, confidenceLevel });
  const { marginOfError, lowerBound, upperBound } = result.value;

  return (
    <CalculatorPage
      title="Confidence interval calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The confidence interval for a population mean, from a sample mean, standard deviation, and size."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Sample mean" value={sampleMean} onChange={setSampleMean} step={1} />
          <NumericInput label="Sample standard deviation" value={sampleStdDev} onChange={setSampleStdDev} min={0.01} step={1} />
          <NumericInput label="Sample size" value={sampleSize} onChange={setSampleSize} min={2} step={1} />
          <ChoiceInput label="Confidence level" value={confidenceStr} onChange={setConfidenceStr} options={CONFIDENCE_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={`${lowerBound} to ${upperBound}`} caption={`${confidenceLevel}% confidence interval — margin of error ±${marginOfError}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
