import type { CalcResult } from "./types";

export type IpSubnetInputs = {
  ip: string;
  cidr: number;
};

export type IpSubnetValue = {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  totalHosts: number;
  usableHosts: number;
  firstHost: string;
  lastHost: string;
  valid: boolean;
};

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int: number): string {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
}

export function calculateIpSubnet(inputs: IpSubnetInputs): CalcResult<IpSubnetValue> {
  const { ip, cidr } = inputs;
  const ipInt = ipToInt(ip);

  if (ipInt === null || cidr < 0 || cidr > 32) {
    return {
      value: { networkAddress: "", broadcastAddress: "", subnetMask: "", totalHosts: 0, usableHosts: 0, firstHost: "", lastHost: "", valid: false },
      steps: [{ label: "Input", formula: `${ip}/${cidr}`, value: "invalid" }],
      assumptions: ["Enter a valid IPv4 address (four numbers 0-255) and a CIDR prefix from 0 to 32"],
      rulesVersion: "IPv4 subnetting (CIDR)",
    };
  }

  const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;
  const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
  const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;

  return {
    value: {
      networkAddress: intToIp(networkInt),
      broadcastAddress: intToIp(broadcastInt),
      subnetMask: intToIp(maskInt),
      totalHosts,
      usableHosts,
      firstHost: intToIp(firstHostInt),
      lastHost: intToIp(lastHostInt),
      valid: true,
    },
    steps: [
      { label: "Subnet mask", formula: `/${cidr}`, value: intToIp(maskInt) },
      { label: "Network address", formula: "IP AND mask", value: intToIp(networkInt) },
      { label: "Broadcast address", formula: "network OR (NOT mask)", value: intToIp(broadcastInt) },
      { label: "Usable hosts", formula: cidr >= 31 ? "n/a (point-to-point)" : "2^(32−cidr) − 2", value: usableHosts },
    ],
    assumptions: [
      "The 2 subtracted from usable hosts accounts for the network address and broadcast address, which can't be assigned to a device",
      "/31 and /32 are special cases used for point-to-point links and single hosts, with no separate broadcast address",
    ],
    rulesVersion: "IPv4 subnetting (CIDR)",
  };
}
