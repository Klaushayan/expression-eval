export class Tokenizer {
  private expression: string;

  constructor(expression: string) {
    this.expression = expression;
  }

  public tokenize(): string[] {
    const tokens: string[] = [];
    let currentNumber = "";

    for (const character of this.expression) {
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

  public setExpression(expression: string): void {
    this.expression = expression;
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
