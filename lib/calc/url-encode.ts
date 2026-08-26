import type { CalcResult } from "./types";

export type UrlEncodeDirection = "encode" | "decode";

export type UrlEncodeInputs = {
  direction: UrlEncodeDirection;
  text: string;
};

export function calculateUrlEncode(inputs: UrlEncodeInputs): CalcResult<{ result: string; error: string | null }> {
  const { direction, text } = inputs;
  try {
    const result = direction === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
    return {
      value: { result, error: null },
      steps: [{ label: direction === "encode" ? "URL-encoded" : "Decoded text", formula: "", value: result || "(empty)" }],
      assumptions: ["Encodes for use inside a single URL component (a query parameter value), not an entire URL — characters like / and : that are structural in a full URL are also escaped"],
      rulesVersion: "Standard percent-encoding (RFC 3986)",
    };
  } catch {
    return {
      value: { result: "", error: "Invalid percent-encoded input" },
      steps: [{ label: "Result", formula: "", value: "error" }],
      assumptions: [],
      rulesVersion: "Standard percent-encoding (RFC 3986)",
    };
  }
}
