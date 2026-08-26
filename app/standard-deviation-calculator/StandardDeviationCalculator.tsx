"use client";

import { useState, type ReactNode } from "react";
import { NumberListInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateStandardDeviation } from "@/lib/calc/standard-deviation";

const LAST_VERIFIED = "19 Aug 2026";

const TYPE_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "true", label: "Sample" },
  { value: "false", label: "Population" },
];

export function StandardDeviationCalculator({ content }: { content: ReactNode }) {
  const [values, setValues] = useState([2, 4, 4, 4, 5, 5, 7, 9]);
  const [sampleStr, setSampleStr] = useState<"true" | "false">("false");

  const sample = sampleStr === "true";
  const safeValues = values.length > 0 ? values : [0];
  const result = calculateStandardDeviation({ values: safeValues, sample });
  const { meanValue, varianceValue, stdDevValue } = result.value;

  return (
    <CalculatorPage
      title="Standard deviation calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Mean, variance, and standard deviation of a data set, sample or population."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumberListInput label="Data set" value={values} onChange={setValues} helpText="Comma or space separated numbers." />
          <ChoiceInput label="Type" value={sampleStr} onChange={setSampleStr} options={TYPE_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={`${stdDevValue}`} caption={`Standard deviation — mean ${meanValue}, variance ${varianceValue}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
