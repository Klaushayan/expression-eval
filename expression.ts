import { Tokenizer } from "./tokenizer";
import { evaluateBinaryOperation } from "./utils";
import { Operator } from "./types";

export class Expression {
  private readonly tokenizer: Tokenizer;

  constructor(expr: string, tokenizer?: Tokenizer) {
    this.tokenizer = tokenizer || new Tokenizer(expr);
  }

  public evaluate(): number[] {
    const res: number[] = [];

    const tokenized = this.tokenizer.tokenize();

    // if the expression is a single number, return it
    if (tokenized.length === 1) {
      res.push(parseInt(tokenized[0]));
      return res;
    }

    // if the expression is a binary operation, evaluate it and return
    if (tokenized.length === 3) {
      const num = evaluateBinaryOperation(
        parseInt(tokenized[0]),
        tokenized[1] as Operator,
        parseInt(tokenized[2])
      );
      if (num !== undefined) {
        res.push(num);
      }
      return res;
    }

    for (let i = 1; i < tokenized.length; i += 2) {
      const left = new Expression(tokenized.slice(0, i).join(""));
      const right = new Expression(tokenized.slice(i + 1).join(""));

      const l = left.evaluate();
      const r = right.evaluate();

      for (const s1 of l) {
        for (const s2 of r) {
          const val = evaluateBinaryOperation(s1, tokenized[i] as Operator, s2);
          if (val !== undefined) {
            res.push(val);
          }
        }
      }
    }
    return res;
  }
}
