'use_strict';

function buildLexer(tokens) {
  const SKIP_TYPE = 'SPACE';
  const tokenNames = tokens.map((t) => t[0]);
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
    while (match = regexp.exec(str)) {
      const t = getToken(match.groups);
      if (t === SKIP_TYPE) {
        continue;
      }
      const type = t;
      const value = match.groups[t];
      result.push(tokenize(type, value));
    }
    return result;
  };

  return lexer;
};

module.exports = buildLexer;
