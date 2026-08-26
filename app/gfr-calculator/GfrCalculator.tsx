"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGfr } from "@/lib/calc/gfr";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { age: 45, creatinine: 1.0 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function GfrCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(() => initialParam("a", DEFAULTS.age));
  const [serumCreatinineMgDl, setSerumCreatinineMgDl] = useState(() => initialParam("scr", DEFAULTS.creatinine));

  useEffect(() => {
    replaceUrlParams({ a: age, scr: serumCreatinineMgDl });
  }, [age, serumCreatinineMgDl]);

  const result = calculateGfr({ sex, age, serumCreatinineMgDl });
  const { egfr, category, categoryLabel } = result.value;

  return (
    <CalculatorPage
      title="GFR calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Estimated glomerular filtration rate (eGFR) from serum creatinine, age, and sex, using the CKD-EPI 2021 equation."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Age" value={age} onChange={setAge} min={18} max={100} step={1} suffix="years" slider />
          <NumericInput
            label="Serum creatinine"
            value={serumCreatinineMgDl}
            onChange={setSerumCreatinineMgDl}
            min={0.3}
            max={10}
            step={0.1}
            suffix="mg/dL"
            slider
            helpText="From a blood test report — labs in India typically report this in mg/dL."
          />
        </>
      }
      result={
        <ResultDisplay value={`${egfr}`} caption={`mL/min/1.73m² — KDIGO stage ${category} (${categoryLabel})`} />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
