"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateTile } from "@/lib/calc/tile";

const LAST_VERIFIED = "19 Aug 2026";

export function TileCalculatorPage({ content }: { content: ReactNode }) {
  const [roomLengthFt, setRoomLengthFt] = useState(10);
  const [roomWidthFt, setRoomWidthFt] = useState(10);
  const [tileLengthIn, setTileLengthIn] = useState(12);
  const [tileWidthIn, setTileWidthIn] = useState(12);
  const [wastePct, setWastePct] = useState(10);

  const result = calculateTile({ roomLengthFt, roomWidthFt, tileLengthIn, tileWidthIn, wastePct });
  const { roomSqft, tilesNeeded } = result.value;

  return (
    <CalculatorPage
      title="Tile calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How many tiles to buy for a room, including a waste allowance."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Room length" value={roomLengthFt} onChange={setRoomLengthFt} min={0.5} step={0.5} suffix="ft" />
            <NumericInput label="Room width" value={roomWidthFt} onChange={setRoomWidthFt} min={0.5} step={0.5} suffix="ft" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Tile length" value={tileLengthIn} onChange={setTileLengthIn} min={1} step={1} suffix="in" />
            <NumericInput label="Tile width" value={tileWidthIn} onChange={setTileWidthIn} min={1} step={1} suffix="in" />
          </div>
          <NumericInput label="Waste allowance" value={wastePct} onChange={setWastePct} min={0} max={30} step={1} suffix="%" slider />
        </>
      }
      result={<ResultDisplay value={`${tilesNeeded}`} caption={`tiles — room area ${roomSqft} sq ft`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
