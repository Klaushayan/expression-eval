/**
 * A tokenizer that splits a mathematical expression into tokens.
 */
export interface Tokenizer {
  /**
   * Tokenizes the expression set in the tokenizer instance.
   * @returns An array of tokens.
   */
  tokenize(): string[];

  /**
   * Tokenizes the given expression.
   * @param expression The expression to tokenize.
   * @returns An array of tokens.
   */
  tokenize(expression: string): string[];

  /**
   * Creates a clone of the tokenizer instance.
   * @returns A new tokenizer instance with the same expression.
   */
  clone(): Tokenizer;

  /**
   * Sets the expression to tokenize.
   * @param expression The expression to tokenize.
   * @returns The tokenizer instance.
   */
  setExpression(expression: string): Tokenizer;
}

/**
 * The default implementation of the `Tokenizer` interface.
 */
export class DefaultTokenizer implements Tokenizer {
  private expression: string;

  /**
   * Creates a new instance of the `DefaultTokenizer` class.
   * @param expression The expression to tokenize.
   */
  constructor(expression: string) {
    this.expression = expression;
  }

  /**
   * @inheritdoc
   */
  public tokenize(): string[];

  /**
   * @inheritdoc
   */
  public tokenize(expr: string): string[];

  /**
   * @inheritdoc
   */
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

  /**
   * @inheritdoc
   */
  public clone(): DefaultTokenizer {
    return new DefaultTokenizer(this.expression);
  }

  /**
   * @inheritdoc
   */
  public setExpression(expression: string): DefaultTokenizer {
    this.expression = expression;
    return this;
  }
}

/**
 * Determines whether the given character is an operator.
 * @param character The character to check.
 * @returns `true` if the character is an operator, `false` otherwise.
 */
function isOperator(character: string): boolean {
  return (
    character === "+" ||
    character === "-" ||
    character === "*" ||
    character === "/"
  );
}
