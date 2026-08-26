import type { CalcResult } from "./types";

export type Base64Direction = "encode" | "decode";

export type Base64Inputs = {
  direction: Base64Direction;
  text: string;
};

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Implemented byte-level with TextEncoder/TextDecoder rather than
// btoa/atob, which only handle Latin-1 text and mangle anything outside
// that range — this handles full Unicode input correctly.
function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = bytes[i + 1];
    const b3 = bytes[i + 2];
    const triplet = (b1 << 16) | ((b2 ?? 0) << 8) | (b3 ?? 0);
    result += BASE64_CHARS[(triplet >> 18) & 0x3f];
    result += BASE64_CHARS[(triplet >> 12) & 0x3f];
    result += b2 !== undefined ? BASE64_CHARS[(triplet >> 6) & 0x3f] : "=";
    result += b3 !== undefined ? BASE64_CHARS[triplet & 0x3f] : "=";
  }
  return result;
}

function decodeBase64(b64: string): string {
  const clean = b64.replace(/=+$/, "").replace(/\s/g, "");
  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;
  for (const char of clean) {
    const idx = BASE64_CHARS.indexOf(char);
    if (idx === -1) continue;
    buffer = (buffer << 6) | idx;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function calculateBase64(inputs: Base64Inputs): CalcResult<{ result: string; error: string | null }> {
  const { direction, text } = inputs;
  try {
    const result = direction === "encode" ? encodeBase64(text) : decodeBase64(text);
    return {
      value: { result, error: null },
      steps: [{ label: direction === "encode" ? "Base64" : "Decoded text", formula: "", value: result || "(empty)" }],
      assumptions: ["Encodes the full UTF-8 byte sequence, not just Latin-1 characters, so it handles any Unicode text correctly"],
      rulesVersion: "Standard Base64 (RFC 4648)",
    };
  } catch {
    return {
      value: { result: "", error: "Invalid input" },
      steps: [{ label: "Result", formula: "", value: "error" }],
      assumptions: [],
      rulesVersion: "Standard Base64 (RFC 4648)",
    };
  }
}
