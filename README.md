# nepaliko.js
[![npm package](https://img.shields.io/badge/npm-nepaliko.js-blue)](https://www.npmjs.com/package/nepaliko.js)
[![npm version](https://img.shields.io/npm/v/nepaliko.js.svg)](https://www.npmjs.com/package/nepaliko.js)

This is the fun programming language. Do Programming in Nepali Language, kind of Nepangrezi.

## Installation

1. First, make sure you have Node.js installed. If not, install it from [nodejs.org](https://nodejs.org/)

2. Clone this repository:

```bash
git clone https://github.com/subhamghimire/nepaliko.js.git
cd nepaliko.js
```

3. Install dependencies:

```bash
npm install
```

4. Make the CLI executable:

```bash
chmod +x src/cli.js
```

5. Create a global link to the nepaliko command:

```bash
sudo ln -s "$(pwd)/src/cli.js" /usr/local/bin/nepaliko
```

## Usage

### Create a new file (example.nepaliko)

<pre>
namaste
  bhana "Hello k cha khabar";
dhanyabad
</pre>

This is the example where `namaste` is the entrypoint for the program and program must end with `dhanyabad`. Anything outside of it will be ignored.

### Run

<pre>
nepaliko example.nepaliko
</pre>

### Output

<pre>
Hello k cha khabar
</pre>

## Language Features

### Variables

Variables can be declared using `yo` keyword:

<pre>
namaste
  yo a = 1;
  yo b = "two";
  yo c = 3;
  a = a + 1;
  b = 25;
  c *= 5;
dhanyabad
</pre>

### Types

- Numbers: `yo a = 2;`
- Strings: `yo b = "Hello";` or `yo c = 'World';`
- Boolean: `yo d = thik;` (true) or `yo e = bethik;` (false)
- Null: `yo f = khali;`

### Conditions

Use `yadi` for if statements and `nabhaye` for else:

<pre>
namaste
  yo a = 10;
  yadi (a < 20) {
    bhana "a is less than 20";
  } nabhaye {
    bhana "a is greater than or equal to 20";
  }
dhanyabad
</pre>

### Loops

Use `jaba samma` for while loops:

<pre>
namaste
  yo counter = 0;
  jaba samma (counter < 5) {
    bhana "Counter is ", counter;
    counter = counter + 1;
  }
dhanyabad
</pre>

## How It Works

The nepaliko.js interpreter works in several stages:

1. **Lexical Analysis (Tokenizer)**

   - Converts source code into tokens
   - Recognizes keywords like `namaste`, `dhanyabad`, `yo`, `bhana`, etc.
   - Handles operators, identifiers, and literals

2. **Parsing (Parser)**

   - Converts tokens into an Abstract Syntax Tree (AST)
   - Validates syntax and structure
   - Creates nodes for different program elements (variables, conditions, loops)

3. **Interpretation (Interpreter)**

   - Walks through the AST
   - Converts nepaliko syntax to JavaScript
   - Handles variable scoping and operations

4. **Execution**
   - The generated JavaScript is executed using Node.js
   - Results are displayed in the console

### Example Translation

Nepaliko code:

<pre>
namaste
  yo a = 10;
  bhana "Value is ", a;
dhanyabad
</pre>

Gets translated to JavaScript:

<pre>
let a = 10;
console.log("Value is ", a);
</pre>

## Contributing

Feel free to contribute to this project by:

1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## License

MIT License - feel free to use this project for any purpose.
