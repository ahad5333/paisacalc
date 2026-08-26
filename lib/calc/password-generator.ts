import type { CalcResult } from "./types";

export type PasswordInputs = {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
};

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

function randomInt(max: number): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

// Uses the Web Crypto API's cryptographically secure random source when
// available (browsers, modern Node), falling back to Math.random only in
// environments without it.
export function generatePassword(inputs: PasswordInputs): CalcResult<{ password: string; entropy: number }> {
  const { length, useUppercase, useLowercase, useNumbers, useSymbols } = inputs;
  let pool = "";
  if (useUppercase) pool += CHAR_SETS.uppercase;
  if (useLowercase) pool += CHAR_SETS.lowercase;
  if (useNumbers) pool += CHAR_SETS.numbers;
  if (useSymbols) pool += CHAR_SETS.symbols;

  if (pool.length === 0) {
    return {
      value: { password: "", entropy: 0 },
      steps: [{ label: "Password", formula: "", value: "select at least one character type" }],
      assumptions: [],
      rulesVersion: "Uniform random selection from the chosen character pool",
    };
  }

  let password = "";
  for (let i = 0; i < length; i++) password += pool[randomInt(pool.length)];

  const entropy = Math.round(length * Math.log2(pool.length) * 100) / 100;

  return {
    value: { password, entropy },
    steps: [{ label: "Entropy", formula: `${length} × log2(${pool.length} possible characters)`, value: `${entropy} bits` }],
    assumptions: [
      "Each character is drawn independently and uniformly from the selected character types — entropy measures how hard the password is to guess by brute force, not against dictionary or pattern-based attacks",
      "Generated in your browser using the Web Crypto API where available — never transmitted anywhere",
    ],
    rulesVersion: "Uniform random selection from the chosen character pool",
  };
}
