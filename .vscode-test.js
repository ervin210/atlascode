// import { defineConfig } from '@vscode/test-cli';
const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig([
  {
    label: 'integration-tests',
    files: 'src/integration-tests/**/*.test.js',
    version: 'insiders',
    // workspaceFolder: './sampleWorkspace',
    // mocha: {
    //   ui: 'tdd',
    //   timeout: 20000
    // }
  }
  // you can specify additional test configurations, too
]);
