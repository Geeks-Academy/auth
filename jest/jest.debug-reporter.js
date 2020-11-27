/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// my-custom-reporter.js
class DebugReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('Passed Suites: ', results.numPassedTestSuites);
    console.log('Passed Tests: ', results.numPassedTests);
    console.log('Failed Suites: ', results.numFailedTestSuites);
    console.log('Failed Tests: ', results.numFailedTests);
  }
}

module.exports = DebugReporter;
// or export default MyCustomReporter;