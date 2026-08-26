import { describe, expect, it } from "vitest";
import { calculateTile } from "@/lib/calc/tile";

describe("calculateTile — worked example", () => {
  it("10ft x 10ft room, 12in x 12in tiles, 10% waste", () => {
    const result = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, wastePct: 10 });
    // room = 100 sqft, tile = 1 sqft, raw = 100, with 10% waste = 110
    expect(result.value.tilesNeeded).toBe(110);
  });
});

describe("calculateTile — boundary cases", () => {
  it("more waste percentage requires more tiles", () => {
    const low = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, wastePct: 5 });
    const high = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, wastePct: 20 });
    expect(high.value.tilesNeeded).toBeGreaterThan(low.value.tilesNeeded);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, wastePct: 10 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
