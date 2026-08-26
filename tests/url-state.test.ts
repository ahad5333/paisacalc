import { describe, expect, it } from "vitest";
import { decodeNumber, encodeNumericParams } from "@/lib/url-state";

describe("decodeNumber", () => {
  it("falls back to the default when the key is absent", () => {
    const params = new URLSearchParams("r=8.5");
    expect(decodeNumber(params, "p", 4000000)).toBe(4000000);
  });

  it("falls back to the default on a mangled value instead of throwing", () => {
    const params = new URLSearchParams("p=not-a-number");
    expect(decodeNumber(params, "p", 4000000)).toBe(4000000);
  });

  it("parses a valid value", () => {
    const params = new URLSearchParams("p=4000000&r=8.5");
    expect(decodeNumber(params, "p", 0)).toBe(4000000);
    expect(decodeNumber(params, "r", 0)).toBe(8.5);
  });
});

describe("encodeNumericParams", () => {
  it("round-trips through decodeNumber", () => {
    const query = encodeNumericParams({ p: 4000000, r: 8.5, t: 20 });
    const params = new URLSearchParams(query);
    expect(decodeNumber(params, "p", 0)).toBe(4000000);
    expect(decodeNumber(params, "r", 0)).toBe(8.5);
    expect(decodeNumber(params, "t", 0)).toBe(20);
  });

  it("drops non-finite values rather than encoding them", () => {
    const query = encodeNumericParams({ p: NaN, r: 8.5 });
    expect(query).toBe("r=8.5");
  });
});
