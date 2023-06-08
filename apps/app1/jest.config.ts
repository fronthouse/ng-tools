/* eslint-disable */
export default {
  displayName: 'app1',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/packages/app1',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};



// import type { Config } from 'jest';
// import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.spec.json';
// import presets from 'jest-preset-angular/presets';

// const jestConfig: Config = {
//   preset: 'jest-preset-angular',
//   transform: {
//     '^.+\\.(ts|js|html|svg)$': [
//       'jest-preset-angular',
//       {
//         ...presets.defaultTransformerOptions,
//         //tsconfig: '<rootDir>/tsconfig.spec.json',
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
//   // setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
// };

// export default jestConfig;



// export default {
//   displayName: 'app1',
//   preset: '../../jest.preset.js',
//   setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
//   coverageDirectory: '../../coverage/apps/app1',
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
