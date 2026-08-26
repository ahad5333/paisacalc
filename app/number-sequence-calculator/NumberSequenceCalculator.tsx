"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateNumberSequence, type SequenceType } from "@/lib/calc/number-sequence";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const TYPE_OPTIONS: { value: SequenceType; label: string }[] = [
  { value: "arithmetic", label: "Arithmetic (+d)" },
  { value: "geometric", label: "Geometric (×r)" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function NumberSequenceCalculator({ content }: { content: ReactNode }) {
  const [type, setType] = useState<SequenceType>("arithmetic");
  const [firstTerm, setFirstTerm] = useState(() => initialParam("a", 2));
  const [commonValue, setCommonValue] = useState(() => initialParam("d", 3));
  const [termCount, setTermCount] = useState(() => initialParam("n", 8));

  useEffect(() => {
    replaceUrlParams({ a: firstTerm, d: commonValue, n: termCount });
  }, [firstTerm, commonValue, termCount]);

  const result = calculateNumberSequence({ firstTerm, commonValue, termCount, type });
  const { terms, sum } = result.value;

  return (
    <CalculatorPage
      title="Number sequence calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Generate an arithmetic or geometric sequence from a first term and common difference or ratio."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sequence type" value={type} onChange={setType} options={TYPE_OPTIONS} />
          <NumericInput label="First term" value={firstTerm} onChange={setFirstTerm} step={1} />
          <NumericInput label={type === "arithmetic" ? "Common difference" : "Common ratio"} value={commonValue} onChange={setCommonValue} step={0.5} />
          <NumericInput label="Number of terms" value={termCount} onChange={setTermCount} min={1} max={30} step={1} slider />
        </>
      }
      result={<ResultDisplay value={terms.join(", ")} caption={`Sum of ${termCount} terms: ${sum}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
