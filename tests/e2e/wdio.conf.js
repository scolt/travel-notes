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
    screenshotPath: './tests/e2e/screenshots',
    baseUrl: 'http://iwasthere.herokuapp.com/#',
    waitforTimeout: 10000,
    framework: 'mocha',
    services: ['selenium-standalone'],
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-register'],
        timeout: 20000
    },
    logLevel: 'silent',
    reporters: ['spec'],
    before: function () {
        browser.setViewportSize({
            width: 500,
            height: 500
        });
    },
    onPrepare: function () {
        console.log('Starting end2end tests');
    },
    onComplete: function () {
        console.log('All done!');
    }
};
