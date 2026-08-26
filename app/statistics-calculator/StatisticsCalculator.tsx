"use client";

import { useState, type ReactNode } from "react";
import { NumberListInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateStatistics } from "@/lib/calc/statistics";

const LAST_VERIFIED = "19 Aug 2026";

export function StatisticsCalculator({ content }: { content: ReactNode }) {
  const [values, setValues] = useState([2, 4, 4, 4, 5, 5, 7, 9]);
  const safeValues = values.length > 0 ? values : [0];

  const result = calculateStatistics({ values: safeValues });
  const { count, sum, meanValue, medianValue, modeValues, rangeValue, sampleStdDev, populationStdDev } = result.value;

  return (
    <CalculatorPage
      title="Statistics calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="A full descriptive statistics report for a data set — count, sum, mean, median, mode, range, variance, and standard deviation."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<NumberListInput label="Data set" value={values} onChange={setValues} helpText="Comma or space separated numbers." />}
      result={<ResultDisplay value={`${meanValue}`} caption={`Mean — ${count} values, sum ${sum}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Full report"
          columns={[
            { key: "stat", label: "Statistic" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={[
            { stat: "Count", value: `${count}` },
            { stat: "Sum", value: `${sum}` },
            { stat: "Mean", value: `${meanValue}` },
            { stat: "Median", value: `${medianValue}` },
            { stat: "Mode", value: modeValues.length ? modeValues.join(", ") : "none" },
            { stat: "Range", value: `${rangeValue}` },
            { stat: "Sample std. deviation", value: `${sampleStdDev}` },
            { stat: "Population std. deviation", value: `${populationStdDev}` },
          ]}
        />
      }
      content={content}
    />
  );
}
