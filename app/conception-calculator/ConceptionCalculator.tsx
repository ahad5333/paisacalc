"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DateInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateConception, type ConceptionReferenceType } from "@/lib/calc/conception";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

const TYPE_OPTIONS = [
  { value: "dueDate" as ConceptionReferenceType, label: "Due date" },
  { value: "birthDate" as ConceptionReferenceType, label: "Birth date" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function ConceptionCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [referenceType, setReferenceType] = useState<ConceptionReferenceType>("birthDate");
  const [referenceEpochDay, setReferenceEpochDay] = useState(() => initialParam("d", today - 30));

  useEffect(() => {
    replaceUrlParams({ d: referenceEpochDay });
  }, [referenceEpochDay]);

  const result = calculateConception({ referenceEpochDay, referenceType });
  const { conceptionEpochDay, conceptionWindowStartEpochDay, conceptionWindowEndEpochDay, lmpEstimateEpochDay } = result.value;

  return (
    <CalculatorPage
      title="Conception calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="Work backward from a due date or an actual birth date to estimate when conception likely happened."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Working back from" value={referenceType} onChange={setReferenceType} options={TYPE_OPTIONS} />
          <DateInput
            label={referenceType === "dueDate" ? "Due date" : "Birth date"}
            value={referenceEpochDay}
            onChange={setReferenceEpochDay}
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatDateLong(conceptionEpochDay)}
          caption={`Estimated conception date — likely window ${formatDateLong(conceptionWindowStartEpochDay)} to ${formatDateLong(conceptionWindowEndEpochDay)}, LMP around ${formatDateLong(lmpEstimateEpochDay)}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
