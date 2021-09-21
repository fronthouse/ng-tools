const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  moduleNameMapper: {
    "@fronthouse/testhelp/(.*)$": "<rootDir>/libs/testhelp/src/$1"
  }
};
