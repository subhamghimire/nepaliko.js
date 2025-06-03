class Interpreter {
  constructor() {
    this.variables = new Map();
  }

  visit(node) {
    const methodName = `visit${node.type}`;
    if (this[methodName]) {
      return this[methodName](node);
    }
    throw new Error(`No visit method for ${node.type}`);
  }

  visitProgram(node) {
    const statements = node.body.map((stmt) => this.visit(stmt));
    return statements.join('\n');
  }

  visitVariableDeclaration(node) {
    const value = this.visit(node.value);
    this.variables.set(node.name, value);
    return `let ${node.name} = ${value};`;
  }

  visitAssignment(node) {
    const value = this.visit(node.value);
    this.variables.set(node.name, value);
    return `${node.name} = ${value};`;
  }

  visitPrintStatement(node) {
    const expressions = node.expression.map((expr) => this.visit(expr));
    return `console.log(${expressions.join(', ')});`;
  }

  visitIfStatement(node) {
    const condition = this.visit(node.condition);
    const body = node.body.map((stmt) => this.visit(stmt)).join('\n');
    let code = `if (${condition}) {\n${body}\n}`;

    if (node.elseBody) {
      const elseBody = node.elseBody.map((stmt) => this.visit(stmt)).join('\n');
      code += ` else {\n${elseBody}\n}`;
    }

    return code;
  }

  visitWhileStatement(node) {
    const condition = this.visit(node.condition);
    const body = node.body.map((stmt) => this.visit(stmt)).join('\n');
    return `while (${condition}) {\n${body}\n}`;
  }

  visitBinaryExpression(node) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    const operator = this.getOperator(node.operator);
    return `(${left} ${operator} ${right})`;
  }

  visitIdentifier(node) {
    return node.name;
  }

  visitLiteral(node) {
    if (typeof node.value === 'string') {
      return `"${node.value}"`;
    }
    return node.value;
  }

  getOperator(tokenType) {
    const operators = {
      PLUS: '+',
      MINUS: '-',
      MULTIPLY: '*',
      DIVIDE: '/',
      LESS: '<',
      GREATER: '>',
      LESS_EQUALS: '<=',
      GREATER_EQUALS: '>=',
      EQUALS: '==',
      NOT_EQUALS: '!=',
    };
    return operators[tokenType] || tokenType;
  }

  interpret(ast) {
    return this.visit(ast);
  }
}

module.exports = Interpreter;
