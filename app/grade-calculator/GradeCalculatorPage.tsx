"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGrade, type Assignment } from "@/lib/calc/grade";

const LAST_VERIFIED = "19 Aug 2026";

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  { score: 90, weightPct: 30 },
  { score: 85, weightPct: 30 },
  { score: 80, weightPct: 40 },
];

export function GradeCalculatorPage({ content }: { content: ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(DEFAULT_ASSIGNMENTS);

  function updateAssignment(index: number, patch: Partial<Assignment>) {
    setAssignments((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  }

  const result = calculateGrade({ assignments });
  const { weightedAveragePct, letterGrade, totalWeight } = result.value;

  return (
    <CalculatorPage
      title="Grade calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Overall course grade from weighted assignment scores."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="flex flex-col gap-3">
          {assignments.map((a, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <NumericInput label={`Score ${i + 1}`} value={a.score} onChange={(v) => updateAssignment(i, { score: v })} min={0} max={100} step={1} suffix="%" />
              <NumericInput label="Weight" value={a.weightPct} onChange={(v) => updateAssignment(i, { weightPct: v })} min={0} max={100} step={1} suffix="%" />
            </div>
          ))}
        </div>
      }
      result={<ResultDisplay value={`${weightedAveragePct}%`} caption={`${letterGrade} — weights total ${totalWeight}%`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
