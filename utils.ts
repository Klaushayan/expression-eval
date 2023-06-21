import { Operator, Operand } from "./types";

export function evaluateBinaryOperation(
  a: Operand,
  op: Operator,
  b: Operand
): Operand | undefined {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? undefined : a / b; // avoid division by zero
    default:
      throw new Error(`Invalid operator ${op}`);
  }
}

export function isValidExpression(expression: string): boolean {
    const re = /^(\d+)([-+*/](\d+))*$/;
    return re.test(expression);
}