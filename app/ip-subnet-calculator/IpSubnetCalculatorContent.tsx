import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why can't the network and broadcast addresses be assigned to a device?",
    a: "The network address (all host bits zero) identifies the subnet itself, and the broadcast address (all host bits one) sends to every device on it — both are reserved by convention, which is why usable hosts is always 2 less than the total addresses in the subnet.",
  },
  {
    q: "What are /31 and /32 for?",
    a: "They're special cases: /32 identifies a single host with no room for a subnet at all, and /31 (a two-address subnet) is commonly used for point-to-point links between two routers, where there's no need for separate network and broadcast addresses.",
  },
];

export function IpSubnetCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the network address, broadcast address, subnet mask, and usable host range
          for an IPv4 address and CIDR prefix.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          192.168.1.10/24 has a network address of <strong>192.168.1.0</strong> and{" "}
          <strong>254</strong> usable hosts.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
