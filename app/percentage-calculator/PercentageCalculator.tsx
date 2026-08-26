"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePercentage, type PercentageMode } from "@/lib/calc/percentage";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const MODE_OPTIONS: { value: PercentageMode; label: string }[] = [
  { value: "percentOf", label: "X% of Y" },
  { value: "whatPercent", label: "X is what % of Y" },
  { value: "isPercentOfWhat", label: "X is Y% of what" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PercentageCalculator({ content }: { content: ReactNode }) {
  const [mode, setMode] = useState<PercentageMode>("percentOf");
  const [x, setX] = useState(() => initialParam("x", 25));
  const [y, setY] = useState(() => initialParam("y", 200));

  useEffect(() => {
    replaceUrlParams({ x, y });
  }, [x, y]);

  const result = calculatePercentage({ mode, x, y });
  const { result: value } = result.value;

  const xLabel = mode === "percentOf" ? "X (%)" : "X";
  const yLabel = mode === "isPercentOfWhat" ? "Y (%)" : "Y";

  return (
    <CalculatorPage
      title="Percentage calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Three common percentage questions: X% of Y, X as a % of Y, or what Y is when X is a given % of it."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Question" value={mode} onChange={setMode} options={MODE_OPTIONS} />
          <NumericInput label={xLabel} value={x} onChange={setX} step={1} />
          <NumericInput label={yLabel} value={y} onChange={setY} step={1} />
        </>
      }
      result={<ResultDisplay value={`${value}`} caption={result.steps[0]?.label} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
