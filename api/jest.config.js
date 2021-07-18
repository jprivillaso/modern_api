module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      lines: 80, functions: 80, branches: 75, statements: 80
    }
  },
  maxWorkers: '80%',
  testPathIgnorePatterns: [
    'node_modules',
    '.build'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
