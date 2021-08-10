module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  reporters: ['default'],
  coverageThreshold: {
    global: {
      branches: 73,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '.github', '.vscode']
}
