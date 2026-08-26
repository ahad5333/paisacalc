"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRentVsBuy } from "@/lib/calc/rent-vs-buy";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = {
  home: 8000000,
  down: 20,
  loanRate: 8.5,
  loanYears: 20,
  rent: 25000,
  rentIncrease: 5,
  appreciation: 6,
  investReturn: 10,
  maintenance: 1,
  compareYears: 10,
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RentVsBuyCalculator({ content }: { content: ReactNode }) {
  const [homePrice, setHomePrice] = useState(() => initialParam("h", DEFAULTS.home));
  const [downPaymentPercent, setDownPaymentPercent] = useState(() => initialParam("d", DEFAULTS.down));
  const [loanRatePercent, setLoanRatePercent] = useState(() => initialParam("lr", DEFAULTS.loanRate));
  const [loanTenureYears, setLoanTenureYears] = useState(() => initialParam("lt", DEFAULTS.loanYears));
  const [monthlyRent, setMonthlyRent] = useState(() => initialParam("rent", DEFAULTS.rent));
  const [annualRentIncreasePercent, setAnnualRentIncreasePercent] = useState(() =>
    initialParam("ri", DEFAULTS.rentIncrease),
  );
  const [appreciationPercent, setAppreciationPercent] = useState(() => initialParam("ap", DEFAULTS.appreciation));
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(() =>
    initialParam("ir", DEFAULTS.investReturn),
  );
  const [maintenancePercent, setMaintenancePercent] = useState(() => initialParam("m", DEFAULTS.maintenance));
  const [compareYears, setCompareYears] = useState(() => initialParam("y", DEFAULTS.compareYears));

  useEffect(() => {
    replaceUrlParams({
      h: homePrice,
      d: downPaymentPercent,
      lr: loanRatePercent,
      lt: loanTenureYears,
      rent: monthlyRent,
      ri: annualRentIncreasePercent,
      ap: appreciationPercent,
      ir: investmentReturnPercent,
      m: maintenancePercent,
      y: compareYears,
    });
  }, [
    homePrice,
    downPaymentPercent,
    loanRatePercent,
    loanTenureYears,
    monthlyRent,
    annualRentIncreasePercent,
    appreciationPercent,
    investmentReturnPercent,
    maintenancePercent,
    compareYears,
  ]);

  const result = calculateRentVsBuy({
    homePrice,
    downPaymentPercent,
    loanRatePercent,
    loanTenureYears,
    monthlyRent,
    annualRentIncreasePercent,
    appreciationPercent,
    investmentReturnPercent,
    maintenancePercent,
    compareYears,
  });
  const { netWorthBuying, netWorthRenting, better } = result.value;
  const gap = Math.abs(netWorthRenting - netWorthBuying);

  return (
    <CalculatorPage
      title="Rent vs. buy calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="50% 50%"
      description="Which comes out ahead financially — buying this home, or renting a comparable one and investing the difference — over the years you actually plan to stay."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Home price"
            value={homePrice}
            onChange={setHomePrice}
            min={1000000}
            max={50000000}
            step={100000}
            slider
            helpText="The price of the home you'd buy."
          />
          <NumericInput
            label="Down payment"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={10}
            max={50}
            step={5}
            suffix="%"
            slider
            helpText="What share of the home price you'd pay upfront."
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
            min={5}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Comparable monthly rent"
            value={monthlyRent}
            onChange={setMonthlyRent}
            min={1000}
            max={500000}
            step={1000}
            slider
            helpText="What renting a similar home would cost today."
          />
          <NumericInput
            label="Annual rent increase"
            value={annualRentIncreasePercent}
            onChange={setAnnualRentIncreasePercent}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
          />
          <NumericInput
            label="Property appreciation"
            value={appreciationPercent}
            onChange={setAppreciationPercent}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
            helpText="How fast you expect the home's value to grow each year."
          />
          <NumericInput
            label="Investment return"
            value={investmentReturnPercent}
            onChange={setInvestmentReturnPercent}
            min={0}
            max={16}
            step={0.5}
            suffix="%"
            slider
            helpText="What the down payment and any monthly savings would earn if invested instead of spent on the home."
          />
          <NumericInput
            label="Annual maintenance"
            value={maintenancePercent}
            onChange={setMaintenancePercent}
            min={0}
            max={3}
            step={0.25}
            suffix="%"
            helpText="Upkeep and property tax, as a share of the home's current value each year."
          />
          <NumericInput
            label="Years to compare"
            value={compareYears}
            onChange={setCompareYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
            helpText="How long you plan to actually stay — the single biggest lever in this comparison."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(gap)}
          caption={`${better === "rent" ? "Renting & investing" : "Buying"} comes out ahead after ${compareYears} years — buying: ${formatCurrency(netWorthBuying)}, renting: ${formatCurrency(netWorthRenting)}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
