"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBodyFat, type BodyFatCategory } from "@/lib/calc/body-fat";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 175, neck: 38, waist: 85, hip: 98 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

const CATEGORY_LABELS: Record<BodyFatCategory, string> = {
  essential: "essential fat range",
  athletic: "athletic range",
  fitness: "fitness range",
  average: "average range",
  obese: "obese range",
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BodyFatCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [neckCm, setNeckCm] = useState(() => initialParam("n", DEFAULTS.neck));
  const [waistCm, setWaistCm] = useState(() => initialParam("wa", DEFAULTS.waist));
  const [hipCm, setHipCm] = useState(() => initialParam("hi", DEFAULTS.hip));

  useEffect(() => {
    replaceUrlParams({ h: heightCm, n: neckCm, wa: waistCm, hi: hipCm });
  }, [heightCm, neckCm, waistCm, hipCm]);

  const result = calculateBodyFat({ sex, heightCm, neckCm, waistCm, hipCm });
  const { bodyFatPercent, category } = result.value;

  return (
    <CalculatorPage
      title="Body fat calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 45%"
      description="Body fat percentage from tape measurements — the US Navy circumference method used for military body-composition standards."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" slider />
          <NumericInput
            label="Neck"
            value={neckCm}
            onChange={setNeckCm}
            min={25}
            max={55}
            step={0.5}
            suffix="cm"
            slider
            helpText="Measured directly under the larynx (Adam's apple)."
          />
          <NumericInput
            label="Waist"
            value={waistCm}
            onChange={setWaistCm}
            min={50}
            max={160}
            step={0.5}
            suffix="cm"
            slider
            helpText="Measured at the narrowest point of the waist."
          />
          {sex === "female" && (
            <NumericInput
              label="Hip"
              value={hipCm}
              onChange={setHipCm}
              min={60}
              max={160}
              step={0.5}
              suffix="cm"
              slider
              helpText="Measured at the widest point of the hips."
            />
          )}
        </>
      }
      result={<ResultDisplay value={formatPercent(bodyFatPercent, 1)} caption={`Estimated body fat — ${CATEGORY_LABELS[category]}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
