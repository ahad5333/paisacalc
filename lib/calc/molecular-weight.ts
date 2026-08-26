import type { CalcResult } from "./types";

// Standard atomic weights (IUPAC), covering the elements that appear in
// the overwhelming majority of formulas anyone would type into a
// molecular weight calculator.
const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
  Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
  Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Ag: 107.868, Cd: 112.414, Sn: 118.71, I: 126.904, Ba: 137.327, Au: 196.967, Hg: 200.592, Pb: 207.2,
};

export type MolecularWeightInputs = {
  formula: string;
};

export type ElementCount = { element: string; count: number; weight: number };

export type MolecularWeightValue = {
  totalWeight: number;
  elements: ElementCount[];
  error: string | null;
};

// A small recursive-descent parser for chemical formulas — handles
// element symbols, multi-digit subscripts, and parenthesised groups
// (e.g. Ca(OH)2), the same structure real formulas use.
function parseFormula(formula: string): Map<string, number> {
  let pos = 0;

  function parseGroup(): Map<string, number> {
    const counts = new Map<string, number>();
    while (pos < formula.length && formula[pos] !== ")") {
      if (formula[pos] === "(") {
        pos++;
        const inner = parseGroup();
        if (formula[pos] !== ")") throw new Error("Mismatched parentheses");
        pos++;
        let numStr = "";
        while (pos < formula.length && /[0-9]/.test(formula[pos])) numStr += formula[pos++];
        const multiplier = numStr ? parseInt(numStr, 10) : 1;
        for (const [el, c] of inner) counts.set(el, (counts.get(el) ?? 0) + c * multiplier);
      } else if (/[A-Z]/.test(formula[pos])) {
        let symbol = formula[pos++];
        if (pos < formula.length && /[a-z]/.test(formula[pos])) symbol += formula[pos++];
        if (!(symbol in ATOMIC_WEIGHTS)) throw new Error(`Unknown element: ${symbol}`);
        let numStr = "";
        while (pos < formula.length && /[0-9]/.test(formula[pos])) numStr += formula[pos++];
        const count = numStr ? parseInt(numStr, 10) : 1;
        counts.set(symbol, (counts.get(symbol) ?? 0) + count);
      } else {
        throw new Error(`Unexpected character: "${formula[pos]}"`);
      }
    }
    return counts;
  }

  const result = parseGroup();
  if (pos < formula.length) throw new Error("Mismatched parentheses");
  return result;
}

export function calculateMolecularWeight(inputs: MolecularWeightInputs): CalcResult<MolecularWeightValue> {
  const { formula } = inputs;
  let elements: ElementCount[] = [];
  let totalWeight = 0;
  let error: string | null = null;

  try {
    if (formula.trim() === "") throw new Error("Enter a chemical formula");
    const counts = parseFormula(formula.replace(/\s/g, ""));
    elements = [...counts.entries()].map(([element, count]) => ({ element, count, weight: Math.round(ATOMIC_WEIGHTS[element] * count * 1000) / 1000 }));
    totalWeight = Math.round(elements.reduce((sum, e) => sum + e.weight, 0) * 1000) / 1000;
  } catch (e) {
    error = e instanceof Error ? e.message : "Invalid formula";
  }

  return {
    value: { totalWeight, elements, error },
    steps: error
      ? [{ label: "Formula", formula, value: `Error: ${error}` }]
      : elements.map((e) => ({ label: e.element, formula: `${ATOMIC_WEIGHTS[e.element]} × ${e.count}`, value: e.weight })),
    assumptions: ["Element symbols are case-sensitive (Co is cobalt, CO is carbon monoxide) — enter the formula exactly as written"],
    rulesVersion: "IUPAC standard atomic weights",
  };
}
