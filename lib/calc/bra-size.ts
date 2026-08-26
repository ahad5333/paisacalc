import type { CalcResult } from "./types";

export type BraSizeInputs = {
  underbustIn: number;
  bustIn: number;
};

const CUP_LETTERS = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J"];

// A widely cited simplified sizing method: band size rounds the
// underbust measurement to the nearest whole number, adding 4 if even or
// 5 if odd (a convention originating from how band sizes were
// historically standardized against underbust measurements); cup size
// is then read off the difference between bust and band, one cup letter
// per inch of difference.
export function calculateBraSize(inputs: BraSizeInputs): CalcResult<{ bandSize: number; cupLetter: string; sizeLabel: string }> {
  const { underbustIn, bustIn } = inputs;
  const roundedUnderbust = Math.round(underbustIn);
  const bandSize = roundedUnderbust % 2 === 0 ? roundedUnderbust + 4 : roundedUnderbust + 5;

  const difference = Math.round(bustIn - underbustIn);
  const cupIndex = Math.max(0, Math.min(CUP_LETTERS.length - 1, difference));
  const cupLetter = CUP_LETTERS[cupIndex];
  const sizeLabel = `${bandSize}${cupLetter}`;

  return {
    value: { bandSize, cupLetter, sizeLabel },
    steps: [
      { label: "Band size", formula: `underbust rounded, ${roundedUnderbust % 2 === 0 ? "+4 (even)" : "+5 (odd)"}`, value: bandSize },
      { label: "Cup size", formula: "bust − underbust, rounded to nearest inch", value: `${difference}" → ${cupLetter}` },
    ],
    assumptions: [
      "Uses a widely cited simplified sizing method — actual fit varies significantly by brand, style, and individual body shape, so treat this as a starting point for trying on sizes, not a guaranteed fit",
      "Measure underbust snugly (where the band sits) and bust at the fullest point, both without a bra on for the most accurate result",
    ],
    rulesVersion: "Standard band+4/+5 sizing method",
  };
}
