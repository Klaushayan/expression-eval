import { expect } from "chai";
import { DefaultExpression } from "../expression";
import { DefaultTokenizer } from "../tokenizer";
import * as utils from "../utils";

// all tests are in one file for simplicity

describe("Expression", () => {
  it("calculates 2*3-4-5", () => {
    const tokenizer = new DefaultTokenizer("2*3-4-5");
    const expr = new DefaultExpression(tokenizer);
    expect(expr.evaluate()).to.deep.equal([8, -12, 7, -7, -3]);
  });

  it("calculates 2*3-4/2", () => {
    const tokenizer = new DefaultTokenizer("2*3-4/2");
    const expr = new DefaultExpression(tokenizer);
    expect(expr.evaluate()).to.deep.equal([2, -1, 4, -1, 1]);
  });

  it("calculates 22*3-4/2", () => {
    const tokenizer = new DefaultTokenizer("22*3-4/2");
    const expr = new DefaultExpression(tokenizer);
    expect(expr.evaluate()).to.deep.equal([22, -11, 64, -11, 31]);
  });

  it("returns empty on an invalid expression", () => {
    const tokenizer = new DefaultTokenizer("2*3-4/b+");
    const expr = new DefaultExpression(tokenizer);
    expect(expr.evaluate()).to.deep.equal([])
  });

});

describe("Tokenizer", () => {
  it("tokenizes 2*3-4-5", () => {
    var tokenized = new DefaultTokenizer("2*3-4-5").tokenize();
    expect(tokenized).to.deep.equal(["2", "*", "3", "-", "4", "-", "5"]);
  });
});

describe("Utils", () => {
  it("evaluates binary operations", () => {
    expect(utils.evaluateBinaryOperation(2, "+", 3)).to.equal(5);
    expect(utils.evaluateBinaryOperation(2, "-", 3)).to.equal(-1);
    expect(utils.evaluateBinaryOperation(2, "*", 3)).to.equal(6);
    expect(utils.evaluateBinaryOperation(2, "/", 3)).to.equal(2 / 3);
  });

  it("evaluates binary operations with zero", () => {
    expect(utils.evaluateBinaryOperation(2, "/", 0)).to.equal(undefined);
  });

  it("throws on invalid operator", () => {
    var op: any = "!";
    expect(() => utils.evaluateBinaryOperation(2, op, 3)).to.throw();
  });

  it("validates expressions", () => {
    expect(utils.isValidExpression("5+32-52-64")).to.equal(true);
    expect(utils.isValidExpression("2/3-4/2")).to.equal(true);
    expect(utils.isValidExpression("22*3-4/2")).to.equal(true);
    expect(utils.isValidExpression("(2)*3-4/b+")).to.equal(false);
  });
});