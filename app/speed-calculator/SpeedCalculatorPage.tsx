"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateSpeed, type SpeedUnknown } from "@/lib/calc/speed";

const LAST_VERIFIED = "19 Aug 2026";

const UNKNOWN_OPTIONS: { value: SpeedUnknown; label: string }[] = [
  { value: "speed", label: "Speed" },
  { value: "distance", label: "Distance" },
  { value: "time", label: "Time" },
];

export function SpeedCalculatorPage({ content }: { content: ReactNode }) {
  const [unknown, setUnknown] = useState<SpeedUnknown>("speed");
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(100);
  const [time, setTime] = useState(4);

  const result = calculateSpeed({ speed, distance, time, unknown });
  const { result: value } = result.value;

  return (
    <CalculatorPage
      title="Speed calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Solve for speed, distance, or time given the other two."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Solve for" value={unknown} onChange={setUnknown} options={UNKNOWN_OPTIONS} />
          {unknown !== "speed" && <NumericInput label="Speed" value={speed} onChange={setSpeed} min={0} step={1} />}
          {unknown !== "distance" && <NumericInput label="Distance" value={distance} onChange={setDistance} min={0} step={1} />}
          {unknown !== "time" && <NumericInput label="Time" value={time} onChange={setTime} min={0.01} step={0.5} />}
        </>
      }
      result={<ResultDisplay value={Number.isFinite(value) ? `${value}` : "undefined"} caption={`Solved for ${unknown}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
