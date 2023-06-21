import { Tokenizer } from "./tokenizer";
import { evaluateBinaryOperation } from "./utils";
import { Operator } from "./types";

/**
 * Represents an expression that can be evaluated to a list of numbers.
 */
export abstract class Expression {
  protected readonly tokenizer: Tokenizer;

  /**
   * Creates a new expression with the given tokenizer and optional expression string.
   * @param tokenizer The tokenizer to use for this expression.
   * @param expression An optional expression string to set on the tokenizer.
   */
  constructor(tokenizer: Tokenizer, expression?: string) {
    this.tokenizer = tokenizer;
    if (expression !== undefined) {
      this.tokenizer.setExpression(expression);
    }
  }

  /**
   * Evaluates this expression and returns a list of numbers.
   * @returns A list of numbers that result from evaluating this expression.
   */
  abstract evaluate(): number[];
}

/**
 * The default implementation of an expression.
 */
export class DefaultExpression extends Expression {
  /**
   * Evaluates this expression and returns a list of numbers.
   * @returns A list of numbers that demonstrate all possible ways of evaluating the expression.
   */
  public evaluate(): number[] {
    // Tokenize the expression
    const tokenized = this.tokenizer.tokenize();

    // If the expression is empty, return an empty array
    if (tokenized.length === 0) {
      return [];
    }

    // If the expression is a single number, return an array with that number
    if (tokenized.length === 1) {
      return [parseInt(tokenized[0])];
    }

    // If the expression is a binary operation, evaluate it and return the result
    if (tokenized.length === 3) {
      const num = evaluateBinaryOperation(
        parseInt(tokenized[0]),
        tokenized[1] as Operator,
        parseInt(tokenized[2])
      );
      if (num !== undefined) {
        return [num];
      }
      return [];
    }

    // If the expression is a complex expression, split it into left and right expressions and evaluate them recursively
    const results: number[] = [];

    for (let i = 1; i < tokenized.length; i += 2) {
      // Evaluate the left expression
      const leftTokenizer = this.tokenizer.clone();
      leftTokenizer.setExpression(tokenized.slice(0, i).join(""));
      const leftExpr = new DefaultExpression(leftTokenizer);
      const leftResults = leftExpr.evaluate();

      // Evaluate the right expression
      const rightTokenizer = this.tokenizer.clone();
      rightTokenizer.setExpression(tokenized.slice(i + 1).join(""));
      const rightExpr = new DefaultExpression(rightTokenizer);
      const rightResults = rightExpr.evaluate();

      // Combine the results of the left and right expressions using the binary operator
      for (const left of leftResults) {
        for (const right of rightResults) {
          const val = evaluateBinaryOperation(
            left,
            tokenized[i] as Operator,
            right
          );
          if (val !== undefined) {
            results.push(val);
          }
        }
      }
    }

    return results;
  }
}
