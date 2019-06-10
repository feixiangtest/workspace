// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'no-this-before-super': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-extend-native': 0,
    'no-return-assign': 0,
    'constructor-super': 'warn',
    'no-undef': 'warn',
    'valid-typeof': 'warn',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
