"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateCollegeCost } from "@/lib/calc/college-cost";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { cost: 200000, yearsOut: 10, inflation: 10, duration: 4 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CollegeCostCalculator({ content }: { content: ReactNode }) {
  const [currentAnnualCost, setCurrentAnnualCost] = useState(() => initialParam("c", DEFAULTS.cost));
  const [yearsUntilEnrollment, setYearsUntilEnrollment] = useState(() => initialParam("y", DEFAULTS.yearsOut));
  const [educationInflationPercent, setEducationInflationPercent] = useState(() => initialParam("i", DEFAULTS.inflation));
  const [courseDurationYears, setCourseDurationYears] = useState(() => initialParam("d", DEFAULTS.duration));

  useEffect(() => {
    replaceUrlParams({ c: currentAnnualCost, y: yearsUntilEnrollment, i: educationInflationPercent, d: courseDurationYears });
  }, [currentAnnualCost, yearsUntilEnrollment, educationInflationPercent, courseDurationYears]);

  const result = calculateCollegeCost({ currentAnnualCost, yearsUntilEnrollment, educationInflationPercent, courseDurationYears });
  const { totalCostOverCourse, costAtEnrollment } = result.value;

  return (
    <CalculatorPage
      title="College cost calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center 35%"
      description="What a course will actually cost by the time enrollment arrives, and across its full duration — education inflation runs well above general inflation."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Current annual cost"
            value={currentAnnualCost}
            onChange={setCurrentAnnualCost}
            min={20000}
            max={3000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Years until enrollment"
            value={yearsUntilEnrollment}
            onChange={setYearsUntilEnrollment}
            min={0}
            max={20}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Education inflation"
            value={educationInflationPercent}
            onChange={setEducationInflationPercent}
            min={4}
            max={16}
            step={0.5}
            suffix="%"
            slider
            helpText="Commonly estimated at 10-12% a year for professional courses in India."
          />
          <NumericInput
            label="Course duration"
            value={courseDurationYears}
            onChange={setCourseDurationYears}
            min={1}
            max={6}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(totalCostOverCourse)}
          caption={`Total cost across the course — ${formatCurrency(costAtEnrollment)} in the first year alone`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
