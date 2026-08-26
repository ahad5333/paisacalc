"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGolfHandicap } from "@/lib/calc/golf-handicap";

const LAST_VERIFIED = "19 Aug 2026";

export function GolfHandicapCalculatorPage({ content }: { content: ReactNode }) {
  const [score, setScore] = useState(90);
  const [courseRating, setCourseRating] = useState(72);
  const [slopeRating, setSlopeRating] = useState(113);

  const result = calculateGolfHandicap({ score, courseRating, slopeRating });
  const { differential } = result.value;

  return (
    <CalculatorPage
      title="Golf handicap calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Handicap differential for a single round, the building block of the official USGA Handicap Index."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Score" value={score} onChange={setScore} min={50} max={150} step={1} />
          <NumericInput label="Course rating" value={courseRating} onChange={setCourseRating} min={60} max={80} step={0.1} />
          <NumericInput label="Slope rating" value={slopeRating} onChange={setSlopeRating} min={55} max={155} step={1} helpText="Standard difficulty is 113" />
        </>
      }
      result={<ResultDisplay value={`${differential}`} caption="Handicap differential for this round" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
