import { describe, expect, it } from "vitest";
import { calculateIpSubnet } from "@/lib/calc/ip-subnet";

describe("calculateIpSubnet — worked example", () => {
  it("192.168.1.10/24", () => {
    const result = calculateIpSubnet({ ip: "192.168.1.10", cidr: 24 });
    expect(result.value.networkAddress).toBe("192.168.1.0");
    expect(result.value.broadcastAddress).toBe("192.168.1.255");
    expect(result.value.subnetMask).toBe("255.255.255.0");
    expect(result.value.usableHosts).toBe(254);
  });
});

describe("calculateIpSubnet — boundary cases", () => {
  it("a /31 point-to-point link has 0 usable hosts", () => {
    const result = calculateIpSubnet({ ip: "10.0.0.0", cidr: 31 });
    expect(result.value.usableHosts).toBe(0);
  });

  it("an invalid IP address is flagged", () => {
    const result = calculateIpSubnet({ ip: "999.1.1.1", cidr: 24 });
    expect(result.value.valid).toBe(false);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateIpSubnet({ ip: "192.168.1.10", cidr: 24 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
