export default {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/services/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
};
