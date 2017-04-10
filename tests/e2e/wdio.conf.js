exports.config = {
    maxInstances: 1,
    host: '127.0.0.1',
    port: 4444,
    specs: ['./tests/e2e/specs/*.spec.js'],
    capabilities: [
        {browserName: 'chrome'}
    ],
    sync: true,
    coloredLogs: true,
    screenshotPath: './tests/e2e/.reports/screenshots',
    baseUrl: 'http://iwasthere.herokuapp.com/#',
    waitforTimeout: 20000,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-register'],
        timeout: 20000
    },
    logLevel: 'silent',
    reporters: ['dot', 'spec', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: './tests/e2e/.reports/allure/xml'
        }
    },
    before: function () {
        browser.windowHandleSize({width: 1024, height: 768});
    },
    onPrepare: function () {
        console.log('Starting end2end tests');
    },
    onComplete: function () {
        console.log('All done!');
    },
    onError: function () {
        console.log('something wrong');
    }
};
