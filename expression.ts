import { Tokenizer } from "./tokenizer";
import { evaluateBinaryOperation } from "./utils";
import { Operator } from "./types";

const TOKENIZED_LENGTH = {
  SINGLE_NUMBER: 1,
  BINARY_OPERATION: 3,
};

export class Expression {
  private readonly tokenizer: Tokenizer;

  constructor(expr: string, tokenizer?: Tokenizer) {
    this.tokenizer = tokenizer || new Tokenizer(expr);
  }

  public evaluate(): number[] {
    const tokenized = this.tokenizer.tokenize();

    if (tokenized.length === 0) {
      return [];
    }

    if (tokenized.length === TOKENIZED_LENGTH.SINGLE_NUMBER) {
      return [parseInt(tokenized[0])];
    }

    if (tokenized.length === TOKENIZED_LENGTH.BINARY_OPERATION) {
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

    const results: number[] = [];

    for (let i = 1; i < tokenized.length; i += 2) {
      const leftExpr = new Expression(tokenized.slice(0, i).join(""));
      const rightExpr = new Expression(tokenized.slice(i + 1).join(""));

      const leftResults = leftExpr.evaluate();
      const rightResults = rightExpr.evaluate();

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
