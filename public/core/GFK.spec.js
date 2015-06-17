/// <reference path="../../typings/tsd.d.ts" />
var GFK = require('./GFK');
describe('GFK: ', function () {
    var expect = chai.expect;
    describe('inherits', function () {
        it('should exist', function () {
            expect(GFK.inherits).to.be.ok;
        });
        it('should inherit parent prototype', function () {
            var C1 = function () {
            };
            C1.prototype.M1 = function () { return 'M1'; };
            var C2 = GFK.inherits(C1);
            C2.prototype.M2 = function () { return 'M2'; };
            var data = new C2();
            expect(data).to.be.an.instanceof(C1);
            expect(data).to.be.an.instanceof(C2);
            expect(data.M1()).equals('M1');
            expect(data.M2()).equals('M2');
        });
    });
});
