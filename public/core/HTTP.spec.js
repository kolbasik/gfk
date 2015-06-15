define(["require", "exports", 'chai', './HTTP'], function (require, exports, chai, HTTP) {
    describe('HTTP: ', function () {
        var expect = chai.expect;
        describe('get', function () {
            var source = 'http://google.com';
            it('should exist', function () {
                expect(HTTP.get).to.be.ok;
            });
            it('should return the array of objects', function (done) {
                if (typeof Promise === 'undefined') {
                    done();
                }
                HTTP.get(source).then(function () {
                    done();
                });
            });
        });
    });
});
