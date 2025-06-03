class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Tokenizer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentChar = this.input[0];
  }

  advance() {
    this.position++;
    this.currentChar = this.position < this.input.length ? this.input[this.position] : null;
  }

  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  number() {
    let result = '';
    while (this.currentChar && /[0-9]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return new Token('NUMBER', parseInt(result));
  }

  string() {
    let result = '';
    const quote = this.currentChar;
    this.advance();

    while (this.currentChar && this.currentChar !== quote) {
      result += this.currentChar;
      this.advance();
    }
    this.advance(); // Skip closing quote
    return new Token('STRING', result);
  }

  identifier() {
    let result = '';
    while (this.currentChar && /[a-zA-Z_]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }

    // Keywords
    const keywords = {
      namaste: 'PROGRAM_START',
      dhanyabad: 'PROGRAM_END',
      yo: 'VAR_DECL',
      bhana: 'PRINT',
      yadi: 'IF',
      nabhaye: 'ELSE',
      jaba: 'WHILE',
      samma: 'UNTIL',
      bhayo: 'BREAK',
      jari: 'CONTINUE',
      khali: 'NULL',
      thik: 'TRUE',
      bethik: 'FALSE',
    };

    return new Token(keywords[result] || 'IDENTIFIER', result);
  }

  getNextToken() {
    while (this.currentChar) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (/[0-9]/.test(this.currentChar)) {
        return this.number();
      }

      if (this.currentChar === '"' || this.currentChar === "'") {
        return this.string();
      }

      if (/[a-zA-Z_]/.test(this.currentChar)) {
        return this.identifier();
      }

      if (this.currentChar === '=') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return new Token('EQUALS', '==');
        }
        return new Token('ASSIGN', '=');
      }

      if (this.currentChar === '!') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return new Token('NOT_EQUALS', '!=');
        }
        return new Token('NOT', '!');
      }

      if (this.currentChar === '<') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return new Token('LESS_EQUALS', '<=');
        }
        return new Token('LESS', '<');
      }

      if (this.currentChar === '>') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return new Token('GREATER_EQUALS', '>=');
        }
        return new Token('GREATER', '>');
      }

      if (this.currentChar === '+') {
        this.advance();
        return new Token('PLUS', '+');
      }

      if (this.currentChar === '-') {
        this.advance();
        return new Token('MINUS', '-');
      }

      if (this.currentChar === '*') {
        this.advance();
        return new Token('MULTIPLY', '*');
      }

      if (this.currentChar === '/') {
        this.advance();
        return new Token('DIVIDE', '/');
      }

      if (this.currentChar === '(') {
        this.advance();
        return new Token('LPAREN', '(');
      }

      if (this.currentChar === ')') {
        this.advance();
        return new Token('RPAREN', ')');
      }

      if (this.currentChar === '{') {
        this.advance();
        return new Token('LBRACE', '{');
      }

      if (this.currentChar === '}') {
        this.advance();
        return new Token('RBRACE', '}');
      }

      if (this.currentChar === ';') {
        this.advance();
        return new Token('SEMICOLON', ';');
      }

      if (this.currentChar === ',') {
        this.advance();
        return new Token('COMMA', ',');
      }

      throw new Error(`Invalid character: ${this.currentChar}`);
    }

    return new Token('EOF', null);
  }
}

module.exports = { Token, Tokenizer };
