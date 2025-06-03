const { Tokenizer } = require('../lexer/tokenizer');
const { Parser } = require('../parser/parser');
const Interpreter = require('../interpreter/interpreter');

describe('Nepaliko Interpreter', () => {
  test('should handle basic variable declaration and print', () => {
    const input = `
      namaste
        yo a = 10;
        bhana "Value is ", a;
      dhanyabad
    `;

    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const interpreter = new Interpreter();
    const ast = parser.parse();
    const jsCode = interpreter.interpret(ast);

    expect(jsCode).toContain('let a = 10;');
    expect(jsCode).toContain('console.log("Value is ", a);');
  });

  test('should handle if-else statements', () => {
    const input = `
      namaste
        yo a = 10;
        yadi (a < 20) {
          bhana "less than 20";
        } nabhaye {
          bhana "greater than or equal to 20";
        }
      dhanyabad
    `;

    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const interpreter = new Interpreter();
    const ast = parser.parse();
    const jsCode = interpreter.interpret(ast);

    expect(jsCode).toContain('if (a < 20)');
    expect(jsCode).toContain('console.log("less than 20");');
    expect(jsCode).toContain('console.log("greater than or equal to 20");');
  });
});
