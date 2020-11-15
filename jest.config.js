'use strict';

// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'test views',
      setupFilesAfterEnv: ['./src/view/jest.setup.js'],
      moduleNameMapper: {
        '\\.(css|styl)$': '<rootDir>/src/view/__tests_helpers__/styleMock.js'
      },
      modulePathIgnorePatterns: ['<rootDir>/src/lib/'],
      transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest'
      }
    },
    {
      displayName: 'test library modules',
      testEnvironment: 'node',
      modulePathIgnorePatterns: ['<rootDir>/src/view/']
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**']
    }
  ],

  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/__tests__/**',
    '!**/__tests_helpers__/**'
  ],

  coverageReporters: ['lcov', 'text', 'html']
};
