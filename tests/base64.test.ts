import { describe, expect, it } from "vitest";
import { calculateBase64 } from "@/lib/calc/base64";

describe("calculateBase64 — worked example", () => {
  it("encodes 'Hello' correctly", () => {
    const result = calculateBase64({ direction: "encode", text: "Hello" });
    expect(result.value.result).toBe("SGVsbG8=");
  });

  it("decodes back to the original text", () => {
    const encoded = calculateBase64({ direction: "encode", text: "Hello, world!" });
    const decoded = calculateBase64({ direction: "decode", text: encoded.value.result });
    expect(decoded.value.result).toBe("Hello, world!");
  });
});

describe("calculateBase64 — boundary cases", () => {
  it("round-trips full Unicode text correctly, unlike btoa/atob", () => {
    const original = "héllo wörld 日本語";
    const encoded = calculateBase64({ direction: "encode", text: original });
    const decoded = calculateBase64({ direction: "decode", text: encoded.value.result });
    expect(decoded.value.result).toBe(original);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBase64({ direction: "encode", text: "Hello" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
