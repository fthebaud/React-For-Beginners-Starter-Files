module.exports = {
  // root of the eslint configuration
  root: true,

  // parser options
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },

  // environments : define a set of global variables
  env: {
    es6: true,
    browser: true
  },

  plugins: ['react'],

  //extending shareable configs
  extends: ['eslint:recommended', 'plugin:react/recommended'],


  rules: {
    //Possible errors
    'comma-dangle': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-extra-semi': 'warn',
    'no-extra-parens': ['warn', 'functions'],

    //Best practices
    'eqeqeq': 'warn',
    'no-new': 'warn',
    'no-eval': 'warn',
    'curly': 'warn',
    'no-alert': 'warn',
    'no-unused-expressions': 'warn',
    'no-else-return': 'warn',
    'no-warning-comments': 'warn',
    //Best practices: complexity
    'complexity': ['warn', 6],
    'max-depth': ['warn', 2],
    'max-params': ['warn', 5],

    //variables
    'no-undef': 'warn',
    'no-unused-vars': ['warn', {
      'vars': 'all',
      'args': 'after-used'
    }],
    'no-use-before-define': ['warn', {
      'functions': false,
      'classes': false
    }],

    //Stylistic issues
    'no-array-constructor': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'new-cap': ['warn', {
      'newIsCap': true,
      'capIsNew': true,
      'capIsNewExceptions': ['Router']
    }],
    'semi': 'warn',
    'quotes': ['warn', 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
    //'quote-props': ['warn', 'as-needed'],
    'indent': ['off', 2], //off : problem with arrays indentation
    'no-trailing-spaces': 'warn',
    'space-before-function-paren': ['warn', {"anonymous": "always", "named": "never"}],
    'space-in-parens': ['warn', 'never'],
    'yoda': ['warn', 'never']
  }
}
