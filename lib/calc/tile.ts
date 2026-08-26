import type { CalcResult } from "./types";

export type TileInputs = {
  roomLengthFt: number;
  roomWidthFt: number;
  tileLengthIn: number;
  tileWidthIn: number;
  wastePct: number;
};

export type TileValue = {
  roomSqft: number;
  tileSqft: number;
  tilesNeeded: number;
};

export function calculateTile(inputs: TileInputs): CalcResult<TileValue> {
  const { roomLengthFt, roomWidthFt, tileLengthIn, tileWidthIn, wastePct } = inputs;
  const roomSqft = roomLengthFt * roomWidthFt;
  const tileSqft = (tileLengthIn * tileWidthIn) / 144;
  const rawTiles = roomSqft / tileSqft;
  // Rounded to absorb floating-point noise (e.g. 100 × 1.1 landing on
  // 110.00000000000001) before ceiling — otherwise that noise alone can
  // push the result up an entire extra tile.
  const tilesNeeded = Math.ceil(Math.round(rawTiles * (1 + wastePct / 100) * 1000) / 1000);

  return {
    value: { roomSqft: Math.round(roomSqft * 100) / 100, tileSqft: Math.round(tileSqft * 10000) / 10000, tilesNeeded },
    steps: [
      { label: "Room area", formula: `${roomLengthFt}ft × ${roomWidthFt}ft`, value: `${Math.round(roomSqft * 100) / 100} sq ft` },
      { label: "Tiles needed (with waste)", formula: `(room area ÷ tile area) × (1 + ${wastePct}%)`, value: tilesNeeded },
    ],
    assumptions: [`Includes a ${wastePct}% waste allowance for cuts and breakage — the standard recommendation is 10%, more for diagonal layouts`],
    rulesVersion: "Standard tile coverage with waste allowance",
  };
}
