import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
