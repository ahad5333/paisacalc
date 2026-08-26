import type { CalcResult } from "./types";

export type AngleMode = "deg" | "rad";

export type ScientificInputs = {
  expression: string;
  angleMode: AngleMode;
};

export type ScientificValue = {
  result: number;
  error: string | null;
};

type Token = { type: "num" | "op" | "lparen" | "rparen" | "ident"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < expr.length && /[0-9.]/.test(expr[j])) j++;
      tokens.push({ type: "num", value: expr.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let j = i;
      while (j < expr.length && /[a-zA-Z]/.test(expr[j])) j++;
      tokens.push({ type: "ident", value: expr.slice(i, j) });
      i = j;
      continue;
    }
    if ("+-*/^%".includes(c)) {
      tokens.push({ type: "op", value: c });
      i++;
      continue;
    }
    if (c === "(") {
      tokens.push({ type: "lparen", value: c });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "rparen", value: c });
      i++;
      continue;
    }
    throw new Error(`Unexpected character: "${c}"`);
  }
  return tokens;
}

// A small hand-written recursive-descent parser/evaluator — deliberately
// not `eval()`, which would execute arbitrary JavaScript from user input.
// Grammar (lowest to highest precedence): addSub → mulDiv → unary →
// power → primary (number, parenthesised expression, or a named
// function/constant call).
class Parser {
  private pos = 0;
  constructor(
    private tokens: Token[],
    private angleMode: AngleMode,
  ) {}

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }
  private next(): Token {
    return this.tokens[this.pos++];
  }

  parse(): number {
    const value = this.parseAddSub();
    if (this.pos < this.tokens.length) {
      throw new Error(`Unexpected token: "${this.peek()?.value}"`);
    }
    return value;
  }

  private parseAddSub(): number {
    let left = this.parseMulDiv();
    while (this.peek()?.type === "op" && (this.peek()!.value === "+" || this.peek()!.value === "-")) {
      const op = this.next().value;
      const right = this.parseMulDiv();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  private parseMulDiv(): number {
    let left = this.parseUnary();
    while (this.peek()?.type === "op" && ["*", "/", "%"].includes(this.peek()!.value)) {
      const op = this.next().value;
      const right = this.parseUnary();
      left = op === "*" ? left * right : op === "/" ? left / right : left % right;
    }
    return left;
  }

  private parseUnary(): number {
    if (this.peek()?.type === "op" && this.peek()!.value === "-") {
      this.next();
      return -this.parseUnary();
    }
    if (this.peek()?.type === "op" && this.peek()!.value === "+") {
      this.next();
      return this.parseUnary();
    }
    return this.parsePower();
  }

  private parsePower(): number {
    const base = this.parsePrimary();
    if (this.peek()?.type === "op" && this.peek()!.value === "^") {
      this.next();
      const exponent = this.parseUnary();
      return Math.pow(base, exponent);
    }
    return base;
  }

  private parsePrimary(): number {
    const tok = this.peek();
    if (!tok) throw new Error("Unexpected end of expression");

    if (tok.type === "num") {
      this.next();
      return parseFloat(tok.value);
    }
    if (tok.type === "lparen") {
      this.next();
      const value = this.parseAddSub();
      if (this.peek()?.type !== "rparen") throw new Error("Missing closing parenthesis");
      this.next();
      return value;
    }
    if (tok.type === "ident") {
      this.next();
      const name = tok.value.toLowerCase();
      if (name === "pi") return Math.PI;
      if (name === "e") return Math.E;
      if (this.peek()?.type === "lparen") {
        this.next();
        const arg = this.parseAddSub();
        if (this.peek()?.type !== "rparen") throw new Error("Missing closing parenthesis");
        this.next();
        return this.applyFunction(name, arg);
      }
      throw new Error(`Unknown identifier: "${name}"`);
    }
    throw new Error(`Unexpected token: "${tok.value}"`);
  }

  private applyFunction(name: string, arg: number): number {
    const toRad = (x: number) => (this.angleMode === "deg" ? (x * Math.PI) / 180 : x);
    switch (name) {
      case "sin":
        return Math.sin(toRad(arg));
      case "cos":
        return Math.cos(toRad(arg));
      case "tan":
        return Math.tan(toRad(arg));
      case "sqrt":
        return Math.sqrt(arg);
      case "log":
        return Math.log10(arg);
      case "ln":
        return Math.log(arg);
      case "abs":
        return Math.abs(arg);
      default:
        throw new Error(`Unknown function: "${name}"`);
    }
  }
}

export function calculateScientific(inputs: ScientificInputs): CalcResult<ScientificValue> {
  const { expression, angleMode } = inputs;
  let result = NaN;
  let error: string | null = null;

  try {
    if (expression.trim() === "") throw new Error("Enter an expression");
    const tokens = tokenize(expression);
    result = new Parser(tokens, angleMode).parse();
    if (!Number.isFinite(result)) throw new Error("Result is not a finite number");
    result = Math.round(result * 1e10) / 1e10;
  } catch (e) {
    error = e instanceof Error ? e.message : "Invalid expression";
  }

  return {
    value: { result, error },
    steps: [{ label: "Expression", formula: expression || "(empty)", value: error ? `Error: ${error}` : result }],
    assumptions: [
      `Trigonometric functions (sin, cos, tan) interpret their argument in ${angleMode === "deg" ? "degrees" : "radians"}`,
      "Supports + − × ÷ ^ % and parentheses, the functions sin, cos, tan, sqrt, log (base 10), ln, abs, and the constants pi and e",
    ],
    rulesVersion: "Standard operator precedence (PEMDAS)",
  };
}
