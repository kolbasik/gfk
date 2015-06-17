/// <reference path="../../typings/tsd.d.ts" />
var HTTP = require('./HTTP');
describe('HTTP: ', function () {
    var expect = chai.expect;
    describe('get', function () {
        var source = '/base/public/core/HTTP.js';
        it('should exist', function () {
            expect(HTTP.get).to.be.ok;
        });
        it('should return the array of objects', function (done) {
            if (typeof Promise === 'undefined') {
                done();
            }
            HTTP.get(source).then(function () { return done(); });
        });
    });
});
