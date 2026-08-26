"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  NumericInput,
  ResultDisplay,
  DerivationPanel,
  CalcChart,
  DetailTable,
  CalculatorPage,
} from "@/components/calculator";
import { aggregateYearly, calculateEmi } from "@/lib/calc/emi";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { p: 4000000, r: 8.5, t: 20 };

// This component only ever mounts client-side (rendered via next/dynamic
// with ssr:false in page.tsx — see the comment there), so reading
// window.location.search directly in these initializers is safe: there's
// no server-rendered output for it to mismatch against.
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function EmiCalculator({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [tenureYears, setTenureYears] = useState(() => initialParam("t", DEFAULTS.t));

  const [compareOn, setCompareOn] = useState(() => initialParam("cmp", 0) === 1);
  const [principalB, setPrincipalB] = useState(() => initialParam("p2", principal));
  const [rateB, setRateB] = useState(() => initialParam("r2", rate));
  const [tenureYearsB, setTenureYearsB] = useState(() => initialParam("t2", tenureYears));

  function toggleCompare() {
    setCompareOn((prev) => {
      // Turning comparison on: start scenario B from A's current numbers,
      // not whatever B happened to hold from a previous session — the
      // point is changing one thing and seeing what it does, not
      // reconciling two unrelated scenarios.
      if (!prev) {
        setPrincipalB(principal);
        setRateB(rate);
        setTenureYearsB(tenureYears);
      }
      return !prev;
    });
  }

  useEffect(() => {
    replaceUrlParams({
      p: principal,
      r: rate,
      t: tenureYears,
      ...(compareOn ? { cmp: 1, p2: principalB, r2: rateB, t2: tenureYearsB } : {}),
    });
  }, [principal, rate, tenureYears, compareOn, principalB, rateB, tenureYearsB]);

  const tenureMonths = Math.max(1, Math.round(tenureYears * 12));
  const result = calculateEmi({ principal, annualRatePercent: rate, tenureMonths });
  const yearly = aggregateYearly(result.value.schedule);

  const tenureMonthsB = Math.max(1, Math.round(tenureYearsB * 12));
  const resultB = compareOn
    ? calculateEmi({ principal: principalB, annualRatePercent: rateB, tenureMonths: tenureMonthsB })
    : null;

  return (
    <CalculatorPage
      title="Home loan EMI calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="60% 40%"
      description="Monthly EMI, total interest, and the full amortisation schedule — with the formula worked out using your own numbers."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={100000}
            max={50000000}
            step={100000}
            slider
            presets={[
              { label: "₹10L", value: 1000000 },
              { label: "₹25L", value: 2500000 },
              { label: "₹50L", value: 5000000 },
              { label: "₹75L", value: 7500000 },
              { label: "₹1Cr", value: 10000000 },
            ]}
            helpText="The total amount you're borrowing from the lender."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.05}
            suffix="%"
            slider
            helpText="The annual interest rate charged on the loan, as quoted by the lender."
          />
          <NumericInput
            label="Loan tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
            helpText="How many years you'll take to repay the loan."
          />

          <button
            type="button"
            onClick={toggleCompare}
            aria-pressed={compareOn}
            className={`self-start rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure ${
              compareOn
                ? "border-figure bg-figure/10 text-figure"
                : "border-rule text-muted hover:border-figure hover:text-figure"
            }`}
          >
            {compareOn ? "− Comparing a second scenario" : "+ Compare a second scenario"}
          </button>

          {compareOn && (
            <div className="flex flex-col gap-4 rounded-lg border border-dashed border-rule p-4">
              <p className="text-xs text-muted">
                Scenario B — change what&rsquo;s different (a shorter tenure, a lender&rsquo;s
                better rate) and everything else carries over from above.
              </p>
              <NumericInput
                label="Loan amount (B)"
                value={principalB}
                onChange={setPrincipalB}
                min={100000}
                max={50000000}
                step={100000}
                slider
                helpText="Scenario B's loan amount — defaults to the same as scenario A."
              />
              <NumericInput
                label="Interest rate (B)"
                value={rateB}
                onChange={setRateB}
                min={1}
                max={20}
                step={0.05}
                suffix="%"
                slider
                helpText="Scenario B's interest rate."
              />
              <NumericInput
                label="Loan tenure (B)"
                value={tenureYearsB}
                onChange={setTenureYearsB}
                min={1}
                max={30}
                step={1}
                suffix="years"
                slider
                helpText="Scenario B's tenure."
              />
            </div>
          )}
        </>
      }
      result={
        <div className="flex flex-col gap-5">
          <ResultDisplay
            value={formatCurrency(result.value.emi)}
            caption={`per month · ${formatCurrency(result.value.totalInterest)} total interest · ${formatCurrency(result.value.totalPayment)} total payment`}
          />

          {resultB && (
            <div className="flex flex-col gap-3 border-t border-rule pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded border border-rule p-3">
                  <p className="text-xs text-muted">Scenario A</p>
                  <p className="mt-1 font-mono text-lg text-ink">{formatCurrency(result.value.emi)}/mo</p>
                  <p className="mt-0.5 text-xs text-muted">{formatCurrency(result.value.totalInterest)} interest</p>
                </div>
                <div className="rounded border border-figure p-3">
                  <p className="text-xs text-muted">Scenario B</p>
                  <p className="mt-1 font-mono text-lg text-ink">{formatCurrency(resultB.value.emi)}/mo</p>
                  <p className="mt-0.5 text-xs text-muted">{formatCurrency(resultB.value.totalInterest)} interest</p>
                </div>
              </div>
              <p className="text-sm text-ink">
                {(() => {
                  const emiDiff = resultB.value.emi - result.value.emi;
                  const interestDiff = resultB.value.totalInterest - result.value.totalInterest;
                  const emiWord = emiDiff === 0 ? "the same EMI as" : emiDiff > 0 ? "more per month than" : "less per month than";
                  const interestWord =
                    interestDiff === 0
                      ? "the same total interest as"
                      : interestDiff > 0
                        ? "more total interest than"
                        : "less total interest than";
                  return (
                    <>
                      Scenario B costs{" "}
                      {emiDiff !== 0 && <strong>{formatCurrency(Math.abs(emiDiff))} </strong>}
                      {emiWord} scenario A, and{" "}
                      {interestDiff !== 0 && <strong>{formatCurrency(Math.abs(interestDiff))} </strong>}
                      {interestWord} scenario A over the life of the loan.
                    </>
                  );
                })()}
              </p>
            </div>
          )}
        </div>
      }
      chart={
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-center font-mono text-xs uppercase tracking-wide text-muted">
              Principal vs interest
            </p>
            <CalcChart
              variant="donut"
              data={[
                { name: "Principal", value: principal },
                { name: "Total interest", value: result.value.totalInterest },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-center font-mono text-xs uppercase tracking-wide text-muted">
              Year by year
            </p>
            <CalcChart
              variant="stacked-bar"
              data={yearly.map((y) => ({
                year: `Y${y.year}`,
                principal: y.principal,
                interest: y.interest,
              }))}
              xKey="year"
              keys={["principal", "interest"]}
            />
          </div>
        </div>
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption={`Amortisation schedule (${result.value.schedule.length} months)`}
          columns={[
            { key: "month", label: "Month" },
            { key: "emi", label: "EMI", align: "right" },
            { key: "principal", label: "Principal", align: "right" },
            { key: "interest", label: "Interest", align: "right" },
            { key: "balance", label: "Balance", align: "right" },
          ]}
          rows={result.value.schedule.map((row) => ({
            month: row.month,
            emi: formatCurrency(row.emi),
            principal: formatCurrency(row.principal),
            interest: formatCurrency(row.interest),
            balance: formatCurrency(row.balance),
          }))}
        />
      }
      content={content}
    />
  );
}
