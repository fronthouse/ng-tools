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


// import type { Config } from 'jest';
// import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.spec.json';

// const jestConfig: Config = {
//   preset: 'jest-preset-angular',
  
//   transform: {
//     '^.+\\.(ts|js|html|svg)$': [
//       'jest-preset-angular',
//       {
//         tsconfig: '<rootDir>/tsconfig.spec.json',
//         stringifyContentPathRegex: '\\.(html|svg)$',
//         isolatedModules: true,
//         useESM: true,
//       },
//     ],
//   },
//   moduleNameMapper: {
//     ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
//     tslib: 'tslib/tslib.es6.js',
//   },
//   moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
// };

// export default jestConfig;

// /* eslint-disable */
// import type { Config } from 'jest';

// globalThis.ngJest = {
//   skipNgcc: true,
//   tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
// };

// const jestConfig: Config = {
//   displayName: 'testhelp',
//   preset: '../../jest.preset.js',
//   globalSetup: 'jest-preset-angular/global-setup',
//   //setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
//   globals: {},
//   coverageDirectory: '<rootDir>/coverage/libs/testhelp',
//   transform: {
//     '^.+\\.(ts|js|html)$': [
//       'jest-preset-angular',
//       {
//         tsconfig: '<rootDir>/tsconfig.spec.json',
//         stringifyContentPathRegex: '\\.(html|svg)$'
//       }
//     ]
//   },
//   snapshotSerializers: [
//     'jest-preset-angular/build/serializers/no-ng-attributes',
//     'jest-preset-angular/build/serializers/ng-snapshot',
//     'jest-preset-angular/build/serializers/html-comment'
//   ]
// };
// export default jestConfig;