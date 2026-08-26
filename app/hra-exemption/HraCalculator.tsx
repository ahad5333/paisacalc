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
import { calculateHraExemption, type HraLimitName } from "@/lib/calc/hra";
import { HRA_FY_2026_27 } from "@/lib/rules";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { basic: 600000, hra: 360000, rent: 420000 };
const OTHER_CITY = "Other city";
const CITY_OPTIONS = [...HRA_FY_2026_27.metroCities, OTHER_CITY];

const LIMIT_LABELS: Record<HraLimitName, string> = {
  actualHra: "Actual HRA received",
  salaryPercent: "% of salary limit",
  rentMinusSalary: "Rent minus 10% of salary",
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialCity(): string {
  const raw = new URLSearchParams(window.location.search).get("city");
  return raw && CITY_OPTIONS.includes(raw) ? raw : "Delhi";
}

export function HraCalculator({ content }: { content: ReactNode }) {
  const [basic, setBasic] = useState(() => initialParam("basic", DEFAULTS.basic));
  const [hra, setHra] = useState(() => initialParam("hra", DEFAULTS.hra));
  const [rent, setRent] = useState(() => initialParam("rent", DEFAULTS.rent));
  const [city, setCity] = useState<string>(initialCity);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("basic", String(basic));
    params.set("hra", String(hra));
    params.set("rent", String(rent));
    params.set("city", city);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [basic, hra, rent, city]);

  const isMetro = (HRA_FY_2026_27.metroCities as readonly string[]).includes(city);
  const result = calculateHraExemption({
    basicAnnual: basic,
    hraReceivedAnnual: hra,
    rentPaidAnnual: rent,
    isMetro,
  });
  const { limitActualHra, limitSalaryPercent, limitRentMinusSalary, exemption, taxableHra, bindingLimit } =
    result.value;

  return (
    <CalculatorPage
      title="HRA exemption calculator"
      heroImage="/images/hero-skyline.webp"
      heroObjectPosition="center 55%"
      description="Work out how much of your House Rent Allowance is tax-exempt, using the three-way minimum rule under Section 10(13A)."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Basic salary + DA (annual)"
            value={basic}
            onChange={setBasic}
            min={0}
            max={10000000}
            step={10000}
            slider
            helpText="Basic salary plus dearness allowance only — not HRA or other allowances."
          />
          <NumericInput
            label="HRA received (annual)"
            value={hra}
            onChange={setHra}
            min={0}
            max={5000000}
            step={10000}
            slider
            helpText="The House Rent Allowance component actually paid by your employer, for the year."
          />
          <NumericInput
            label="Rent paid (annual)"
            value={rent}
            onChange={setRent}
            min={0}
            max={5000000}
            step={10000}
            slider
            helpText="Actual rent you paid for the year. No rent means no exemption, even if HRA was received."
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="text-sm text-muted">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              {CITY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c === OTHER_CITY ? `${OTHER_CITY} (40%)` : `${c} (50%)`}
                </option>
              ))}
            </select>
          </div>
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(exemption)}
          caption={`exempt from tax · ${formatCurrency(taxableHra)} of your HRA stays taxable`}
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Exempt", value: exemption },
            { name: "Taxable", value: taxableHra },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="The three limits, compared"
          columns={[
            { key: "limit", label: "Limit" },
            { key: "amount", label: "Amount", align: "right" },
          ]}
          rows={(Object.keys(LIMIT_LABELS) as HraLimitName[]).map((key) => ({
            limit: key === bindingLimit ? `${LIMIT_LABELS[key]} (lowest)` : LIMIT_LABELS[key],
            amount: formatCurrency(
              key === "actualHra"
                ? limitActualHra
                : key === "salaryPercent"
                  ? limitSalaryPercent
                  : limitRentMinusSalary,
            ),
          }))}
        />
      }
      content={content}
    />
  );
}
