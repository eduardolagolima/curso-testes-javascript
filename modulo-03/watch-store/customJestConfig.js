const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['<rootDir>/components/**/*.js', '<rootDir>/pages/**/*.js'],
};

module.exports = customJestConfig;