#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { Tokenizer } = require('./lexer/tokenizer');
const { Parser } = require('./parser/parser');
const Interpreter = require('./interpreter/interpreter');

program
  .version('1.0.0')
  .description('Nepaliko.js - A programming language that uses Nepali syntax')
  .argument('<file>', 'The nepaliko file to run')
  .action((file) => {
    try {
      // Read the file
      const filePath = path.resolve(process.cwd(), file);
      const source = fs.readFileSync(filePath, 'utf-8');

      // Tokenize
      const tokenizer = new Tokenizer(source);

      // Parse
      const parser = new Parser(tokenizer);
      const ast = parser.parse();

      // Interpret
      const interpreter = new Interpreter();
      const jsCode = interpreter.interpret(ast);

      // Create a temporary file to run the JavaScript
      const tempFile = path.join(process.cwd(), '.temp.js');
      fs.writeFileSync(tempFile, jsCode);

      // Run the JavaScript
      require(tempFile);

      // Clean up
      fs.unlinkSync(tempFile);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
