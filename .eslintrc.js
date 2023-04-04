module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error', {
      endOfLine: 'auto',
    }],
    'import/no-unresolved': 'off',
    'node/no-path-concat': 'off',
    'node/no-process-env': 'off',
  },
};
