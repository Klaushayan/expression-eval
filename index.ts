import { Expression } from "./expression";
import { isValidExpression } from "./utils";


function run(...args: string[]) {
  try {
    const expr = new Expression(args.join(""));
    console.log(expr.evaluate());
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: ts-node index.ts <expression>");
  process.exit(1);
}

if (isValidExpression(args.join(""))) {
  run(...args);
}
else {
  console.error(`Invalid expression ${args.join("")}`);
  process.exit(1);
}