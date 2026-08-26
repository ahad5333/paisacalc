import type { CalcResult } from "./types";

export type BandwidthInputs = {
  fileSizeMB: number;
  bandwidthMbps: number;
};

export function calculateBandwidth(inputs: BandwidthInputs): CalcResult<{ seconds: number }> {
  const { fileSizeMB, bandwidthMbps } = inputs;
  // File size is in megabytes (MB, 8 bits/byte); bandwidth is in
  // megabits/second (Mbps) — the classic source of confusion this
  // calculator exists to avoid, since 1 byte = 8 bits.
  const fileSizeMegabits = fileSizeMB * 8;
  const seconds = Math.round((fileSizeMegabits / bandwidthMbps) * 100) / 100;

  return {
    value: { seconds },
    steps: [
      { label: "File size in megabits", formula: `${fileSizeMB} MB × 8`, value: fileSizeMegabits },
      { label: "Transfer time", formula: `megabits ÷ ${bandwidthMbps} Mbps`, value: `${seconds} sec` },
    ],
    assumptions: [
      "Converts megabytes (MB) to megabits (Mb) using the 8 bits/byte factor — bandwidth is conventionally quoted in bits/second, while file sizes are conventionally quoted in bytes",
      "Assumes the full bandwidth is available and sustained for the whole transfer — real-world speeds are usually lower due to network overhead and other traffic",
    ],
    rulesVersion: "Standard bandwidth/file-size conversion",
  };
}
