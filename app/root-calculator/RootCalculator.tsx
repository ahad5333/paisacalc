"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRoot } from "@/lib/calc/root";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RootCalculator({ content }: { content: ReactNode }) {
  const [value, setValue] = useState(() => initialParam("v", 27));
  const [degree, setDegree] = useState(() => initialParam("d", 3));

  useEffect(() => {
    replaceUrlParams({ v: value, d: degree });
  }, [value, degree]);

  const result = calculateRoot({ value, degree });
  const { result: rootValue } = result.value;

  return (
    <CalculatorPage
      title="Root calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The nth root of any number — square root, cube root, or any higher degree."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Number" value={value} onChange={setValue} step={1} />
          <NumericInput label="Root degree" value={degree} onChange={setDegree} min={2} max={20} step={1} slider />
        </>
      }
      result={<ResultDisplay value={Number.isNaN(rootValue) ? "undefined" : `${rootValue}`} caption={`${degree === 2 ? "√" : `${degree}√`}${value}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
