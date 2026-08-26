"use client";

import { useState, type ReactNode } from "react";
import { NumberListInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMeanMedianMode } from "@/lib/calc/mean-median-mode";

const LAST_VERIFIED = "19 Aug 2026";

export function MeanMedianModeCalculator({ content }: { content: ReactNode }) {
  const [values, setValues] = useState([1, 2, 2, 3, 4]);
  const safeValues = values.length > 0 ? values : [0];

  const result = calculateMeanMedianMode({ values: safeValues });
  const { meanValue, medianValue, modeValues, rangeValue } = result.value;

  return (
    <CalculatorPage
      title="Mean, median, mode, range calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The four basic descriptive statistics for a data set, in one quick result."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<NumberListInput label="Data set" value={values} onChange={setValues} helpText="Comma or space separated numbers." />}
      result={
        <ResultDisplay
          value={`${meanValue}`}
          caption={`Mean — median ${medianValue}, mode ${modeValues.length ? modeValues.join(", ") : "none"}, range ${rangeValue}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
