# p10-t2-lexgen-code-alu0100969535

## Description

This modules exports a function that generates a lexer that you can use to parse your code.
It accepts a list of tokens and regular expressions, then it does all the work for you!

## Installing

```console
npm install \@ull-esit-pl-1920/p10-t2-lexgen-code-alu0100969535
```

## Usage

```js
const buildLexer = require('@ull-esit-pl-1920/p10-t2-lexgen-code-alu0100969535');

const SPACE = /(?<SPACE>\s+|\/\/.*)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>\b([a-z_]\w*))\b/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP],
];

const lexer = buildLexer(myTokens);
const str = 'const varName = "value"';
const result = lexer(str);
/*
[
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'varName' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"value"' }
]
*/
```

## Tests

You can run tests by running npm task:

```console
npm test
```
```console
> jest

  PASS  test/index.test.js
    Correct output
      ✓ const varName = "value" (5ms)
      ✓ let x = a + 
  b (1ms)
      ✓  // Entrada con errores
  let x = 42*c (1ms)
    Making it fail
      ✓ No 'ERROR' token allowed in input (10ms)

  Test Suites: 1 passed, 1 total
  Tests:       4 passed, 4 total
  Snapshots:   0 total
  Time:        2.311s
  Ran all test suites.
```