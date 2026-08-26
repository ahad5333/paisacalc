"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateElectricityCost } from "@/lib/calc/electricity-cost";

const LAST_VERIFIED = "19 Aug 2026";

export function ElectricityCalculatorPage({ content }: { content: ReactNode }) {
  const [watts, setWatts] = useState(1000);
  const [hoursPerDay, setHoursPerDay] = useState(5);
  const [costPerKwh, setCostPerKwh] = useState(8);

  const result = calculateElectricityCost({ watts, hoursPerDay, costPerKwh });
  const { kwhPerDay, costPerDay, costPerMonth, costPerYear } = result.value;

  return (
    <CalculatorPage
      title="Electricity calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Running cost of an appliance, from its wattage, daily usage, and your electricity rate."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Appliance power" value={watts} onChange={setWatts} min={1} step={10} suffix="W" />
          <NumericInput label="Hours used per day" value={hoursPerDay} onChange={setHoursPerDay} min={0} max={24} step={0.5} slider />
          <NumericInput label="Cost per kWh" value={costPerKwh} onChange={setCostPerKwh} min={0.01} step={0.5} />
        </>
      }
      result={<ResultDisplay value={`${costPerMonth}`} caption={`Estimated monthly cost — ${kwhPerDay} kWh/day, ${costPerDay}/day`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Cost over time"
          columns={[
            { key: "period", label: "Period" },
            { key: "cost", label: "Cost", align: "right" },
          ]}
          rows={[
            { period: "Per day", cost: `${costPerDay}` },
            { period: "Per month", cost: `${costPerMonth}` },
            { period: "Per year", cost: `${costPerYear}` },
          ]}
        />
      }
      content={content}
    />
  );
}
