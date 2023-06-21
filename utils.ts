import { Operator } from "./types";

interface BinaryOperation {
  evaluate(left: number, right: number): number | undefined;
}

class AddOperation implements BinaryOperation {
  evaluate(left: number, right: number): number {
    return left + right;
  }
}

class SubtractOperation implements BinaryOperation {
  evaluate(left: number, right: number): number {
    return left - right;
  }
}

class MultiplyOperation implements BinaryOperation {
  evaluate(left: number, right: number): number {
    return left * right;
  }
}

class DivideOperation implements BinaryOperation {
  evaluate(left: number, right: number): number | undefined {
    if (right === 0) {
      return undefined; // division by zero
    }
    return left / right;
  }
}

export function evaluateBinaryOperation(
  left: number,
  operator: Operator,
  right: number
): number | undefined {
  let operation: BinaryOperation;
  switch (operator) {
    case "+":
      operation = new AddOperation();
      break;
    case "-":
      operation = new SubtractOperation();
      break;
    case "*":
      operation = new MultiplyOperation();
      break;
    case "/":
      operation = new DivideOperation();
      break;
    default:
      throw new Error(`Unknown operator ${operator}`);
  }
  return operation.evaluate(left, right);
}

export function isValidExpression(expression: string): boolean {
    const re = /^(\d+)([-+*/](\d+))*$/;
    return re.test(expression);
}