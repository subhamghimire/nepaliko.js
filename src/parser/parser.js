const { Token } = require('../lexer/tokenizer');

class ASTNode {
  constructor(type) {
    this.type = type;
  }
}

class Program extends ASTNode {
  constructor(body) {
    super('Program');
    this.body = body;
  }
}

class VariableDeclaration extends ASTNode {
  constructor(name, value) {
    super('VariableDeclaration');
    this.name = name;
    this.value = value;
  }
}

class Assignment extends ASTNode {
  constructor(name, value) {
    super('Assignment');
    this.name = name;
    this.value = value;
  }
}

class PrintStatement extends ASTNode {
  constructor(expression) {
    super('PrintStatement');
    this.expression = expression;
  }
}

class IfStatement extends ASTNode {
  constructor(condition, body, elseBody) {
    super('IfStatement');
    this.condition = condition;
    this.body = body;
    this.elseBody = elseBody;
  }
}

class WhileStatement extends ASTNode {
  constructor(condition, body) {
    super('WhileStatement');
    this.condition = condition;
    this.body = body;
  }
}

class BinaryExpression extends ASTNode {
  constructor(operator, left, right) {
    super('BinaryExpression');
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class Identifier extends ASTNode {
  constructor(name) {
    super('Identifier');
    this.name = name;
  }
}

class Literal extends ASTNode {
  constructor(value) {
    super('Literal');
    this.value = value;
  }
}

class Parser {
  constructor(tokenizer) {
    this.tokenizer = tokenizer;
    this.currentToken = this.tokenizer.getNextToken();
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.tokenizer.getNextToken();
    } else {
      throw new Error(`Expected ${tokenType}, got ${this.currentToken.type}`);
    }
  }

  program() {
    this.eat('PROGRAM_START');
    const body = [];

    while (this.currentToken.type !== 'PROGRAM_END') {
      body.push(this.statement());
    }

    this.eat('PROGRAM_END');
    return new Program(body);
  }

  statement() {
    if (this.currentToken.type === 'VAR_DECL') {
      return this.variableDeclaration();
    } else if (this.currentToken.type === 'PRINT') {
      return this.printStatement();
    } else if (this.currentToken.type === 'IF') {
      return this.ifStatement();
    } else if (this.currentToken.type === 'WHILE') {
      return this.whileStatement();
    } else if (this.currentToken.type === 'IDENTIFIER') {
      return this.assignment();
    }

    throw new Error(`Unexpected token: ${this.currentToken.type}`);
  }

  variableDeclaration() {
    this.eat('VAR_DECL');
    const name = this.currentToken.value;
    this.eat('IDENTIFIER');
    this.eat('ASSIGN');
    const value = this.expression();
    this.eat('SEMICOLON');
    return new VariableDeclaration(name, value);
  }

  assignment() {
    const name = this.currentToken.value;
    this.eat('IDENTIFIER');
    this.eat('ASSIGN');
    const value = this.expression();
    this.eat('SEMICOLON');
    return new Assignment(name, value);
  }

  printStatement() {
    this.eat('PRINT');
    const expressions = [this.expression()];

    while (this.currentToken.type === 'COMMA') {
      this.eat('COMMA');
      expressions.push(this.expression());
    }

    this.eat('SEMICOLON');
    return new PrintStatement(expressions);
  }

  ifStatement() {
    this.eat('IF');
    this.eat('LPAREN');
    const condition = this.expression();
    this.eat('RPAREN');
    this.eat('LBRACE');

    const body = [];
    while (this.currentToken.type !== 'RBRACE') {
      body.push(this.statement());
    }
    this.eat('RBRACE');

    let elseBody = null;
    if (this.currentToken.type === 'ELSE') {
      this.eat('ELSE');
      this.eat('LBRACE');
      elseBody = [];
      while (this.currentToken.type !== 'RBRACE') {
        elseBody.push(this.statement());
      }
      this.eat('RBRACE');
    }

    return new IfStatement(condition, body, elseBody);
  }

  whileStatement() {
    this.eat('WHILE');
    this.eat('UNTIL');
    this.eat('LPAREN');
    const condition = this.expression();
    this.eat('RPAREN');
    this.eat('LBRACE');

    const body = [];
    while (this.currentToken.type !== 'RBRACE') {
      body.push(this.statement());
    }
    this.eat('RBRACE');

    return new WhileStatement(condition, body);
  }

  expression() {
    let node = this.comparison();

    while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
      const operator = this.currentToken.type;
      this.eat(operator);
      node = new BinaryExpression(operator, node, this.comparison());
    }

    return node;
  }

  comparison() {
    let node = this.term();

    while (
      ['LESS', 'GREATER', 'LESS_EQUALS', 'GREATER_EQUALS', 'EQUALS', 'NOT_EQUALS'].includes(this.currentToken.type)
    ) {
      const operator = this.currentToken.type;
      this.eat(operator);
      node = new BinaryExpression(operator, node, this.term());
    }

    return node;
  }

  term() {
    let node = this.factor();

    while (['MULTIPLY', 'DIVIDE'].includes(this.currentToken.type)) {
      const operator = this.currentToken.type;
      this.eat(operator);
      node = new BinaryExpression(operator, node, this.factor());
    }

    return node;
  }

  factor() {
    const token = this.currentToken;

    if (token.type === 'NUMBER') {
      this.eat('NUMBER');
      return new Literal(token.value);
    }

    if (token.type === 'STRING') {
      this.eat('STRING');
      return new Literal(token.value);
    }

    if (token.type === 'IDENTIFIER') {
      const name = token.value;
      this.eat('IDENTIFIER');
      return new Identifier(name);
    }

    if (token.type === 'TRUE') {
      this.eat('TRUE');
      return new Literal(true);
    }

    if (token.type === 'FALSE') {
      this.eat('FALSE');
      return new Literal(false);
    }

    if (token.type === 'NULL') {
      this.eat('NULL');
      return new Literal(null);
    }

    if (token.type === 'LPAREN') {
      this.eat('LPAREN');
      const node = this.expression();
      this.eat('RPAREN');
      return node;
    }

    throw new Error(`Unexpected token: ${token.type}`);
  }

  parse() {
    return this.program();
  }
}

module.exports = {
  Parser,
  Program,
  VariableDeclaration,
  Assignment,
  PrintStatement,
  IfStatement,
  WhileStatement,
  BinaryExpression,
  Identifier,
  Literal,
};
