
/**
 * This is entry-point for testing with karma-runner and requirejs
 * based on sinpped from: http://karma-runner.github.io/0.8/plus/RequireJS.html
 */
(function() {
    // invoked in karma-runner environment
    var karma = window.__karma__;

    // looking for *[._]spec.js files
    tests = Object.keys(karma.files)
        .filter(function (file) { return /[._]spec\.js$/.test(file); })
        .map(function (file) { return file.replace(/^\/|\.js$/g, ''); });

    requirejs.config({
        baseUrl: '', // karma serves files from '/base'

        paths: {
            'chai': 'base/node_modules/chai/chai'
        },

        // ask Require.js to load these files (all our tests)
        deps: tests,

        // start test run, once Require.js is done
        callback: karma.start
    });
})();
