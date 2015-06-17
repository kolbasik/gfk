/// <reference path="../../typings/tsd.d.ts" />
var CSV = require('./CSV');
describe('CSV: ', function () {
    var expect = chai.expect;
    describe('parse', function () {
        var source = 'DATE;ID;ANSWER\r\n1-1-2013;1;yes\r\n1-1-2013;2;no';
        it('should exist', function () {
            expect(CSV.parse).to.be.ok;
        });
        it('should return the array of objects', function () {
            var data = CSV.parse(source, ';');
            expect(data).to.be.ok;
            expect(data.length).equal(2);
        });
        it('should recognize headers', function () {
            var data = CSV.parse(source, ';')[0];
            expect(Object.keys(data)).eql(['DATE', 'ID', 'ANSWER']);
        });
        it('should recognize values', function () {
            var data = CSV.parse(source, ';')[0];
            expect(data.DATE).equals('1-1-2013');
            expect(data.ID).equals('1');
            expect(data.ANSWER).equals('yes');
        });
    });
});
