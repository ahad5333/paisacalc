import type { CalcResult } from "./types";

export type RentVsBuyInputs = {
  homePrice: number;
  downPaymentPercent: number;
  loanRatePercent: number;
  loanTenureYears: number;
  monthlyRent: number;
  annualRentIncreasePercent: number;
  appreciationPercent: number;
  investmentReturnPercent: number;
  maintenancePercent: number;
  compareYears: number;
};

export type RentVsBuyValue = {
  emi: number;
  downPayment: number;
  netWorthBuying: number;
  netWorthRenting: number;
  propertyValue: number;
  remainingLoanBalance: number;
  totalMaintenance: number;
  totalRentPaid: number;
  totalEmiPaid: number;
  better: "buy" | "rent";
};

// A month-by-month simulation rather than a closed-form formula, because
// rent escalates annually while the EMI stays fixed — the gap between
// them (what a renter could invest instead) changes every year, so there's
// no clean single formula the way a plain EMI or SIP has. Compares net
// worth at the end of the period under each choice: for buying, home
// equity (appreciated property value minus whatever loan balance is left)
// minus maintenance actually spent; for renting, the down payment and the
// EMI-minus-rent gap, both invested at an assumed return, compounding
// monthly the same annuity-due way the SIP calculator does. Verified
// against a hand-traced example before use — see tests/rent-vs-buy.test.ts.
export function calculateRentVsBuy(inputs: RentVsBuyInputs): CalcResult<RentVsBuyValue> {
  const {
    homePrice,
    downPaymentPercent,
    loanRatePercent,
    loanTenureYears,
    monthlyRent,
    annualRentIncreasePercent,
    appreciationPercent,
    investmentReturnPercent,
    maintenancePercent,
    compareYears,
  } = inputs;

  const downPayment = Math.round((homePrice * downPaymentPercent) / 100);
  const loanAmount = homePrice - downPayment;
  const loanMonths = Math.max(1, Math.round(loanTenureYears * 12));
  const r = loanRatePercent / 12 / 100;
  const emi = Math.round(
    r === 0 ? loanAmount / loanMonths : (loanAmount * r * Math.pow(1 + r, loanMonths)) / (Math.pow(1 + r, loanMonths) - 1),
  );
  const investR = investmentReturnPercent / 12 / 100;

  const compareMonths = Math.max(1, Math.round(compareYears * 12));
  let loanBalance = loanAmount;
  let rent = monthlyRent;
  let investedBalance = 0;
  let totalMaintenance = 0;
  let totalRentPaid = 0;
  let totalEmiPaid = 0;

  for (let month = 1; month <= compareMonths; month++) {
    if (loanBalance > 0) {
      const interest = Math.round(loanBalance * r);
      const principal = Math.min(loanBalance, emi - interest);
      loanBalance = Math.max(0, loanBalance - principal);
      totalEmiPaid += emi;
    }

    totalRentPaid += rent;
    const diff = Math.max(0, emi - rent);
    investedBalance += diff;
    investedBalance *= 1 + investR;

    if (month % 12 === 0) {
      const yearsElapsed = Math.floor((month - 1) / 12);
      const currentHomeValue = homePrice * Math.pow(1 + appreciationPercent / 100, yearsElapsed);
      totalMaintenance += Math.round((currentHomeValue * maintenancePercent) / 100);
      rent = Math.round(rent * (1 + annualRentIncreasePercent / 100));
    }
  }

  const propertyValue = Math.round(homePrice * Math.pow(1 + appreciationPercent / 100, compareYears));
  const downPaymentInvestedFv = downPayment * Math.pow(1 + investmentReturnPercent / 100, compareYears);

  const netWorthBuying = propertyValue - loanBalance - totalMaintenance;
  const netWorthRenting = Math.round(downPaymentInvestedFv + investedBalance);

  return {
    value: {
      emi,
      downPayment,
      netWorthBuying,
      netWorthRenting,
      propertyValue,
      remainingLoanBalance: loanBalance,
      totalMaintenance,
      totalRentPaid,
      totalEmiPaid,
      better: netWorthBuying >= netWorthRenting ? "buy" : "rent",
    },
    steps: [
      { label: "EMI", formula: "standard EMI on the loan amount", value: emi },
      { label: "Property value after N years", formula: `${homePrice} × (1+appreciation)ᴺ`, value: propertyValue },
      { label: "Remaining loan balance", formula: "simulated month by month", value: loanBalance },
      { label: "Net worth if buying", formula: "Property value − Loan balance − Maintenance", value: netWorthBuying },
      {
        label: "Net worth if renting & investing",
        formula: "Down payment + (EMI − rent) invested monthly, both grown at the assumed return",
        value: netWorthRenting,
      },
    ],
    assumptions: [
      "Rent rises by a fixed percentage once a year; the EMI stays fixed for the full loan tenure",
      "The renter invests exactly the gap between the EMI and the current rent, every month it's positive — if rent ever exceeds the EMI, nothing further is invested that month, but nothing is withdrawn either",
      "Maintenance is charged as a percentage of the property's then-current (appreciated) value, once a year",
      "Ignores taxes, transaction costs (registration, brokerage), and the possibility of unpredictable years — every rate is a straight-line assumption held constant",
      "Compares net worth at a single point N years out, not cash flow along the way",
    ],
    rulesVersion: "Net worth simulation (assumption-based)",
  };
}
