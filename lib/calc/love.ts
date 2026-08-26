import type { CalcResult } from "./types";

export type LoveInputs = {
  name1: string;
  name2: string;
};

// A deterministic hash of the two names into a 0-100 number — for
// entertainment purposes only. This has no scientific or predictive
// basis whatsoever; it exists purely as a lighthearted novelty, the way
// a magic-8-ball or a fortune cookie does.
function hashNames(a: string, b: string): number {
  const combined = [a.toLowerCase().trim(), b.toLowerCase().trim()].sort().join("+");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash * 31 + combined.charCodeAt(i)) >>> 0;
  }
  return hash % 101;
}

export function calculateLove(inputs: LoveInputs): CalcResult<{ percentage: number }> {
  const { name1, name2 } = inputs;
  const percentage = name1.trim() && name2.trim() ? hashNames(name1, name2) : 0;

  return {
    value: { percentage },
    steps: [{ label: "Compatibility", formula: "", value: `${percentage}%` }],
    assumptions: ["For entertainment only — this has no scientific basis and doesn't measure anything real about compatibility; the same two names always produce the same result"],
    rulesVersion: "Novelty — for fun only",
  };
}
