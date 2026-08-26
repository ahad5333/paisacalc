import { describe, expect, it } from "vitest";
import { calculateUrlEncode } from "@/lib/calc/url-encode";

describe("calculateUrlEncode — worked example", () => {
  it("encodes spaces and special characters", () => {
    const result = calculateUrlEncode({ direction: "encode", text: "hello world & more" });
    expect(result.value.result).toBe("hello%20world%20%26%20more");
  });

  it("decodes back to the original text", () => {
    const encoded = calculateUrlEncode({ direction: "encode", text: "a=b&c=d" });
    const decoded = calculateUrlEncode({ direction: "decode", text: encoded.value.result });
    expect(decoded.value.result).toBe("a=b&c=d");
  });
});

describe("calculateUrlEncode — boundary cases", () => {
  it("an invalid percent-encoded string reports an error instead of throwing", () => {
    const result = calculateUrlEncode({ direction: "decode", text: "%" });
    expect(result.value.error).not.toBeNull();
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateUrlEncode({ direction: "encode", text: "test" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
