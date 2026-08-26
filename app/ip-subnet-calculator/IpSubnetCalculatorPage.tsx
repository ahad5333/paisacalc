"use client";

import { useId, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateIpSubnet } from "@/lib/calc/ip-subnet";

const LAST_VERIFIED = "19 Aug 2026";

function IpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        IP address
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="192.168.1.10"
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
    </div>
  );
}

export function IpSubnetCalculatorPage({ content }: { content: ReactNode }) {
  const [ip, setIp] = useState("192.168.1.10");
  const [cidr, setCidr] = useState(24);

  const result = calculateIpSubnet({ ip, cidr });
  const { networkAddress, broadcastAddress, subnetMask, usableHosts, firstHost, lastHost, valid } = result.value;

  return (
    <CalculatorPage
      title="IP subnet calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Network address, broadcast address, and usable host range for an IPv4 CIDR subnet."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <IpInput value={ip} onChange={setIp} />
          <NumericInput label="CIDR prefix" value={cidr} onChange={setCidr} min={0} max={32} step={1} suffix="/32" slider />
        </>
      }
      result={<ResultDisplay value={valid ? networkAddress : "Invalid"} caption={valid ? `Network address — mask ${subnetMask}` : "Enter a valid IPv4 address"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        valid ? (
          <DetailTable
            caption="Subnet details"
            columns={[
              { key: "field", label: "Field" },
              { key: "value", label: "Value", align: "right" },
            ]}
            rows={[
              { field: "Network address", value: networkAddress },
              { field: "Broadcast address", value: broadcastAddress },
              { field: "Subnet mask", value: subnetMask },
              { field: "Usable hosts", value: `${usableHosts}` },
              { field: "First usable host", value: firstHost },
              { field: "Last usable host", value: lastHost },
            ]}
          />
        ) : undefined
      }
      content={content}
    />
  );
}
