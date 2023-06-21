export interface Tokenizer {
  tokenize(): string[];
  tokenize(expression: string): string[];
  clone(): Tokenizer;
  setExpression(expression: string): Tokenizer;
}

export class DefaultTokenizer implements Tokenizer {
  private expression: string;

  constructor(expression: string) {
    this.expression = expression;
  }

  public tokenize(): string[];
  public tokenize(expr: string): string[];
  public tokenize(expr?: string): string[] {
    const tokens: string[] = [];
    let currentNumber = "";
    const expression = expr || this.expression;

    for (const character of expression) {
      if (isOperator(character)) {
        if (currentNumber !== "") {
          tokens.push(currentNumber);
          currentNumber = "";
        }
        tokens.push(character);
      } else {
        currentNumber += character;
      }
    }

    if (currentNumber !== "") {
      tokens.push(currentNumber);
    }

    return tokens;
  }

  public clone(): DefaultTokenizer {
    return new DefaultTokenizer(this.expression);
  }

  public setExpression(expression: string): DefaultTokenizer {
    this.expression = expression;
    return this;
  }
}

function isOperator(character: string): boolean {
  return (
    character === "+" ||
    character === "-" ||
    character === "*" ||
    character === "/"
  );
}
