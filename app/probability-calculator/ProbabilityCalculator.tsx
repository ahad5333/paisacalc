"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateProbability } from "@/lib/calc/probability";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function ProbabilityCalculator({ content }: { content: ReactNode }) {
  const [probAPct, setProbAPct] = useState(() => initialParam("a", 50));
  const [probBPct, setProbBPct] = useState(() => initialParam("b", 50));

  useEffect(() => {
    replaceUrlParams({ a: probAPct, b: probBPct });
  }, [probAPct, probBPct]);

  const result = calculateProbability({ probAPct, probBPct });
  const { probAandB, probAorB, probNotA, probNotB } = result.value;

  return (
    <CalculatorPage
      title="Probability calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="P(A and B), P(A or B), and P(not A) for two independent events."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="P(A)" value={probAPct} onChange={setProbAPct} min={0} max={100} step={1} suffix="%" slider />
          <NumericInput label="P(B)" value={probBPct} onChange={setProbBPct} min={0} max={100} step={1} suffix="%" slider />
        </>
      }
      result={<ResultDisplay value={`${probAandB}%`} caption="P(A and B)" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="All combinations"
          columns={[
            { key: "event", label: "Event" },
            { key: "prob", label: "Probability", align: "right" },
          ]}
          rows={[
            { event: "P(A and B)", prob: `${probAandB}%` },
            { event: "P(A or B)", prob: `${probAorB}%` },
            { event: "P(not A)", prob: `${probNotA}%` },
            { event: "P(not B)", prob: `${probNotB}%` },
          ]}
        />
      }
      content={content}
    />
  );
}
