module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:node/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'prefer-promise-reject-errors': 'off',
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'node/handle-callback-err': 'off',
    'node/no-new-require': 'off',
    'node/no-path-concat': 'off',
    'node/no-missing-require': ['error', {
      'allowModules': [],
      'resolvePaths': ['/path/to/a/modules/directory'],
      'tryExtensions': ['.js', '.json', '.node']
    }]
  }
}
