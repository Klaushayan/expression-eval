export class Tokenizer {
  private expr: string;

  constructor(expr: string) {
    this.expr = expr;
  }

  public tokenize(): string[] {
    const res: string[] = [];
    let num = "";
    for (const c of this.expr) {
      if (c === "+" || c === "-" || c === "*" || c === "/") {
        if (num !== "") {
          res.push(num);
          num = "";
        }
        res.push(c);
      } else {
        num += c;
      }
    }
    if (num !== "") {
      res.push(num);
    }
    return res;
  }

  public setExpression(expr: string): void {
    this.expr = expr;
  }
}
