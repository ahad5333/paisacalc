// Shared descriptive-statistics helpers — used by the Standard Deviation,
// Statistics, Mean/Median/Mode/Range, Sample Size, Z-score, and Confidence
// Interval calculators, which all build on the same underlying formulas.

export function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function mode(values: number[]): number[] {
  const freq = new Map<number, number>();
  for (const v of values) freq.set(v, (freq.get(v) ?? 0) + 1);
  const maxFreq = Math.max(...freq.values());
  if (maxFreq === 1) return [];
  return [...freq.entries()]
    .filter(([, c]) => c === maxFreq)
    .map(([v]) => v)
    .sort((a, b) => a - b);
}

export function range(values: number[]): number {
  return Math.max(...values) - Math.min(...values);
}

// Sample variance divides by (n-1) — Bessel's correction, which corrects
// for the fact that a sample's own mean is closer to its data points than
// the true population mean would be, which would otherwise make sample
// variance a biased (too-small) estimate of population variance.
export function variance(values: number[], sample: boolean): number {
  const m = mean(values);
  const sumSq = values.reduce((acc, v) => acc + (v - m) ** 2, 0);
  return sumSq / (sample ? values.length - 1 : values.length);
}

export function stdDev(values: number[], sample: boolean): number {
  return Math.sqrt(variance(values, sample));
}

export const Z_SCORES: Record<90 | 95 | 99, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };

// Abramowitz-Stegun approximation of the standard normal CDF — accurate
// to about 7 decimal places, avoiding a dependency on a full statistics
// library for a single function.
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) prob = 1 - prob;
  return prob;
}
