"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Two data colours only (tech spec §B1/§B4): what you keep, --figure, and
// what you lose, --deduction. Read as CSS custom properties so the chart
// always matches whatever the token layer currently says.
const FIGURE = "var(--figure)";
const DEDUCTION = "var(--deduction)";
const RULE = "var(--rule)";
const MUTED = "var(--muted)";

const axisTick = { fontSize: 11, fill: MUTED };
const tooltipStyle = { fontFamily: "var(--font-figures)", fontSize: 13 };

export type DonutDatum = { name: string; value: number };
export type SeriesDatum = Record<string, number | string>;

export type CalcChartInnerProps =
  | { variant: "donut"; data: DonutDatum[] }
  | { variant: "stacked-bar"; data: SeriesDatum[]; xKey: string; keys: [string, string] }
  | { variant: "line"; data: SeriesDatum[]; xKey: string; yKey: string };

export default function CalcChartInner(props: CalcChartInnerProps) {
  if (props.variant === "donut") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={props.data}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="90%"
            paddingAngle={2}
            stroke="none"
            animationDuration={500}
            animationEasing="ease-out"
          >
            {props.data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? FIGURE : DEDUCTION} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (props.variant === "stacked-bar") {
    const [keyA, keyB] = props.keys;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={props.data}>
          <CartesianGrid stroke={RULE} vertical={false} />
          <XAxis
            dataKey={props.xKey}
            tick={axisTick}
            axisLine={{ stroke: RULE }}
            tickLine={false}
          />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey={keyA} stackId="a" fill={FIGURE} animationDuration={500} animationEasing="ease-out" />
          <Bar
            dataKey={keyB}
            stackId="a"
            fill={DEDUCTION}
            animationDuration={500}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={props.data}>
        <CartesianGrid stroke={RULE} vertical={false} />
        <XAxis
          dataKey={props.xKey}
          tick={axisTick}
          axisLine={{ stroke: RULE }}
          tickLine={false}
        />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey={props.yKey}
          stroke={FIGURE}
          strokeWidth={2}
          dot={false}
          animationDuration={500}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
