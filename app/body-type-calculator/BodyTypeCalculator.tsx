"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBodyType } from "@/lib/calc/body-type";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 175, wrist: 17 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BodyTypeCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [wristCircumferenceCm, setWristCircumferenceCm] = useState(() => initialParam("wr", DEFAULTS.wrist));

  useEffect(() => {
    replaceUrlParams({ h: heightCm, wr: wristCircumferenceCm });
  }, [heightCm, wristCircumferenceCm]);

  const result = calculateBodyType({ sex, heightCm, wristCircumferenceCm });
  const { ratio, label } = result.value;

  return (
    <CalculatorPage
      title="Body type calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="Skeletal frame size (ectomorph, mesomorph, or endomorph) from your height-to-wrist-circumference ratio."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={140} max={210} step={1} suffix="cm" slider />
          <NumericInput
            label="Wrist circumference"
            value={wristCircumferenceCm}
            onChange={setWristCircumferenceCm}
            min={12}
            max={23}
            step={0.1}
            suffix="cm"
            slider
            helpText="Measure around the wrist bone with a soft tape, just below the hand."
          />
        </>
      }
      result={<ResultDisplay value={label.split(" — ")[0]} caption={`${label.split(" — ")[1]} — ratio ${ratio}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
