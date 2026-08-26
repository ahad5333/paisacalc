"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateEpsPension } from "@/lib/calc/eps-pension";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { salary: 15000, years: 25 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function EpsPensionCalculator({ content }: { content: ReactNode }) {
  const [pensionableSalary, setPensionableSalary] = useState(() => initialParam("s", DEFAULTS.salary));
  const [pensionableServiceYears, setPensionableServiceYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ s: pensionableSalary, y: pensionableServiceYears });
  }, [pensionableSalary, pensionableServiceYears]);

  const result = calculateEpsPension({ pensionableSalary, pensionableServiceYears });
  const { monthlyPension } = result.value;

  return (
    <CalculatorPage
      title="EPS pension calculator"
      heroImage="/images/hero-skyline.webp"
      heroObjectPosition="center 45%"
      description="Your monthly pension under EPFO's Employees' Pension Scheme — the actual government formula, salary ceiling and service bonus included."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Pensionable salary (basic + DA)"
            value={pensionableSalary}
            onChange={setPensionableSalary}
            min={1000}
            max={100000}
            step={1000}
            slider
            helpText="Capped at ₹15,000/month by EPFO regardless of your actual salary."
          />
          <NumericInput
            label="Pensionable service"
            value={pensionableServiceYears}
            onChange={setPensionableServiceYears}
            min={10}
            max={40}
            step={1}
            suffix="years"
            slider
            helpText="A 2-year bonus applies once actual service exceeds 20 years."
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(monthlyPension)} caption="Monthly EPS pension" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
