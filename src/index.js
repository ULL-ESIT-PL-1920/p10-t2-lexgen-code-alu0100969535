'use_strict';

function buildLexer(tokens) {
  const SKIP_TYPE = 'SPACE';
  const ERROR_TYPE = 'ERROR';
  const tokenNames = tokens.map((t) => {
    if (t[0] === ERROR_TYPE) {
      throw new Error('No \'ERROR\' type allowed!');
    }
    return t[0];
  });
  const tokenRegs = tokens.map((t) => t[1]);

  const buildOrRegexp = (regexps) => {
    const sources = regexps.map((r) => r.source);
    const union = sources.join('|');
    return new RegExp(union, 'y');
  };
  const getToken = (m) => {
    return tokenNames.find((tn) => typeof m[tn] !== 'undefined');
  };
  const tokenize = (type, value) => {
    return {
      type: type,
      value: value,
    };
  };

  const regexp = buildOrRegexp(tokenRegs);

  const lexer = (str) => {
    let match;
    const result = [];
    let index = 0; // Using index to determine if we got an error.
    while (match = regexp.exec(str)) {
      const t = getToken(match.groups);
      const type = t;
      const value = match.groups[t];
      // match.index is where it started matching
      index = match.index + value.length;
      if (t === SKIP_TYPE) {
        continue;
      }
      result.push(tokenize(type, value));
    }
    if (index !== str.length) {
      const value = str.slice(index, index + 10);
      result.push(tokenize(ERROR_TYPE, value));
    }
    return result;
  };

  return lexer;
};

module.exports = buildLexer;
