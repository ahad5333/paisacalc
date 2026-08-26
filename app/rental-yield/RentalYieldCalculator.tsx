"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRentalYield } from "@/lib/calc/rental-yield";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency, formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = {
  price: 6000000,
  down: 25,
  rate: 8.5,
  years: 15,
  rent: 22000,
  expenses: 1.5,
  vacancy: 5,
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RentalYieldCalculator({ content }: { content: ReactNode }) {
  const [propertyPrice, setPropertyPrice] = useState(() => initialParam("p", DEFAULTS.price));
  const [downPaymentPercent, setDownPaymentPercent] = useState(() => initialParam("d", DEFAULTS.down));
  const [loanRatePercent, setLoanRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [loanTenureYears, setLoanTenureYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [monthlyRent, setMonthlyRent] = useState(() => initialParam("rent", DEFAULTS.rent));
  const [annualExpensesPercent, setAnnualExpensesPercent] = useState(() => initialParam("e", DEFAULTS.expenses));
  const [vacancyPercent, setVacancyPercent] = useState(() => initialParam("v", DEFAULTS.vacancy));

  useEffect(() => {
    replaceUrlParams({
      p: propertyPrice,
      d: downPaymentPercent,
      r: loanRatePercent,
      y: loanTenureYears,
      rent: monthlyRent,
      e: annualExpensesPercent,
      v: vacancyPercent,
    });
  }, [propertyPrice, downPaymentPercent, loanRatePercent, loanTenureYears, monthlyRent, annualExpensesPercent, vacancyPercent]);

  const result = calculateRentalYield({
    propertyPrice,
    downPaymentPercent,
    loanRatePercent,
    loanTenureYears,
    monthlyRent,
    annualExpensesPercent,
    vacancyPercent,
  });
  const { netYieldPercent, monthlyCashFlow } = result.value;

  return (
    <CalculatorPage
      title="Rental yield calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="30% 60%"
      description="Gross and net rental yield, plus the actual monthly cash flow once the home loan EMI is factored in — not just the appreciation story."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Property price"
            value={propertyPrice}
            onChange={setPropertyPrice}
            min={1000000}
            max={50000000}
            step={100000}
            slider
          />
          <NumericInput
            label="Down payment"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={10}
            max={100}
            step={5}
            suffix="%"
            slider
            helpText="100% means buying entirely in cash, no loan."
          />
          <NumericInput
            label="Loan interest rate"
            value={loanRatePercent}
            onChange={setLoanRatePercent}
            min={6}
            max={12}
            step={0.05}
            suffix="%"
            slider
          />
          <NumericInput
            label="Loan tenure"
            value={loanTenureYears}
            onChange={setLoanTenureYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Monthly rent"
            value={monthlyRent}
            onChange={setMonthlyRent}
            min={1000}
            max={500000}
            step={1000}
            slider
          />
          <NumericInput
            label="Annual expenses"
            value={annualExpensesPercent}
            onChange={setAnnualExpensesPercent}
            min={0}
            max={4}
            step={0.25}
            suffix="%"
            slider
            helpText="Maintenance, property tax, and insurance, as a % of property price."
          />
          <NumericInput
            label="Vacancy"
            value={vacancyPercent}
            onChange={setVacancyPercent}
            min={0}
            max={25}
            step={1}
            suffix="%"
            slider
            helpText="Share of the year the property sits empty, as a % of annual rent."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatPercent(netYieldPercent, 1)}
          caption={`Net rental yield — monthly cash flow after the EMI is ${formatCurrency(Math.abs(monthlyCashFlow))} ${monthlyCashFlow < 0 ? "negative" : "positive"}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
