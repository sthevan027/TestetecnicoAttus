/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/app/features/users/state/**/*.ts',
    'src/app/features/todos/state/**/*.ts',
    'src/app/shared/validators.ts',
    'src/app/challenges/typescript/1.2-filtrar-epaginar.ts',
    'src/app/app.component.ts',
    '!**/*.spec.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 55,
      functions: 55,
      lines: 60,
    },
  },
};
