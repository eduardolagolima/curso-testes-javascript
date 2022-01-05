const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });
const customJestConfig = require('./customJestConfig');

module.exports = createJestConfig({
  ...customJestConfig,
  testMatch: ['**/?(*.integration.)+(spec|test).[jt]s?(x)'],
});
