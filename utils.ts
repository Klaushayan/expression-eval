import { Operator } from "./types";

/**
 * Represents a binary operation that can be evaluated with two operands.
 */
interface BinaryOperation {
  /**
   * Evaluates the binary operation with the given operands.
   * @param left The left operand.
   * @param right The right operand.
   * @returns The result of the operation, or undefined if the operation is invalid.
   */
  evaluate(left: number, right: number): number | undefined;
}

/**
 * Represents an addition operation.
 */
class AddOperation implements BinaryOperation {
  /**
   * Evaluates the addition operation with the given operands.
   * @param left The left operand.
   * @param right The right operand.
   * @returns The sum of the operands.
   */
  evaluate(left: number, right: number): number {
    return left + right;
  }
}

/**
 * Represents a subtraction operation.
 */
class SubtractOperation implements BinaryOperation {
  /**
   * Evaluates the subtraction operation with the given operands.
   * @param left The left operand.
   * @param right The right operand.
   * @returns The difference of the operands.
   */
  evaluate(left: number, right: number): number {
    return left - right;
  }
}

/**
 * Represents a multiplication operation.
 */
class MultiplyOperation implements BinaryOperation {
  /**
   * Evaluates the multiplication operation with the given operands.
   * @param left The left operand.
   * @param right The right operand.
   * @returns The product of the operands.
   */
  evaluate(left: number, right: number): number {
    return left * right;
  }
}

/**
 * Represents a division operation.
 */
class DivideOperation implements BinaryOperation {
  /**
   * Evaluates the division operation with the given operands.
   * @param left The left operand.
   * @param right The right operand.
   * @returns The quotient of the operands, or undefined if the right operand is zero.
   */
  evaluate(left: number, right: number): number | undefined {
    if (right === 0) {
      return undefined; // division by zero
    }
    return left / right;
  }
}

/**
 * Evaluates a binary operation with the given operands.
 * @param left The left operand.
 * @param operator The operator to apply.
 * @param right The right operand.
 * @returns The result of the operation, or undefined if the operation is invalid.
 * @throws An error if the operator is unknown.
 */
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

/**
 * Determines whether the given expression is a valid binary expression.
 * @param expression The expression to validate.
 * @returns True if the expression is valid, false otherwise.
 */
export function isValidExpression(expression: string): boolean {
  const re = /^(\d+)([-+*/](\d+))*$/;
  return re.test(expression);
}
