// Shared pure number-theory helpers for the Math category — GCD/LCM and
// prime factorisation are each needed by several otherwise-unrelated
// calculators (fraction, ratio, LCM, GCF, factor), so they live here once
// rather than being reimplemented per calculator.

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a / gcd(a, b) * b);
}

export function gcdMany(values: number[]): number {
  return values.reduce((acc, v) => gcd(acc, v));
}

export function lcmMany(values: number[]): number {
  return values.reduce((acc, v) => lcm(acc, v));
}

// Trial division up to √n — fine for the input sizes a browser calculator
// realistically needs (well under a second up to ~10^7).
export function primeFactorize(n: number): { prime: number; exponent: number }[] {
  let remaining = Math.abs(Math.round(n));
  const factors: { prime: number; exponent: number }[] = [];
  for (let p = 2; p * p <= remaining; p++) {
    if (remaining % p === 0) {
      let exponent = 0;
      while (remaining % p === 0) {
        remaining /= p;
        exponent++;
      }
      factors.push({ prime: p, exponent });
    }
  }
  if (remaining > 1) factors.push({ prime: remaining, exponent: 1 });
  return factors;
}

export function allFactors(n: number): number[] {
  const abs = Math.abs(Math.round(n));
  const factors: number[] = [];
  for (let i = 1; i * i <= abs; i++) {
    if (abs % i === 0) {
      factors.push(i);
      if (i !== abs / i) factors.push(abs / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

export function isPrime(n: number): boolean {
  const abs = Math.abs(Math.round(n));
  if (abs < 2) return false;
  for (let i = 2; i * i <= abs; i++) {
    if (abs % i === 0) return false;
  }
  return true;
}
