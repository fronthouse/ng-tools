/* eslint-disable */
import type { Config } from 'jest';

const jestConfig: Config =  {
  displayName: 'testhelp',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'mjs'],
  coverageDirectory: '../../coverage/packages/testhelp',
};

export default jestConfig;
